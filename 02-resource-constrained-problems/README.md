# Resource-Constrained Problems

**The core question:** "The data doesn't fit. Now what?"

These problems flip the usual scaling story: instead of adding machines, you're given a fixed, small resource budget and a dataset far larger than it. They test external algorithms, streaming, chunking, and I/O-aware thinking.

## Popular interview problems in this category

| Problem | Asked at (commonly reported) | Key techniques |
|---|---|---|
| Process a 10GB CSV with 512MB RAM, 1 CPU | Startups, fintech, Amazon | Streaming reads, chunked batching, generators |
| Sort a 1TB file with limited memory | Google, Microsoft | External merge sort: sorted runs + k-way merge |
| Distributed sorting (1TB across 1000 nodes, 1.5GB RAM each) | Google | Partitioning, per-node heapsort, tournament-tree merge |
| Top-K heavy hitters (most-played songs, trending hashtags) | Meta, Amazon, Bloomberg | Min-heap for exact; Count-Min Sketch / Lossy Counting for streams |
| Find duplicates in a huge file / URL list | Google, Dropbox | Hash partitioning to disk, Bloom filters |
| Merge N large sorted files | Amazon, Databricks | K-way merge with a heap, buffered I/O |
| Design a distributed job scheduler | Amazon, Google | Queueing, worker pools, backpressure, retries |
| Log processing / analytics on a single box | Datadog, Splunk-style | Map-reduce locally, memory-mapped files, columnar layouts |

## Recurring patterns

1. **Stream, don't load** — process line-by-line or in fixed-size chunks.
2. **Spill to disk** — sorted runs, hash partitions, temp files.
3. **Trade exactness for memory** — Bloom filters, Count-Min Sketch, HyperLogLog.
4. **Know your budget** — RAM, disk throughput, network bandwidth drive the design.

## Tutorial roadmap (files to be added)

- `01-large-file-limited-ram.md`
- `02-external-merge-sort.md`
- `03-top-k-heavy-hitters.md`
- `04-probabilistic-data-structures.md`

## Sources

- ["I Have a 10GB CSV and Only 512MB RAM" — Medium](https://medium.com/@sarveshkhamkar321/i-have-a-10gb-csv-file-and-only-512mb-ram-the-interview-question-that-stumped-me-f5c5c0994d3a)
- [Distributed Sorting — Google Interview Walkthrough — QuanticDev](https://quanticdev.com/algorithms/distributed-computing/distributed-sorting/)
- [Top K Problem (Heavy Hitters) — Serhat Giydiren](https://serhatgiydiren.com/system-design-interview-top-k-problem-heavy-hitters/)
- [Sorting Large Datasets at Scale — System Design Academy](https://www.systemdesignacademy.com/blog/design-a-system-for-sorting-large-datasets-distributed-sorting-at-scale)
