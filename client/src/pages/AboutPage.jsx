import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Cpu, BookOpen, Layers, CheckCircle2, Lock } from 'lucide-react'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2">
          <Badge variant="teal">Skill Enhancement Course (SEC)</Badge>
          <span className="text-xs text-slate-400">Academic Project Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About QuestForge AI
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          QuestForge AI is an academic project designed to demonstrate the application of optical character recognition, natural language processing, and deterministic rule validation in higher education technology.
        </p>
      </div>

      {/* Core Mission & Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="System Mission & Purpose" className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            Scholarship application processes are often complex, requiring multiple official documents from diverse authorities. Students frequently face disqualification due to administrative documentation oversights such as missing affidavits, minor name spelling discrepancies, or expired certificates.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            QuestForge AI provides a pre-submission auditing environment where students can test their document package against configured requirements before submitting to official government or university portals.
          </p>
        </Card>

        <Card title="System Scope & Legal Boundaries" className="space-y-3">
          <div className="bg-amber-950/30 border border-amber-900/60 rounded-lg p-3 text-xs text-amber-200">
            <strong>Important Operational Notice:</strong>
            <p className="mt-1 text-slate-300">
              QuestForge AI is an advisory pre-screening platform. It does not possess authority to grant scholarships, determine official eligibility, or communicate with governmental awarding bodies.
            </p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All verification results are advisory suggestions intended to help students improve their application readiness and resolve documentation ambiguities prior to formal review.
          </p>
        </Card>
      </div>

      {/* Technical Stack Architecture */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">Architecture</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Technology Stack & Design Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <Layers className="w-4 h-4 text-brand-400" />
              <span>Frontend Architecture</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>React 18 with Vite for high performance</li>
              <li>Tailwind CSS for professional typography</li>
              <li>Lucide React for consistent icons</li>
              <li>React Router v6 for client routing</li>
              <li>Pure client-side responsive layout</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Backend & Ingestion</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Node.js and Express RESTful API</li>
              <li>Tesseract.js for scanned document OCR</li>
              <li>pdf-parse for digital text extraction</li>
              <li>Multer memory storage pipeline</li>
              <li>Deterministic fuzzy string matching</li>
            </ul>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Security & Privacy</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Zero public document exposure</li>
              <li>Strict Helmet security headers</li>
              <li>IP rate limiting on API endpoints</li>
              <li>File size and MIME validation</li>
              <li>No external tracking or marketing cookies</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Deterministic Audit vs AI Assistance */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-semibold text-white">
            Deterministic Rule Authority vs AI Assistance
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          In QuestForge AI, scholarship requirement rules and document completeness are strictly managed by a deterministic rules engine, not probabilistic large language models. This design ensures absolute reproducibility, transparency, and compliance with published guidelines:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-navy-950 p-3 rounded border border-slate-800">
            <strong className="text-white block mb-1">Deterministic Rules Engine:</strong>
            <span className="text-slate-300">
              Evaluates mandatory document checklists, cross-references candidate names and dates of birth, calculates income threshold limits, and enforces official guidelines.
            </span>
          </div>
          <div className="bg-navy-950 p-3 rounded border border-slate-800">
            <strong className="text-white block mb-1">AI Structured Extraction:</strong>
            <span className="text-slate-300">
              Assists in normalizing extracted document text into structured fields. If AI is unavailable or unconfigured, the system automatically runs in deterministic demonstration mode.
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between p-6 bg-navy-900 border border-slate-800 rounded-lg">
        <div>
          <h3 className="text-base font-semibold text-white">Ready to test your application readiness?</h3>
          <p className="text-xs text-slate-400 mt-1">Explore available demonstration scholarships and initiate an audit.</p>
        </div>
        <Link to="/scholarships">
          <Button variant="primary">
            Explore Scholarships
          </Button>
        </Link>
      </div>
    </div>
  )
}
