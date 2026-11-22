import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, BookOpen, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Academic Disclosure */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                QF
              </div>
              <span className="font-bold text-slate-200 tracking-tight text-sm">QUESTFORGE AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              AI-Powered Scholarship Application Readiness and Document Verification Platform.
              An academic Skill Enhancement Course (SEC) project built to assist students with pre-submission document checks.
            </p>
            <div className="p-3 bg-navy-900 border border-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1 max-w-md">
              <strong className="text-slate-300 block">Academic Notice & Scope:</strong>
              QuestForge AI is a document auditing assistant. It does not approve scholarships, guarantee eligibility, or replace official scholarship portals.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-slate-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-slate-200 transition-colors">
                  Scholarship Explorer
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-slate-200 transition-colors">
                  Upload & Audit
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-slate-200 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-200 transition-colors">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">Compliance & Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-slate-200 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-slate-200 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-200 transition-colors">
                  Contact Course Team
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QuestForge AI. Academic SEC Project. All demonstration data is synthetic.</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-teal-400">
              <Shield className="w-3.5 h-3.5 mr-1" /> Client-Side Privacy First
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
