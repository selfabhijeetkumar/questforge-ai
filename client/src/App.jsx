import React, { useState, useEffect } from 'react'

export default function App() {
  const [serverStatus, setServerStatus] = useState({ loading: true, online: false, message: '' })

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerStatus({ loading: false, online: true, message: data.message || 'Operational' })
      })
      .catch(err => {
        setServerStatus({ loading: false, online: false, message: 'Server unreachable: ' + err.message })
      })
  }, [])

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-xl w-full bg-navy-900 border border-slate-800 rounded-lg p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white text-xl">
            QF
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">QUESTFORGE AI</h1>
            <p className="text-sm text-slate-400">Level Up Your Scholarship Application</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-navy-800/60 border border-slate-700/60 rounded-lg p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-1">
              Project Phase 1: Initialized
            </h2>
            <p className="text-sm text-slate-300">
              AI-Powered Scholarship Application Readiness & Document Verification Platform.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-slate-800 text-sm">
            <span className="text-slate-400">Backend API Health:</span>
            {serverStatus.loading ? (
              <span className="text-slate-400">Checking...</span>
            ) : serverStatus.online ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                Connected ({serverStatus.message})
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-amber-950 text-amber-400 border border-amber-800">
                {serverStatus.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
