import React, { useState } from 'react'
import { Mail, CheckCircle2, Send, MessageSquare, AlertCircle } from 'lucide-react'
import { SpatialCard } from '../components/common/SpatialCard'

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

    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded bg-navy-900 border border-cyan-500/30">
            COURSE PROJECT CONTACT
          </span>
          <span className="text-xs font-mono text-slate-400">Skill Enhancement Course (SEC)</span>
        </div>
        <h1 className="text-3xl font-headline font-bold text-white tracking-tight">
          Contact Course Team
        </h1>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          For course evaluation inquiries, technical architecture questions, or audit engine demonstration feedback, reach out to the project authors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <SpatialCard title="Academic Context" className="space-y-3" cornerMarkers={false}>
            <div className="text-xs text-slate-300 space-y-2 font-mono">
              <div>
                <strong className="text-white block font-headline">Project Title:</strong>
                <span>QuestForge AI</span>
              </div>
              <div>
                <strong className="text-white block font-headline">Course Domain:</strong>
                <span>Skill Enhancement Course (SEC)</span>
              </div>
              <div>
                <strong className="text-white block font-headline">Primary Architecture:</strong>
                <span>Full-Stack Ingestion, OCR & Deterministic Auditing</span>
              </div>
            </div>
          </SpatialCard>

          <SpatialCard title="Evaluation Note" className="space-y-2 text-xs text-slate-300" cornerMarkers={false}>
            <p className="font-sans leading-relaxed">
              Inquiries submitted through this form are logged in local session memory for demonstration review.
            </p>
          </SpatialCard>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <SpatialCard title="Send Message" glow>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-headline font-bold text-white">Message Logged Successfully</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you for your feedback. Your inquiry has been registered in the academic demonstration ledger.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono bg-navy-950 border border-slate-700 text-white hover:border-cyan-400"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                {error && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900 rounded-lg text-rose-200 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-slate-300 block uppercase font-semibold text-[10px]">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block uppercase font-semibold text-[10px]">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@institution.edu"
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block uppercase font-semibold text-[10px]">Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Course Evaluation Inquiry">Course Evaluation Inquiry</option>
                    <option value="Audit Engine Feedback">Audit Engine Feedback</option>
                    <option value="OCR / Extraction Observation">OCR / Extraction Observation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 block uppercase font-semibold text-[10px]">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or observation..."
                    className="w-full bg-navy-950 border border-slate-700/80 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-headline font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </div>
              </form>
            )}
          </SpatialCard>
        </div>
      </div>
    </div>
  )
}
