# Feature Specification: Physical AI & Humanoid Robotics Textbook + RAG Chatbot

**Feature Branch**: `001-pahr-textbook-rag`
**Created**: 2025-12-06
**Status**: Draft
**Input**: User description: "Project: Physical AI & Humanoid Robotics Textbook + RAG Chatbot Overview: Create an AI-native technical textbook on Physical AI & Humanoid Robotics using Docusaurus. Integrate a fully functional RAG AI Tutor inside the book using FastAPI, Qdrant, Neon Postgres, and OpenAI/ChatKit Agents. Ensure the content is clean, modular, technically accurate, and optimized for educational clarity. Follow modern UI design principles. Primary Goals: 1. Generate a multi-module textbook with consistent chapter structures. 2. Implement a RAG conversational tutor that answers only from the textbook content. 3. Provide clean UI components, professional layout, and user-centered interactions. 4. Enable personalization and optional Urdu translation per chapter (bonus). 5. Make reusable Subagents and Agent Skills through Claude Code (bonus). ---------------------------------------------------------------- System Style Rules: - Use simple, clean, modern structures. - Keep all sections atomic and task-focused. - Maintain professional tone, educational clarity, and technical accuracy. - All generated content must be deterministic, reproducible, and safely modifiable. - Prefer concise functionally descriptive filenames and clean folder structure. ---------------------------------------------------------------- Deliverables: You must produce the following artifacts: 1. **Textbook Structure Specification** - Complete module list - Chapter blueprint template - Sidebar.json structure - Navigation layout - File naming conventions - Assets folder organization 2. **Content Generation Tasks** - Generated chapter outlines - Generated full chapter drafts - URDF descriptions where relevant - Diagrams (Mermaid/Draw.io descriptions) - Example ROS2 code where necessary - Example Isaac Sim code - Example robotics algorithms written clearly 3. **RAG Backend Specification** - FastAPI project structure - Document ingestion pipeline - Qdrant schema - Neon Postgres schema - ChatKit Agent flow - Highlight-based QA flow - Streaming response logic - Safety-layer design 4. **Frontend Chatbot UI Specification** - React component hierarchy - Clean UI rules - Chat drawer/modal design - Code snippet formatting - Message bubble structure - Selected-text question mode 5. **Personalization System Specification** - Better-Auth signup/signin flow - User onboarding questionnaire - Backend schema for personalization - Per-chapter personalization toggle button - Per-chapter Urdu translation toggle button 6. **Subagents + Skills Specification (Bonus)** - Subagent breakdown (ContentAgent, ReviewAgent, CodeAgent, RAGAgent) - Agent Skills API (summaries, code generation, glossary, quizzes) - Reusable tools definitions - Integration into the development workflow 7. **Deployment Specification** - GitHub Pages deployment instructions - FastAPI backend deployment - Qdrant Cloud setup - Neon DB setup - Environment variable mapping - Production build workflows ---------------------------------------------------------------- Constraints: - Text must be extremely readable and student-friendly. - Avoid over-technical jargon unless explained. - All code must be runnable and syntactically correct. - All RAG components must respect context-bound rules. - Subagent logic must remain modular and testable. - Avoid hallucinations: cite content references where needed. - All chapters must have: * Learning outcomes * Introduction * Core theory * Practical implementation * Hands-on labs * Real-world applications * Key takeaways * Quiz ---------------------------------------------------------------- UI/UX Requirements: - Clean, minimalistic, high-contrast reading mode. - 16–18px font, 1.6 line height. - Consistent spacing & typographic rhythm. - Sidebar should be multi-level, fully expandable. - Chatbot must appear on every page as a floating button. - Code blocks must include syntax highlighting. - Urdu translation must not break formatting. ---------------------------------------------------------------- Success Criteria (Evaluation Rubric): - Structural completeness (20 pts) - Technical accuracy (20 pts) - Clean UI & readability (15 pts) - Fully working RAG system (25 pts) - Subagents + Skills (up to 50 bonus pts) - Personalization + Urdu (up to 50 bonus pts) - Code quality, naming, and modularity (20 pts) ---------------------------------------------------------------- Tasks: Break the entire project into atomic tasks. For each task: - Produce clear instructions - Generate required files or content - Follow folder structure strictly - Provide recommended prompts for Claude Code automation - Provide test instructions for each feature End of specification."

## Overview

This feature defines the creation of an AI-native technical textbook on Physical AI & Humanoid Robotics using Docusaurus. It integrates a fully functional Retrieval-Augmented Generation (RAG) AI Tutor within the book, powered by FastAPI, Qdrant, Neon Postgres, and OpenAI/ChatKit Agents. The project emphasizes clean, modular, technically accurate content optimized for educational clarity and adheres to modern UI design principles.

## Primary Goals

1.  Generate a multi-module textbook with consistent chapter structures.
2.  Implement a RAG conversational tutor that answers only from the textbook content.
3.  Provide clean UI components, professional layout, and user-centered interactions.
4.  Enable personalization and optional Urdu translation per chapter (bonus).
5.  Make reusable Subagents and Agent Skills through Claude Code (bonus).

