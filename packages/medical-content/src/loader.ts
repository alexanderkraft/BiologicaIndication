import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { MedicalContentSchema } from './schemas';
import type { MedicalContent } from './schemas';

/**
 * Loads and validates medical content from a YAML file.
 * 
 * IMPORTANT: Do not call this with placeholder or invented content.
 * Only call with confirmed clinical content from Phase 2.
 *
 * @param filePath - Absolute path to the YAML content file
 * @returns Parsed and validated medical content
 * @throws Error if the file cannot be read or fails Zod validation
 */
export function loadMedicalContent(filePath: string): MedicalContent {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = yaml.load(raw);
  const result = MedicalContentSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(
      `Invalid medical content at ${filePath}: ${result.error.issues.map((i) => i.message).join(', ')}`,
    );
  }

  return result.data;
}
