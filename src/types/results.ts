import type { BiologicId } from './biologic'
import type { ScoringRuleMatch, ExclusionReason, WarningFlag, MissingDataFlag } from './rules'

export type ConfidenceLevel = 'high' | 'moderate' | 'low' | 'insufficient'
export type RankLabel = 'Preferred' | 'Suitable' | 'Conditionally suitable'

export interface RankedResult {
  biologicId: BiologicId
  rank: number
  rankLabel: RankLabel
  score: number
  confidenceLevel: ConfidenceLevel
  matchedRules: ScoringRuleMatch[]
  rationale: string
  warnings: WarningFlag[]
}

export interface ExcludedResult {
  biologicId: BiologicId
  reasons: ExclusionReason[]
}

export interface RecommendationOutput {
  ranked: RankedResult[]
  excluded: ExcludedResult[]
  globalWarnings: WarningFlag[]
  missingData: MissingDataFlag[]
  generatedAt: string
  contentVersion: string
}
