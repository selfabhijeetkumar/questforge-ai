import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  FileCheck2,
  ArrowRight,
  Compass,
  CheckCircle,
  HelpCircle,
  Database
} from 'lucide-react'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-navy-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <Badge variant="teal">Academic SEC Project</Badge>
            <span className="text-slate-300">Pre-Submission Verification Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Level Up Your Scholarship Application with <span className="text-brand-400">Deterministic Document Auditing</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            QuestForge AI helps students verify their scholarship application documents before final submission through official government and institutional portals. Detect missing documents, spot name or date inconsistencies, and review evidence-based recommendations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/scholarships">
              <Button size="lg" variant="primary" icon={Compass}>
                Explore Scholarships & Audit
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                About The Methodology
              </Button>
            </Link>
          </div>

          {/* Boundaries Disclaimer Banner */}
          <div className="border border-slate-800 bg-navy-900/60 rounded-lg p-4 text-xs text-slate-400 space-y-1">
            <div className="flex items-center space-x-2 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Independent Pre-Submission Assistant</span>
            </div>
            <p>
              QuestForge AI is a preparation and verification tool. It does not approve scholarships, guarantee eligibility, or replace official state or national scholarship submission portals.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem: Why Applications Get Rejected */}
      <section className="bg-navy-900/50 border-y border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">The Problem</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Why Scholarship Applications Face Administrative Rejection
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Many eligible students are disqualified during preliminary administrative scrutiny due to avoidable documentation errors rather than academic ineligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Missing Mandatory Documents</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applicants often overlook specific institutional requirements, such as current-year income certificates or registrar-signed bonafide letters, leading to immediate disqualification.
              </p>
            </Card>

            <Card className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Cross-Document Inconsistencies</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Slight variations in candidate name (such as initials versus full expansion) or conflicting dates of birth between identity records and marks cards cause verification flags.
              </p>
            </Card>

            <Card className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sky-950/80 border border-sky-800/80 flex items-center justify-center text-sky-400">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Eligibility Threshold Violations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applying to schemes without verifying family income ceilings or minimum qualifying percentages results in wasted application cycles and administrative rejection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How QuestForge AI Works (4-Step Pipeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Verification Pipeline</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            How The Document Readiness Audit Works
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            A structured, 4-step workflow combining optical character recognition, structured extraction, and deterministic rule validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-navy-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="text-xs font-mono font-bold text-brand-400">STEP 01</div>
            <h3 className="text-sm font-semibold text-white">Select Scholarship</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Choose from supported programs to load configured mandatory document checklists and eligibility criteria.
            </p>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="text-xs font-mono font-bold text-brand-400">STEP 02</div>
            <h3 className="text-sm font-semibold text-white">Ingest Documents</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload PDF or image files. Text is extracted securely via digital PDF parsing and Tesseract OCR engine.
            </p>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="text-xs font-mono font-bold text-brand-400">STEP 03</div>
            <h3 className="text-sm font-semibold text-white">Run Audit Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deterministic rules verify document completeness and compare student entities across records using fuzzy matching.
            </p>
          </div>

          <div className="bg-navy-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="text-xs font-mono font-bold text-brand-400">STEP 04</div>
            <h3 className="text-sm font-semibold text-white">Review & Action</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inspect findings linked to official guidelines, obtain corrective recommendations, and export a readiness report.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link to="/scholarships">
            <Button variant="primary" icon={ArrowRight}>
              Browse Scholarships To Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Verification Features */}
      <section className="bg-navy-900/40 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">Capabilities</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Evidence-Based Verification Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-navy-900 border border-slate-800">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Mandatory Document Completeness</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates uploaded files against configured required categories and pinpoints exactly which mandatory certifications are missing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-navy-900 border border-slate-800">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Cross-Record Name Consistency</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compares names across identity records, marks cards, and income certificates, flagging abbreviation or spelling variations for manual review.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-navy-900 border border-slate-800">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Date of Birth Normalization</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Normalizes multiple regional date formats into standardized ISO formats to detect discrepancies between school records and national IDs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-navy-900 border border-slate-800">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Actionable Corrective Guidance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every finding provides an explanation, citation to the relevant scholarship guideline, and concrete steps to resolve the issue before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
