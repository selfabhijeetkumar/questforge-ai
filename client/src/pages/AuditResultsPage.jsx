import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import {
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  FileText,
  Printer,
  LayoutDashboard,
  ArrowRight,
  BookOpen,
  RefreshCw,
  RotateCcw
} from 'lucide-react'
import { fetchAuditById } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'
import { FindingItem } from '../components/common/FindingItem'

export function AuditResultsPage() {
  const { id } = useParams()
  const location = useLocation()

  const [audit, setAudit] = useState(location.state?.audit || null)
  const [loading, setLoading] = useState(!audit)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!audit && id) {
      async function loadAudit() {
        setLoading(true)
        try {
          const res = await fetchAuditById(id)
          setAudit(res.data)
        } catch (err) {
          setError(err.message || 'Failed to load audit results')
        } finally {
          setLoading(false)
        }
      }
      loadAudit()
    }
  }, [id, audit])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading audit findings and verification status...</p>
      </div>
    )
  }

  if (error || !audit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Audit Record Not Found</h2>
        <p className="text-sm text-slate-300">{error || 'Unable to locate specified audit record.'}</p>
        <Link to="/upload">
          <Button variant="primary">Start New Audit</Button>
        </Link>
      </div>
    )
  }

  const isActionRequired = audit.overallStatus === 'Action Required'
  const isUnableToVerify = audit.overallStatus === 'Unable to Verify'
  const isReady = audit.overallStatus === 'Ready for Review'

  const statusVariant = isActionRequired ? 'danger' : isUnableToVerify ? 'warning' : 'success'
  const StatusIcon = isActionRequired ? AlertCircle : isUnableToVerify ? HelpCircle : CheckCircle2

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">ID: {audit.id}</span>
            <Badge variant="teal">Step 3 of 3</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Application Readiness Audit Results
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Link to={`/report/${audit.id}`}>
            <Button variant="outline" icon={Printer}>
              Export / Print Report
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" icon={LayoutDashboard}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Executive Status Card */}
      <div
        className={`rounded-lg border p-6 space-y-4 ${
          isActionRequired
            ? 'bg-rose-950/20 border-rose-900/60'
            : isUnableToVerify
            ? 'bg-amber-950/20 border-amber-900/60'
            : 'bg-emerald-950/20 border-emerald-900/60'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Overall Application Readiness Status:
            </span>
            <div className="flex items-center space-x-2 pt-1">
              <StatusIcon
                className={`w-6 h-6 ${
                  isActionRequired ? 'text-rose-400' : isUnableToVerify ? 'text-amber-400' : 'text-emerald-400'
                }`}
              />
              <span className="text-2xl font-bold text-white">{audit.overallStatus}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Target Scholarship:</span>
            <span className="text-sm font-semibold text-white">{audit.scholarshipTitle}</span>
            <span className="text-xs text-brand-400 block mt-0.5">{audit.scholarshipCode}</span>
          </div>
        </div>

        {/* Narrative assessment */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
          {isActionRequired &&
            'The deterministic audit engine identified mandatory documentation deficiencies or critical parameter mismatches that must be resolved prior to official portal submission.'}
          {isUnableToVerify &&
            'Mandatory document categories are satisfied, but potential name variations or data ambiguities require manual student review to verify portal compliance.'}
          {isReady &&
            'All mandatory document categories are present, and cross-document entity comparisons revealed consistent candidate information matching configured rules.'}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="bg-navy-950/80 p-3 rounded border border-slate-800">
            <span className="text-slate-400 block">Mandatory Required</span>
            <span className="text-lg font-bold text-white mt-0.5 block">{audit.stats.mandatoryCount}</span>
          </div>
          <div className="bg-navy-950/80 p-3 rounded border border-slate-800">
            <span className="text-slate-400 block">Uploaded Documents</span>
            <span className="text-lg font-bold text-white mt-0.5 block">{audit.stats.uploadedCount}</span>
          </div>
          <div className="bg-navy-950/80 p-3 rounded border border-slate-800">
            <span className="text-slate-400 block">Missing Mandatory</span>
            <span className={`text-lg font-bold mt-0.5 block ${audit.stats.missingCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {audit.stats.missingCount}
            </span>
          </div>
          <div className="bg-navy-950/80 p-3 rounded border border-slate-800">
            <span className="text-slate-400 block">Action Items</span>
            <span className={`text-lg font-bold mt-0.5 block ${audit.stats.actionRequiredCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
              {audit.stats.actionRequiredCount}
            </span>
          </div>
        </div>
      </div>

      {/* Missing Mandatory Documents Section */}
      {audit.missingMandatory?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Missing Mandatory Documents ({audit.missingMandatory.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audit.missingMandatory.map((missing) => (
              <div
                key={missing.categoryId}
                className="bg-navy-900 border border-rose-900/60 rounded-lg p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{missing.name}</h3>
                  <Badge variant="danger">Action Required</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {missing.description}
                </p>
                {missing.guidelineReference && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-start space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">Mandate:</strong> {missing.guidelineReference}
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <Link to={`/upload?scholarshipId=${audit.scholarshipId}`}>
                    <Button size="sm" variant="outline">
                      Upload {missing.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Itemized Findings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Audit Findings & Consistency Checks ({audit.findings?.length || 0})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specific issues, cross-document inconsistencies, and evidence-backed recommendations.
            </p>
          </div>
        </div>

        {audit.findings?.length === 0 ? (
          <div className="p-8 bg-navy-900 border border-emerald-900/60 rounded-lg text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No Issues or Inconsistencies Found</h3>
            <p className="text-xs text-slate-300">
              Your uploaded document credentials satisfy all configured mandatory requirements without name or date conflicts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {audit.findings.map((f) => (
              <FindingItem key={f.findingId} finding={f} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <Link to="/upload">
          <Button variant="secondary" icon={RotateCcw}>
            Re-Upload / Test Different Files
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <Link to={`/report/${audit.id}`}>
            <Button variant="primary" icon={Printer}>
              Generate Printable Report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
