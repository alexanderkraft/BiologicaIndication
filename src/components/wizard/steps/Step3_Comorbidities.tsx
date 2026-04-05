import type { ComorbidityProfile, YesNoUnknown } from '../../../types/patient'
import RadioGroup from '../fields/RadioGroup'
import TooltipLabel from '../fields/TooltipLabel'

const YNU_OPTIONS: { value: YesNoUnknown; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown' },
]

interface Props {
  value: ComorbidityProfile
  onChange: (v: ComorbidityProfile) => void
}

export default function Step3_Comorbidities({ value, onChange }: Props) {
  function update<K extends keyof ComorbidityProfile>(key: K, v: ComorbidityProfile[K]) {
    onChange({ ...value, [key]: v })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Asthma"
            tooltip="Physician-diagnosed asthma. Comorbid asthma in CRSwNP significantly influences biologic selection — dupilumab is approved for both conditions; IL-5 inhibitors also cover severe eosinophilic asthma."
          />
        </label>
        <RadioGroup
          name="asthma"
          value={value.asthma}
          options={YNU_OPTIONS}
          onChange={(v) => update('asthma', v)}
        />
      </div>

      {value.asthma === 'yes' && (
        <div className="space-y-1.5 ml-4 border-l-2 border-brand-100 pl-4">
          <label className="block">
            <TooltipLabel
              label="Asthma currently controlled"
              tooltip="Well-controlled asthma (ACQ ≤ 0.75 or GINA Step 1–2 with no exacerbations). Uncontrolled asthma may further support biologic initiation."
            />
          </label>
          <RadioGroup
            name="asthmaControlled"
            value={value.asthmaControlled}
            options={YNU_OPTIONS}
            onChange={(v) => update('asthmaControlled', v)}
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="NSAID-ERD / N-ERD"
            tooltip="NSAID-exacerbated respiratory disease (formerly Samter's triad): CRSwNP + asthma + NSAID hypersensitivity. This phenotype is associated with severe, recurrent CRSwNP. Dupilumab has evidence in N-ERD."
          />
        </label>
        <RadioGroup
          name="nsaidErd"
          value={value.nsaidErd}
          options={YNU_OPTIONS}
          onChange={(v) => update('nsaidErd', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Allergic rhinitis"
            tooltip="Physician-diagnosed IgE-mediated allergic rhinitis. Supports atopic phenotype; relevant for omalizumab."
          />
        </label>
        <RadioGroup
          name="allergicRhinitis"
          value={value.allergicRhinitis}
          options={YNU_OPTIONS}
          onChange={(v) => update('allergicRhinitis', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Atopic dermatitis"
            tooltip="Physician-diagnosed atopic dermatitis. Dupilumab is approved for both CRSwNP and atopic dermatitis — combination benefit is clinically relevant."
          />
        </label>
        <RadioGroup
          name="atopicDermatitis"
          value={value.atopicDermatitis}
          options={YNU_OPTIONS}
          onChange={(v) => update('atopicDermatitis', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-800">
          Other relevant comorbidities{' '}
          <span className="text-xs font-normal text-gray-500">(free text, optional)</span>
        </label>
        <textarea
          value={value.otherComorbidities}
          onChange={(e) => update('otherComorbidities', e.target.value)}
          placeholder="e.g. eosinophilic esophagitis, EGPA, food allergy, chronic urticaria..."
          rows={3}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>
    </div>
  )
}
