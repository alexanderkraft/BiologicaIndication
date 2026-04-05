import type { ClinicalHistory, PriorBiologicTrial, YesNoUnknown, SeverityLevel } from '../../../types/patient'
import RadioGroup from '../fields/RadioGroup'
import NumericInput from '../fields/NumericInput'
import TooltipLabel from '../fields/TooltipLabel'

const YNU_OPTIONS: { value: YesNoUnknown; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown / not documented' },
]

const SEVERITY_OPTIONS: { value: SeverityLevel; label: string }[] = [
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe / uncontrolled' },
  { value: 'unknown', label: 'Unknown' },
]

const SMELL_OPTIONS = [
  { value: 0 as const, label: 'None' },
  { value: 1 as const, label: 'Mild' },
  { value: 2 as const, label: 'Moderate' },
  { value: 3 as const, label: 'Severe / anosmia' },
]

const DRUG_OPTIONS = [
  { value: 'dupilumab', label: 'Dupilumab' },
  { value: 'omalizumab', label: 'Omalizumab' },
  { value: 'mepolizumab', label: 'Mepolizumab' },
  { value: 'depemokimab', label: 'Depemokimab' },
  { value: 'tezepelumab', label: 'Tezepelumab' },
  { value: 'other', label: 'Other' },
]

const RESPONSE_OPTIONS: { value: PriorBiologicTrial['response']; label: string }[] = [
  { value: 'good', label: 'Good response' },
  { value: 'partial', label: 'Partial response' },
  { value: 'none', label: 'No response' },
  { value: 'adverse', label: 'Adverse event / stopped' },
]

interface Props {
  value: ClinicalHistory
  onChange: (v: ClinicalHistory) => void
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>
}

export default function Step1_ClinicalHistory({ value, onChange }: Props) {
  function update<K extends keyof ClinicalHistory>(key: K, v: ClinicalHistory[K]) {
    onChange({ ...value, [key]: v })
  }

  function addTrial() {
    update('priorBiologicTrials', [
      ...value.priorBiologicTrials,
      { drug: 'dupilumab', response: 'none' },
    ])
  }

  function removeTrial(i: number) {
    update(
      'priorBiologicTrials',
      value.priorBiologicTrials.filter((_, idx) => idx !== i),
    )
  }

  function updateTrial(i: number, partial: Partial<PriorBiologicTrial>) {
    const trials = value.priorBiologicTrials.map((t, idx) =>
      idx === i ? { ...t, ...partial } : t,
    )
    update('priorBiologicTrials', trials)
  }

  return (
    <div className="space-y-6">
      <Field>
        <label className="block">
          <TooltipLabel
            label="CRSwNP diagnosis confirmed"
            tooltip="Chronic rhinosinusitis with nasal polyposis confirmed by endoscopy and/or CT, with symptom duration ≥12 weeks."
            required
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.diagnosisConfirmed}
            onChange={(e) => update('diagnosisConfirmed', e.target.checked)}
            className="accent-brand-600"
          />
          <span className="text-sm text-gray-700">Confirmed</span>
        </label>
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="Disease severity / control status"
            tooltip="Severe / uncontrolled: persistent bilateral NPS ≥ 2, marked symptoms despite ≥4 weeks of intranasal corticosteroids, impact on quality of life."
            required
          />
        </label>
        <RadioGroup
          name="severity"
          value={value.severity}
          options={SEVERITY_OPTIONS}
          onChange={(v) => update('severity', v)}
        />
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="Prior intranasal corticosteroid (INCS) therapy"
            tooltip="Adequate INCS trial: at least 4 weeks of regular intranasal corticosteroid use at standard dose."
          />
        </label>
        <RadioGroup
          name="priorINCS"
          value={value.priorINCS}
          options={YNU_OPTIONS}
          onChange={(v) => update('priorINCS', v)}
        />
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="Systemic corticosteroid courses (past 2 years)"
            tooltip="Number of oral/systemic corticosteroid courses in the past 24 months. ≥2 courses is commonly used as a threshold for severe uncontrolled disease."
          />
        </label>
        <NumericInput
          value={value.systemicSteroidCourses}
          onChange={(v) => update('systemicSteroidCourses', v)}
          placeholder="e.g. 2"
          min={0}
          max={20}
          unit="courses"
        />
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="Prior endoscopic sinus surgery (ESS)"
            tooltip="At least one prior ESS performed for CRSwNP."
          />
        </label>
        <RadioGroup
          name="priorESS"
          value={value.priorESS}
          options={YNU_OPTIONS}
          onChange={(v) => update('priorESS', v)}
        />
      </Field>

      {value.priorESS === 'yes' && (
        <Field>
          <label className="block">
            <TooltipLabel
              label="Polyp recurrence after ESS"
              tooltip="Recurrence of nasal polyposis confirmed after prior sinus surgery."
            />
          </label>
          <RadioGroup
            name="recurrenceAfterESS"
            value={value.recurrenceAfterESS}
            options={YNU_OPTIONS}
            onChange={(v) => update('recurrenceAfterESS', v)}
          />
        </Field>
      )}

      <Field>
        <label className="block">
          <TooltipLabel
            label="Smell loss (hyposmia / anosmia)"
            tooltip="0 = no smell loss; 1 = mild; 2 = moderate; 3 = severe / complete loss (anosmia)."
          />
        </label>
        <div className="flex flex-wrap gap-3">
          {SMELL_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="smellLoss"
                value={opt.value}
                checked={(value.smellLoss ?? 0) === opt.value}
                onChange={() => update('smellLoss', opt.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="Nasal obstruction severity"
            tooltip="Patient-reported or clinician-assessed degree of nasal obstruction."
          />
        </label>
        <RadioGroup
          name="nasalObstruction"
          value={value.nasalObstruction}
          options={SEVERITY_OPTIONS}
          onChange={(v) => update('nasalObstruction', v)}
        />
      </Field>

      <Field>
        <label className="block">
          <TooltipLabel
            label="SNOT-22 score"
            tooltip="Sino-Nasal Outcome Test 22 — validated patient-reported outcome measure. Range 0–110. Higher = greater burden. Document if assessed."
          />
        </label>
        <NumericInput
          value={value.snot22Score}
          onChange={(v) => update('snot22Score', v)}
          placeholder="optional"
          min={0}
          max={110}
          unit="/ 110"
        />
      </Field>

      <div className="space-y-3">
        <label className="block font-medium text-gray-800">
          Prior biologic trials{' '}
          <span className="text-xs font-normal text-gray-500">(optional)</span>
        </label>
        {value.priorBiologicTrials.map((trial, i) => (
          <div key={i} className="flex flex-wrap gap-3 items-start rounded border border-gray-200 bg-gray-50 p-3">
            <div className="space-y-1 flex-1 min-w-[160px]">
              <label className="text-xs text-gray-500">Drug</label>
              <select
                value={trial.drug}
                onChange={(e) => updateTrial(i, { drug: e.target.value })}
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {DRUG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 flex-1 min-w-[160px]">
              <label className="text-xs text-gray-500">Response</label>
              <select
                value={trial.response}
                onChange={(e) =>
                  updateTrial(i, { response: e.target.value as PriorBiologicTrial['response'] })
                }
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {RESPONSE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => removeTrial(i)}
              className="mt-5 text-red-500 hover:text-red-700 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTrial}
          className="text-sm text-brand-600 hover:text-brand-800 font-medium"
        >
          + Add prior biologic trial
        </button>
      </div>
    </div>
  )
}
