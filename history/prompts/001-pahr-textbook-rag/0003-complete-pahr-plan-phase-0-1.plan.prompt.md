---
id: 0003
title: Complete PAHR Plan Phase 0 & 1
stage: plan
date: 2025-12-06
surface: agent
model: gemini-1.5-pro
feature: 001-pahr-textbook-rag
branch: 001-pahr-textbook-rag
user: (unknown)
command: "/sp.plan /sp.plan
Project: AI-Native Textbook + RAG Chatbot for Physical AI & Humanoid Robotics

Purpose:
Define a structured, multi-phase execution plan for building the textbook, RAG system, 
UI components, personalization system, Urdu translation features, and deployment pipeline. 
This plan provides a deterministic roadmap for Claude Code + Spec-Kit Plus automation.

----------------------------------------------------------------
Phase 1 — Project Initialization
----------------------------------------------------------------
1. Create base folder structure using /sp.folder.
2. Initialize Docusaurus project (classic template).
3. Generate base configuration files:
   - docusaurus.config.js
   - sidebars.js
   - gitignore
   - README.md
4. Set up a monorepo-style structure:
   /book
   /rag-backend
   /frontend-widgets
   /auth-system
5. Configure GitHub repository + GitHub Pages for deployment.
6. Create environment variable templates (example.env).

----------------------------------------------------------------
Phase 2 — Textbook Architecture Design
----------------------------------------------------------------
1. Generate complete multi-module book outline.
2. Define chapter blueprint template:
   - Learning outcomes
   - Introduction
   - Core theory
   - Math + diagrams
   - Implementations (ROS2, Isaac Sim)
   - Hands-on labs
   - Real-world applications
   - Key takeaways
   - Quiz
3. Define naming conventions for:
   - Chapters
   - Assets
   - Code samples
4. Create sidebar structure powered by sidebars.js.
5. Generate all *empty* chapter markdown files.

Output: A ready-to-fill book skeleton with perfect navigation.

----------------------------------------------------------------
Phase 3 — Content Generation (Claude Code + Subagents)
----------------------------------------------------------------
1. Create ContentAgent (subagent) for drafting chapters.
2. Create ReviewAgent (subagent) for checking technical correctness.
3. For each chapter:
   - Auto-generate full draft with ContentAgent.
   - Auto-review with ReviewAgent.
   - Auto-generate diagrams (mermaid/flow descriptions).
4. Auto-generate:
   - Glossaries
   - Summary sheets
   - Quizzes
   - Code blocks
5. Generate appendices:
   - Robotics math primer
   - Physics primer
   - AI control systems overview
   - Safety & ethics framework

Output: High-quality, fully generated, technically correct chapters.

----------------------------------------------------------------
Phase 4 — RAG Backend System
----------------------------------------------------------------
1. Initialize FastAPI backend in /rag-backend.
2. Create ingestion pipeline:
   - Markdown → text extraction
   - Chunking + metadata
3. Qdrant Integration:
   - Define collection schema
   - Implement semantic embedding using OpenAI/ChatKit
4. Neon Postgres Integration:
   - User profiles table
   - Logs table
   - Personalization table
5. RAG Pipeline Logic:
   - Retrieve relevant context
   - Rank + filter
   - Generate streaming answer
6. Implement selected-text QA:
   - User highlights text → send selection to backend
7. Create endpoints:
   - /query
   - /ask-selected
   - /ingest-all
   - /user/preferences
8. Add CORS + security middleware.

Output: Fully functional RAG service ready to integrate with frontend.

----------------------------------------------------------------
Phase 5 — Chatbot Frontend UI
----------------------------------------------------------------
1. Create clean, minimal floating chatbot UI:
   - Floating button
   - Drawer modal
   - Chat history
   - Error states
2. Build components:
   - <ChatWidget />
   - <MessageBubble />
   - <LoaderDots />
   - <SelectedTextAsk />
3. Add syntax highlighting for code blocks.
4. Implement streaming responses in UI.
5. Integrate:
   - Highlight → Ask feature
   - RAG Query API
   - Typing animations
6. Optimize for readability + accessibility.

Output: AI tutor embedded directly into the textbook pages.

----------------------------------------------------------------
Phase 6 — Authentication & Personalization (Bonus Points)
----------------------------------------------------------------
1. Integrate Better-Auth in /auth-system workspace.
2. Implement signup:
   - Ask user hardware background
   - Ask user software background
   - Store in Postgres
