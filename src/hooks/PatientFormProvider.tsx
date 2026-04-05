import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { PatientProfile } from '../types/patient'
import { emptyPatientProfile } from '../types/patient'
import type { RecommendationOutput } from '../types/results'
import { runRuleEngine } from '../engine/ruleEngine'
import { PatientFormContext } from './usePatientForm'

export function PatientFormProvider({ children }: { children: ReactNode }) {
  const [patient, setPatient] = useState<PatientProfile>(emptyPatientProfile)
  const [result, setResult] = useState<RecommendationOutput | null>(null)

  const generateResults = useCallback((): RecommendationOutput => {
    const r = runRuleEngine(patient)
    setResult(r)
    return r
  }, [patient])

  const reset = useCallback(() => {
    setPatient(emptyPatientProfile())
    setResult(null)
  }, [])

  return (
    <PatientFormContext.Provider value={{ patient, result, setPatient, generateResults, reset }}>
      {children}
    </PatientFormContext.Provider>
  )
}
