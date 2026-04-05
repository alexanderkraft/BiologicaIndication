import type {
  MedicalContentVersion,
  PatientProfileInput,
  RecommendationResult,
  RuleSet,
} from './types';

/**
 * Evaluates a patient profile against a rule set to produce a ranked shortlist
 * of biologic considerations for CRSwNP.
 *
 * This function is pure and deterministic: the same input always produces the same output.
 * It has no side effects, no database access, and no API calls.
 *
 * @param input - Structured patient profile (no real patient identifiers)
 * @param ruleSet - Rule set loaded from confirmed medical content
 * @param contentVersion - Version of the medical content used
 * @param now - Evaluation timestamp (defaults to current time; inject a fixed value for deterministic behaviour)
 * @returns A ranked shortlist of biologic considerations with full explainability
 */
export function evaluatePatientProfile(
  input: PatientProfileInput,
  ruleSet: RuleSet,
  contentVersion: MedicalContentVersion,
  /** ISO 8601 evaluation timestamp. Defaults to the current time. Inject for deterministic testing. */
  now: Date = new Date(),
): RecommendationResult {
  const scoreMap = new Map<
    string,
    {
      score: number;
      appliedRules: RecommendationResult['shortlist'][number]['appliedRules'];
    }
  >();

  // Initialise scores for all biologics
  for (const biologic of ruleSet.biologics) {
    scoreMap.set(biologic.id, { score: 0, appliedRules: [] });
  }

  let rulesEvaluated = 0;

  // Apply each rule deterministically
  for (const rule of ruleSet.rules) {
    rulesEvaluated++;
    if (rule.predicate(input)) {
      const entry = scoreMap.get(rule.biologicId);
      if (entry !== undefined) {
        const contribution = rule.direction * rule.weight;
        entry.score += contribution;
        entry.appliedRules.push({
          ruleId: rule.id,
          ruleName: rule.name,
          rationale_text: rule.rationale_text,
          contribution,
        });
      }
    }
  }

  // Build ranked shortlist (descending by score)
  const shortlist = ruleSet.biologics
    .map((biologic) => {
      const entry = scoreMap.get(biologic.id) ?? { score: 0, appliedRules: [] };
      return {
        biologicId: biologic.id,
        displayName: biologic.displayName,
        score: entry.score,
        appliedRules: entry.appliedRules,
      };
    })
    .sort((a, b) => b.score - a.score);

  return {
    encounterRef: input.encounterRef,
    shortlist,
    contentVersion,
    evaluatedAt: now.toISOString(),
    rulesEvaluated,
  };
}
