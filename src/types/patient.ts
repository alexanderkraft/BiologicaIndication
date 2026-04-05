export type YesNoUnknown = 'yes' | 'no' | 'unknown'
export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'unknown'
export type Region = 'EU' | 'DE' | 'US'
export type DosingPreference = 'q2w' | 'q4w' | 'q8w' | 'q26w' | 'no_preference'

export interface PriorBiologicTrial {
  drug: string
  response: 'good' | 'partial' | 'none' | 'adverse'
  notes?: string
}

export interface ClinicalHistory {
  diagnosisConfirmed: boolean
  severity: SeverityLevel
  priorINCS: YesNoUnknown
  systemicSteroidCourses: number | null          // number of courses in past 2 years
  priorESS: YesNoUnknown
  recurrenceAfterESS: YesNoUnknown
  smellLoss: 0 | 1 | 2 | 3 | null               // 0=none, 1=mild, 2=moderate, 3=severe/anosmia
  nasalObstruction: SeverityLevel
  snot22Score: number | null                      // 0–110
  priorBiologicTrials: PriorBiologicTrial[]
}

export interface BiomarkerProfile {
  bloodEosinophils: number | null                 // cells/µL (i.e. ×10⁶/L or /mm³)
  totalIgE: number | null                         // IU/mL
  atopicSensitization: YesNoUnknown
  type2Indicators: YesNoUnknown                   // clinical type-2 inflammation overall
}

export interface ComorbidityProfile {
  asthma: YesNoUnknown
  asthmaControlled: YesNoUnknown                  // only relevant if asthma = yes
  nsaidErd: YesNoUnknown
  allergicRhinitis: YesNoUnknown
  atopicDermatitis: YesNoUnknown
  otherComorbidities: string                      // free text
}

export interface PracticalFactors {
  region: Region
  dosingPreference: DosingPreference
  selfInjectionFeasible: YesNoUnknown
  pregnancyPlanning: YesNoUnknown
  adherenceConcerns: YesNoUnknown
}

export interface PatientProfile {
  clinicalHistory: ClinicalHistory
  biomarkers: BiomarkerProfile
  comorbidities: ComorbidityProfile
  practicalFactors: PracticalFactors
}

export function emptyPatientProfile(): PatientProfile {
  return {
    clinicalHistory: {
      diagnosisConfirmed: false,
      severity: 'unknown',
      priorINCS: 'unknown',
      systemicSteroidCourses: null,
      priorESS: 'unknown',
      recurrenceAfterESS: 'unknown',
      smellLoss: null,
      nasalObstruction: 'unknown',
      snot22Score: null,
      priorBiologicTrials: [],
    },
    biomarkers: {
      bloodEosinophils: null,
      totalIgE: null,
      atopicSensitization: 'unknown',
      type2Indicators: 'unknown',
    },
    comorbidities: {
      asthma: 'unknown',
      asthmaControlled: 'unknown',
      nsaidErd: 'unknown',
      allergicRhinitis: 'unknown',
      atopicDermatitis: 'unknown',
      otherComorbidities: '',
    },
    practicalFactors: {
      region: 'EU',
      dosingPreference: 'no_preference',
      selfInjectionFeasible: 'unknown',
      pregnancyPlanning: 'unknown',
      adherenceConcerns: 'unknown',
    },
  }
}
