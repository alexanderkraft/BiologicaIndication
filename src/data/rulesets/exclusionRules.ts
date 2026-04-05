import type { ExclusionRule } from '../../types/rules'

export const exclusionRules: ExclusionRule[] = [
  {
    id: 'excl-tezepelumab-not-approved-eu',
    drugs: ['tezepelumab'],
    reason:
      'Tezepelumab does not have confirmed approval for CRSwNP in the EU/DE. Regulatory status must be verified before prescribing.',
    condition: (p) =>
      (p.practicalFactors.region === 'EU' || p.practicalFactors.region === 'DE'),
  },
  {
    id: 'excl-tezepelumab-not-approved-us',
    drugs: ['tezepelumab'],
    reason:
      'Tezepelumab does not have confirmed approval for CRSwNP in the US. Regulatory status must be verified before prescribing.',
    condition: (p) => p.practicalFactors.region === 'US',
  },
  {
    id: 'excl-depemokimab-not-approved-us',
    drugs: ['depemokimab'],
    reason:
      'Depemokimab approval for CRSwNP in the US has not been confirmed. Regulatory status must be verified.',
    condition: (p) => p.practicalFactors.region === 'US',
  },
  {
    id: 'excl-prior-failure-dupilumab',
    drugs: ['dupilumab'],
    reason:
      'Prior dupilumab use with no response or adverse event documented. Same agent generally not re-started without specific clinical rationale.',
    condition: (p) =>
      p.clinicalHistory.priorBiologicTrials.some(
        (t) => t.drug === 'dupilumab' && (t.response === 'none' || t.response === 'adverse'),
      ),
  },
  {
    id: 'excl-prior-failure-omalizumab',
    drugs: ['omalizumab'],
    reason:
      'Prior omalizumab use with no response or adverse event documented.',
    condition: (p) =>
      p.clinicalHistory.priorBiologicTrials.some(
        (t) => t.drug === 'omalizumab' && (t.response === 'none' || t.response === 'adverse'),
      ),
  },
  {
    id: 'excl-prior-failure-mepolizumab',
    drugs: ['mepolizumab'],
    reason:
      'Prior mepolizumab use with no response or adverse event documented.',
    condition: (p) =>
      p.clinicalHistory.priorBiologicTrials.some(
        (t) => t.drug === 'mepolizumab' && (t.response === 'none' || t.response === 'adverse'),
      ),
  },
  {
    id: 'excl-prior-failure-depemokimab',
    drugs: ['depemokimab'],
    reason:
      'Prior depemokimab use with no response or adverse event documented.',
    condition: (p) =>
      p.clinicalHistory.priorBiologicTrials.some(
        (t) => t.drug === 'depemokimab' && (t.response === 'none' || t.response === 'adverse'),
      ),
  },
]
