import type { RankedResult } from '../../types/results'
import { BIOLOGICS } from '../../data/biologics'

const CONFIDENCE_STYLE: Record<string, string> = {
  high: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  low: 'bg-gray-100 text-gray-600',
  insufficient: 'bg-red-100 text-red-700',
}

const RANK_STYLE: Record<string, string> = {
  Preferred: 'bg-brand-600 text-white',
  Suitable: 'bg-brand-100 text-brand-800',
  'Conditionally suitable': 'bg-gray-100 text-gray-700',
}

export default function BiologicCard({ result }: { result: RankedResult }) {
  const biologic = BIOLOGICS.find((b) => b.id === result.biologicId)
  if (!biologic) return null

  const approval = biologic.approvalByRegion.find(() => true) // shown generically

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-400">#{result.rank}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{biologic.name}</h3>
            <p className="text-xs text-gray-500">{biologic.mechanism}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${RANK_STYLE[result.rankLabel]}`}>
            {result.rankLabel}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CONFIDENCE_STYLE[result.confidenceLevel]}`}>
            {result.confidenceLevel} confidence
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* Rationale */}
        <div>
          <p className="text-sm text-gray-700">{result.rationale}</p>
        </div>

        {/* Score drivers */}
        {result.matchedRules.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Supporting factors
            </p>
            <ul className="space-y-0.5">
              {result.matchedRules.map((r) => (
                <li key={r.ruleId} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="text-brand-500 mt-0.5">+{r.scoreAdded}</span>
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Approval & dosing */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <span>
            <span className="font-medium">Dosing:</span> {biologic.dosingInterval} SC
          </span>
          {approval && (
            <span>
              <span className="font-medium">Approval ({approval.region}):</span>{' '}
              <span className={approval.status === 'approved' ? 'text-green-700' : 'text-amber-700'}>
                {approval.status === 'approved'
                  ? 'Approved for CRSwNP'
                  : approval.status === 'verify_required'
                    ? 'Regulatory check required'
                    : 'Not approved'}
              </span>
            </span>
          )}
        </div>

        {/* Drug-specific warnings */}
        {result.warnings.length > 0 && (
          <div className="space-y-1.5">
            {result.warnings.map((w) => (
              <div
                key={w.ruleId}
                className={`rounded p-2 text-xs ${
                  w.severity === 'caution'
                    ? 'bg-amber-50 border border-amber-200 text-amber-800'
                    : 'bg-blue-50 border border-blue-200 text-blue-800'
                }`}
              >
                <span className="font-semibold">{w.severity === 'caution' ? 'Caution: ' : 'Note: '}</span>
                {w.message}
              </div>
            ))}
          </div>
        )}

        {/* Evidence grade */}
        <div className="text-xs text-gray-400 italic">
          Evidence grade: {biologic.evidenceGrade} — {biologic.evidenceNotes}
        </div>
      </div>
    </div>
  )
}
