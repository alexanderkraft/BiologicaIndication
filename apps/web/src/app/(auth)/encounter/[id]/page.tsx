import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Encounter detail / recommendation view page (Phase 5 placeholder).
 * The recommendation view will be implemented in Phase 5.
 *
 * @param params - Route parameters containing the encounter ID (Promise in Next.js 15+)
 */
export default async function EncounterDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { id } = await params;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Encounter {id}</h1>
        <p className="text-sm text-gray-500 mb-8">
          Biologic shortlist view — coming in Phase 5
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            🚧 <strong>Phase 5 placeholder</strong> — The biologic shortlist view will be
            implemented in Phase 5 after the rule engine is integrated with confirmed medical
            content.
          </p>
        </div>
      </div>
    </div>
  );
}
