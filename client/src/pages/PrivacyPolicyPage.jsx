import React from 'react'
import { ShieldCheck, Lock, EyeOff } from 'lucide-react'
import { SpatialCard } from '../components/common/SpatialCard'

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded bg-navy-900 border border-cyan-500/30">
            COMPLIANCE & DATA PROTECTION
          </span>
          <span className="text-xs font-mono text-slate-400">Effective Date: November 2026</span>
        </div>
        <h1 className="text-3xl font-headline font-bold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          This policy outlines how QuestForge AI handles document data, optical character recognition artifacts, and personal information during the scholarship readiness audit process.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
        <SpatialCard title="1. Academic Project Scope & Identity" className="space-y-2" cornerMarkers={false}>
          <p>
            QuestForge AI is developed strictly for an academic Skill Enhancement Course (SEC). It is an independent pre-submission document audit assistant and is not affiliated with any official government portal, university scholarship office, or financial disbursement agency.
          </p>
        </SpatialCard>

        <SpatialCard title="2. Document Handling and Volatile Memory Processing" className="space-y-2" cornerMarkers={false}>
          <div className="flex items-start space-x-2 text-cyan-400 font-mono font-semibold mb-1">
            <Lock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>In-Memory Parsing Architecture</span>
          </div>
          <p>
            When you upload documents for verification, files are processed directly in memory using secure buffer streams. QuestForge AI does not retain permanent disk copies of your private identity certificates or marks cards on public servers.
          </p>
          <p>
            Temporary extraction tokens and in-memory session records are maintained only for the duration of your active evaluation session and are cleared upon server restart.
          </p>
        </SpatialCard>

        <SpatialCard title="3. Third-Party AI Data Processing" className="space-y-2" cornerMarkers={false}>
          <div className="flex items-start space-x-2 text-cyan-400 font-mono font-semibold mb-1">
            <EyeOff className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Controlled Field Extraction</span>
          </div>
          <p>
            When external AI assistance (such as Google Gemini, Groq, or NVIDIA) is configured, requests are routed exclusively through backend proxy endpoints. Your documents are never transmitted directly from client browsers to third-party endpoints.
          </p>
          <p>
            If API credentials are not provided or if offline operation is preferred, QuestForge AI automatically executes in high-fidelity deterministic demonstration mode without transmitting any data over the internet.
          </p>
        </SpatialCard>

        <SpatialCard title="4. Student Rights and Control" className="space-y-2" cornerMarkers={false}>
          <p>
            You retain absolute ownership of all academic credentials, certificates, and files evaluated by this platform. You may delete uploaded documents or reset session records at any time through the student dashboard.
          </p>
        </SpatialCard>
      </div>
    </div>
  )
}
