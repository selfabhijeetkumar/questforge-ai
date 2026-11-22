import React from 'react'
import { AlertCircle, HelpCircle, CheckCircle2, BookOpen, Wrench, FileText } from 'lucide-react'
import { Badge } from './Badge'

export function FindingItem({ finding }) {
  const isActionRequired = finding.verificationStatus === 'Action Required'
  const isUnableToVerify = finding.verificationStatus === 'Unable to Verify'

  const borderClass = isActionRequired
    ? 'border-rose-900/60 bg-rose-950/20'
    : isUnableToVerify
    ? 'border-amber-900/60 bg-amber-950/20'
    : 'border-slate-800 bg-navy-900/40'

  const statusVariant = isActionRequired ? 'danger' : isUnableToVerify ? 'warning' : 'success'

  const StatusIcon = isActionRequired ? AlertCircle : isUnableToVerify ? HelpCircle : CheckCircle2
  const iconColor = isActionRequired ? 'text-rose-400' : isUnableToVerify ? 'text-amber-400' : 'text-emerald-400'

  return (
    <div className={`border rounded-lg p-4 space-y-3 ${borderClass}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 shrink-0 ${iconColor}`} />
          <span className="text-xs font-mono text-slate-400 font-semibold">{finding.findingId}</span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-sm font-semibold text-white">{finding.category.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={statusVariant}>{finding.verificationStatus}</Badge>
          <Badge variant="default">{finding.severity} SEVERITY</Badge>
        </div>
      </div>

      <div className="text-xs text-slate-300 flex items-center space-x-1.5">
        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-400">Affected Document:</span>
        <span className="font-medium text-slate-200">{finding.relevantDocument}</span>
      </div>

      <div className="bg-navy-950/80 rounded border border-slate-800/80 p-3 space-y-2 text-xs">
        <div>
          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">
            Detected Evidence:
          </span>
          <p className="text-slate-200 font-mono bg-navy-900/80 px-2 py-1 rounded border border-slate-800">
            {finding.evidence}
          </p>
        </div>

        <div>
          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">
            Explanation:
          </span>
          <p className="text-slate-300 leading-relaxed">{finding.explanation}</p>
        </div>

        {finding.guidelineReference && (
          <div className="flex items-start space-x-2 pt-1 border-t border-slate-800/60 text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-300">Official Reference:</strong> {finding.guidelineReference}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start space-x-2 bg-brand-950/30 border border-brand-900/50 rounded p-2.5 text-xs text-brand-200">
        <Wrench className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-brand-300">Recommended Corrective Action:</strong>
          <p className="mt-0.5 text-slate-300">{finding.recommendedAction}</p>
        </div>
      </div>
    </div>
  )
}
