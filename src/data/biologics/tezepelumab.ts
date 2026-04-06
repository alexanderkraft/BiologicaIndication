import type { BiologicProfile } from '../../types/biologic'

const tezepelumab: BiologicProfile = {
  id: 'tezepelumab',
  name: 'Tezepelumab',
  mechanism: 'Anti-TSLP monoclonal antibody (blocks thymic stromal lymphopoietin)',
  target: 'TSLP',
  dosingInterval: 'q4w',
  administrationRoute: 'Subcutaneous injection',
  approvalByRegion: [
    {
      region: 'EU',
      status: 'verify_required',
      indication: 'VERIFY: EU approval for CRSwNP not confirmed — approved for severe asthma; CRSwNP indication requires regulatory confirmation',
    },
    {
      region: 'DE',
      status: 'verify_required',
      indication: 'VERIFY: As EU — confirm CRSwNP-specific approval in DE market',
    },
    {
      region: 'US',
      status: 'verify_required',
      indication: 'VERIFY: US approval for CRSwNP not confirmed — approved for severe asthma; CRSwNP indication must be verified',
    },
  ],
  keyComorbidityBenefits: [
    'Severe asthma regardless of eosinophil count (broad mechanism upstream of type-2 cascade)',
    'Potential benefit in non-eosinophilic or mixed-type inflammation (TSLP acts upstream)',
  ],
  cautions: [
    'CRSwNP approval must be confirmed per region before considering — do not assume approval',
    'If not locally approved for CRSwNP, off-label use requires explicit informed consent and documentation',
    'Less direct evidence for eosinophil-high CRSwNP compared to IL-5 inhibitors',
  ],
  pregnancyData:
    'Limited human data. Animal studies showed no adverse effects. Monoclonal IgG2 antibody. Use only if clearly indicated. (ASSUMPTION — verify label)',
  evidenceNotes:
    'Approved for severe uncontrolled asthma (NAVIGATOR trial). CRSwNP trials are ongoing or limited — VERIFY which evidence exists for CRSwNP and confirm regulatory status before recommending.',
  evidenceGrade: 'assumption',
  contentVersion: '0.1.0',
}

export default tezepelumab
