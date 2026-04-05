import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';

/**
 * Dashboard page — the main entry point after login.
 * Shows an empty state with a "New encounter" button.
 */
export default async function DashboardPage(): Promise<React.JSX.Element> {
  const session = await getSession();
  const userName = session?.user?.name ?? session?.user?.email ?? 'Physician';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome, {userName}</p>
        </div>
        <Link
          href="/encounter/new"
          className="flex items-center gap-2 px-4 py-2 bg-clinical-secondary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <span>+</span>
          New encounter
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="text-gray-400 text-5xl mb-4">📋</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No encounters yet</h2>
        <p className="text-sm text-gray-500 mb-6">
          Create a new encounter to start building a biologic shortlist for a patient case.
        </p>
        <Link
          href="/encounter/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-clinical-secondary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Start first encounter
        </Link>
      </div>
    </div>
  );
}
