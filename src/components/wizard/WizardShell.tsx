import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatientForm } from '../../hooks/usePatientForm'
import Step1_ClinicalHistory from './steps/Step1_ClinicalHistory'
import Step2_Biomarkers from './steps/Step2_Biomarkers'
import Step3_Comorbidities from './steps/Step3_Comorbidities'
import Step4_PracticalFactors from './steps/Step4_PracticalFactors'

const STEPS = [
  { label: 'Clinical History', number: 1 },
  { label: 'Biomarkers', number: 2 },
  { label: 'Comorbidities', number: 3 },
  { label: 'Practical Factors', number: 4 },
]

export default function WizardShell() {
  const [step, setStep] = useState(0)
  const { patient, setPatient, generateResults } = usePatientForm()
  const navigate = useNavigate()

  function handleSubmit() {
    generateResults()
    navigate('/results')
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <nav className="flex items-center gap-2 print:hidden">
        {STEPS.map((s, i) => (
          <button
            key={s.number}
            type="button"
            onClick={() => setStep(i)}
            className={[
              'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
              i === step
                ? 'bg-brand-600 text-white'
                : i < step
                  ? 'bg-brand-100 text-brand-700 hover:bg-brand-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
            ].join(' ')}
          >
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border border-current">
              {s.number}
            </span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Step title */}
      <div className="border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Step {step + 1}: {STEPS[step].label}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {step === 0 && 'Enter patient clinical history relevant to CRSwNP and prior therapy.'}
          {step === 1 && 'Enter available biomarker results. Missing values will be flagged.'}
          {step === 2 && 'Document relevant comorbidities affecting biologic selection.'}
          {step === 3 && 'Specify practical and regional factors for final recommendation.'}
        </p>
      </div>

      {/* Step content */}
      <div>
        {step === 0 && (
          <Step1_ClinicalHistory
            value={patient.clinicalHistory}
            onChange={(v) => setPatient({ ...patient, clinicalHistory: v })}
          />
        )}
        {step === 1 && (
          <Step2_Biomarkers
            value={patient.biomarkers}
            onChange={(v) => setPatient({ ...patient, biomarkers: v })}
          />
        )}
        {step === 2 && (
          <Step3_Comorbidities
            value={patient.comorbidities}
            onChange={(v) => setPatient({ ...patient, comorbidities: v })}
          />
        )}
        {step === 3 && (
          <Step4_PracticalFactors
            value={patient.practicalFactors}
            onChange={(v) => setPatient({ ...patient, practicalFactors: v })}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200 print:hidden">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="px-5 py-2 rounded bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
          >
            Generate Recommendations
          </button>
        )}
      </div>
    </div>
  )
}
