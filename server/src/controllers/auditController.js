import { SCHOLARSHIPS } from '../data/scholarships.js'
import { runScholarshipAudit } from '../services/auditEngine.js'
import { storage } from '../services/storageService.js'

export function runAudit(req, res) {
  const { scholarshipId, documentIds, manualDocuments } = req.body

  if (!scholarshipId) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'scholarshipId is required to execute audit.'
    })
  }

  const scholarship = SCHOLARSHIPS.find(s => s.id === scholarshipId || s.code.toLowerCase() === scholarshipId.toLowerCase())
  if (!scholarship) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Scholarship '${scholarshipId}' not found.`
    })
  }

  // Retrieve documents from storage or manual payload
  let documents = []
  if (Array.isArray(documentIds) && documentIds.length > 0) {
    documents = documentIds.map(id => storage.getDocument(id)).filter(Boolean)
  } else if (Array.isArray(manualDocuments) && manualDocuments.length > 0) {
    documents = manualDocuments
  }

  // Run the deterministic audit engine
  const auditResult = runScholarshipAudit(scholarship, documents)

  // Persist audit record in session store
  const savedAudit = storage.saveAudit(auditResult)

  res.status(200).json({
    status: 'success',
    data: savedAudit
  })
}

export function getAuditById(req, res) {
  const { id } = req.params
  const audit = storage.getAudit(id)

  if (!audit) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Audit record with ID '${id}' not found.`
    })
  }

  res.status(200).json({
    status: 'success',
    data: audit
  })
}

export function getDashboard(req, res) {
  const dashboard = storage.getDashboardSummary()
  res.status(200).json({
    status: 'success',
    data: dashboard
  })
}

export function getReport(req, res) {
  const { id } = req.params
  const audit = storage.getAudit(id)

  if (!audit) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Audit record '${id}' not found for report generation.`
    })
  }

  // Structured report data suitable for both direct display and print rendering
  const report = {
    reportId: `REP-${audit.id}`,
    generatedAt: new Date().toISOString(),
    scholarship: {
      id: audit.scholarshipId,
      title: audit.scholarshipTitle,
      code: audit.scholarshipCode
    },
    executiveSummary: {
      overallStatus: audit.overallStatus,
      totalFindings: audit.stats.findingsCount,
      actionRequiredCount: audit.stats.actionRequiredCount,
      unableToVerifyCount: audit.stats.unableToVerifyCount,
      missingMandatoryDocuments: audit.missingMandatory.map(m => m.name),
      isReadyForSubmission: audit.overallStatus === 'Ready for Review'
    },
    documentInventory: audit.uploadedCategories.map(doc => ({
      documentId: doc.documentId,
      filename: doc.originalName,
      category: doc.categoryName,
      extractedName: doc.extractedFields?.fullName || 'Not Detected',
      extractedDob: doc.extractedFields?.dob || 'Not Detected',
      extractionConfidence: `${Math.round(doc.confidence * 100)}%`
    })),
    findings: audit.findings,
    disclaimer: 'QuestForge AI is an academic Skill Enhancement Course (SEC) document auditing assistant. This report provides pre-submission readiness guidance based on configured criteria and does not constitute official scholarship sanction, endorsement, or eligibility guarantee.'
  }

  res.status(200).json({
    status: 'success',
    data: report
  })
}
