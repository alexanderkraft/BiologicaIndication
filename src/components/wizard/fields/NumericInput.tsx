interface Props {
  value: number | null
  onChange: (v: number | null) => void
  placeholder?: string
  min?: number
  max?: number
  unit?: string
}

export default function NumericInput({ value, onChange, placeholder, min, max, unit }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value ?? ''}
        min={min}
        max={max}
        placeholder={placeholder ?? '—'}
        onChange={(e) => {
          const v = e.target.value
          onChange(v === '' ? null : Number(v))
        }}
        className="w-32 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
      {unit && <span className="text-sm text-gray-500">{unit}</span>}
    </div>
  )
}