## System Style Rules

-   Use simple, clean, modern structures.
-   Keep all sections atomic and task-focused.
-   Maintain professional tone, educational clarity, and technical accuracy.
-   All generated content must be deterministic, reproducible, and safely modifiable.
-   Prefer concise functionally descriptive filenames and clean folder structure.

## User Scenarios & Testing

### User Story 1 - Reading Textbook Content (Priority: P1)

As a student, I want to easily navigate and read the textbook content, so that I can learn about Physical AI and Humanoid Robotics.

**Why this priority**: Core value proposition of the project is the textbook content itself. Without readable content, other features are moot.

**Independent Test**: A user can access the textbook, browse through chapters, and read content without encountering navigation issues or formatting errors.

**Acceptance Scenarios**:

1.  **Given** a user is on the homepage, **When** they click on a chapter in the sidebar, **Then** the chapter content is displayed correctly and is easy to read.
2.  **Given** a user is reading a chapter, **When** they scroll through the content, **Then** the typography and layout remain consistent and high-contrast.
3.  **Given** a user encounters a code block, **When** they view the code, **Then** it is syntax-highlighted and readable.
4.  **Given** a user views a figure or diagram, **When** they see the visual, **Then** it is labeled and captioned appropriately.

---

### User Story 2 - Interacting with the RAG AI Tutor (Priority: P1)

As a student, I want to ask questions about the textbook content and receive accurate, cited answers from an AI tutor, so that I can deepen my understanding.

**Why this priority**: This is a primary innovative feature providing significant educational value.

**Independent Test**: A user can open the chatbot, ask a question directly related to the textbook content, and receive a relevant, cited answer.

**Acceptance Scenarios**:

1.  **Given** a user is on any page, **When** they click the floating chatbot button, **Then** a smooth slide-up drawer or modal appears.
2.  **Given** the chatbot is open, **When** a user types a question related to the textbook, **Then** the chatbot responds with an answer derived solely from the book content.
3.  **Given** the chatbot provides an answer, **When** the answer contains information from specific chapters, **Then** it includes citations to those chapters.
4.  **Given** the chatbot is active, **When** the user asks a complex question, **Then** the chatbot can summarize the topic clearly.

---

### User Story 3 - Personalized Learning Experience (Priority: P2)

As a student, I want to receive personalized chapter recommendations and potentially view content in Urdu, so that my learning experience is tailored to my needs and preferences.

**Why this priority**: Enhances user engagement and accessibility, adding significant bonus value.

**Independent Test**: A user can set their preferences (experience, language) and observe changes in recommendations or content display (e.g., Urdu translation).

**Acceptance Scenarios**:

1.  **Given** a user has set their preferred language to Urdu, **When** they navigate to a chapter with Urdu translation enabled, **Then** the content is displayed in Urdu without breaking formatting.
2.  **Given** a user has provided their experience level, **When** they view the textbook, **Then** they receive chapter recommendations relevant to their experience.

---

### Edge Cases

-   What happens when a user asks a question to the chatbot that is *not* covered in the textbook content? The chatbot should indicate that it cannot answer based on the provided material or ask for clarification.
-   How does the system handle an invalid `OPENAI_API_KEY` for the RAG backend? The backend should return an appropriate error, and the frontend should display a user-friendly message.
-   What happens if the vector store is unavailable or corrupted? The backend should report an error.
-   How does the UI respond to network connectivity issues when interacting with the chatbot? The frontend should provide feedback (e.g., "connecting..." or "network error").
-   What is the behavior for very long user queries or bot responses? The UI should handle scrolling and display appropriately.

## Requirements

### Functional Requirements

**Textbook Structure & Content:**
-   **FR-101**: The system MUST present a complete multi-module textbook.
-   **FR-102**: Each chapter MUST adhere to a consistent structure (Learning Outcomes, Introduction, Core Concepts, Technical Implementation, Hands-on Activities/Labs, Real-World Applications, Key Takeaways, Quiz).
-   **FR-103**: The textbook MUST include a clear sidebar with chapter hierarchy and navigation.
-   **FR-104**: The system MUST support standard file naming conventions and assets folder organization for content.
-   **FR-105**: The system MUST generate chapter outlines and full chapter drafts.
-   **FR-106**: The system MUST incorporate URDF descriptions, diagrams (Mermaid/Draw.io descriptions), example ROS2 code, example Isaac Sim code, and example robotics algorithms where relevant.

**RAG Backend System:**
-   **FR-201**: The system MUST utilize a FastAPI project structure for the backend.
-   **FR-202**: The system MUST implement a document ingestion pipeline to process textbook content into the vector store.
-   **FR-203**: The system MUST use Qdrant for vector storage.
-   **FR-204**: The system MUST use Neon Postgres for logs and user profiles (if implemented).
-   **FR-205**: The system MUST implement a ChatKit Agent flow for reasoning and conversational management.
-   **FR-206**: The system MUST support highlight-based question answering.
-   **FR-207**: The system MUST provide streaming responses from the RAG system to the chatbot UI.
-   **FR-208**: The system MUST include a safety-layer design to prevent inappropriate or off-topic responses.

