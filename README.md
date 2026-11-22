# QUESTFORGE AI
> **Tagline:** Level Up Your Scholarship Application  
> **Course:** Skill Enhancement Course (SEC)  
> **Project Title:** AI-Powered Scholarship Application Readiness and Document Verification Platform

---

## 1. Executive Summary & Purpose

QuestForge AI is an academic pre-submission document auditing assistant designed to help students evaluate their scholarship application documents before submitting them to official scholarship portals.

### Core Value Proposition
- **Pre-Submission Readiness Check:** Eliminates administrative rejections due to missing documents or name discrepancies.
- **Evidence-Based Audit Engine:** Evaluates uploaded PDF and image documents against configured mandatory checklists.
- **Cross-Document Entity Verification:** Compares student name, date of birth, and institution records across multiple certificates.
- **Guideline Citations:** Every finding cites the official rule or guideline reference and offers an actionable recommendation.

> **Operational Boundary Notice:**  
> QuestForge AI is an advisory pre-screening assistant. It does not approve scholarships, guarantee eligibility, or replace official state or national scholarship submission portals.

---

## 2. Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React Icons, React Router v6
- **Backend:** Node.js, Express.js REST API
- **Document Processing:** Tesseract.js (Optical Character Recognition), `pdf-parse` (Digital PDF Extraction)
- **AI Integration:** Google Gemini API via backend proxy with deterministic rule fallback
- **Security:** Helmet, Explicit CORS, Rate Limiting, File validation (PDF, JPG, PNG ≤ 10MB), Volatile memory parsing

---

## 3. Quick Start & Execution

### Prerequisites
- Node.js (v18+ recommended; verified on Node v26)
- npm (v9+)

### Installation
Install dependencies across root, server, and client:
```bash
npm run install:all
```

### Running the Application
To run both backend API (port 5000) and frontend interface (port 5173) concurrently:
```bash
npm run dev
```

Or run individually in separate terminals:
```bash
# Terminal 1: Backend Server (http://localhost:5000)
npm run dev:server

# Terminal 2: Frontend Client (http://localhost:5173)
npm run dev:client
```

Open your browser at **http://localhost:5173** to access the user interface.

### Running Test Suite
Execute the 15-test automated backend and end-to-end integration suite:
```bash
npm --prefix server test
```

### Building for Production
```bash
npm run build
```

---

## 4. Key Pages & Routes

1. **Home (`/`)**: Product introduction, rejection risk breakdown, and 4-step pipeline explanation.
2. **About (`/about`)**: Course context, architectural principles, and deterministic engine boundaries.
3. **Scholarship Explorer (`/scholarships`)**: Searchable, filterable catalog of demonstration scholarships.
4. **Scholarship Detail (`/scholarships/:id`)**: Full rules, award benefits, and mandatory document checklist.
5. **Document Upload (`/upload`)**: Drag-and-drop upload for PDF/JPG/PNG with 1-click synthetic demonstration presets.
6. **Document Analysis (`/analysis`)**: OCR and digital text extraction inspector with structured entity preview.
7. **Audit Results (`/audit-results/:id`)**: Overall status (`Ready for Review`, `Action Required`, `Unable to Verify`), missing document alerts, and cross-record inconsistency findings.
8. **Student Dashboard (`/dashboard`)**: Session history, application readiness summary, and missing documents tracker.
9. **Official Report (`/report/:id`)**: Print-ready and downloadable audit certificate with official disclaimers.
10. **Privacy Policy (`/privacy`)**: In-memory document processing and data protection disclosure.
11. **Terms & Conditions (`/terms`)**: Advisory notice and academic scope.
12. **Cookie Policy (`/cookies`)**: Functional cookie disclosure (zero advertising/tracking cookies).
13. **Contact (`/contact`)**: Course development team inquiry form.
14. **Custom 404 (`*`)**: Graceful fallback routing.

---

## 5. Evaluation Scenarios & Demonstrations

On the **Document Upload** page (`/upload`), use the **Evaluation Shortcut** buttons to test any of the required scenarios instantly:

- **Scenario B (Missing Document):** Ingests Identity, Marksheet, and Institution certificates while omitting the required Income Certificate. The engine flags `Action Required` and cites NMTS Guidelines Section 4.2.
- **Scenario C (Name Inconsistency):** Ingests an ID with `Rahul Sharma` and a marksheet with `Rahul S.`. The engine detects the initial variation and flags `Unable to Verify` with a recommendation to check portal name affidavit rules.
- **Scenario A (Fully Matching Documentation):** Ingests all 4 required documents with matching names. The engine awards `Ready for Review`.

---

## 6. License & Academic Attribution
Developed as an academic Skill Enhancement Course (SEC) project. All sample scholarship data is synthetic demonstration data.
