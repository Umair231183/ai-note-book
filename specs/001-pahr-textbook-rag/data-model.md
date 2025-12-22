# Data Model: Physical AI & Humanoid Robotics Textbook + RAG Chatbot

This document outlines the key entities and their relationships for the PAHR project, derived from the feature specification. It focuses on conceptual data structures without delving into specific implementation details (e.g., database types, exact field names in code).

## Core Entities

### 1. User

Represents an individual interacting with the textbook and chatbot.

*   **Attributes**:
    *   `UserID`: Unique identifier (primary key).
    *   `Email`: User's email address (for authentication, unique).
    *   `Name`: User's display name.
    *   `ExperienceLevel`: (Optional) User's robotics/AI experience level (e.g., "Beginner", "Intermediate", "Advanced").
    *   `HardwareOwnership`: (Optional) Information about owned robotics hardware.
    *   `PreferredLanguage`: (Optional) User's preferred content language (e.g., "en", "ur").
    *   `SignUpDate`: Timestamp of user registration.
    *   `LastLoginDate`: Timestamp of last user login.
*   **Relationships**:
    *   One-to-many with `UserPreference` (a user can have multiple preferences).
    *   One-to-many with `ChatSession` (a user can have multiple chat sessions).
*   **Validation**:
    *   `Email` must be a valid email format and unique.
    *   `UserID` automatically generated.
    *   `ExperienceLevel` and `HardwareOwnership` would likely be free-text or enum based on questionnaire.

### 2. Textbook

The overarching container for all educational content.

*   **Attributes**:
    *   `TextbookID`: Unique identifier.
    *   `Title`: "Physical AI & Humanoid Robotics".
    *   `Description`: Overview of the textbook.
*   **Relationships**:
    *   One-to-many with `Module`.

### 3. Module

A major organizational unit within the Textbook, containing multiple Chapters.

*   **Attributes**:
    *   `ModuleID`: Unique identifier.
    *   `TextbookID`: Foreign key to `Textbook`.
    *   `Title`: Module title (e.g., "Introduction to Physical AI").
    *   `Order`: Sequential order within the textbook.
*   **Relationships**:
    *   Many-to-one with `Textbook`.
    *   One-to-many with `Chapter`.

### 4. Chapter

A discrete educational unit with consistent structure, part of a Module.

*   **Attributes**:
    *   `ChapterID`: Unique identifier.
    *   `ModuleID`: Foreign key to `Module`.
    *   `Title`: Chapter title.
    *   `Order`: Sequential order within the module.
    *   `Content`: Raw Markdown content of the chapter.
    *   `LearningOutcomes`: Textual description of learning objectives.
    *   `KeyTakeaways`: Summary points.
    *   `QuizData`: Structure representing quiz questions and answers.
    *   `UrduContent`: (Optional) Translated Markdown content in Urdu.
*   **Relationships**:
    *   Many-to-one with `Module`.
    *   One-to-many with `ChapterEmbedding` (for RAG).
    *   Many-to-many with `UserPreference` (for personalization, e.g., simplified/advanced versions).
*   **Validation**:
    *   `Title` and `Order` must be present.
    *   `Content` must be valid Markdown.

### 5. ChapterEmbedding (for Vector Store)

Represents a chunk of chapter content optimized for retrieval.

*   **Attributes**:
    *   `EmbeddingID`: Unique identifier.
    *   `ChapterID`: Foreign key to `Chapter`.
    *   `ContentChunk`: A segment of the chapter's text.
    *   `Vector`: Numerical vector representation of `ContentChunk`.
    *   `Metadata`: Source information (e.g., `chapter_title`, `module_title`, `page_number`, `section_id`).
*   **Relationships**:
    *   Many-to-one with `Chapter`.
*   **Validation**:
    *   `ContentChunk` should be of an optimal length for embedding (e.g., 200-500 tokens).
    *   `Vector` must be a valid numerical array.

### 6. ChatSession

A history of interactions between a User and the RAG AI Tutor.

*   **Attributes**:
    *   `SessionID`: Unique identifier.
    *   `UserID`: Foreign key to `User`.
    *   `StartTime`: Timestamp when the session began.
    *   `LastActivityTime`: Timestamp of the last message in the session.
*   **Relationships**:
    *   Many-to-one with `User`.
    *   One-to-many with `ChatMessage`.

### 7. ChatMessage

An individual message within a `ChatSession`.

*   **Attributes**:
    *   `MessageID`: Unique identifier.
    *   `SessionID`: Foreign key to `ChatSession`.
    *   `Sender`: "User" or "Bot".
    *   `Content`: Text of the message (user query or bot response).
    *   `Timestamp`: Time message was sent.
    *   `Citations`: (Optional) List of `ChapterID` and `Section` references for bot responses.
*   **Relationships**:
    *   Many-to-one with `ChatSession`.

### 8. UserPreference

Stores personalization settings for a User.

*   **Attributes**:
    *   `PreferenceID`: Unique identifier.
    *   `UserID`: Foreign key to `User`.
    *   `PreferenceType`: (e.g., "SimplifiedContent", "AdvancedContent", "UrduTranslation").
    *   `ChapterID`: (Optional) Foreign key to `Chapter` if preference is chapter-specific.
    *   `Value`: Boolean or string value of the preference.
*   **Relationships**:
    *   Many-to-one with `User`.
    *   Many-to-one with `Chapter` (optional).

## Relationships Summary

*   `User` 1 --* `UserPreference`
*   `User` 1 --* `ChatSession`
*   `ChatSession` 1 --* `ChatMessage`
*   `Textbook` 1 --* `Module`
*   `Module` 1 --* `Chapter`
*   `Chapter` 1 --* `ChapterEmbedding`
*   `Chapter` * -- * `UserPreference` (for chapter-specific personalization)

## Data Flow (High-Level)

1.  **Content Ingestion**: Markdown files (Chapters) -> `Chapter` entity -> Chunking & Embedding -> `ChapterEmbedding` entities stored in Qdrant.
2.  **User Authentication/Profile**: User interaction -> `User` entity -> `UserPreference` entities stored in Neon Postgres.
3.  **Chatbot Interaction**: User `Query` -> `ChatSession` & `ChatMessage` -> RAG Pipeline (retrieval from Qdrant, generation via OpenAI) -> Bot `Response` (with `Citations`) -> `ChatMessage`.
4.  **Personalization**: User preferences (`UserPreference`) influence `Chapter` content rendering (e.g., Urdu translation, simplified content).