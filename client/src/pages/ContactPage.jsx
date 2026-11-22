import React, { useState } from 'react'
import { Mail, CheckCircle2, Send, MessageSquare, AlertCircle } from 'lucide-react'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Course Evaluation Inquiry',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.')
      return
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid email address.')
      return
    }

    // Academic demonstration submission
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="teal">Course Project Contact</Badge>
          <span className="text-xs text-slate-400">Skill Enhancement Course (SEC)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Contact Course Team
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          For course evaluation inquiries, technical architecture questions, or audit engine demonstration feedback, reach out to the project authors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <Card title="Academic Context" className="space-y-3">
            <div className="text-xs text-slate-300 space-y-2">
              <div>
                <strong className="text-white block">Project Title:</strong>
                <span>QuestForge AI</span>
              </div>
              <div>
                <strong className="text-white block">Course Domain:</strong>
                <span>Skill Enhancement Course (SEC)</span>
              </div>
              <div>
                <strong className="text-white block">Primary Architecture:</strong>
                <span>Full-Stack Document Ingestion, OCR & Deterministic Auditing</span>
              </div>
            </div>
          </Card>

          <Card title="Evaluation Note" className="space-y-2 text-xs text-slate-300">
            <p>
              Inquiries submitted through this form are logged in local session memory for demonstration review.
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card title="Send Message">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Message Logged Successfully</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for your feedback. Your inquiry has been registered in the academic demonstration ledger.
                </p>
                <Button size="sm" variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded text-rose-200 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@institution.edu"
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Course Evaluation Inquiry">Course Evaluation Inquiry</option>
                    <option value="Audit Engine Feedback">Audit Engine Feedback</option>
                    <option value="OCR / Extraction Observation">OCR / Extraction Observation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 block">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or observation..."
                    className="w-full bg-navy-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" icon={Send} className="w-full">
                    Submit Message
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
