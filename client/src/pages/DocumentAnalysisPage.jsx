import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Cpu,
  ShieldCheck,
  RefreshCw
} from 'lucide-react'
import { executeAudit } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function DocumentAnalysisPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state || {}
  const { scholarshipId, scholarship, documents = [] } = state

  const [runningAudit, setRunningAudit] = useState(false)
  const [auditError, setAuditError] = useState(null)
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState(null)

  if (!scholarship || documents.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Active Document Analysis Session</h2>
        <p className="text-sm text-slate-300">
          Please upload or select documents through the upload workflow first.
        </p>
        <Link to="/upload">
          <Button variant="primary" icon={ArrowLeft}>
            Go To Document Upload
          </Button>
        </Link>
      </div>
    )
  }

  const handleRunAudit = async () => {
    setRunningAudit(true)
    setAuditError(null)

    try {
      const payload = {
        scholarshipId: scholarship.id,
        documentIds: documents.map((d) => d.id),
        manualDocuments: documents
      }

      const res = await executeAudit(payload)
      const auditResult = res.data

      navigate(`/audit-results/${auditResult.id}`, {
        state: { audit: auditResult }
      })
    } catch (err) {
      setAuditError(err.message || 'Audit execution failed.')
    } finally {
      setRunningAudit(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="teal">Step 2 of 3</Badge>
            <span className="text-xs text-slate-400">Extraction & Field Normalization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Document Extraction & Inspector
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Review optical character recognition and structured field extraction before running the rule audit against{' '}
            <strong className="text-brand-300">{scholarship.title}</strong>.
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          icon={ArrowRight}
          disabled={runningAudit}
          onClick={handleRunAudit}
        >
          {runningAudit ? 'Executing Rules Audit...' : 'Run Verification Audit'}
        </Button>
      </div>

      {auditError && (
        <div className="p-4 bg-rose-950/40 border border-rose-900 rounded-lg text-xs text-rose-200">
          {auditError}
        </div>
      )}

      {/* Extracted Documents Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Processed Documents ({documents.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc, idx) => {
            const fields = doc.extractedFields || {}
            return (
              <Card key={doc.id || idx} className="space-y-4">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded bg-navy-800 border border-slate-700 flex items-center justify-center text-brand-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{doc.originalName}</h3>
                      <span className="text-xs text-slate-400">
                        Category: <strong className="text-slate-200">{doc.categoryName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="default">{doc.extractionMethod || 'TEXT_PARSED'}</Badge>
                    <Badge variant={doc.extractionConfidence > 0.7 ? 'success' : 'warning'}>
                      Confidence: {Math.round((doc.extractionConfidence || 0.8) * 100)}%
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={Eye}
                      onClick={() => setSelectedPreviewDoc(doc)}
                    >
                      Raw Text
                    </Button>
                  </div>
                </div>

                {/* Structured Fields Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Candidate Name
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block truncate">
                      {fields.fullName || <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>

                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Date of Birth
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block">
                      {fields.dob || <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>

                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Annual Income
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block">
                      {fields.annualIncome ? `₹${fields.annualIncome.toLocaleString('en-IN')}` : <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>

                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Academic Marks
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block">
                      {fields.percentageMarks ? `${fields.percentageMarks}%` : <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>

                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Institution
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block truncate">
                      {fields.institutionName || <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>

                  <div className="bg-navy-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      ID / Roll No
                    </span>
                    <span className="font-medium text-slate-200 mt-0.5 block truncate">
                      {fields.idNumber || <em className="text-slate-500">Not detected</em>}
                    </span>
                  </div>
                </div>

                {doc.extractionWarning && (
                  <div className="p-2.5 bg-amber-950/30 border border-amber-900/60 rounded text-xs text-amber-200">
                    {doc.extractionWarning}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Raw Text Modal */}
      {selectedPreviewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-slate-700 rounded-lg max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{selectedPreviewDoc.originalName}</h3>
                <span className="text-xs text-slate-400">Extracted Text Buffer</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => setSelectedPreviewDoc(null)}>
                Close
              </Button>
            </div>

            <div className="bg-navy-950 border border-slate-800 p-4 rounded-lg overflow-y-auto text-xs font-mono text-slate-300 whitespace-pre-wrap flex-grow">
              {selectedPreviewDoc.extractedText || 'No text extracted from this document.'}
            </div>

            <div className="text-right pt-2">
              <Button size="sm" variant="secondary" onClick={() => setSelectedPreviewDoc(null)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="p-6 bg-navy-900 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Extraction Inspected</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Proceed to execute cross-document consistency checks and mandatory requirement audits.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/upload">
            <Button variant="outline" icon={ArrowLeft}>
              Modify Uploads
            </Button>
          </Link>
          <Button
            size="lg"
            variant="primary"
            icon={ArrowRight}
            disabled={runningAudit}
            onClick={handleRunAudit}
          >
            {runningAudit ? 'Executing Audit...' : 'Execute Verification Audit'}
          </Button>
        </div>
      </div>
    </div>
  )
}
