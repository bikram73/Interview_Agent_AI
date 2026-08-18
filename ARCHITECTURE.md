# 🏗️ Architecture Document: Interview Agent AI

<div align="center">

[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.6%20Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Express & Netlify](https://img.shields.io/badge/Deployment-Express%20%7C%20Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

</div>

---

## 1. System Overview

**Interview Agent AI** is an autonomous mock interview and candidate evaluation platform designed to simulate real-world hiring loops. The system dynamically generates role-specific interview questions, processes verbal and typed responses, grades candidates against senior-level evaluation rubrics, and outputs structured hiring panel dossiers.

```
+-----------------------------------------------------------------------------------+
|                                  USER INTERFACE                                   |
|  [Landing View]  -->  [Role & Level Selector]  -->  [Interactive Session Room]   |
|         ^                                                      |                  |
|         |                                                      v                  |
|  [Performance View]  <--  [Candidate Final Dossier]  <--  [Answer Evaluation]    |
+-----------------------------------------------------------------------------------+
                                          |
                              REST API via JSON / HTTP
                                          v
+-----------------------------------------------------------------------------------+
|                            APPLICATION SERVER / PROXY                             |
|  * Express.js 4.21 (Containerized Node.js runtime)                                |
|  * Netlify Serverless Functions (/netlify/functions/*)                            |
|  * Environment Variable Isolation (GEMINI_API_KEY protected server-side)          |
+-----------------------------------------------------------------------------------+
                                          |
                               @google/genai SDK
                                          v
+-----------------------------------------------------------------------------------+
|                                  AI INFERENCE                                     |
|  * Google Gemini 3.6 Flash / 2.5 Flash                                            |
|  * Structured JSON Schema Outputs (`responseSchema` Type.OBJECT)                  |
|  * Deterministic Temperature Control (0.2 for reproducible rubric scoring)         |
+-----------------------------------------------------------------------------------+
```

---

## 2. Frontend Architecture (React 19 + TypeScript)

The client application is built with React 19, TypeScript, and Tailwind CSS v4, adhering to unidirectional data flow and clean separation of concerns:

- **`App.tsx` (Root State Machine)**:
  - Manages active screen states (`'landing'`, `'roles'`, `'session'`, `'evaluation'`, `'performance'`).
  - Holds the active session state (`InterviewConfig`, `InterviewQuestion[]`, `InterviewSessionItem[]`, `FinalReport`).
  - Coordinates asynchronous API calls with graceful local fallbacks.

- **`components/LandingView.tsx`**:
  - Displays platform capabilities, industry role previews, statistics, and quick-start actions.

- **`components/RolesView.tsx`**:
  - Filterable library with 11+ preset tracks and custom role definition.
  - Granular configuration for experience levels (*Fresher*, *Junior*, *Mid-Level*, *Senior*) and question counts (5, 8, 10).

- **`components/SessionView.tsx`**:
  - Interactive test environment equipped with a countdown timer, real-time word/character count, and speech-to-text dictation via the browser's Web Speech API.

- **`components/EvaluationView.tsx`**:
  - Immediate post-answer evaluation display with circular score visualization, strengths, weaknesses, actionable advice, and ideal answer bullet points.

- **`components/PerformanceView.tsx`**:
  - Complete summary report featuring aggregate scores, panel hiring recommendation, confidence rating, visual score breakdown by question, full transcript, and `.txt` export functionality.

---

## 3. Server Architecture (Dual Deployment Support)

### 3.1 Container & Express Server Mode (`server.ts`)
In standard containerized environments (Google Cloud Run, Docker, VPS), Express 4.21 manages both API routing and single-page application fallback:
- `/api/generate-questions`: Handles question batch generation.
- `/api/evaluate-answer`: Evaluates single candidate answers.
- `/api/generate-report`: Synthesizes entire transcripts into an executive summary.
- `/*`: Serves compiled static assets from `/dist`.

### 3.2 Serverless Netlify Mode (`/netlify/functions/*`)
When deployed to Netlify:
- Netlify Functions (`generate-questions.ts`, `evaluate-answer.ts`, `generate-report.ts`) execute on AWS Lambda serverless infrastructure.
- `netlify.toml` and `public/_redirects` transparently route `/api/*` requests to `/.netlify/functions/:splat`.

---

## 4. AI Processing Pipeline & Anti-Hallucination

1. **System Prompt Formulation**: Every prompt enforces strict domain boundaries, explicit scoring criteria, and role-appropriate difficulty.
2. **Schema-Enforced Outputs**: The `@google/genai` TypeScript SDK enforces strict JSON Schema definitions (`Type.OBJECT`, `Type.ARRAY`), eliminating markdown formatting glitches or unparseable text.
3. **Low Temperature Setting**: Setting temperature to `0.2` ensures deterministic and fair evaluations across repeated candidate attempts.
4. **Resilient Fallback Engine**: If network disconnects or API limits occur, the client automatically falls back to curated offline questions and evaluation structures to maintain an uninterrupted user experience.

---

## 5. Security & Data Privacy

- **Zero Secret Exposure**: The `GEMINI_API_KEY` is strictly confined to server-side environments and never leaked to the browser bundle.
- **Stateless Operation**: Candidate answers are evaluated in-memory without persistent database storage, ensuring privacy for confidential practice sessions.
- **Input Sanitization**: Request payloads undergo strict validation and length boundaries before AI inference.
