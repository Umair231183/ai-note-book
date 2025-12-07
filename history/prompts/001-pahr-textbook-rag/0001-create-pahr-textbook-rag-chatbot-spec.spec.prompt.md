---
id: 0001
title: Create PAHR Textbook RAG Chatbot Spec
stage: spec
date: 2025-12-06
surface: agent
model: gemini-1.5-pro
feature: 001-pahr-textbook-rag
branch: 001-pahr-textbook-rag
user: (unknown)
command: "/sp.specify Project: Physical AI & Humanoid Robotics Textbook + RAG Chatbot Overview: Create an AI-native technical textbook on Physical AI & Humanoid Robotics using Docusaurus. Integrate a fully functional RAG AI Tutor inside the book using FastAPI, Qdrant, Neon Postgres, and OpenAI/ChatKit Agents. Ensure the content is clean, modular, technically accurate, and optimized for educational clarity. Follow modern UI design principles. Primary Goals: 1. Generate a multi-module textbook with consistent chapter structures. 2. Implement a RAG conversational tutor that answers only from the textbook content. 3. Provide clean UI components, professional layout, and user-centered interactions. 4. Enable personalization and optional Urdu translation per chapter (bonus). 5. Make reusable Subagents and Agent Skills through Claude Code (bonus). ---------------------------------------------------------------- System Style Rules: - Use simple, clean, modern structures. - Keep all sections atomic and task-focused. - Maintain professional tone, educational clarity, and technical accuracy. - All generated content must be deterministic, reproducible, and safely modifiable. - Prefer concise functionally descriptive filenames and clean folder structure. ---------------------------------------------------------------- Deliverables: You must produce the following artifacts: 1. **Textbook Structure Specification** - Complete module list - Chapter blueprint template - Sidebar.json structure - Navigation layout - File naming conventions - Assets folder organization 2. **Content Generation Tasks** - Generated chapter outlines - Generated full chapter drafts - URDF descriptions where relevant - Diagrams (Mermaid/Draw.io descriptions) - Example ROS2 code where necessary - Example Isaac Sim code - Example robotics algorithms written clearly 3. **RAG Backend Specification** - FastAPI project structure - Document ingestion pipeline - Qdrant schema - Neon Postgres schema - ChatKit Agent flow - Highlight-based QA flow - Streaming response logic - Safety-layer design 4. **Frontend Chatbot UI Specification** - React component hierarchy - Clean UI rules - Chat drawer/modal design - Code snippet formatting - Message bubble structure - Selected-text question mode 5. **Personalization System Specification** - Better-Auth signup/signin flow - User onboarding questionnaire - Backend schema for personalization - Per-chapter personalization toggle button - Per-chapter Urdu translation toggle button 6. **Subagents + Skills Specification (Bonus)** - Subagent breakdown (ContentAgent, ReviewAgent, CodeAgent, RAGAgent) - Agent Skills API (summaries, code generation, glossary, quizzes) - Reusable tools definitions - Integration into the development workflow 7. **Deployment Specification** - GitHub Pages deployment instructions - FastAPI backend deployment - Qdrant Cloud setup - Neon DB setup - Environment variable mapping - Production build workflows ---------------------------------------------------------------- Constraints: - Text must be extremely readable and student-friendly. - Avoid over-technical jargon unless explained. - All code must be runnable and syntactically correct. - All RAG components must respect context-bound rules. - Subagent logic must remain modular and testable. - Avoid hallucinations: cite content references where needed. - All chapters must have: * Learning outcomes * Introduction * Core theory * Practical implementation * Hands-on labs * Real-world applications * Key takeaways * Quiz ---------------------------------------------------------------- UI/UX Requirements: - Clean, minimalistic, high-contrast reading mode. - 16–18px font, 1.6 line height. - Consistent spacing & typographic rhythm. - Sidebar should be multi-level, fully expandable. - Chatbot must appear on every page as a floating button. - Code blocks must include syntax highlighting. - Urdu translation must not break formatting. ---------------------------------------------------------------- Success Criteria (Evaluation Rubric): - Structural completeness (20 pts) - Technical accuracy (20 pts) - Clean UI & readability (15 pts) - Fully working RAG system (25 pts) - Subagents + Skills (up to 50 bonus pts) - Personalization + Urdu (up to 50 bonus pts) - Code quality, naming, and modularity (20 pts) ---------------------------------------------------------------- Tasks: Break the entire project into atomic tasks. For each task: - Produce clear instructions - Generate required files or content - Follow folder structure strictly - Provide recommended prompts for Claude Code automation - Provide test instructions for each feature End of specification."
labels: [spec, feature-creation]
links:
  spec: specs/001-pahr-textbook-rag/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-pahr-textbook-rag/spec.md
  - specs/001-pahr-textbook-rag/checklists/requirements.md
tests:

---

## Prompt

{{PROMPT_TEXT}}

## Response snapshot

The feature specification for "Physical AI & Humanoid Robotics Textbook + RAG Chatbot" (branch `001-pahr-textbook-rag`) has been created at `specs/001-pahr-textbook-rag/spec.md` and validated. A corresponding quality checklist (`specs/001-pahr-textbook-rag/checklists/requirements.md`) was also generated and marked complete.

## Outcome

- ✅ Impact: Feature specification created and validated, establishing a clear scope and requirements for the project.
- 🧪 Tests: N/A (Specification validation, not code testing)
- 📁 Files: Created `specs/001-pahr-textbook-rag/spec.md` and `specs/001-pahr-textbook-rag/checklists/requirements.md`.
- 🔁 Next prompts: Ready for `/sp.plan` to develop an architectural plan based on this specification.
- 🧠 Reflection: Faced issues with `create-new-feature.ps1` script due to argument parsing for large string, had to manually handle branch checkout and spec creation steps.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` script failed to parse large feature description from `run_shell_command`, leading to `PositionalParameterNotFound` error and requiring manual intervention for branch checkout and file creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve argument parsing for `create-new-feature.ps1` to handle large strings more robustly, possibly by writing input to a temporary file and passing the path.
