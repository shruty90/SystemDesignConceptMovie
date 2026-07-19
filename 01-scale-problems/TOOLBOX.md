# Toolbox: Scale Problems

The tools you reach for when the question is "make it work for 100M users."

## 1. Load Balancing
Distribute traffic across many identical servers. Know L4 (TCP) vs L7 (HTTP-aware) balancers, and algorithms: round-robin, least-connections, consistent hashing (sticky routing). L7 enables routing by path/header — the basis of API gateways.

## 2. Stateless Services + Horizontal Scaling
Servers hold no session state, so any server can handle any request — add machines to add capacity. State moves to shared stores (Redis for sessions, DB for data). This is the single assumption behind almost every scaling answer.

## 3. Caching (the biggest lever)
- **Client/CDN cache** — static assets, video segments served from edge locations near users.
- **Application cache (Redis/Memcached)** — cache-aside pattern: check cache → miss → read DB → populate.
- Know: TTLs, eviction (LRU/LFU), cache invalidation, hot-key problem, thundering herd (use request coalescing / jitter).

## 4. Database Read Replicas
One leader takes writes, N replicas serve reads. Fits scale problems because most are read-heavy (feed reads >> posts written). Accept replication lag → eventual consistency for non-critical reads.

## 5. Sharding + Consistent Hashing
When one DB can't hold the data or write load, partition by key (user_id, short_code). Consistent hashing minimizes data movement when nodes join/leave — the standard answer for "how do you pick which shard?"

## 6. Async Processing + Message Queues
Kafka/SQS decouple producers from consumers. Anything not needed in the request path (notifications, transcoding, feed fan-out) goes to a queue and is processed by worker pools. Gives buffering, retries, and backpressure for free.

## 7. Fan-out Strategies (feeds/notifications)
- **Fan-out on write (push)**: precompute each follower's feed at post time — fast reads, expensive for celebrities.
- **Fan-out on read (pull)**: assemble feed at request time — cheap writes, slow reads.
- **Hybrid**: push for normal users, pull for celebrity accounts. This trade-off IS the Twitter/Instagram question.

## 8. Real-time Delivery
WebSockets (persistent bidirectional), long polling (fallback), Server-Sent Events. For chat: connection gateways that hold millions of sockets, with a pub/sub layer (Redis pub/sub, Kafka) routing messages between gateway nodes.

## 9. Unique ID Generation
Auto-increment doesn't shard. Know: Snowflake IDs (timestamp + machine + sequence), base62 encoding for short URLs, ticket servers.

## 10. Back-of-Envelope Estimation
QPS = DAU × actions/day ÷ 86,400 (×2–3 for peak). Storage = items/day × size × retention. Memorize latency numbers: RAM ~100ns, SSD ~100µs, same-DC network ~0.5ms, cross-region ~50–150ms. Interviewers expect this before any boxes are drawn.

---
**Typical combo for a scale problem:** LB → stateless app tier → cache → replicated/sharded DB → queue for async work → CDN for static content.
