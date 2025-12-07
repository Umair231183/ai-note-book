# Implementation Plan: AI-Native Textbook + RAG Chatbot for Physical AI & Humanoid Robotics

**Branch**: `001-pahr-textbook-rag` | **Date**: 2025-12-06 | **Spec**: [specs/001-pahr-textbook-rag/spec.md](specs/001-pahr-textbook-rag/spec.md)
**Input**: Feature specification from `specs/001-pahr-textbook-rag/spec.md`

## Summary

This plan outlines the development of an AI-native textbook on Physical AI & Humanoid Robotics, leveraging Docusaurus for content delivery. It integrates a Retrieval-Augmented Generation (RAG) AI Tutor, powered by a FastAPI backend, Qdrant vector store, Neon Postgres database, and OpenAI/ChatKit Agents. The project aims to deliver a modular, accurate, and educationally clear textbook with a professional UI, complemented by the RAG chatbot, and optionally enhanced with personalization, Urdu translation, and reusable AI subagents.

## Technical Context

**Language/Version**: Python 3.10+ (for FastAPI, LangChain, OpenAI libraries); Node.js 18+ (for Docusaurus, React).
**Primary Dependencies**: FastAPI, Uvicorn, LangChain, OpenAI (backend); Docusaurus, React (frontend); Qdrant (vector store); Neon PostgreSQL (database).
**Storage**: Qdrant for vector embeddings (textbook content); Neon PostgreSQL for user profiles and application logs.
**Testing**: Backend (Python): `pytest`; Frontend (JavaScript): `Jest`, `React Testing Library`.
**Target Platform**: Web (browser) for frontend; Linux/containerized environment for FastAPI backend (e.g., Docker, cloud platforms).
**Performance Goals**: RAG query response time p95 < 3 seconds; Textbook page load time p95 < 1 second; Real-time streaming responses for chatbot.
**Constraints**: Textbook content must be highly readable and student-friendly; Avoid technical jargon unless explicitly explained; All code examples must be runnable and syntactically correct; RAG components must strictly adhere to context-bound rules to prevent hallucinations, with citations for all answers; Subagent logic must be modular and independently testable; Each chapter must include: Learning Outcomes, Introduction, Core Theory, Practical Implementation, Hands-on Labs, Real-World Applications, Key Takeaways, Quiz.
**Scale/Scope**: Development of a multi-module textbook; Full integration of a RAG chatbot; Optional implementation of personalization features (e.g., recommendations, user preferences); Optional per-chapter Urdu translation; Optional development of reusable AI Subagents and Agent Skills.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The plan aligns fully with the project constitution, addressing all articles:
*   **Article I (Vision & Mission)**: Aligns with creating an accessible, high-quality textbook with an interactive RAG AI Tutor.
*   **Article II (Book Structure)**: Adheres to UI structure requirements (typography, contrast, code blocks, etc.).
*   **Article III (Chapters & Content Hierarchy)**: Defines chapter content structure as mandated.
*   **Article IV (Official Module List)**: The plan's content generation phase will incorporate these modules.
*   **Article V (Chatbot Constitution)**: Explicitly details RAG functionality, context-binding, and citation requirements.
*   **Article VI (Backend Architecture)**: Specifies FastAPI, Qdrant, Neon Postgres, and OpenAI/ChatKit as required.
*   **Article VII (UI Design Rules for the Chatbot)**: Covers floating button, drawer modal, clean UI rules, etc.
*   **Article VIII (User Profile System)**: Addresses user profiles within personalization.
*   **Article IX (Assessment Criteria)**: The plan's deliverables directly map to these criteria.
*   **Article X (Deployment & Submission)**: Includes deployment instructions for all components.
*   **Final Article (Guiding Values)**: Promotes accuracy, clarity, simplicity, and safety.

No violations detected; the plan is in full compliance with the Project Constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-pahr-textbook-rag/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

The project will operate within a monorepo-style structure, with `docusaurus_app` serving as the main project container. Logical separations will exist for the Docusaurus frontend and the FastAPI RAG backend.

```
docusaurus_app/
├── backend/            # FastAPI RAG backend (contains main.py, requirements.txt, etc.)
│   └── src/
│       ├── api/        # FastAPI API endpoints
│       └── services/   # RAG specific services, e.g., vector DB access, LLM orchestration
├── src/                # Docusaurus source code (frontend)
│   ├── cahtobot/       # Contains rag_chatbot.py (can be moved into backend or used as library)
│   ├── components/     # React components, e.g., ChatbotUI.js
│   ├── pages/          # Docusaurus pages (index.js, chatbot.js)
│   └── css/            # Custom CSS for Docusaurus
└── ...                 # Other Docusaurus configuration, content (docs, blog)
```

**Structure Decision**: The project will initially leverage the existing `docusaurus_app` as the primary monorepo root. The backend implementation will reside in `docusaurus_app/backend`, and the frontend components within `docusaurus_app/src`. The `rag_chatbot.py` will be integrated into the `docusaurus_app/backend` as a service.

## Complexity Tracking

## Phases

### Phase 0: Outline & Research

**Research Tasks**:

1.  **Decision**: Docusaurus for textbook platform.
    *   Rationale: Specified by user. Provides static site generation, React components, markdown support.
    *   Alternatives considered: Next.js, GitBook, custom React app (rejected due to overhead/time).
2.  **Decision**: FastAPI for RAG backend.
    *   Rationale: Specified by user. High performance, async support, Pydantic integration.
    *   Alternatives considered: Flask, Django (rejected for being heavier or less async-native).
3.  **Decision**: Qdrant for vector store.
    *   Rationale: Specified by user. Cloud-native, good for semantic search, integrates with LangChain.
    *   Alternatives considered: Pinecone, Chroma, FAISS (rejected due to cost, self-hosting complexity, or features).
4.  **Decision**: Neon Postgres for database.
    *   Rationale: Specified by user. Serverless Postgres, good for logs/profiles.
    *   Alternatives considered: Supabase, other managed PostgreSQL (rejected due to specific feature preference or cost).
5.  **Decision**: OpenAI for embeddings and LLM.
    *   Rationale: Specified by user. Standard for RAG, provides ChatKit Agents.
    *   Alternatives considered: Anthropic, custom fine-tuned models (rejected for complexity/cost).
6.  **Research**: Best practices for Docusaurus i18n for Urdu translation.
    *   What we need to know: How to integrate a translation API (e.g., Google Translate API, OpenAI API) with Docusaurus's i18n system for dynamic per-chapter translation, ensuring formatting preservation.

**Output**: research.md (to be generated next)