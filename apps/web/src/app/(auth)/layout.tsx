import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

/**
 * Layout for authenticated routes.
 * Verifies session and redirects to login if not authenticated.
 *
 * @param children - The authenticated page content
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/login?returnTo=/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-clinical-primary text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">CRSwNP Support Tool</span>
          <span className="ml-3 text-xs text-blue-200 bg-blue-900 px-2 py-0.5 rounded">
            Clinical Decision Support
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-100">{session.user.email}</span>
          <a
            href="/api/auth/logout"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            Sign out
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-xs text-amber-800">
            <strong>Clinical Decision Support Tool</strong> — Shortlists provided are for
            informational purposes only and do not constitute medical recommendations. Clinical
            judgment remains the responsibility of the treating physician.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
