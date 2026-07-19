# Database Read/Write Problems

**The core question:** "Where does the data live, who's hitting it, and what happens when two writes collide?"

These problems center on the storage layer: read-heavy vs write-heavy workloads, contention on hot rows, consistency vs availability, replication, and sharding.

## Popular interview problems in this category

| Problem | Workload shape | Key challenges |
|---|---|---|
| Design a Rate Limiter | Write-heavy, tiny records | Counters at scale, sliding windows, Redis, race conditions |
| Design Ticket Booking (BookMyShow/Ticketmaster) | Contended writes | Seat locking, double-booking prevention, transactions |
| Design a Stock Exchange | Extreme write throughput | Order matching, low latency, durability, ordering guarantees |
| Design a Payment System | Correctness-critical writes | Idempotency, exactly-once semantics, reconciliation, ledgers |
| Design a Distributed Key-Value Store (DynamoDB-style) | Mixed | Consistent hashing, replication, quorums, hinted handoff |
| Design a Distributed Cache (Redis-style) | Read-heavy | Eviction policies, cache invalidation, partitioning, hot keys |
| Instagram likes / view counters | Write-heavy aggregation | Sharded counters, batching, eventual consistency |
| Design Google Docs (collaborative editing) | Concurrent writes | OT/CRDTs, conflict resolution, versioning |
| Design an E-commerce inventory system | Contended read+write | Stock consistency, overselling, reservations |
| Design an Analytics/Metrics platform | Append-heavy | Time-series storage, rollups, write batching, columnar reads |

## Recurring patterns

1. **Read-heavy** → replicas, caching, denormalization, CQRS.
2. **Write-heavy** → sharding, LSM-tree stores, batching, async queues.
3. **Contention** → optimistic vs pessimistic locking, sharded counters, idempotency keys.
4. **Consistency choices** → strong vs eventual, quorum math (R + W > N), CAP trade-offs.

## Tutorial roadmap (files to be added)

- `01-rate-limiter.md`
- `02-ticket-booking-contention.md`
- `03-key-value-store.md`
- `04-payment-idempotency.md`
- `05-sql-vs-nosql-sharding-replication.md`

## Sources

- [Top 50 System Design Interview Questions — dev.to](https://dev.to/somadevtoo/top-50-system-design-interview-questions-for-2024-5dbk)
- [Most Asked System Design Questions — Medium/Javarevisited](https://medium.com/javarevisited/i-appeared-in-50-system-design-interviews-here-are-the-most-frequently-asked-questions-and-how-20e3b12952aa)
- [System Design Interview Prep — IGotAnOffer](https://igotanoffer.com/blogs/tech/system-design-interviews)
