# Toolbox: Fundamentals

Cross-cutting primitives every category above reuses. Master these once; apply everywhere.

## 1. Networking Basics
DNS → TCP/TLS handshake → HTTP. Know HTTP/1.1 vs 2 vs 3 at a sentence each, REST vs gRPC vs WebSocket and when each fits. Latency budget thinking starts here.

## 2. Proxies + Gateways
Reverse proxy (fronts servers: LB, TLS termination, caching) vs forward proxy (fronts clients). API Gateway = reverse proxy + auth, rate limiting, routing, aggregation.

## 3. Hashing
Uniform distribution (sharding), consistent hashing (minimal reshuffle), hash functions for IDs vs cryptographic hashes for integrity/passwords. Shows up in caches, shards, LBs, dedup.

## 4. Caching (as a universal pattern)
Same idea at every layer: browser, CDN, gateway, app, DB buffer pool, CPU. Reason once about: hit ratio, TTL, eviction, invalidation, staleness tolerance.

## 5. Queues + Pub/Sub
Point-to-point queue (one consumer per message) vs pub/sub (fan-out to all subscribers). Delivery guarantees: at-most-once, at-least-once (+ idempotent consumers = the practical answer), exactly-once (rare, expensive). Kafka's log-based model: offsets, consumer groups, partitions.

## 6. Storage Landscape
Relational (ACID, joins), key-value (Redis/Dynamo), document (Mongo), wide-column (Cassandra), graph, time-series, object storage (S3), search index (Elasticsearch). One-line "when I'd pick it" for each.

## 7. Consistency + Consensus
CAP under partition; PACELC adds the latency trade-off when healthy. Strong vs eventual vs causal. Know that Raft/Paxos exist for leader election and replicated logs — one sentence is enough at interview depth.

## 8. Rate Limiting Algorithms
Token bucket (bursts allowed), leaky bucket (smooth output), fixed window (boundary spikes), sliding window log/counter. Distributed limiting → centralized counters in Redis with atomic ops.

## 9. Observability
Logs (events), metrics (aggregates: p50/p95/p99, error rate, saturation), traces (request path across services). SLI → SLO → error budget. In 2026 interviews, "how do you know it's working?" is scored, not optional.

## 10. Estimation Cheat Sheet
- Seconds/day ≈ 86,400 (~10^5 for mental math)
- 1M requests/day ≈ 12 QPS; 100M/day ≈ 1,200 QPS (×2–3 peak)
- Latency: RAM 100ns · SSD 100µs · HDD 10ms · same-DC RTT 0.5ms · cross-region 50–150ms
- Char 1B · Int 4B · UUID 16B · avg tweet ~300B · avg photo ~2MB
- One server rough capacity: ~10k–50k simple QPS; Redis ~100k ops/s

---
**Interview meta-toolbox:** clarify requirements → estimate scale → API + data model → high-level boxes → deep-dive the bottleneck → failure modes + monitoring → trade-offs stated explicitly at every step.
