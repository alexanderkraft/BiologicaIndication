import Link from 'next/link';

/**
 * New encounter creation page (Phase 4 placeholder).
 * The form will be implemented in Phase 4.
 */
export default function NewEncounterPage(): React.JSX.Element {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">New Encounter</h1>
        <p className="text-sm text-gray-500 mb-8">
          Patient encounter form — coming in Phase 4
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            🚧 <strong>Phase 4 placeholder</strong> — The patient encounter form will be
            implemented in Phase 4 after medical content is confirmed. No patient data can be
            entered until then.
          </p>
        </div>
      </div>
    </div>
  );
}
