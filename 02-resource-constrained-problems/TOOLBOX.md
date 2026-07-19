# Toolbox: Resource-Constrained Problems

The tools for "the data doesn't fit in memory."

## 1. Streaming / Chunked Processing
Never load the whole file. Read line-by-line or in fixed-size chunks (e.g., 64MB), process, discard. Generators/iterators keep memory flat regardless of file size. First tool to mention — it reframes the whole problem.

## 2. External Merge Sort
The classic answer for sorting data larger than RAM:
1. Read RAM-sized chunks, sort each in memory, write sorted "runs" to disk.
2. K-way merge the runs using a min-heap (only 1 element per run in memory).
Cost is dominated by disk I/O, not comparisons — say this out loud.

## 3. K-way Merge with a Min-Heap
Merging N sorted files: heap holds one head element per file → pop min, refill from that file. O(total log N) with O(N) memory. Also the second phase of external sort and the answer to "merge N sorted logs."

## 4. Hash Partitioning (Spill to Disk)
Can't fit a hash map of all keys? Hash each key to one of K disk partitions (same key always lands in the same partition), then process partitions one at a time in memory. Solves dedup, group-by, and join on huge files.

## 5. Probabilistic Data Structures (trade exactness for memory)
- **Bloom filter** — "have I seen this before?" with false positives, no false negatives. Dedup at billions of items in MBs.
- **Count-Min Sketch** — approximate frequency counts for streams (heavy hitters).
- **HyperLogLog** — count distinct items (~1.5KB for billions, ~2% error).
Name the error trade-off when you use them.

## 6. Top-K with Heaps
Exact top-K from a big stream: min-heap of size K — new element beats heap root → replace. O(n log K), O(K) memory. For distributed/approximate: Count-Min Sketch + heap per node, merge results.

## 7. MapReduce Thinking
Split → map (per-chunk work) → shuffle by key → reduce (aggregate). Even on one machine, structure the answer this way: it parallelizes naturally when the interviewer adds nodes.

## 8. I/O Efficiency
Sequential beats random reads (~100× on disk). Buffered reads/writes, memory-mapped files (let the OS page for you), compression (CPU is cheaper than I/O), columnar formats (read only needed columns).

## 9. Batching + Backpressure
Process in batches to amortize overhead; bound queues so fast producers can't overwhelm slow consumers. Central to job-scheduler and pipeline designs.

## 10. Checkpointing
Long job on flaky hardware: persist progress (offset, partition ID) so a crash resumes instead of restarts. Interviewers love asking "what if it dies at 90%?"

---
**Typical combo:** stream in chunks → hash-partition or sort runs to disk → heap-based merge/top-K → probabilistic structure if approximate is acceptable → checkpoint progress.
