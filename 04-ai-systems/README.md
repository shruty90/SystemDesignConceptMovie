# AI Systems

**The 2026 shift:** GenAI/LLM design questions have entered the standard system design pool — no longer just for ML roles. Interviewers now explicitly score cost reasoning, evaluation methodology, monitoring, and failure modes.

## Popular interview problems in this category

| Problem | Key components |
|---|---|
| Design an LLM-serving system (ChatGPT-style) | Inference APIs, KV cache, continuous batching (vLLM), quantization, model routing (small vs large), self-host vs API |
| Design a RAG system | Chunking, embeddings, vector DB, retrieval + reranking, prompt assembly, freshness/re-indexing |
| Design a Recommendation System (Netflix/TikTok feed) | Candidate generation → ranking, embeddings, feature store, online/offline training loop |
| Design a Fraud Detection System | Real-time feature pipelines, model serving latency, feedback loops, drift |
| Design Search with semantic ranking | Hybrid keyword+vector retrieval, recall@k, reranking |
| Design an AI chatbot / agent system | Tool calling, memory, guardrails, fallbacks, rate limits |
| Design an ML training pipeline | Data pipelines, feature engineering, distributed training, model registry, CI/CD for models |

## What interviewers score in 2026

1. **Evaluation** — golden sets, LLM-as-judge, RAG triad (faithfulness, answer relevance, context relevance), retrieval metrics (recall@k, MRR, nDCG).
2. **Cost & latency** — token economics, caching, model routing, batching.
3. **Reliability** — retries/timeouts/idempotency, circuit breakers, graceful degradation.
4. **Safety** — guardrails, prompt injection defense, PII handling.

## Tutorial roadmap (files to be added)

- `01-llm-serving.md`
- `02-rag-pipeline.md`
- `03-recommendation-system.md`
- `04-evaluation-and-monitoring.md`

## Sources

- [AI System Design Interview Questions (2026) — System Design Handbook](https://www.systemdesignhandbook.com/blog/ai-system-design-interview-questions/)
- [LLM System Design: Complete Guide — System Design Handbook](https://www.systemdesignhandbook.com/guides/llm-system-design/)
- [ML System Design Interview Guide — Exponent](https://www.tryexponent.com/blog/machine-learning-system-design-interview-guide)
- [ML System Design — alirezadir GitHub](https://github.com/alirezadir/machine-learning-interviews/blob/main/src/MLSD/ml-system-design.md)
- [RAG Interview Questions Hub — GitHub](https://github.com/KalyanKS-NLP/RAG-Interview-Questions-and-Answers-Hub)
