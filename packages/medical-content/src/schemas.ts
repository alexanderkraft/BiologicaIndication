import { z } from 'zod';

/**
 * Zod schema for validating a biologic entry in the medical content YAML.
 * Clinical content will be added in Phase 2 only after confirmation.
 */
export const BiologicEntrySchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  mechanismOfAction: z.string().min(1),
  approvedIndications: z.array(z.string()),
  contraindications: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

/**
 * Zod schema for validating a clinical rule in the medical content YAML.
 * Every rule MUST have a rationale_text field.
 */
export const ClinicalRuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  rationale_text: z.string().min(10),
  biologicId: z.string().min(1),
  direction: z.union([z.literal(1), z.literal(-1)]),
  weight: z.number().positive().default(1),
  conditions: z.array(z.string()),
});

/**
 * Zod schema for the medical content version metadata.
 */
export const MedicalContentVersionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+/),
  effectiveDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  checksum: z.string().min(1),
  description: z.string().optional(),
});

/**
 * Zod schema for the complete medical content YAML file.
 */
export const MedicalContentSchema = z.object({
  version: MedicalContentVersionSchema,
  biologics: z.array(BiologicEntrySchema).min(1),
  rules: z.array(ClinicalRuleSchema),
});

export type BiologicEntry = z.infer<typeof BiologicEntrySchema>;
export type ClinicalRule = z.infer<typeof ClinicalRuleSchema>;
export type MedicalContentVersion = z.infer<typeof MedicalContentVersionSchema>;
export type MedicalContent = z.infer<typeof MedicalContentSchema>;
