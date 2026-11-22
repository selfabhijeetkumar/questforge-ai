import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Calendar, Award, CheckSquare, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react'
import { fetchScholarships } from '../services/api'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export function ScholarshipExplorerPage() {
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [educationLevel, setEducationLevel] = useState('All')

  const loadScholarships = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchScholarships({ search, category, educationLevel })
      setScholarships(response.data || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch scholarships')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadScholarships()
  }, [category, educationLevel])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    loadScholarships()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="teal">Scholarship Explorer</Badge>
          <Badge variant="demo">Synthetic Sample Data</Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Configured Scholarship Programs
        </h1>
        <p className="text-sm text-slate-300">
          Browse demonstration scholarship schemes with configured mandatory document requirements and eligibility rules. Select a program to view its checklist or start a pre-submission document audit.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, provider, or keyword..."
              className="w-full bg-navy-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Categories</option>
              <option value="Merit-Cum-Means">Merit-Cum-Means</option>
              <option value="Merit-Based">Merit-Based</option>
              <option value="Need-Based">Need-Based</option>
            </select>
          </div>

          {/* Education Level Filter */}
          <div>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full bg-navy-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Education Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </form>
      </Card>

      {/* Scholarship List */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading configured scholarship dataset...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-rose-950/40 border border-rose-900 rounded-lg text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <h3 className="text-sm font-semibold text-white">Failed to Load Scholarships</h3>
          <p className="text-xs text-rose-200">{error}</p>
          <Button size="sm" variant="outline" onClick={loadScholarships}>
            Retry
          </Button>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="p-12 bg-navy-900 border border-slate-800 rounded-lg text-center space-y-3">
          <p className="text-sm text-slate-400">No scholarships match the selected search or filter criteria.</p>
          <Button size="sm" variant="secondary" onClick={() => { setSearch(''); setCategory('All'); setEducationLevel('All'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((sch) => (
            <Card key={sch.id} className="flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-brand-400 font-semibold">{sch.code}</span>
                  {sch.isDemonstration && <Badge variant="demo">Demonstration</Badge>}
                </div>

                <h2 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {sch.title}
                </h2>

                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">Provider:</strong> {sch.provider}
                </p>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {sch.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Award:</strong> {sch.awardAmount}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong>Deadline:</strong> {sch.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span><strong>Mandatory Documents:</strong> {sch.mandatoryDocuments?.length || 0} required</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <Link to={`/scholarships/${sch.id}`} className="text-xs font-medium text-slate-300 hover:text-white underline">
                  View Rules
                </Link>
                <Link to={`/upload?scholarshipId=${sch.id}`}>
                  <Button size="sm" variant="primary" icon={ArrowRight}>
                    Audit Documents
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
