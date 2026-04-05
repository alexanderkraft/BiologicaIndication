import { createContext, useContext } from 'react'
import type { PatientProfile } from '../types/patient'
import type { RecommendationOutput } from '../types/results'

export interface PatientFormContextValue {
  patient: PatientProfile
  result: RecommendationOutput | null
  setPatient: (p: PatientProfile) => void
  generateResults: () => RecommendationOutput
  reset: () => void
}

export const PatientFormContext = createContext<PatientFormContextValue | null>(null)

export function usePatientForm(): PatientFormContextValue {
  const ctx = useContext(PatientFormContext)
  if (!ctx) throw new Error('usePatientForm must be used within PatientFormProvider')
  return ctx
}
