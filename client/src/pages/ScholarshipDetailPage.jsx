import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FileText,
  Calendar,
  Award,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { fetchScholarshipById } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function ScholarshipDetailPage() {
  const { id } = useParams()
  const [scholarship, setScholarship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchScholarshipById(id)
        setScholarship(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading scholarship requirements...</p>
      </div>
    )
  }

  if (error || !scholarship) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Scholarship Not Found</h2>
        <p className="text-sm text-slate-300">{error || 'Unable to retrieve scholarship configuration.'}</p>
        <Link to="/scholarships">
          <Button variant="secondary" icon={ArrowLeft}>
            Back to Scholarships
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link to="/scholarships" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Explorer
        </Link>
      </div>

      {/* Program Summary Header */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-brand-400">{scholarship.code}</span>
            {scholarship.isDemonstration && <Badge variant="demo">Synthetic Demonstration Scheme</Badge>}
            <Badge variant="teal">{scholarship.category}</Badge>
          </div>
          <Link to={`/upload?scholarshipId=${scholarship.id}`}>
            <Button variant="primary" icon={ArrowRight}>
              Audit Documents for this Scheme
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {scholarship.title}
        </h1>

        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          {scholarship.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Issuing Authority:</span>
            <span className="font-semibold text-white">{scholarship.provider}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Award Benefit:</span>
            <span className="font-semibold text-amber-300">{scholarship.awardAmount}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Application Deadline:</span>
            <span className="font-semibold text-white">{scholarship.deadline}</span>
          </div>
        </div>

        {scholarship.officialPortalUrl && (
          <div className="pt-2 text-xs text-slate-400 flex items-center space-x-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Official Portal Reference: </span>
            <a
              href={scholarship.officialPortalUrl.split(' ')[0]}
              target="_blank"
              rel="noreferrer"
              className="text-brand-400 hover:underline"
            >
              {scholarship.officialPortalUrl}
            </a>
          </div>
        )}
      </div>

      {/* Mandatory Document Checklist */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Mandatory Documents Checklist ({scholarship.mandatoryDocuments?.length || 0})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            These documents are strictly audited by the deterministic verification engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scholarship.mandatoryDocuments?.map((doc) => (
            <Card key={doc.categoryId} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-brand-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-white">{doc.name}</h3>
                </div>
                <Badge variant="danger">Mandatory</Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {doc.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                <div>
                  <strong className="text-slate-300">Accepted Formats:</strong>{' '}
                  {doc.acceptedFormats.join(', ')}
                </div>
                {doc.guidelineReference && (
                  <div className="flex items-start space-x-1 text-slate-400 pt-0.5">
                    <BookOpen className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">Guideline:</strong> {doc.guidelineReference}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Eligibility Rules */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Configured Eligibility Rules
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit engine checks candidate records against these academic and financial rules.
          </p>
        </div>

        <div className="bg-navy-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="divide-y divide-slate-800">
            {scholarship.eligibilityCriteria?.map((crit) => (
              <div key={crit.criterionId} className="p-4 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <h4 className="font-semibold text-white">{crit.title}</h4>
                  <p className="text-slate-300">{crit.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Audit CTA Box */}
      <div className="p-6 bg-navy-900 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to verify your documents?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload your PDF or image files to begin the automated readiness audit.
          </p>
        </div>
        <Link to={`/upload?scholarshipId=${scholarship.id}`}>
          <Button variant="primary" size="lg" icon={ArrowRight}>
            Audit Application Documents
          </Button>
        </Link>
      </div>
    </div>
  )
}
