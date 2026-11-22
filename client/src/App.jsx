import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'

// Code-split pages via React.lazy for optimal chunk distribution & fast initial paint
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ScholarshipExplorerPage = lazy(() => import('./pages/ScholarshipExplorerPage').then(m => ({ default: m.ScholarshipExplorerPage })))
const ScholarshipDetailPage = lazy(() => import('./pages/ScholarshipDetailPage').then(m => ({ default: m.ScholarshipDetailPage })))
const DocumentUploadPage = lazy(() => import('./pages/DocumentUploadPage').then(m => ({ default: m.DocumentUploadPage })))
const DocumentAnalysisPage = lazy(() => import('./pages/DocumentAnalysisPage').then(m => ({ default: m.DocumentAnalysisPage })))
const AuditResultsPage = lazy(() => import('./pages/AuditResultsPage').then(m => ({ default: m.AuditResultsPage })))
const StudentDashboardPage = lazy(() => import('./pages/StudentDashboardPage').then(m => ({ default: m.StudentDashboardPage })))
const ReportPage = lazy(() => import('./pages/ReportPage').then(m => ({ default: m.ReportPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })))
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border border-teal-500/10 border-b-teal-400 animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      <p className="text-xs font-mono tracking-widest text-slate-400 uppercase animate-pulse">Initializing Viewport...</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  )
}
