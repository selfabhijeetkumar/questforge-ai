import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft, Compass } from 'lucide-react'
import { Button } from '../components/common/Button'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center text-brand-400 mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or verification route you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="secondary" icon={ArrowLeft}>
              Back to Home
            </Button>
          </Link>
          <Link to="/scholarships">
            <Button variant="primary" icon={Compass}>
              Scholarship Explorer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
