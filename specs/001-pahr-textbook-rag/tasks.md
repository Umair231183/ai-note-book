# Tasks: Physical AI & Humanoid Robotics Textbook + RAG Chatbot

**Feature Branch**: `001-pahr-textbook-rag` | **Date**: 2025-12-21
**Input**: Feature specification from `specs/001-pahr-textbook-rag/spec.md`
**Plan**: `specs/001-pahr-textbook-rag/plan.md`
**Data Model**: `specs/001-pahr-textbook-rag/data-model.md`
**API Contracts**: `specs/001-pahr-textbook-rag/contracts/openapi.json`
**Research**: `specs/001-pahr-textbook-rag/research.md`

## Summary

This document outlines the detailed, actionable tasks required to implement the "Physical AI & Humanoid Robotics Textbook + RAG Chatbot" feature, organized by phases and user stories. Each task adheres to the specified checklist format, including a unique ID, parallelization marker (P), user story label (where applicable), and file paths.

## Dependencies

User Story Completion Order:
- User Story 1 (Reading Textbook Content) -> User Story 2 (Interacting with RAG AI Tutor) -> User Story 3 (Personalized Learning Experience)

## Parallel Execution Examples

- **Backend Development (Python)**:
  - T010 [P] Create FastAPI app structure in `docusaurus_app/backend/main.py`
  - T011 [P] Implement RAG pipeline core in `docusaurus_app/backend/src/services/rag_service.py`
- **Frontend Development (React/Docusaurus)**:
  - T013 [P] Configure Docusaurus sidebar in `docusaurus_app/sidebars.js`
  - T014 [P] Create base `Layout` component in `docusaurus_app/src/components/Layout.js`

## Implementation Strategy

The project will follow an MVP-first approach, incrementally delivering user stories in priority order (P1 -> P2 -> P3). Core textbook content display (US1) is the absolute MVP, followed by the RAG chatbot (US2). Personalization and Subagents (US3 and beyond) are considered bonus features and will be integrated after core functionality is stable.

## Phase 1: Setup (Project Initialization)

*Goal: Establish foundational project structure and basic configurations.*

