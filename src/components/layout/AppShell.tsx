import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DisclaimerBanner from './DisclaimerBanner'
import contentVersion from '../../../content-version.json'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DisclaimerBanner />
      <header className="bg-brand-700 text-white px-6 py-3 flex items-center justify-between shadow-sm print:hidden">
        <Link to="/" className="text-lg font-semibold tracking-tight hover:text-brand-100 transition-colors">
          BiologicaIndication
          <span className="ml-2 text-sm font-normal text-brand-200">CRSwNP Biologic Selector</span>
        </Link>
        <span className="text-xs text-brand-300">Content v{contentVersion.version}</span>
      </header>
      <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
        {children}
      </main>
      <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-200 print:hidden">
        For physician use only. Not a medical device. Content requires clinical review before clinical use.
        Content version: {contentVersion.version} ({contentVersion.date})
      </footer>
    </div>
  )
}
