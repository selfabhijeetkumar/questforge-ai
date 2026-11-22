import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'

// Pages
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ScholarshipExplorerPage } from './pages/ScholarshipExplorerPage'
import { ScholarshipDetailPage } from './pages/ScholarshipDetailPage'
import { DocumentUploadPage } from './pages/DocumentUploadPage'
import { DocumentAnalysisPage } from './pages/DocumentAnalysisPage'
import { AuditResultsPage } from './pages/AuditResultsPage'
import { StudentDashboardPage } from './pages/StudentDashboardPage'
import { ReportPage } from './pages/ReportPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsPage } from './pages/TermsPage'
import { CookiePolicyPage } from './pages/CookiePolicyPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="scholarships" element={<ScholarshipExplorerPage />} />
          <Route path="scholarships/:id" element={<ScholarshipDetailPage />} />
          <Route path="upload" element={<DocumentUploadPage />} />
          <Route path="analysis" element={<DocumentAnalysisPage />} />
          <Route path="audit-results/:id" element={<AuditResultsPage />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="report/:id" element={<ReportPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="cookies" element={<CookiePolicyPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
