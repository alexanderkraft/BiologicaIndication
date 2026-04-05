import Link from 'next/link';

/**
 * Landing page / login redirect.
 * Physicians are prompted to log in via Auth0.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-clinical-primary">CRSwNP</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            Biologic Selection Support Tool
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            This tool produces explainable shortlists of biologic considerations for patients with
            chronic rhinosinusitis with nasal polyposis (CRSwNP). It does not make treatment
            decisions.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800 font-medium">
            ⚠️ For healthcare professionals only. Not a substitute for clinical judgment.
          </p>
        </div>

        <div>
          <Link
            href="/api/auth/login?returnTo=/dashboard"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-clinical-secondary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign in with institutional account
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400">
          Secure login via Auth0. Session expires after 60 minutes.
        </p>
      </div>
    </main>
  );
}
