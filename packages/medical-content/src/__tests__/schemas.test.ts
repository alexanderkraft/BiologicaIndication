import { describe, expect, it } from 'vitest';
import { MedicalContentSchema, ClinicalRuleSchema, BiologicEntrySchema } from '../schemas';

describe('BiologicEntrySchema', () => {
  it('validates a valid biologic entry', () => {
    const result = BiologicEntrySchema.safeParse({
      id: 'test-biologic',
      displayName: 'Test Biologic',
      mechanismOfAction: 'Anti-test pathway',
      approvedIndications: ['CRSwNP'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const result = BiologicEntrySchema.safeParse({ id: 'test' });
    expect(result.success).toBe(false);
  });
});

describe('ClinicalRuleSchema', () => {
  it('validates a valid rule with rationale_text', () => {
    const result = ClinicalRuleSchema.safeParse({
      id: 'rule-001',
      name: 'Test rule',
      rationale_text: 'This is a test rationale of sufficient length.',
      biologicId: 'test-biologic',
      direction: 1,
      weight: 2,
      conditions: ['eosinophilCount >= 300'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects rules without rationale_text', () => {
    const result = ClinicalRuleSchema.safeParse({
      id: 'rule-002',
      name: 'Missing rationale',
      biologicId: 'test-biologic',
      direction: 1,
      conditions: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects rules with invalid direction', () => {
    const result = ClinicalRuleSchema.safeParse({
      id: 'rule-003',
      name: 'Bad direction',
      rationale_text: 'Test rationale text that is long enough.',
      biologicId: 'test-biologic',
      direction: 0,
      conditions: [],
    });
    expect(result.success).toBe(false);
  });
});

describe('MedicalContentSchema', () => {
  it('validates complete valid content', () => {
    const result = MedicalContentSchema.safeParse({
      version: {
        version: '1.0.0',
        effectiveDate: '2024-01-01',
        checksum: 'abc123',
      },
      biologics: [
        {
          id: 'biologic-a',
          displayName: 'Biologic A',
          mechanismOfAction: 'Anti-IL-4Rα',
          approvedIndications: ['CRSwNP'],
        },
      ],
      rules: [
        {
          id: 'rule-001',
          name: 'Test rule',
          rationale_text: 'Test rationale for clinical rule validation.',
          biologicId: 'biologic-a',
          direction: 1,
          conditions: [],
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects content with no biologics', () => {
    const result = MedicalContentSchema.safeParse({
      version: { version: '1.0.0', effectiveDate: '2024-01-01', checksum: 'abc123' },
      biologics: [],
      rules: [],
    });
    expect(result.success).toBe(false);
  });
});