- [X] T001 Create monorepo folder structure in `docusaurus_app/` (verify exists)
- [X] T002 Initialize Docusaurus project (classic template) in `docusaurus_app/` (verify exists)
- [X] T003 Generate base Docusaurus config files: `docusaurus_app/docusaurus.config.js`, `docusaurus_app/sidebars.js` (verify exists)
- [ ] T004 Create and configure `.gitignore` for `docusaurus_app/`
- [X] T005 Initialize FastAPI backend folder `docusaurus_app/backend/` (verify exists)
- [X] T006 Create initial `docusaurus_app/backend/requirements.txt` with `fastapi`, `uvicorn`, `langchain`, `openai`, `qdrant-client`, `psycopg2-binary`
- [ ] T007 Configure GitHub repository + GitHub Pages for deployment (initial setup only)
- [X] T008 Create `docusaurus_app/.env.example` for environment variables (`OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `NEON_DATABASE_URL`)

## Phase 2: Foundational (Core Backend & Docusaurus Setup)

*Goal: Set up shared services and Docusaurus content infrastructure independent of specific user stories.*

- [X] T009 [P] Create base FastAPI app structure in `docusaurus_app/backend/main.py`
- [X] T010 [P] Implement CORS and basic error handling middleware in `docusaurus_app/backend/main.py`
- [X] T011 [P] Define Pydantic models for `QueryRequest`, `ChatbotResponse` in `docusaurus_app/backend/src/models/`
- [ ] T012 [P] Configure Docusaurus for content markdown processing, `mermaid` diagrams in `docusaurus_app/docusaurus.config.js`
- [X] T013 [P] Define `Chapter` data model (entities) in `docusaurus_app/backend/src/models/chapter.py` (based on data-model.md)
- [X] T014 [P] Define `Module` data model (entities) in `docusaurus_app/backend/src/models/module.py` (based on data-model.md)
- [ ] T015 [P] Create initial Docusaurus homepage `docusaurus_app/src/pages/index.js` and `docusaurus_app/src/pages/index.module.css`
- [ ] T016 [P] Integrate custom CSS `docusaurus_app/src/css/custom.css`

## Phase 3: User Story 1 - Reading Textbook Content (P1)

*Goal: Enable users to navigate and read all textbook content effectively.*

*Independent Test: A user can access the textbook, browse through chapters, and read content without encountering navigation issues or formatting errors.*

- [ ] T017 [P] [US1] Define Docusaurus sidebar structure for all modules and chapters in `docusaurus_app/sidebars.js`
- [ ] T018 [P] [US1] Create empty Markdown files for all modules and chapters based on the `Article IV — Official Module List` in the Constitution (e.g., `docusaurus_app/docs/01-introduction.md`, `docusaurus_app/docs/02-literature-review.md`, etc.)
- [ ] T019 [P] [US1] Implement consistent chapter blueprint template for Markdown files (Learning Outcomes, Intro, Core Concepts, etc.) (content generation tasks to follow in later phase)
- [ ] T020 [P] [US1] Verify clean typography, high contrast, and distraction-free layout for Docusaurus content pages via `docusaurus_app/src/css/custom.css`
- [ ] T021 [P] [US1] Ensure code blocks have syntax highlighting in Docusaurus via `docusaurus_app/docusaurus.config.js`
- [ ] T022 [P] [US1] Create examples of figures and diagrams with labels and captions in an example chapter Markdown file
- [ ] T023 [P] [US1] Implement chapter summary boxes in Docusaurus layout components (e.g., `docusaurus_app/src/components/ChapterSummary.js`)
- [ ] T024 [P] [US1] Implement "Key Takeaways" section per chapter using Docusaurus layout components
- [ ] T025 [US1] Integrate a basic Quiz or Self-Check component (e.g., `docusaurus_app/src/components/Quiz.js`)
- [ ] T025a [P] [US1] Generate URDF descriptions for humanoid robots based on textbook content in `docusaurus_app/docs/appendices/urdf-examples.md`
- [ ] T025b [P] [US1] Create Mermaid/Draw.io diagram descriptions for robotics concepts in `docusaurus_app/docs/appendices/diagrams.md`
- [ ] T025c [P] [US1] Write example ROS2 code snippets for textbook concepts in `docusaurus_app/docs/appendices/ros2-examples.md`
- [ ] T025d [P] [US1] Write example Isaac Sim code snippets in `docusaurus_app/docs/appendices/isaac-sim-examples.md`
- [ ] T025e [P] [US1] Document example robotics algorithms in `docusaurus_app/docs/appendices/algorithm-examples.md`

## Phase 4: User Story 2 - Interacting with the RAG AI Tutor (P1)

*Goal: Provide a fully functional RAG chatbot that answers questions from textbook content.*

*Independent Test: A user can open the chatbot, ask a question directly related to the textbook content, and receive a relevant, cited answer.*

- [X] T026 [P] [US2] Install Python dependencies for RAG backend in `docusaurus_app/backend/` (langchain, openai, qdrant-client, etc.)
- [X] T027 [P] [US2] Update `docusaurus_app/backend/main.py` to import and initialize `RAGChatbot` from `docusaurus_app/backend/src/chatbot/rag_chatbot.py`
- [X] T028 [P] [US2] Implement `/api/query` POST endpoint in `docusaurus_app/backend/main.py` for RAG chatbot queries (based on openapi.json)
- [X] T029 [P] [US2] Implement `/api/ask-selected` POST endpoint in `docusaurus_app/backend/main.py` for highlight-based QA (based on openapi.json)
- [X] T030 [P] [US2] Implement content ingestion endpoint `/api/ingest-content` (Admin/Internal) in `docusaurus_app/backend/main.py` (based on openapi.json)
- [X] T031 [P] [US2] Implement Qdrant client initialization and interaction in `docusaurus_app/backend/src/services/vector_store_service.py` (based on plan.md)
- [X] T032 [P] [US2] Implement `RAGChatbot` logic for document retrieval from Qdrant and LLM response generation in `docusaurus_app/backend/src/services/rag_service.py`
- [X] T033 [P] [US2] Implement safety-layer logic within `docusaurus_app/backend/src/services/rag_service.py` to prevent inappropriate responses
- [ ] T034 [P] [US2] Create Docusaurus `docusaurus_app/src/pages/chatbot.js` page
- [ ] T035 [P] [US2] Build base `ChatbotUI` React component `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T036 [P] [US2] Implement floating chatbot button in Docusaurus layout (e.g., `docusaurus_app/src/theme/Layout.js` or `docusaurus_app/src/components/FloatChatButton.js`)
- [ ] T037 [P] [US2] Develop smooth slide-up drawer/modal for chatbot UI in `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T038 [P] [US2] Implement chat history display and message bubble structure in `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T039 [P] [US2] Add basic loading indicators/animations to `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T040 [P] [US2] Implement interaction with `/api/query` and `/api/ask-selected` from `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T041 [P] [US2] Ensure mobile responsiveness for the chatbot UI via `docusaurus_app/src/css/custom.css` or `ChatbotUI.module.css`
- [ ] T042 [P] [US2] Implement display of source citations in `docusaurus_app/src/components/ChatbotUI.js`
- [ ] T043 [US2] Implement streaming responses from backend to frontend for chatbot in `docusaurus_app/src/components/ChatbotUI.js`

## Phase 5: User Story 3 - Personalized Learning Experience (P2)

*Goal: Provide personalized content and optional Urdu translation for users.*

*Independent Test: A user can set their preferences (experience, language) and observe changes in recommendations or content display (e.g., Urdu translation).*

- [X] T044 [P] [US3] Define `User` and `UserPreference` data models in `docusaurus_app/backend/src/models/user.py` (based on data-model.md)
- [X] T045 [P] [US3] Implement Neon Postgres client initialization and interaction in `docusaurus_app/backend/src/services/db_service.py`
- [ ] T046 [P] [US3] Implement `/auth/signup` POST endpoint for user registration in `docusaurus_app/backend/main.py` (based on openapi.json)
- [ ] T047 [P] [US3] Implement `/auth/signin` POST endpoint for user login in `docusaurus_app/backend/main.py` (based on openapi.json)
- [ ] T048 [P] [US3] Implement `/user/preferences` GET/POST endpoints for managing user preferences in `docusaurus_app/backend/main.py` (based on openapi.json)
- [ ] T049 [P] [US3] Implement `/translate/chapter` POST endpoint for dynamic Urdu translation in `docusaurus_app/backend/main.py` (based on openapi.json and research.md)
- [ ] T050 [P] [US3] Implement user onboarding questionnaire UI in Docusaurus page (e.g., `docusaurus_app/src/pages/onboarding.js`)
- [ ] T051 [P] [US3] Integrate user authentication components (signup/signin) into Docusaurus UI (e.g., `docusaurus_app/src/components/Auth.js`)
- [ ] T052 [P] [US3] Develop "Personalize Chapter" toggle button in Docusaurus chapter layout/component (e.g., `docusaurus_app/src/components/PersonalizationToggle.js`)
- [ ] T053 [P] [US3] Develop per-chapter Urdu translation toggle button in Docusaurus chapter layout/component (e.g., `docusaurus_app/src/components/UrduToggle.js`)
- [ ] T054 [P] [US3] Implement logic to display personalized content versions based on user preferences in Docusaurus
- [ ] T055 [US3] Implement dynamic Urdu translation display logic in Docusaurus, preserving formatting (based on research.md)

## Phase 6: Subagents + Reusable Skills (Bonus Points)

*Goal: Implement modular AI subagents and reusable skills to enhance project capabilities.*

- [X] T056 [P] [US3] Define `Subagent` and `AgentSkill` data models in `docusaurus_app/backend/src/models/agent.py`
- [X] T057 [P] Implement base `Subagent` class (e.g., `ContentAgent`, `ReviewAgent`) in `docusaurus_app/backend/src/agents/`
- [X] T058 [P] Implement base `AgentSkill` class (e.g., `CodeExplainer`, `QuizGenerator`) in `docusaurus_app/backend/src/skills/`
- [X] T059 [P] Create an example `ContentAgent` for drafting chapter outlines in `docusaurus_app/backend/src/agents/content_agent.py`
- [X] T060 [P] Create an example `CodeExplainer` skill in `docusaurus_app/backend/src/skills/code_explainer.py`
- [ ] T061 [P] Implement integration of agents and skills into a content generation pipeline (e.g., via new backend endpoints or CLI tools)

## Phase 7: Deployment & Production Readiness

*Goal: Successfully deploy the entire application and ensure its production readiness.*

- [ ] T062 [P] Finalize `docusaurus_app/.env.production` for production environment variables and secrets
- [ ] T063 [P] Configure Docusaurus for deployment to GitHub Pages (`docusaurus_app/docusaurus.config.js`)
- [ ] T064 [P] Implement CI/CD pipeline for Docusaurus frontend deployment to GitHub Pages (e.g., `.github/workflows/deploy-docusaurus.yml`)
- [ ] T065 [P] Prepare FastAPI backend for deployment on a cloud platform (e.g., Dockerfile in `docusaurus_app/backend/`)
- [ ] T066 [P] Configure Qdrant Cloud Free Tier for production use
- [ ] T067 [P] Configure Neon Serverless Postgres for production use
- [ ] T068 [P] Implement CI/CD pipeline for FastAPI backend deployment (e.g., `.github/workflows/deploy-backend.yml`)
- [ ] T069 [P] Configure production logging and monitoring for backend and frontend
- [ ] T070 [P] Deploy the chatbot widget inside the book (ensure it works with production backend endpoint)

## Phase 8: Final QA, Improvements, and Submission

*Goal: Conduct final quality assurance, make improvements, and prepare for submission.*

- [ ] T071 [P] Validate UI across various devices and screen sizes for responsiveness
- [ ] T072 [P] Perform comprehensive performance tests for both frontend and backend
- [ ] T073 [P] Conduct thorough RAG retrieval accuracy tests to minimize hallucinations
- [ ] T074 [P] Review and fix any identified hallucination risks in RAG responses
- [ ] T075 [P] Clean up any dead code, unused dependencies, and refactor for clarity
- [ ] T076 [P] Generate final `docusaurus_app/README.md` and submission notes
- [ ] T077 [P] Prepare a 90-second demo video (as per `Article X` of Constitution)
- [ ] T078 [P] Final check against all Success Criteria and Constraints in `spec.md`
- [ ] T079 [P] Submit the project using the official Google Form

## Suggested Commit Message

```
feat: Generate comprehensive tasks for PAHR textbook and RAG chatbot
```