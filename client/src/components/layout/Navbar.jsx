import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShieldCheck, Compass, UploadCloud, LayoutDashboard, Menu, X, Info, Cpu } from 'lucide-react'
import { Badge } from '../common/Badge'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Scholarship Explorer', path: '/scholarships', icon: Compass },
    { name: 'Upload & Audit', path: '/upload', icon: UploadCloud },
    { name: 'Student Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'About', path: '/about', icon: Info },
  ]

  const linkClass = ({ isActive }) =>
    `inline-flex items-center text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
      isActive
        ? 'text-white bg-navy-800 border border-slate-700'
        : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
    }`

  return (
    <header className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Identification */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm border border-brand-500">
              QF
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  QUESTFORGE AI
                </span>
                <Badge variant="teal">SEC MVP</Badge>
              </div>
              <span className="text-[11px] text-slate-400 tracking-normal hidden sm:block">
                Scholarship Application Readiness Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink key={item.path} to={item.path} className={linkClass}>
                  <Icon className="w-4 h-4 mr-1.5 text-slate-400" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/about"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-navy-900 hover:bg-navy-800 border border-slate-800 hover:border-slate-700 transition-colors"
              title="Multi-Provider AI Status & Failover"
            >
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden lg:inline">AI Status</span>
            </Link>
            <Link
              to="/scholarships"
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white border border-brand-500 transition-colors shadow-sm"
            >
              Start Readiness Audit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 border border-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-navy-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'text-white bg-navy-800 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                <Icon className="w-4 h-4 mr-2 text-slate-400" />
                {item.name}
              </Link>
            )
          })}
          <div className="pt-2">
            <Link
              to="/scholarships"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white"
            >
              Start Readiness Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
