import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  FileCheck2,
  AlertCircle,
  Clock,
  Compass,
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react'
import { fetchDashboardData } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function StudentDashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchDashboardData()
      setDashboard(res.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const summary = dashboard?.summary || {
    totalAuditedApplications: 0,
    actionRequiredCount: 0,
    readyForReviewCount: 0,
    totalAuditExecutions: 0
  }

  const applications = dashboard?.recentApplications || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="teal">Student Dashboard</Badge>
            <span className="text-xs text-slate-400">Application Readiness Overview</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Scholarship Audits
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track verification history, missing documents summary, and readiness statuses across audited programs.
          </p>
        </div>

        <Link to="/scholarships">
          <Button variant="primary" icon={Compass}>
            Audit New Scholarship
          </Button>
        </Link>
      </div>

      {/* Persistence Notice Banner */}
      <div className="p-3 bg-navy-900 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-start space-x-2">
        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">Session Storage Mode: </span>
          <span>
            {dashboard?.note ||
              'Demonstration records persist for this server session. External database integration can be linked via Supabase credentials.'}
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Audited Applications</span>
          <span className="text-2xl font-bold text-white block">{summary.totalAuditedApplications}</span>
          <span className="text-[11px] text-slate-500 block">Configured programs checked</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Action Required</span>
          <span className={`text-2xl font-bold block ${summary.actionRequiredCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
            {summary.actionRequiredCount}
          </span>
          <span className="text-[11px] text-slate-500 block">Critical fixes before submission</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Ready for Review</span>
          <span className="text-2xl font-bold text-emerald-400 block">{summary.readyForReviewCount}</span>
          <span className="text-[11px] text-slate-500 block">Complete documentation packages</span>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Audit Executions</span>
          <span className="text-2xl font-bold text-brand-400 block">{summary.totalAuditExecutions}</span>
          <span className="text-[11px] text-slate-500 block">Total rule evaluations run</span>
        </Card>
      </div>

      {/* Application Records Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Audited Program History
          </h2>
          <Button size="sm" variant="outline" icon={RefreshCw} onClick={loadData}>
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-brand-400" />
            <p className="text-xs">Loading records...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 bg-navy-900 border border-slate-800 rounded-lg text-center space-y-4">
            <FileCheck2 className="w-10 h-10 text-slate-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">No Audited Scholarships Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Select a scholarship from the explorer and upload documents to view verification findings and status here.
              </p>
            </div>
            <Link to="/scholarships">
              <Button size="sm" variant="primary" icon={ArrowRight}>
                Explore Scholarships
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-navy-900 border border-slate-800 rounded-lg overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-3">Scholarship</th>
                  <th className="px-4 py-3">Readiness Status</th>
                  <th className="px-4 py-3">Uploaded</th>
                  <th className="px-4 py-3">Missing</th>
                  <th className="px-4 py-3">Findings</th>
                  <th className="px-4 py-3">Audited On</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {applications.map((app) => {
                  const isAction = app.auditStatus === 'Action Required'
                  const isVerify = app.auditStatus === 'Unable to Verify'
                  const variant = isAction ? 'danger' : isVerify ? 'warning' : 'success'
                  return (
                    <tr key={app.applicationId} className="hover:bg-navy-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">
                        {app.scholarshipTitle}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={variant}>{app.auditStatus}</Badge>
                      </td>
                      <td className="px-4 py-3">{app.uploadedCount} docs</td>
                      <td className="px-4 py-3">
                        <span className={app.missingCount > 0 ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                          {app.missingCount}
                        </span>
                      </td>
                      <td className="px-4 py-3">{app.findingsCount}</td>
                      <td className="px-4 py-3 text-slate-400">
                        {new Date(app.lastAuditedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Link
                          to={`/audit-results/${app.lastAuditId}`}
                          className="text-brand-400 hover:text-brand-300 font-semibold"
                        >
                          View Results
                        </Link>
                        <span className="text-slate-600">|</span>
                        <Link
                          to={`/report/${app.lastAuditId}`}
                          className="text-slate-400 hover:text-white"
                        >
                          Report
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
