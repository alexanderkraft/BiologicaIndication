import type { BiologicProfile } from '../../types/biologic'

const depemokimab: BiologicProfile = {
  id: 'depemokimab',
  name: 'Depemokimab',
  mechanism: 'Ultra-long-acting anti-IL-5 monoclonal antibody',
  target: 'IL-5',
  dosingInterval: 'q26w',
  administrationRoute: 'Subcutaneous injection',
  approvalByRegion: [
    {
      region: 'EU',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment in adults — twice-yearly dosing (q26w)',
      note: 'VERIFY: confirm current EU label status',
    },
    {
      region: 'DE',
      status: 'approved',
      indication: 'As EU approval',
      note: 'VERIFY: confirm DE market availability',
    },
    {
      region: 'US',
      status: 'verify_required',
      indication: 'VERIFY: US CRSwNP approval status for depemokimab not confirmed',
    },
  ],
  keyComorbidityBenefits: [
    'Severe eosinophilic asthma (established indication)',
    'High eosinophil profile — same IL-5 target as mepolizumab',
    'Patients with adherence concerns or strong preference for infrequent dosing (twice yearly)',
  ],
  cautions: [
    'Newer agent — postmarketing experience more limited than older IL-5 inhibitors',
    'US approval status for CRSwNP must be verified before selecting for US patients',
    'Same class as mepolizumab — may not be preferred after mepolizumab failure',
  ],
  pregnancyData:
    'Very limited human data. Newer agent. Animal data: no adverse developmental effects observed at clinical exposures. Monoclonal IgG4 antibody. Use only if clearly indicated. (ASSUMPTION — verify label)',
  evidenceNotes:
    'ANCHOR-1 and ANCHOR-2 trials (severe eosinophilic asthma). CRSwNP trial data — VERIFY which trials support the CRSwNP indication. Twice-yearly dosing is the key differentiator.',
  evidenceGrade: 'moderate',
  contentVersion: '0.1.0',
}

export default depemokimab
