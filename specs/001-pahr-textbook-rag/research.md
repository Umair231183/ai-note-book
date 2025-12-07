# Research Notes: Physical AI & Humanoid Robotics Textbook + RAG Chatbot

## Phase 0 Research: Docusaurus i18n for Urdu Translation

### Topic: Best practices for Docusaurus i18n for Urdu translation.

**Decision**: Integrate a translation API (e.g., Google Translate API, OpenAI API) with Docusaurus's i18n system for dynamic per-chapter translation.

**Rationale**:
- Docusaurus provides a robust i18n system for static translations (building separate sites per language). For *dynamic per-chapter translation* triggered by a user toggle, a real-time translation API is necessary.
- Preserving formatting is crucial, requiring careful handling of Markdown content before and after translation. The chosen API should ideally support HTML/Markdown input or provide tools for post-processing.

**Alternatives Considered**:
- **Docusaurus native i18n for static build**: Rejected because the requirement is for a *per-chapter toggle*, implying dynamic, on-demand translation, not a statically built, separate Urdu version of the entire site. It would also require manual translation of all content upfront.
- **Manual translation of Markdown files**: Rejected due to the sheer volume of content and the dynamic nature of the "per-chapter toggle" requirement.
- **Client-side JavaScript-based translation (e.g., Google Translate Widget)**: Rejected due to potential SEO impact, lack of fine-grained control over translation quality, and possible formatting issues. The goal is a seamless, integrated experience.

### Next Steps:
- Investigate specific translation API options (e.g., Google Cloud Translation, OpenAI's GPT models for translation) regarding cost, accuracy for technical content, and API limits.
- Research how to integrate a chosen API within a Docusaurus React component, specifically to send Markdown content for translation and re-render it, preserving Docusaurus-specific components and syntax.
- Evaluate strategies for caching translated content to reduce API calls and improve performance.
