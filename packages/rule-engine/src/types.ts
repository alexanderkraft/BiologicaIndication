import type {
  BiomarkerProfileInput,
  ComorbidityProfileInput,
  DiseaseSeverity,
  PriorTreatmentHistoryInput,
} from '@biologica/shared-types';

/**
 * Structured patient profile input for the rule engine.
 * Contains no real patient identifiers.
 */
export interface PatientProfileInput {
  /** Pseudonymised encounter reference */
  encounterRef: string;
  diseaseSeverity: DiseaseSeverity;
  /** Nasal Endoscopy / Lund-Mackay CT score (0-24) */
  lundMackayScore?: number;
  /** SNOT-22 score (0-110) */
  snot22Score?: number;
  biomarkers?: BiomarkerProfileInput;
  comorbidities?: ComorbidityProfileInput;
  priorTreatment?: PriorTreatmentHistoryInput;
}

/**
 * A single clinical rule that can be applied to a patient profile.
 * Every rule must have a rationale_text field for explainability.
 */
export interface ClinicalRule {
  /** Unique rule identifier */
  id: string;
  /** Human-readable rule name */
  name: string;
  /** Explanation of the clinical rationale behind this rule */
  rationale_text: string;
  /** The biologic this rule applies to */
  biologicId: string;
  /** Whether this rule increases (+1) or decreases (-1) the score */
  direction: 1 | -1;
  /** Weight of the rule (default 1) */
  weight: number;
  /**
   * Predicate function that evaluates whether this rule applies.
   * Must be pure and deterministic.
   * @param profile - The patient profile to evaluate against
   * @returns true if the rule applies
   */
  predicate: (profile: PatientProfileInput) => boolean;
}

/**
 * A biologic medication entry in the rule set.
 */
export interface BiologicEntry {
  /** Unique identifier (must not hardcode brand names in app code) */
  id: string;
  /** Display name loaded from medical content */
  displayName: string;
  /** Mechanism of action description */
  mechanismOfAction: string;
}

/**
 * The complete rule set loaded from medical content.
 */
export interface RuleSet {
  rules: ClinicalRule[];
  biologics: BiologicEntry[];
}

/**
 * Version identifier for the medical content used during evaluation.
 */
export interface MedicalContentVersion {
  /** Semantic version of the content package */
  version: string;
  /** ISO 8601 effective date */
  effectiveDate: string;
  /** Content checksum for auditability */
  checksum: string;
}

/**
 * A single biologic in the ranked shortlist.
 */
export interface RankedBiologic {
  biologicId: string;
  displayName: string;
  /** Computed score from applied rules */
  score: number;
  /** Rules that contributed to this ranking */
  appliedRules: Array<{
    ruleId: string;
    ruleName: string;
    rationale_text: string;
    contribution: number;
  }>;
}

/**
 * The output of the rule engine evaluation.
 * Never referred to as a "recommendation" — always "shortlist" or "consideration".
 */
export interface RecommendationResult {
  /** Pseudonymised encounter reference */
  encounterRef: string;
  /** Ranked shortlist of biologic considerations */
  shortlist: RankedBiologic[];
  /** Version of medical content used */
  contentVersion: MedicalContentVersion;
  /** ISO 8601 timestamp of evaluation */
  evaluatedAt: string;
  /** Total number of rules evaluated */
  rulesEvaluated: number;
}
