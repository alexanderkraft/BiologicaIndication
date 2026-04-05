import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import WizardShell from './components/wizard/WizardShell'
import ResultsPage from './components/results/ResultsPage'
import { PatientFormProvider } from './hooks/PatientFormProvider'

export default function App() {
  return (
    <BrowserRouter basename="/BiologicaIndication">
      <PatientFormProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<WizardShell />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </PatientFormProvider>
    </BrowserRouter>
  )
}
