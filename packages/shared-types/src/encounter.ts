/**
 * Severity classification for CRSwNP.
 */
export type DiseaseSeverity = 'mild' | 'moderate' | 'severe';

/**
 * Biomarker profile for a patient.
 */
export interface BiomarkerProfileInput {
  /** Blood eosinophil count (cells/µL) */
  bloodEosinophilCount?: number;
  /** Total IgE level (IU/mL) */
  totalIgE?: number;
  /** TARC/CCL17 level (pg/mL) */
  tarc?: number;
  /** Periostin level (ng/mL) */
  periostin?: number;
}

/**
 * Comorbidity profile for a patient.
 */
export interface ComorbidityProfileInput {
  hasAsthma: boolean;
  hasNSAIDExacerbatedRespiratoryDisease: boolean;
  hasAllergicRhinitis: boolean;
  hasAtopicDermatitis: boolean;
  hasChronicUrticaria: boolean;
  hasFoodAllergy: boolean;
  hasEosinophilicEsophagitis: boolean;
}

/**
 * Prior treatment history for a patient.
 */
export interface PriorTreatmentHistoryInput {
  hadPriorSurgery: boolean;
  numberOfPriorSurgeries?: number;
  hadSystemicCorticosteroids: boolean;
  hadTopicalCorticosteroids: boolean;
  currentBiologic?: string;
  priorBiologics?: string[];
}

/**
 * Input for creating or updating an encounter.
 */
export interface EncounterInput {
  /** Pseudonymised patient case reference (no real patient names) */
  patientCaseRef: string;
  diseaseSeverity: DiseaseSeverity;
  lundMackayScore?: number;
  snot22Score?: number;
  biomarkers?: BiomarkerProfileInput;
  comorbidities?: ComorbidityProfileInput;
  priorTreatment?: PriorTreatmentHistoryInput;
  clinicalNotes?: string;
}
