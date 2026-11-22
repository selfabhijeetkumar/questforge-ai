import React from 'react'
import { ShieldCheck, Lock, EyeOff } from 'lucide-react'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'

export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="teal">Compliance & Data Protection</Badge>
          <span className="text-xs text-slate-400">Effective Date: November 2026</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          This policy outlines how QuestForge AI handles document data, optical character recognition artifacts, and personal information during the scholarship readiness audit process.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <Card title="1. Academic Project Scope & Identity" className="space-y-2">
          <p>
            QuestForge AI is developed strictly for an academic Skill Enhancement Course (SEC). It is an independent pre-submission document audit assistant and is not affiliated with any official government portal, university scholarship office, or financial disbursement agency.
          </p>
        </Card>

        <Card title="2. Document Handling and Volatile Memory Processing" className="space-y-2">
          <div className="flex items-start space-x-2 text-teal-400 font-semibold mb-1">
            <Lock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>In-Memory Parsing Architecture</span>
          </div>
          <p>
            When you upload documents for verification, files are processed directly in memory using secure buffer streams. QuestForge AI does not retain permanent disk copies of your private identity certificates or marks cards on public servers.
          </p>
          <p>
            Temporary extraction tokens and in-memory session records are maintained only for the duration of your active evaluation session and are cleared upon server restart.
          </p>
        </Card>

        <Card title="3. Third-Party AI Data Processing" className="space-y-2">
          <div className="flex items-start space-x-2 text-brand-400 font-semibold mb-1">
            <EyeOff className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Controlled Field Extraction</span>
          </div>
          <p>
            When external AI assistance (such as Google Gemini) is configured, requests are routed exclusively through backend proxy endpoints. Your documents are never transmitted directly from client browsers to third-party endpoints.
          </p>
          <p>
            If API credentials are not provided or if offline operation is preferred, QuestForge AI automatically executes in high-fidelity deterministic demonstration mode without transmitting any data over the internet.
          </p>
        </Card>

        <Card title="4. Student Rights and Control" className="space-y-2">
          <p>
            You retain absolute ownership of all academic credentials, certificates, and files evaluated by this platform. You may delete uploaded documents or reset session records at any time through the student dashboard.
          </p>
        </Card>

        <Card title="5. Contact for Privacy Inquiries" className="space-y-2">
          <p>
            For questions regarding academic data privacy or verification logic, please contact the course development team via the Contact page.
          </p>
        </Card>
      </div>
    </div>
  )
}
