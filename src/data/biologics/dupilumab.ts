import type { BiologicProfile } from '../../types/biologic'

const dupilumab: BiologicProfile = {
  id: 'dupilumab',
  name: 'Dupilumab',
  mechanism: 'IL-4Rα inhibitor (blocks IL-4 and IL-13 signalling)',
  target: 'IL-4Rα',
  dosingInterval: 'q2w',
  administrationRoute: 'Subcutaneous injection',
  approvalByRegion: [
    {
      region: 'EU',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment for adults with inadequate response to intranasal corticosteroids',
    },
    {
      region: 'DE',
      status: 'approved',
      indication: 'As EU approval; DSGVO-compliant prescribing applies',
    },
    {
      region: 'US',
      status: 'approved',
      indication: 'CRSwNP as add-on maintenance treatment in adults',
    },
  ],
  keyComorbidityBenefits: [
    'Asthma (approved indication; addresses upper and lower airway type-2 inflammation simultaneously)',
    'Atopic dermatitis (approved indication)',
    'N-ERD / NSAID-ERD (evidence of benefit in this phenotype)',
    'Eosinophilic esophagitis (separate indication in some regions)',
  ],
  cautions: [
    'Conjunctivitis reported more frequently than with other biologics',
    'Injection site reactions possible',
    'q2w self-injection — higher injection burden compared to longer-interval options',
  ],
  pregnancyData:
    'Limited human data. Animal studies showed no direct harm. Monoclonal IgG antibodies cross the placenta. Use only if benefit outweighs risk; discuss with patient. (ASSUMPTION — verify current label)',
  evidenceNotes:
    'SINUS-24 and SINUS-52 trials demonstrated significant reduction in nasal polyp score and symptom burden. Smell recovery has been reported (ASSUMPTION: verify evidence grade).',
  evidenceGrade: 'high',
  contentVersion: '0.1.0',
}

export default dupilumab
