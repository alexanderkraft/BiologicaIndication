import type { PracticalFactors, Region, DosingPreference, YesNoUnknown } from '../../../types/patient'
import RadioGroup from '../fields/RadioGroup'
import TooltipLabel from '../fields/TooltipLabel'

const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: 'EU', label: 'EU (general)' },
  { value: 'DE', label: 'Germany (DE)' },
  { value: 'US', label: 'United States (US)' },
]

const DOSING_OPTIONS: { value: DosingPreference; label: string }[] = [
  { value: 'no_preference', label: 'No strong preference' },
  { value: 'q2w', label: 'q2w (every 2 weeks)' },
  { value: 'q4w', label: 'q4w (every 4 weeks)' },
  { value: 'q8w', label: 'q8w (every 8 weeks)' },
  { value: 'q26w', label: 'q26w (twice yearly — very long interval)' },
]

const YNU_OPTIONS: { value: YesNoUnknown; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
]

interface Props {
  value: PracticalFactors
  onChange: (v: PracticalFactors) => void
}

export default function Step4_PracticalFactors({ value, onChange }: Props) {
  function update<K extends keyof PracticalFactors>(key: K, v: PracticalFactors[K]) {
    onChange({ ...value, [key]: v })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Prescribing region"
            tooltip="Regulatory approval status of the biologics differs between EU (EMA), Germany, and the US (FDA). Select the relevant market to apply correct approval filters."
            required
          />
        </label>
        <RadioGroup
          name="region"
          value={value.region}
          options={REGION_OPTIONS}
          onChange={(v) => update('region', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Dosing interval preference"
            tooltip="Patient or physician preference for injection frequency. Depemokimab is the only option with twice-yearly (q26w) dosing. This preference will boost depemokimab's ranking score."
          />
        </label>
        <RadioGroup
          name="dosingPreference"
          value={value.dosingPreference}
          options={DOSING_OPTIONS}
          onChange={(v) => update('dosingPreference', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Self-injection feasible"
            tooltip="Can the patient self-administer subcutaneous injections after training? All biologics in this list require SC injection."
          />
        </label>
        <RadioGroup
          name="selfInjectionFeasible"
          value={value.selfInjectionFeasible}
          options={YNU_OPTIONS}
          onChange={(v) => update('selfInjectionFeasible', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Pregnancy or pregnancy planning"
            tooltip="Current pregnancy or active pregnancy planning. All biologics have limited human safety data in pregnancy. A warning will be added to all ranked drugs."
          />
        </label>
        <RadioGroup
          name="pregnancyPlanning"
          value={value.pregnancyPlanning}
          options={YNU_OPTIONS}
          onChange={(v) => update('pregnancyPlanning', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Adherence concerns"
            tooltip="Documented or anticipated difficulties with regular injection adherence (e.g. phlebophobia, irregular scheduling, complex lifestyle). Longer intervals may help."
          />
        </label>
        <RadioGroup
          name="adherenceConcerns"
          value={value.adherenceConcerns}
          options={YNU_OPTIONS}
          onChange={(v) => update('adherenceConcerns', v)}
        />
      </div>
    </div>
  )
}
