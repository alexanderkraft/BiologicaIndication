import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRSwNP Biologic Selection Support Tool',
  description:
    'A physician-facing tool for producing explainable shortlists of biologic considerations for CRSwNP patients. This tool does not make treatment decisions.',
};

/**
 * Root application layout.
 * Wraps the app with Auth0 UserProvider for client-side session access.
 *
 * @param children - The page content to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
