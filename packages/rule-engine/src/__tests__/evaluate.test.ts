import { describe, expect, it } from 'vitest';
import { evaluatePatientProfile } from '../evaluate';
import type { MedicalContentVersion, PatientProfileInput, RuleSet } from '../types';

const testContentVersion: MedicalContentVersion = {
  version: '0.0.1-test',
  effectiveDate: '2024-01-01',
  checksum: 'test-checksum',
};

const testRuleSet: RuleSet = {
  biologics: [
    { id: 'biologic-a', displayName: 'Biologic A', mechanismOfAction: 'Anti-IL-4Rα' },
    { id: 'biologic-b', displayName: 'Biologic B', mechanismOfAction: 'Anti-IL-5Rα' },
  ],
  rules: [
    {
      id: 'rule-eos-high',
      name: 'High eosinophils favour Biologic B',
      rationale_text:
        'Elevated blood eosinophil count (≥300 cells/µL) is associated with better response to anti-IL-5 therapies. [Test rule — not real clinical content]',
      biologicId: 'biologic-b',
      direction: 1,
      weight: 2,
      predicate: (p) => (p.biomarkers?.bloodEosinophilCount ?? 0) >= 300,
    },
    {
      id: 'rule-atopic-derm',
      name: 'Atopic dermatitis comorbidity favours Biologic A',
      rationale_text:
        'Concurrent atopic dermatitis is associated with better response to anti-IL-4Rα therapies. [Test rule — not real clinical content]',
      biologicId: 'biologic-a',
      direction: 1,
      weight: 3,
      predicate: (p) => p.comorbidities?.hasAtopicDermatitis === true,
    },
    {
      id: 'rule-prior-biologic-b',
      name: 'Prior Biologic B failure decreases score',
      rationale_text:
        'Documented lack of response to Biologic B warrants consideration of alternative mechanisms. [Test rule — not real clinical content]',
      biologicId: 'biologic-b',
      direction: -1,
      weight: 5,
      predicate: (p) => p.priorTreatment?.priorBiologics?.includes('biologic-b') === true,
    },
  ],
};

describe('evaluatePatientProfile', () => {
  it('returns a shortlist with all biologics', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-001',
      diseaseSeverity: 'severe',
    };

    const result = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    expect(result.shortlist).toHaveLength(2);
    expect(result.encounterRef).toBe('enc-001');
    expect(result.contentVersion).toEqual(testContentVersion);
    expect(result.rulesEvaluated).toBe(3);
  });

  it('ranks biologics by score in descending order', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-002',
      diseaseSeverity: 'severe',
      biomarkers: { bloodEosinophilCount: 500 },
      comorbidities: {
        hasAtopicDermatitis: true,
        hasAsthma: false,
        hasNSAIDExacerbatedRespiratoryDisease: false,
        hasAllergicRhinitis: false,
        hasChronicUrticaria: false,
        hasFoodAllergy: false,
        hasEosinophilicEsophagitis: false,
      },
    };

    const result = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    // Biologic A gets 3 (atopic derm), Biologic B gets 2 (high eos)
    expect(result.shortlist[0]?.biologicId).toBe('biologic-a');
    expect(result.shortlist[0]?.score).toBe(3);
    expect(result.shortlist[1]?.biologicId).toBe('biologic-b');
    expect(result.shortlist[1]?.score).toBe(2);
  });

  it('applies negative rules correctly', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-003',
      diseaseSeverity: 'moderate',
      biomarkers: { bloodEosinophilCount: 400 },
      priorTreatment: {
        hadPriorSurgery: false,
        hadSystemicCorticosteroids: false,
        hadTopicalCorticosteroids: true,
        priorBiologics: ['biologic-b'],
      },
    };

    const result = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    const biologicB = result.shortlist.find((b) => b.biologicId === 'biologic-b');
    // +2 from eos rule, -5 from prior failure = -3
    expect(biologicB?.score).toBe(-3);
  });

  it('is deterministic: same input produces same output structure', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-004',
      diseaseSeverity: 'severe',
      biomarkers: { bloodEosinophilCount: 350 },
    };

    const result1 = evaluatePatientProfile(input, testRuleSet, testContentVersion);
    const result2 = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    expect(result1.shortlist).toEqual(result2.shortlist);
    expect(result1.rulesEvaluated).toBe(result2.rulesEvaluated);
    expect(result1.encounterRef).toBe(result2.encounterRef);
  });

  it('returns all applied rules with rationale_text', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-005',
      diseaseSeverity: 'severe',
      biomarkers: { bloodEosinophilCount: 400 },
    };

    const result = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    const biologicB = result.shortlist.find((b) => b.biologicId === 'biologic-b');
    expect(biologicB?.appliedRules).toHaveLength(1);
    expect(biologicB?.appliedRules[0]?.rationale_text).toBeTruthy();
  });

  it('returns zero score when no rules apply', () => {
    const input: PatientProfileInput = {
      encounterRef: 'enc-006',
      diseaseSeverity: 'mild',
    };

    const result = evaluatePatientProfile(input, testRuleSet, testContentVersion);

    for (const biologic of result.shortlist) {
      expect(biologic.score).toBe(0);
      expect(biologic.appliedRules).toHaveLength(0);
    }
  });
});
