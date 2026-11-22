import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  UploadCloud,
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle,
  FileCheck,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react'
import { fetchScholarships, uploadDocuments } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function DocumentUploadPage() {
  const [searchParams] = useSearchParams()
  const initialScholarshipId = searchParams.get('scholarshipId') || ''
  const navigate = useNavigate()

  const [scholarships, setScholarships] = useState([])
  const [selectedScholarshipId, setSelectedScholarshipId] = useState(initialScholarshipId)
  const [selectedScholarship, setSelectedScholarship] = useState(null)

  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Load scholarships list on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchScholarships()
        const list = res.data || []
        setScholarships(list)
        if (list.length > 0) {
          const matched = list.find((s) => s.id === initialScholarshipId) || list[0]
          setSelectedScholarshipId(matched.id)
          setSelectedScholarship(matched)
        }
      } catch (err) {
        setUploadError('Failed to load scholarships: ' + err.message)
      }
    }
    loadData()
  }, [initialScholarshipId])

  // Update selected scholarship when dropdown changes
  const handleScholarshipChange = (e) => {
    const id = e.target.value
    setSelectedScholarshipId(id)
    const found = scholarships.find((s) => s.id === id)
    setSelectedScholarship(found || null)
  }

  // File validation
  const validateAndAddFiles = (newFileList) => {
    setUploadError(null)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB
    const valid = []

    for (const file of newFileList) {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setUploadError(`File "${file.name}" has unsupported format. Only PDF, JPG, and PNG are allowed.`)
        continue
      }
      if (file.size > maxSize) {
        setUploadError(`File "${file.name}" exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`)
        continue
      }

      // Infer default category guess based on filename
      let defaultCatId = 'doc-id'
      let defaultCatName = 'Identity Proof'
      const lower = file.name.toLowerCase()
      if (lower.includes('income')) {
        defaultCatId = 'doc-income'
        defaultCatName = 'Income Certificate'
      } else if (lower.includes('mark') || lower.includes('transcript') || lower.includes('10th') || lower.includes('12th')) {
        defaultCatId = 'doc-marksheet'
        defaultCatName = 'Academic Marksheet'
      } else if (lower.includes('inst') || lower.includes('bonafide') || lower.includes('college')) {
        defaultCatId = 'doc-institution'
        defaultCatName = 'Institution Certificate'
      }

      valid.push({
        id: `local-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type,
        categoryId: defaultCatId,
        categoryName: defaultCatName
      })
    }

    setFiles((prev) => [...prev, ...valid])
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files)
    }
  }

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCategoryChange = (index, categoryId) => {
    const matchedCategory = selectedScholarship?.mandatoryDocuments.find((c) => c.categoryId === categoryId)
    setFiles((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            categoryId,
            categoryName: matchedCategory ? matchedCategory.name : 'Other Document'
          }
        }
        return item
      })
    )
  }

  // Load Synthetic Demonstration Datasets (One-click evaluator presets)
  const loadScenarioPreset = (scenario) => {
    setUploadError(null)

    if (scenario === 'SCENARIO_B_MISSING') {
      // 3 of 4 required: Missing Income Certificate
      const syntheticDocs = [
        {
          id: `syn-${Date.now()}-1`,
          file: new File(
            ['Government Identity Proof\nName: Rahul Sharma\nDOB: 15/08/2004\nAadhaar: 9876 5432 1098'],
            'aadhaar_card.pdf',
            { type: 'application/pdf' }
          ),
          name: 'aadhaar_card.pdf',
          size: '14.2 KB',
          type: 'application/pdf',
          categoryId: 'doc-id',
          categoryName: 'Identity Proof'
        },
        {
          id: `syn-${Date.now()}-2`,
          file: new File(
            ['Senior Secondary Examination Marksheet\nStudent Name: Rahul Sharma\nPercentage: 86.4%\nBoard: CBSE'],
            'class12_marksheet.pdf',
            { type: 'application/pdf' }
          ),
          name: 'class12_marksheet.pdf',
          size: '18.5 KB',
          type: 'application/pdf',
          categoryId: 'doc-marksheet',
          categoryName: 'Academic Marksheet'
        },
        {
          id: `syn-${Date.now()}-3`,
          file: new File(
            ['Bonafide Student Certificate\nThis is to certify that Rahul Sharma is enrolled in B.Tech Mechanical Engineering.\nInstitution: National Institute of Technology'],
            'bonafide_letter.pdf',
            { type: 'application/pdf' }
          ),
          name: 'bonafide_letter.pdf',
          size: '11.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-institution',
          categoryName: 'Institution Certificate'
        }
      ]
      setFiles(syntheticDocs)
    } else if (scenario === 'SCENARIO_C_INCONSISTENCY') {
      // Name inconsistency: Rahul Sharma vs Rahul S.
      const syntheticDocs = [
        {
          id: `syn-${Date.now()}-1`,
          file: new File(
            ['National ID Card\nFull Name: Rahul Sharma\nDOB: 15/08/2004\nID: 9876 5432 1098'],
            'national_id_rahul_sharma.pdf',
            { type: 'application/pdf' }
          ),
          name: 'national_id_rahul_sharma.pdf',
          size: '15.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-id',
          categoryName: 'Identity Proof'
        },
        {
          id: `syn-${Date.now()}-2`,
          file: new File(
            ['Official Marksheet Transcript\nName of Candidate: Rahul S\nPercentage: 88.5%\nPassing Year: 2024'],
            'marksheet_rahul_s.pdf',
            { type: 'application/pdf' }
          ),
          name: 'marksheet_rahul_s.pdf',
          size: '19.2 KB',
          type: 'application/pdf',
          categoryId: 'doc-marksheet',
          categoryName: 'Academic Marksheet'
        },
        {
          id: `syn-${Date.now()}-3`,
          file: new File(
            ['Income Certificate\nApplicant Name: Rahul Sharma\nAnnual Household Income: 1,80,000 INR\nValid for Year: 2026'],
            'income_cert.pdf',
            { type: 'application/pdf' }
          ),
          name: 'income_cert.pdf',
          size: '12.4 KB',
          type: 'application/pdf',
          categoryId: 'doc-income',
          categoryName: 'Income Certificate'
        },
        {
          id: `syn-${Date.now()}-4`,
          file: new File(
            ['Bonafide Certificate\nThis is to certify that Rahul Sharma is enrolled in AICTE approved college.\nInstitution: State Engineering College'],
            'bonafide_inst.pdf',
            { type: 'application/pdf' }
          ),
          name: 'bonafide_inst.pdf',
          size: '13.1 KB',
          type: 'application/pdf',
          categoryId: 'doc-institution',
          categoryName: 'Institution Certificate'
        }
      ]
      setFiles(syntheticDocs)
    } else if (scenario === 'SCENARIO_A_PERFECT') {
      // All 4 documents matching Rahul Sharma
      const syntheticDocs = [
        {
          id: `syn-${Date.now()}-1`,
          file: new File(
            ['National Identity Card\nFull Name: Rahul Sharma\nDOB: 15/08/2004\nUID: 9876 5432 1098'],
            'id_card.pdf',
            { type: 'application/pdf' }
          ),
          name: 'id_card.pdf',
          size: '14.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-id',
          categoryName: 'Identity Proof'
        },
        {
          id: `syn-${Date.now()}-2`,
          file: new File(
            ['Revenue Authority Income Certificate\nName of Applicant: Rahul Sharma\nAnnual Income: 1,50,000 INR'],
            'income_cert.pdf',
            { type: 'application/pdf' }
          ),
          name: 'income_cert.pdf',
          size: '16.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-income',
          categoryName: 'Income Certificate'
        },
        {
          id: `syn-${Date.now()}-3`,
          file: new File(
            ['Board Marksheet Transcript\nStudent Name: Rahul Sharma\nPercentage: 84.0%'],
            'marksheet.pdf',
            { type: 'application/pdf' }
          ),
          name: 'marksheet.pdf',
          size: '20.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-marksheet',
          categoryName: 'Academic Marksheet'
        },
        {
          id: `syn-${Date.now()}-4`,
          file: new File(
            ['Institution Bonafide Certificate\nCertify that Rahul Sharma is enrolled in National Institute of Technology'],
            'institution_bonafide.pdf',
            { type: 'application/pdf' }
          ),
          name: 'institution_bonafide.pdf',
          size: '12.0 KB',
          type: 'application/pdf',
          categoryId: 'doc-institution',
          categoryName: 'Institution Certificate'
        }
      ]
      setFiles(syntheticDocs)
    }
  }

  // Handle Upload and Analysis Execution
  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      setUploadError('Please select or upload at least one document before continuing.')
      return
    }

    setUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      const categoryMap = {}

      for (const item of files) {
        formData.append('documents', item.file, item.name)
        categoryMap[item.name] = {
          categoryId: item.categoryId,
          categoryName: item.categoryName
        }
      }

      formData.append('categoryMap', JSON.stringify(categoryMap))

      const uploadResult = await uploadDocuments(formData)
      const processedDocs = uploadResult.data || []

      // Navigate to Analysis page with uploaded documents
      navigate('/analysis', {
        state: {
          scholarshipId: selectedScholarshipId,
          scholarship: selectedScholarship,
          documents: processedDocs
        }
      })
    } catch (err) {
      setUploadError(err.message || 'Failed to process document upload.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="teal">Step 1 of 3</Badge>
          <span className="text-xs text-slate-400">Document Ingestion Pipeline</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Upload Application Documents
        </h1>
        <p className="text-sm text-slate-300">
          Select your target scholarship, upload your supporting credentials in PDF or image format, and assign each document to its required verification category.
        </p>
      </div>

      {/* Target Scholarship Selection Card */}
      <Card title="Target Scholarship Program" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Choose Scholarship To Audit Against:
            </label>
            <select
              value={selectedScholarshipId}
              onChange={handleScholarshipChange}
              className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              {scholarships.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-navy-950 border border-slate-800 rounded-lg text-xs space-y-1">
            <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">
              Mandatory Checklist:
            </span>
            <span className="text-slate-200 block font-medium">
              {selectedScholarship?.mandatoryDocuments?.length || 0} Required Documents
            </span>
            <span className="text-amber-400 block text-[11px]">
              Income limit: ≤ ₹2.5L / Merit: ≥ 75%
            </span>
          </div>
        </div>
      </Card>

      {/* Demonstration Preset Shortcuts */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400">
          <Sparkles className="w-4 h-4" />
          <span>Evaluation Shortcut: Load Synthetic Test Scenarios (Instant Testing)</span>
        </div>
        <p className="text-xs text-slate-400">
          Load pre-configured synthetic documents to evaluate specific audit engine behaviors immediately:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => loadScenarioPreset('SCENARIO_B_MISSING')}
          >
            Scenario B: Missing Income Certificate
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => loadScenarioPreset('SCENARIO_C_INCONSISTENCY')}
          >
            Scenario C: Name Inconsistency (Rahul Sharma vs Rahul S.)
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => loadScenarioPreset('SCENARIO_A_PERFECT')}
          >
            Scenario A: Fully Matching Documentation
          </Button>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-brand-500 bg-navy-900/80'
            : 'border-slate-700 bg-navy-900/40 hover:border-slate-500'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-lg bg-navy-800 border border-slate-700 mx-auto flex items-center justify-center text-brand-400">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Drag and drop your documents here, or <span className="text-brand-400 underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supported formats: PDF, JPG, PNG (Max 10MB per document)
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="p-4 bg-rose-950/40 border border-rose-900 rounded-lg text-xs text-rose-200 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Documents List & Category Assignor */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Selected Documents ({files.length})
            </h2>
            <Button size="sm" variant="outline" onClick={() => setFiles([])}>
              Clear All
            </Button>
          </div>

          <div className="space-y-3">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="bg-navy-900 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded bg-navy-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                    <FileText className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white break-all">{item.name}</h4>
                    <span className="text-xs text-slate-400">
                      {item.size} • {item.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-full md:w-64">
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Assigned Category:
                    </label>
                    <select
                      value={item.categoryId}
                      onChange={(e) => handleCategoryChange(idx, e.target.value)}
                      className="w-full bg-navy-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      {selectedScholarship?.mandatoryDocuments.map((m) => (
                        <option key={m.categoryId} value={m.categoryId}>
                          {m.name} (Mandatory)
                        </option>
                      ))}
                      {selectedScholarship?.optionalDocuments?.map((o) => (
                        <option key={o.categoryId} value={o.categoryId}>
                          {o.name} (Optional)
                        </option>
                      ))}
                      <option value="doc-unassigned">Other / Uncategorized</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors border border-transparent hover:border-rose-900"
                    title="Remove File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex justify-end">
            <Button
              size="lg"
              variant="primary"
              icon={ArrowRight}
              disabled={uploading}
              onClick={handleStartAnalysis}
            >
              {uploading ? 'Processing OCR & Text Extraction...' : 'Extract & Inspect Documents'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
