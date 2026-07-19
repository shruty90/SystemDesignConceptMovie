# Toolbox: AI Systems

The tools for LLM serving, RAG, and ML-powered products.

## 1. Embeddings + Vector Search
Text/images → dense vectors; similarity = closeness in vector space. Exact search doesn't scale → ANN indexes (HNSW, IVF) in vector DBs (Pinecone, pgvector, FAISS). Know the recall-vs-latency knob. Foundation of RAG, semantic search, and recommendations.

## 2. The RAG Pipeline
Ingest: load → **chunk** (size/overlap trade-off) → embed → index.
Query: embed query → retrieve top-k → **rerank** (cross-encoder) → assemble prompt → generate.
Discuss freshness (re-indexing), hybrid retrieval (keyword BM25 + vector, merged), and metadata filtering.

## 3. LLM Inference Optimization
- **KV cache** — reuse attention state across tokens; memory is the bottleneck.
- **Continuous batching** (vLLM) — new requests join in-flight batches; the throughput tool.
- **Quantization** (FP16→INT8/4) — smaller/faster, small quality cost.
- **Speculative decoding** — small model drafts, big model verifies.
Latency metrics: time-to-first-token vs tokens/sec. Streaming responses hide latency.

## 4. Model Routing + Cascades
Don't send everything to the biggest model: classify query difficulty → route simple ones to a small/cheap model, escalate hard ones. Pair with **semantic caching** (cache by embedding similarity, not exact match). This is the cost-control answer interviewers now score explicitly.

## 5. Two-Stage Recommendation Architecture
- **Candidate generation**: cheap retrieval narrows millions → hundreds (collaborative filtering, embedding nearest-neighbors).
- **Ranking**: heavier model scores hundreds with rich features.
Standard for Netflix/TikTok-feed questions. Mention exploration vs exploitation and the cold-start problem.

## 6. Feature Stores + Online/Offline Skew
Features computed in batch for training must match those served online at inference. A feature store (Feast-style) keeps one definition for both paths — name "training/serving skew" as the failure it prevents.

## 7. Evaluation (the 2026 differentiator)
- **Retrieval**: recall@k, MRR, nDCG.
- **Generation**: golden sets, LLM-as-judge, pairwise win-rate.
- **RAG triad**: faithfulness (grounded in context?), answer relevance, context relevance.
Offline eval gates deploys; online A/B measures real impact. Skipping eval is the #1 flagged mistake.

## 8. Guardrails + Safety
Input side: prompt-injection defense, PII scrubbing, topic filters. Output side: schema validation, grounding checks, moderation models. Treat LLM output as untrusted input to downstream systems.

## 9. Reliability Patterns for LLM Backends
Provider outages and rate limits are normal: retries with exponential backoff + jitter, timeouts, circuit breakers, fallback models, request queues with backpressure, graceful degradation (e.g., return retrieval-only results if generation fails).

## 10. Feedback Loops + Drift Monitoring
Log prompts/responses/user feedback (thumbs, edits, abandonment) → curate into eval and fine-tuning sets. Monitor data drift and quality-metric decay; alert on cost/latency/token anomalies just like error rates.

---
**Typical combo (RAG product):** chunk + embed + hybrid retrieval → rerank → routed model with semantic cache → streamed generation → guardrails → RAG-triad eval + feedback logging.
