import type { BiologicProfile } from '../../types/biologic'

const mepolizumab: BiologicProfile = {
  id: 'mepolizumab',
  name: 'Mepolizumab',
  mechanism: 'Anti-IL-5 monoclonal antibody (blocks IL-5 binding to its receptor)',
  target: 'IL-5',
  dosingInterval: 'q4w',
  administrationRoute: 'Subcutaneous injection',
  approvalByRegion: [
    {
      region: 'EU',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment in adults with inadequate response to intranasal corticosteroids',
      note: 'VERIFY: confirm current EU label status for CRSwNP',
    },
    {
      region: 'DE',
      status: 'approved',
      indication: 'As EU approval',
    },
    {
      region: 'US',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment',
      note: 'VERIFY: confirm US label approval for CRSwNP specifically',
    },
  ],
  keyComorbidityBenefits: [
    'Severe eosinophilic asthma (established indication)',
    'Eosinophilic granulomatosis with polyangiitis (EGPA)',
    'High blood eosinophil profile — IL-5 is central driver',
  ],
  cautions: [
    'Less evidence for non-eosinophilic phenotypes',
    'No established benefit for atopic dermatitis or IgE-mediated disease',
    'q4w dosing (comparable to omalizumab)',
  ],
  pregnancyData:
    'Limited human data. Animal studies showed no adverse developmental effects at clinical doses. Monoclonal IgG1 antibody; crosses placenta. Use only if benefit outweighs risk. (ASSUMPTION — verify current label)',
  evidenceNotes:
    'SYNAPSE trial in CRSwNP. Eosinophil-high subgroups showed clearer benefit. Threshold (≥150 vs ≥300/µL) for optimal response — VERIFY exact threshold used in label.',
  evidenceGrade: 'high',
  contentVersion: '0.1.0',
}

export default mepolizumab
