/**
 * Centralized API client for QuestForge AI
 */

const API_BASE = '/api'

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`)
  if (!res.ok) throw new Error(`Health check failed with status ${res.status}`)
  return res.json()
}

export async function fetchScholarships(params = {}) {
  const query = new URLSearchParams()
  if (params.search) query.append('search', params.search)
  if (params.category && params.category !== 'All') query.append('category', params.category)
  if (params.educationLevel && params.educationLevel !== 'All') query.append('educationLevel', params.educationLevel)

  const url = `${API_BASE}/scholarships${query.toString() ? `?${query.toString()}` : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load scholarships')
  return res.json()
}

export async function fetchScholarshipById(id) {
  const res = await fetch(`${API_BASE}/scholarships/${id}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error(`Scholarship '${id}' was not found.`)
    throw new Error('Failed to load scholarship details')
  }
  return res.json()
}

export async function uploadDocuments(formData) {
  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: 'POST',
    body: formData
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to upload documents')
  return json
}

export async function updateDocumentCategory(docId, categoryId, categoryName) {
  const res = await fetch(`${API_BASE}/documents/${docId}/category`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId, categoryName })
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to update category')
  return json
}

export async function executeAudit(payload) {
  const res = await fetch(`${API_BASE}/audit/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to run audit')
  return json
}

export async function fetchAuditById(id) {
  const res = await fetch(`${API_BASE}/audit/${id}`)
  if (!res.ok) throw new Error('Failed to load audit record')
  return res.json()
}

export async function fetchDashboardData() {
  const res = await fetch(`${API_BASE}/dashboard`)
  if (!res.ok) throw new Error('Failed to load student dashboard')
  return res.json()
}

export async function fetchReportData(auditId) {
  const res = await fetch(`${API_BASE}/reports/${auditId}`)
  if (!res.ok) throw new Error('Failed to load audit report')
  return res.json()
}
