# QuestForge AI — Development Roadmap

Project: QuestForge AI
Course: Skill Enhancement Course (SEC)
Target Delivery: Production-ready MVP

---

## Phases Overview

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 1** | Workspace Inspection & Project Initialization | IN PROGRESS |
| **Phase 2** | Professional Frontend UI, Design System & All 12 Pages | PENDING |
| **Phase 3** | Express Backend, Structured Scholarship Rules & APIs | PENDING |
| **Phase 4** | Document Ingestion Pipeline, OCR & PDF Extraction | PENDING |
| **Phase 5** | AI-Assisted Extraction & Cross-Document Consistency Engine | PENDING |
| **Phase 6** | Audit Engine, Readiness Dashboard & Printable Report | PENDING |
| **Phase 7** | Comprehensive Testing, Security Auditing & Polish | PENDING |

---

## Detailed Phase Breakdown

### Phase 1: Workspace Inspection & Project Initialization
- [x] Check Node, npm, git environment.
- [x] Verify existing workspace files.
- [x] Finalize `SPEC.md` and `ROADMAP.md`.
- [ ] Initialize root `package.json` with scripts for dev coordination.
- [ ] Initialize client workspace (`client/`) with Vite + React + Tailwind CSS + Lucide Icons.
- [ ] Initialize server workspace (`server/`) with Express + security middlewares.
- [ ] Setup `.env.example` and environment validation.
- [ ] Verify both client and server boot cleanly.

### Phase 2: Frontend Foundation & All 12 Pages
- [ ] Setup Tailwind CSS theme (dark navy, charcoal, restrained teal/blue accents).
- [ ] Build shared layouts (RootLayout, Navbar, Footer).
- [ ] Implement all 12 functional routes (Home, About, Scholarship Explorer, Upload, Analysis, Dashboard, Report, Privacy, Terms, Cookies, Contact, 404).
- [ ] Ensure responsive layout and keyboard accessibility.

### Phase 3: Backend APIs & Scholarship Rules Data
- [ ] Configure Express server with Helmet, CORS, Rate Limiting, JSON parsing.
- [ ] Create scholarships dataset with realistic criteria (demonstration + verified rules).
- [ ] Implement `/api/scholarships`, `/api/scholarships/:id`, and `/api/health` endpoints.
- [ ] Provide end-to-end client-server connectivity.

### Phase 4: Document Uploads & OCR/PDF Processing
- [ ] Implement Multer file upload with MIME validation & size restrictions (PDF, PNG, JPG).
- [ ] Build `ocrService` using `tesseract.js` for images and `pdf-parse` for PDFs.
- [ ] Implement document classification heuristics and text extraction API.

### Phase 5: AI-Assisted Extraction & Cross-Document Consistency Engine
- [ ] Gemini API structured field extraction via backend.
- [ ] Deterministic fallback extraction engine for offline/local execution.
- [ ] Cross-document entity comparison (fuzzy name matching, DOB normalization, institution).

### Phase 6: Readiness Dashboard & Report Generation
- [ ] Implement evidence-based audit engine linking issues to specific scholarship guidelines.
- [ ] Build visual readiness score, categorized issue lists, and actionable guidance.
- [ ] Implement exportable/printable readiness report.

### Phase 7: Verification, Security Audits & Demo Prep
- [ ] Test upload variations (valid, invalid, unreadable, mismatched).
- [ ] Test offline/fallback mode.
- [ ] Run security checks (rate limiting, error masking, file restrictions).
- [ ] Document quickstart guide and demo runbook.
