import React from 'react'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'

export function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="teal">Compliance</Badge>
          <span className="text-xs text-slate-400">Effective Date: November 2026</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Information regarding cookie usage and local client-side storage within QuestForge AI.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <Card title="1. Strictly Functional Session Operation" className="space-y-2">
          <p>
            QuestForge AI does not utilize third-party advertising cookies, cross-site trackers, or commercial telemetry beacons.
          </p>
          <p>
            The application operates as a Single-Page Application (SPA) where session state is maintained in local application memory to coordinate multi-step document uploads and audit result views.
          </p>
        </Card>

        <Card title="2. Local Storage and Session Storage" className="space-y-2">
          <p>
            The platform may use browser local storage or session storage strictly for operational preferences, such as preserving filter parameters or temporarily caching demonstration preset selections.
          </p>
        </Card>

        <Card title="3. Managing Local Data" className="space-y-2">
          <p>
            You can clear browser local storage and cache at any time through your browser settings. Clearing local data will not affect the operation of the verification engine upon your next visit.
          </p>
        </Card>
      </div>
    </div>
  )
}
