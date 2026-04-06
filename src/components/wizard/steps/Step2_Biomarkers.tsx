import type { BiomarkerProfile, YesNoUnknown } from '../../../types/patient'
import RadioGroup from '../fields/RadioGroup'
import NumericInput from '../fields/NumericInput'
import TooltipLabel from '../fields/TooltipLabel'

const YNU_OPTIONS: { value: YesNoUnknown; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unknown', label: 'Unknown / not documented' },
]

interface Props {
  value: BiomarkerProfile
  onChange: (v: BiomarkerProfile) => void
}

export default function Step2_Biomarkers({ value, onChange }: Props) {
  function update<K extends keyof BiomarkerProfile>(key: K, v: BiomarkerProfile[K]) {
    onChange({ ...value, [key]: v })
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">
        Missing biomarker values will be flagged as data gaps in the recommendation output.
        Enter what is available; unknown values are acceptable.
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Blood eosinophils"
            tooltip="Peripheral blood eosinophil count from recent differential blood count. Typically reported as ×10⁶/L or cells/µL (same value). Enter the most recent value. Threshold of clinical relevance: ≥150/µL (moderate) and ≥300/µL (high) per common guidelines — VERIFY exact thresholds in the applicable label."
          />
        </label>
        <NumericInput
          value={value.bloodEosinophils}
          onChange={(v) => update('bloodEosinophils', v)}
          placeholder="e.g. 350"
          min={0}
          max={5000}
          unit="cells/µL"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Total IgE"
            tooltip="Total serum IgE in IU/mL. Relevant for omalizumab dose calculation and for characterising atopic phenotype. Also relevant if IgE is used to confirm atopy. Note: very high IgE may complicate omalizumab dosing."
          />
        </label>
        <NumericInput
          value={value.totalIgE}
          onChange={(v) => update('totalIgE', v)}
          placeholder="e.g. 120"
          min={0}
          max={10000}
          unit="IU/mL"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Atopic sensitization"
            tooltip="Evidence of IgE-mediated sensitization to at least one aeroallergen (positive skin prick test or specific IgE). Supports IgE-mediated phenotype and relevance of omalizumab."
          />
        </label>
        <RadioGroup
          name="atopicSensitization"
          value={value.atopicSensitization}
          options={YNU_OPTIONS}
          onChange={(v) => update('atopicSensitization', v)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block">
          <TooltipLabel
            label="Type-2 inflammation indicators present"
            tooltip="Clinical or laboratory evidence suggesting type-2 inflammation: elevated eosinophils, elevated IgE, atopic comorbidities, positive response to corticosteroids. This field captures overall clinical impression when specific values are unavailable."
          />
        </label>
        <RadioGroup
          name="type2Indicators"
          value={value.type2Indicators}
          options={YNU_OPTIONS}
          onChange={(v) => update('type2Indicators', v)}
        />
      </div>
    </div>
  )
}