**Frontend Chatbot UI:**
-   **FR-301**: The chatbot UI MUST be built with a React component hierarchy.
-   **FR-302**: The chatbot UI MUST adhere to defined clean UI rules (rounded corners, 14-16px input text, visually separated messages, consistent spacing, mobile responsive).
-   **FR-303**: The chatbot UI MUST have a smooth slide-up drawer or modal design.
-   **FR-304**: The chatbot UI MUST support syntax highlighting for code snippets in responses.
-   **FR-305**: The chatbot UI MUST display messages in a structured bubble format.
-   **FR-306**: The chatbot UI MUST include a "Selected-text question mode".

**Personalization System (Bonus):**
-   **FR-401**: The system SHOULD implement a user signup/signin flow (e.g., using Better-Auth).
-   **FR-402**: The system SHOULD include a user onboarding questionnaire for preference collection.
-   **FR-403**: The system SHOULD define a backend schema for personalization data storage.
-   **FR-404**: The system SHOULD provide a per-chapter personalization toggle button.
-   **FR-405**: The system SHOULD provide a per-chapter Urdu translation toggle button.

**Subagents + Skills System (Bonus):**
-   **FR-501**: The system SHOULD break down into modular Subagents (e.g., ContentAgent, ReviewAgent, CodeAgent, RAGAgent).
-   **FR-502**: The system SHOULD expose an Agent Skills API for functionalities like summaries, code generation, glossary, and quizzes.
-   **FR-503**: The system SHOULD define reusable tools for agents.
-   **FR-504**: The system SHOULD integrate agents into the development workflow.

**Deployment:**
-   **FR-601**: The system MUST be deployable to GitHub Pages or Vercel for the frontend.
-   **FR-602**: The system MUST have instructions for FastAPI backend deployment.
-   **FR-603**: The system MUST have setup instructions for Qdrant Cloud.
-   **FR-604**: The system MUST have setup instructions for Neon DB.
-   **FR-605**: The system MUST include clear environment variable mapping.
-   **FR-606**: The system MUST include production build workflows.

### Key Entities

-   **Textbook**: A collection of modules, chapters, sections, and content.
-   **Chapter**: A discrete unit of the textbook with specific learning outcomes, core concepts, implementations, and quizzes.
-   **User**: An individual interacting with the textbook and chatbot, potentially with personalization data.
-   **Query**: A question submitted by a user to the RAG AI Tutor.
-   **Response**: An answer generated by the RAG AI Tutor, potentially with citations and streaming.
-   **Vector Store (Qdrant)**: Stores embeddings of textbook content for retrieval.
-   **Database (Neon Postgres)**: Stores logs, user profiles, and other relational data.
-   **Agent**: An AI entity (e.g., ChatKit Agent, Subagent) responsible for reasoning, content generation, or other tasks.
-   **Prompt**: Input given to language models or agents.
-   **Embedding**: Numerical representation of text content.

## Success Criteria

### Measurable Outcomes

-   **SC-001**: Structural completeness (20 pts) - All defined modules and chapters are present and adhere to the specified structure.
-   **SC-002**: Technical accuracy (20 pts) - All technical content, code examples, and RAG responses are factually correct and free of significant errors.
-   **SC-003**: Clean UI & readability (15 pts) - The textbook and chatbot UI adhere to the UI/UX Requirements, providing a clear, high-contrast, and consistent reading experience.
-   **SC-004**: Fully working RAG system (25 pts) - The RAG chatbot consistently provides context-bound answers from the textbook content with citations, and does not hallucinate.
-   **SC-005**: Subagents + Skills (up to 50 bonus pts) - Implemented Subagents and Agent Skills are functional and demonstrate reusability and integration.
-   **SC-006**: Personalization + Urdu (up to 50 bonus pts) - Personalization features (recommendations, language toggles) are functional and enhance user experience.
-   **SC-007**: Code quality, naming, and modularity (20 pts) - The codebase follows system style rules, is modular, well-named, and easy to understand and maintain.

## Constraints

-   Text must be extremely readable and student-friendly.
-   Avoid over-technical jargon unless explained.
-   All code must be runnable and syntactically correct.
-   All RAG components must respect context-bound rules.
-   Subagent logic must remain modular and testable.
-   Avoid hallucinations: cite content references where needed.
-   All chapters must have: Learning outcomes, Introduction, Core theory, Practical implementation, Hands-on labs, Real-world applications, Key takeaways, Quiz.

## UI/UX Requirements

-   Clean, minimalistic, high-contrast reading mode.
-   16–18px font, 1.6 line height.
-   Consistent spacing & typographic rhythm.
-   Sidebar should be multi-level, fully expandable.
-   Chatbot must appear on every page as a floating button.
-   Code blocks must include syntax highlighting.
-   Urdu translation must not break formatting.