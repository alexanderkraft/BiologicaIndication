interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  name: string
  value: T
  options: Option<T>[]
  onChange: (v: T) => void
}

export default function RadioGroup<T extends string>({ name, value, options, onChange }: Props<T>) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-brand-600"
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