3. Personalization:
   - Add “Personalize Chapter” button
   - Generate simplified or advanced versions
4. Urdu translation toggle:
   - Add per-chapter toggle
   - Translate using OpenAI
   - Ensure formatting preservation
5. Store user preferences in Postgres.

Output: Personalized, adaptive textbook with Urdu support.

----------------------------------------------------------------
Phase 7 — Subagents + Reusable Skills (Bonus Points)
----------------------------------------------------------------
1. Define Subagents:
   - ContentAgent
   - ReviewAgent
   - CodeAgent
   - RAGAgent
2. Define Agent Skills:
   - CodeExplainer
   - QuizGenerator
   - GlossarySkill
   - DiagramGenerator
   - SummarySkill
3. Attach skills to appropriate tasks.
4. Automate chapter production through pipelines.

Output: Reusable AI intelligence built into the book creation system.

----------------------------------------------------------------
Phase 8 — Deployment & Production Readiness
----------------------------------------------------------------
1. Deploy Docusaurus to GitHub Pages.
2. Deploy FastAPI backend:
   - Render.com / Railway / Fly.io
3. Configure Qdrant Cloud Free Tier.
4. Configure Neon Serverless Postgres.
5. Set up production .env and secrets.
6. Deploy chatbot widget inside book.
7. Validate:
   - RAG queries
   - Selected text QA
   - Personalization toggles
   - Urdu translation stability
8. Run full end-to-end tests.

Output: Fully deployed AI-native textbook + RAG tutor system.

----------------------------------------------------------------
Phase 9 — Final QA, Improvements, and Submission
----------------------------------------------------------------
1. Validate UI across devices.
2. Perform performance tests.
3. Perform RAG retrieval accuracy tests.
4. Fix hallucination risks.
5. Clean up dead code.
6. Generate final README + submission form notes.

----------------------------------------------------------------
Milestones Summary (High-Level)
----------------------------------------------------------------
M1 — Book skeleton + Docusaurus setup  
M2 — All chapters generated  
M3 — RAG backend operational  
M4 — Chatbot fully integrated  
M5 — Personalization + Urdu (bonus)  
M6 — Subagents + Skills (bonus)  
M7 — Full deployment & submission readiness  

End of /sp.plan"
labels: [plan, feature-planning]
links:
  spec: specs/001-pahr-textbook-rag/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-pahr-textbook-rag/plan.md
  - specs/001-pahr-textbook-rag/research.md
  - specs/001-pahr-textbook-rag/data-model.md
  - specs/001-pahr-textbook-rag/contracts/openapi.json
tests:

---

## Prompt

{{PROMPT_TEXT}}

## Response snapshot

The implementation plan for "Physical AI & Humanoid Robotics Textbook + RAG Chatbot" (branch `001-pahr-textbook-rag`) has been comprehensively developed. This includes:
- `specs/001-pahr-textbook-rag/plan.md`: Outlining the multi-phase development roadmap, technical context, constitution check, project structure, and initial research tasks.
- `specs/001-pahr-textbook-rag/research.md`: Documenting research for Docusaurus i18n and Urdu translation.
- `specs/001-pahr-textbook-rag/data-model.md`: Defining core entities and relationships.
- `specs/001-pahr-textbook-rag/contracts/openapi.json`: Specifying API endpoints for RAG queries, ingestion, personalization, and authentication.
The agent context (`GEMINI.md`) has also been updated with the identified technologies.

## Outcome

- ✅ Impact: Comprehensive implementation plan created, detailing architecture, data models, API contracts, and research findings for the PAHR project.
- 🧪 Tests: N/A (Plan generation)
- 📁 Files: Created/updated `specs/001-pahr-textbook-rag/plan.md`, `specs/001-pahr-textbook-rag/research.md`, `specs/001-pahr-textbook-rag/data-model.md`, `specs/001-pahr-textbook-rag/contracts/openapi.json`, and `GEMINI.md`.
- 🔁 Next prompts: The project is now ready for task breakdown (`/sp.tasks`) to begin implementation phases.
- 🧠 Reflection: Successfully executed the planning workflow despite initial script parameter challenges and earlier user interaction issues.

## Evaluation notes (flywheel)

- Failure modes observed: Initial issues with `setup-plan.ps1` argument parsing, requiring re-evaluation of script usage and current branch context.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Enhance `create-new-feature.ps1` and `setup-plan.ps1` for more robust argument handling and user-friendly error messages, potentially by accepting file paths for large inputs or using environment variables.
