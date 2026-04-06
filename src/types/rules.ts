import type { BiologicId } from './biologic'
import type { PatientProfile } from './patient'

export interface ScoringRuleMatch {
  ruleId: string
  label: string
  scoreAdded: number
}

export interface ExclusionReason {
  ruleId: string
  reason: string
}

export interface WarningFlag {
  ruleId: string
  severity: 'caution' | 'info'
  message: string
}

export interface MissingDataFlag {
  field: string
  impact: string
}

export type EvalFn = (patient: PatientProfile) => boolean

export interface ScoringRule {
  id: string
  label: string
  drugScores: Partial<Record<BiologicId, number>>
  condition: EvalFn
}

export interface ExclusionRule {
  id: string
  drugs: BiologicId[]
  reason: string
  condition: EvalFn
}

export interface WarningRule {
  id: string
  severity: 'caution' | 'info'
  message: string
  condition: EvalFn
  affectsDrugs?: BiologicId[]
}

export interface MissingDataRule {
  id: string
  field: string
  impact: string
  isMissing: EvalFn
}
