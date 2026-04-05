import type { WarningRule } from '../../types/rules'

export const warningRules: WarningRule[] = [
  {
    id: 'warn-pregnancy',
    severity: 'caution',
    message:
      'Pregnancy or pregnancy planning documented. All biologics in this list have limited human safety data during pregnancy. Discuss risk-benefit with the patient; involve obstetrics if needed.',
    condition: (p) => p.practicalFactors.pregnancyPlanning === 'yes',
  },
  {
    id: 'warn-pregnancy-omalizumab-note',
    severity: 'info',
    message:
      'Omalizumab has relatively more postmarketing pregnancy data available than other biologics in this class (EXPECT registry). This does not confirm safety. (ASSUMPTION — verify current label)',
    affectsDrugs: ['omalizumab'],
    condition: (p) => p.practicalFactors.pregnancyPlanning === 'yes',
  },
  {
    id: 'warn-prior-biologic-partial',
    severity: 'info',
    message:
      'Prior biologic trial(s) with partial response documented. Switching mechanism of action may be considered if partial response was insufficient.',
    condition: (p) =>
      p.clinicalHistory.priorBiologicTrials.some((t) => t.response === 'partial'),
  },
  {
    id: 'warn-adherence',
    severity: 'caution',
    message:
      'Adherence concerns noted. Consider a longer dosing interval option (e.g. depemokimab q26w) and discuss injection training.',
    condition: (p) => p.practicalFactors.adherenceConcerns === 'yes',
  },
  {
    id: 'warn-self-injection-not-feasible',
    severity: 'info',
    message:
      'Self-injection not feasible. All biologics in this selection require subcutaneous injection — administration in practice or at infusion center may be needed.',
    condition: (p) => p.practicalFactors.selfInjectionFeasible === 'no',
  },
  {
    id: 'warn-tezepelumab-regulatory',
    severity: 'caution',
    message:
      'Tezepelumab: CRSwNP approval status in the selected region could not be confirmed. This drug has been excluded from the ranked list pending regulatory verification.',
    affectsDrugs: ['tezepelumab'],
    condition: (_p) => true,
  },
]

export const missingDataRules = [
  {
    id: 'missing-eos',
    field: 'Blood eosinophils',
    impact:
      'Eosinophil count is missing — ranking of mepolizumab and depemokimab may be underestimated. Obtain differential blood count before finalising biologic selection.',
    isMissing: (p: Parameters<typeof warningRules[0]['condition']>[0]) =>
      p.biomarkers.bloodEosinophils === null,
  },
  {
    id: 'missing-ige',
    field: 'Total IgE',
    impact:
      'Total IgE is missing — ranking of omalizumab may be underestimated if IgE-mediated atopy is present. Obtain IgE and specific IgE / prick test before finalising.',
    isMissing: (p: Parameters<typeof warningRules[0]['condition']>[0]) =>
      p.biomarkers.totalIgE === null,
  },
  {
    id: 'missing-snot22',
    field: 'SNOT-22 score',
    impact:
      'SNOT-22 not documented. Validated symptom burden assessment supports treatment justification and outcome tracking.',
    isMissing: (p: Parameters<typeof warningRules[0]['condition']>[0]) =>
      p.clinicalHistory.snot22Score === null,
  },
  {
    id: 'missing-smell',
    field: 'Smell loss severity',
    impact:
      'Smell loss severity not specified. This influences dupilumab preference evidence.',
    isMissing: (p: Parameters<typeof warningRules[0]['condition']>[0]) =>
      p.clinicalHistory.smellLoss === null,
  },
  {
    id: 'missing-steroid-courses',
    field: 'Number of systemic steroid courses',
    impact:
      'Systemic steroid burden not quantified. This supports documentation of uncontrolled disease and biologic eligibility.',
    isMissing: (p: Parameters<typeof warningRules[0]['condition']>[0]) =>
      p.clinicalHistory.systemicSteroidCourses === null,
  },
]
