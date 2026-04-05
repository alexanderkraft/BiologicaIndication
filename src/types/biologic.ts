import type { Region } from './patient'

export type BiologicId =
  | 'dupilumab'
  | 'omalizumab'
  | 'mepolizumab'
  | 'depemokimab'
  | 'tezepelumab'

export type ApprovalStatus = 'approved' | 'not_approved' | 'verify_required'
export type DosingInterval = 'q2w' | 'q4w' | 'q8w' | 'q26w'
export type EvidenceGrade = 'high' | 'moderate' | 'low' | 'assumption'

export interface RegionalApproval {
  region: Region
  status: ApprovalStatus
  indication: string
  note?: string
}

export interface BiologicProfile {
  id: BiologicId
  name: string
  mechanism: string
  target: string
  dosingInterval: DosingInterval
  administrationRoute: string
  approvalByRegion: RegionalApproval[]
  keyComorbidityBenefits: string[]
  cautions: string[]
  pregnancyData: string
  evidenceNotes: string
  evidenceGrade: EvidenceGrade
  contentVersion: string
}
