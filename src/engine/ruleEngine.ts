import type { PatientProfile } from '../types/patient'
import type { BiologicId } from '../types/biologic'
import type { ScoringRuleMatch, ExclusionReason, WarningFlag, MissingDataFlag } from '../types/rules'
import type { RankedResult, ExcludedResult, RecommendationOutput, RankLabel, ConfidenceLevel } from '../types/results'
import { BIOLOGICS } from '../data/biologics'
import { exclusionRules } from '../data/rulesets/exclusionRules'
import { scoringRules } from '../data/rulesets/scoringRules'
import { warningRules, missingDataRules } from '../data/rulesets/warningRules'
import contentVersion from '../../content-version.json'

interface DrugScore {
  biologicId: BiologicId
  score: number
  matchedRules: ScoringRuleMatch[]
  warnings: WarningFlag[]
}

export function runRuleEngine(patient: PatientProfile): RecommendationOutput {
  // 1. Determine excluded drugs
  const excludedMap = new Map<BiologicId, ExclusionReason[]>()

  for (const rule of exclusionRules) {
    if (rule.condition(patient)) {
      for (const drug of rule.drugs) {
        const existing = excludedMap.get(drug) ?? []
        existing.push({ ruleId: rule.id, reason: rule.reason })
        excludedMap.set(drug, existing)
      }
    }
  }

  const excludedIds = new Set(excludedMap.keys())

  // 2. Score remaining drugs
  const eligibleBiologics = BIOLOGICS.filter((b) => !excludedIds.has(b.id))
  const drugScores: DrugScore[] = eligibleBiologics.map((b) => ({
    biologicId: b.id,
    score: 0,
    matchedRules: [],
    warnings: [],
  }))

  for (const rule of scoringRules) {
    if (!rule.condition(patient)) continue
    for (const ds of drugScores) {
      const points = rule.drugScores[ds.biologicId]
      if (points && points > 0) {
        ds.score += points
        ds.matchedRules.push({ ruleId: rule.id, label: rule.label, scoreAdded: points })
      }
    }
  }

  // 3. Per-drug warnings
  for (const rule of warningRules) {
    if (!rule.condition(patient)) continue
    const flag: WarningFlag = { ruleId: rule.id, severity: rule.severity, message: rule.message }
    if (rule.affectsDrugs) {
      for (const ds of drugScores) {
        if (rule.affectsDrugs.includes(ds.biologicId)) {
          ds.warnings.push(flag)
        }
      }
    }
  }

  // 4. Global warnings (no affectsDrugs)
  const globalWarnings: WarningFlag[] = warningRules
    .filter((r) => !r.affectsDrugs && r.condition(patient))
    .map((r) => ({ ruleId: r.id, severity: r.severity, message: r.message }))

  // 5. Missing data flags
  const missingData: MissingDataFlag[] = missingDataRules
    .filter((r) => r.isMissing(patient))
    .map((r) => ({ field: r.field, impact: r.impact }))

  // 6. Rank
  drugScores.sort((a, b) => b.score - a.score)

  const ranked: RankedResult[] = drugScores.map((ds, i) => {
    const rankLabel: RankLabel =
      i === 0 ? 'Preferred' : ds.score >= 2 ? 'Suitable' : 'Conditionally suitable'

    const confidenceLevel: ConfidenceLevel = computeConfidence(ds, missingData)

    const biologic = BIOLOGICS.find((b) => b.id === ds.biologicId)!
    const rationale = buildRationale(ds, biologic.name, rankLabel, patient)

    return {
      biologicId: ds.biologicId,
      rank: i + 1,
      rankLabel,
      score: ds.score,
      confidenceLevel,
      matchedRules: ds.matchedRules,
      rationale,
      warnings: ds.warnings,
    }
  })

  const excluded: ExcludedResult[] = Array.from(excludedMap.entries()).map(([id, reasons]) => ({
    biologicId: id,
    reasons,
  }))

  return {
    ranked,
    excluded,
    globalWarnings,
    missingData,
    generatedAt: new Date().toISOString(),
    contentVersion: contentVersion.version,
  }
}

function computeConfidence(ds: DrugScore, missingData: MissingDataFlag[]): ConfidenceLevel {
  const hasCriticalMissing = missingData.some(
    (m) => m.field === 'Blood eosinophils' || m.field === 'Total IgE',
  )
  if (ds.matchedRules.length === 0 && hasCriticalMissing) return 'insufficient'
  if (ds.matchedRules.length === 0) return 'low'
  if (hasCriticalMissing) return 'moderate'
  if (ds.score >= 4) return 'high'
  if (ds.score >= 2) return 'moderate'
  return 'low'
}

function buildRationale(
  ds: DrugScore,
  name: string,
  rankLabel: RankLabel,
  _patient: PatientProfile,
): string {
  if (ds.matchedRules.length === 0) {
    return `${name}: No specific supporting factors were identified based on the available patient data. This drug may still be clinically appropriate at physician discretion.`
  }
  const factors = ds.matchedRules.map((r) => r.label).join('; ')
  return `${name} is listed as ${rankLabel.toLowerCase()} based on: ${factors}. Score: ${ds.score}. Final decision rests with the treating physician.`
}
