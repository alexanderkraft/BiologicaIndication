import type { BiologicProfile } from '../../types/biologic'

const omalizumab: BiologicProfile = {
  id: 'omalizumab',
  name: 'Omalizumab',
  mechanism: 'Anti-IgE monoclonal antibody (binds free IgE, downregulates FcεRI)',
  target: 'IgE',
  dosingInterval: 'q4w',
  administrationRoute: 'Subcutaneous injection',
  approvalByRegion: [
    {
      region: 'EU',
      status: 'approved',
      indication: 'CRSwNP as add-on therapy for adults with inadequate response to intranasal corticosteroids',
    },
    {
      region: 'DE',
      status: 'approved',
      indication: 'As EU approval',
    },
    {
      region: 'US',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment in adults',
    },
  ],
  keyComorbidityBenefits: [
    'Allergic asthma (established indication; particularly relevant for IgE-mediated phenotype)',
    'Chronic spontaneous urticaria (separate approved indication)',
    'Allergic rhinitis / atopic sensitization — omalizumab targets IgE pathway directly',
  ],
  cautions: [
    'Dosing requires IgE level and body weight — confirm dose calculation per label',
    'Less evidence for non-atopic / non-IgE CRSwNP phenotypes',
    'q4w administration in clinic or after training for self-injection',
  ],
  pregnancyData:
    'Relatively more data available compared to newer biologics due to longer postmarketing experience. Registry data available (EXPECT registry). Still limited human safety data; use only if clearly needed. (ASSUMPTION — verify current label)',
  evidenceNotes:
    'POLYP 1 and POLYP 2 trials. Effect in non-atopic patients was smaller. IgE ≥ 30 IU/mL and atopic sensitization associated with better response.',
  evidenceGrade: 'high',
  contentVersion: '0.1.0',
}

export default omalizumab
