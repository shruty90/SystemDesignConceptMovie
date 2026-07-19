# Toolbox: Database Read/Write Problems

The tools for "where does data live, and what happens when writes collide?"

## 1. Storage Engines: B-tree vs LSM-tree
- **B-tree** (Postgres, MySQL): fast reads, in-place updates → read-heavy workloads.
- **LSM-tree** (Cassandra, RocksDB): sequential append writes, background compaction → write-heavy workloads.
Picking the engine that matches the workload shape is often the whole question.

## 2. Indexing
B-tree indexes for range queries, hash for exact lookup, composite index order matters, covering indexes skip the table. Every index speeds reads and slows writes — say the trade-off.

## 3. Replication
- **Leader-follower**: writes to leader, reads from followers; replication lag → stale reads.
- **Quorum (Dynamo-style)**: N replicas, write to W, read from R; **R + W > N** guarantees overlap. Tune for read- vs write-heavy.

## 4. Sharding
Partition by key: hash-based (even spread, no ranges), range-based (range scans, hot spots), directory-based (flexible, extra hop). Discuss resharding and cross-shard queries — that's where the depth is.

## 5. Transactions + Isolation Levels
ACID basics, then isolation: read committed → repeatable read → serializable (safety vs throughput). Know dirty read, lost update, phantom read. Cross-shard atomicity: two-phase commit (slow, blocking) vs sagas (compensating actions).

## 6. Concurrency Control (the double-booking tools)
- **Pessimistic locking**: `SELECT ... FOR UPDATE` — hold the seat row; simple, kills throughput under contention.
- **Optimistic locking**: version column, retry on conflict — great when conflicts are rare.
- **Reservation pattern**: short-lived hold (seat locked 10 min) + async confirm. This is the BookMyShow/Ticketmaster answer.

## 7. Idempotency
Client sends unique idempotency key per operation; server stores processed keys and returns the cached result on retry. THE payment-system tool — retries must never double-charge.

## 8. Sharded / Approximate Counters
One hot row (likes on a viral post) serializes writes. Split into N sub-counters (random write, sum on read), or buffer increments in Redis and flush batches to the DB.

## 9. CQRS + Event Sourcing / Ledgers
Separate write path from read path: normalized write store + denormalized read views fed by an event stream. Append-only ledgers (never update balances, derive them) — the audit-and-correctness answer for money.

## 10. Caching + Invalidation
Cache-aside with TTL, write-through for consistency-critical data. Invalidation strategies and their failure modes (stale reads after write → read-your-own-writes via session pinning).

## 11. CAP + Consistency Models
Under partition, choose consistency (refuse writes) or availability (accept, reconcile later). Map to the domain: money → consistency; likes/views → availability. Spectrum: strong → causal → eventual.

## 12. Write-Ahead Log (WAL)
Append the intent to a sequential log before applying — crash recovery, replication feed, and change-data-capture all fall out of it. Underlies nearly every durable system.

---
**Typical combo:** pick engine for workload shape → shard on the access key → replicate with a consistency choice → lock/version contended rows → idempotency keys on money paths → cache reads with explicit invalidation.
