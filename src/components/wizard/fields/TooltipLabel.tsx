import { useState } from 'react'

interface Props {
  label: string
  tooltip: string
  required?: boolean
}

export default function TooltipLabel({ label, tooltip, required }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <span className="inline-flex items-center gap-1">
      <span className="font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      <button
        type="button"
        className="text-brand-500 hover:text-brand-700 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Definition for ${label}`}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <span className="absolute z-10 mt-1 w-64 rounded border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-lg">
          {tooltip}
        </span>
      )}
    </span>
  )
}
