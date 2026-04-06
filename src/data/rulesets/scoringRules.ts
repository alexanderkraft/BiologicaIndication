import type { ScoringRule } from '../../types/rules'

export const scoringRules: ScoringRule[] = [
  // --- Eosinophil-based rules ---
  {
    id: 'score-eos-high',
    label: 'Blood eosinophils ≥ 300/µL (high eosinophilic profile)',
    drugScores: { mepolizumab: 2, depemokimab: 2, dupilumab: 1 },
    condition: (p) => p.biomarkers.bloodEosinophils !== null && p.biomarkers.bloodEosinophils >= 300,
  },
  {
    id: 'score-eos-moderate',
    label: 'Blood eosinophils 150–299/µL (moderate eosinophilic profile)',
    drugScores: { mepolizumab: 1, depemokimab: 1, dupilumab: 1 },
    condition: (p) =>
      p.biomarkers.bloodEosinophils !== null &&
      p.biomarkers.bloodEosinophils >= 150 &&
      p.biomarkers.bloodEosinophils < 300,
  },

  // --- IgE / Atopy-based rules ---
  {
    id: 'score-ige-atopy',
    label: 'Elevated IgE (≥ 30 IU/mL) with atopic sensitization',
    drugScores: { omalizumab: 2 },
    condition: (p) =>
      p.biomarkers.totalIgE !== null &&
      p.biomarkers.totalIgE >= 30 &&
      p.biomarkers.atopicSensitization === 'yes',
  },
  {
    id: 'score-atopy-only',
    label: 'Atopic sensitization present (IgE not measured)',
    drugScores: { omalizumab: 1 },
    condition: (p) =>
      p.biomarkers.atopicSensitization === 'yes' && p.biomarkers.totalIgE === null,
  },

  // --- Type-2 inflammation breadth (dupilumab IL-4Rα advantage) ---
  {
    id: 'score-type2-broad',
    label: 'Type-2 inflammation indicators present',
    drugScores: { dupilumab: 1 },
    condition: (p) => p.biomarkers.type2Indicators === 'yes',
  },

  // --- Comorbidity: Asthma ---
  {
    id: 'score-asthma',
    label: 'Asthma comorbidity (upper + lower airway benefit from IL-4Rα blockade)',
    drugScores: { dupilumab: 2, mepolizumab: 1, depemokimab: 1 },
    condition: (p) => p.comorbidities.asthma === 'yes',
  },

  // --- Comorbidity: N-ERD ---
  {
    id: 'score-nerd',
    label: 'N-ERD / NSAID-ERD (dupilumab has evidence in this phenotype)',
    drugScores: { dupilumab: 2, omalizumab: 1 },
    condition: (p) => p.comorbidities.nsaidErd === 'yes',
  },

  // --- Comorbidity: Atopic dermatitis ---
  {
    id: 'score-atopic-dermatitis',
    label: 'Atopic dermatitis comorbidity (dupilumab is approved for AD)',
    drugScores: { dupilumab: 2 },
    condition: (p) => p.comorbidities.atopicDermatitis === 'yes',
  },

  // --- Smell loss severity ---
  {
    id: 'score-smell-loss-severe',
    label: 'Severe smell loss / anosmia (dupilumab evidence for smell recovery)',
    drugScores: { dupilumab: 1 },
    condition: (p) => p.clinicalHistory.smellLoss !== null && p.clinicalHistory.smellLoss >= 2,
  },

  // --- Dosing interval preference ---
  {
    id: 'score-dosing-q26w',
    label: 'Patient/physician preference for very long dosing interval (q26w — twice yearly)',
    drugScores: { depemokimab: 3 },
    condition: (p) => p.practicalFactors.dosingPreference === 'q26w',
  },
  {
    id: 'score-dosing-q4w',
    label: 'Preference for q4w dosing',
    drugScores: { omalizumab: 1, mepolizumab: 1 },
    condition: (p) => p.practicalFactors.dosingPreference === 'q4w',
  },

  // --- High disease burden: recurrent after surgery ---
  {
    id: 'score-ess-recurrence',
    label: 'Recurrence after prior ESS (disease burden supports biologic therapy)',
    drugScores: { dupilumab: 1, omalizumab: 1, mepolizumab: 1, depemokimab: 1 },
    condition: (p) =>
      p.clinicalHistory.priorESS === 'yes' && p.clinicalHistory.recurrenceAfterESS === 'yes',
  },

  // --- High steroid burden ---
  {
    id: 'score-steroid-burden',
    label: 'High systemic steroid burden (≥ 2 courses in past 2 years)',
    drugScores: { dupilumab: 1, omalizumab: 1, mepolizumab: 1, depemokimab: 1 },
    condition: (p) =>
      p.clinicalHistory.systemicSteroidCourses !== null &&
      p.clinicalHistory.systemicSteroidCourses >= 2,
  },
]
