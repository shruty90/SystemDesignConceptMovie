# Interview Prep Tool — System Design & AI Tutorials

Simple, focused tutorials covering system design and AI concepts, organized around the problem categories that actually show up in interviews.

## Repo Structure

| Folder | Category | What it covers |
|---|---|---|
| `01-scale-problems/` | Scale | High-traffic systems: millions of users, feeds, chat, streaming |
| `02-resource-constrained-problems/` | Limited resources | Big data, small machine: 10GB file with 512MB RAM, external sort, top-K |
| `03-database-read-write-problems/` | Database read/write | Read-heavy vs write-heavy stores, contention, consistency, transactions |
| `04-ai-systems/` | AI / ML systems | LLM serving, RAG, recommendation systems, ML infra |
| `05-fundamentals/` | Core concepts | Building blocks every problem reuses: caching, sharding, load balancing, queues |

Each folder contains a `README.md` (popular problems mapped to the category) and a `TOOLBOX.md` (the core technical concepts that solve them).

## How problems map to folders

Popular interview problems (sourced from LeetCode Discuss, Medium, dev.to — see each folder's README for links):

- **Scale** → URL shortener, Twitter/news feed, WhatsApp/chat, YouTube/Netflix, notification service, web crawler, autocomplete
- **Resource-constrained** → sort 1TB with limited RAM, process 10GB CSV on 512MB, top-K heavy hitters, distributed job scheduler
- **Database read/write** → ticket booking (BookMyShow), stock exchange, payment system, key-value store, rate limiter, Instagram likes counter
- **AI systems** → design an LLM-serving pipeline, RAG system, recommendation engine, fraud detection

## Sources

- [Most Asked System Design Interview Questions for 2026 — LeetCode Discuss](https://leetcode.com/discuss/post/7494779/most-asked-system-design-interview-quest-v1ie/)
- [Top 50 System Design Interview Questions — dev.to](https://dev.to/somadevtoo/top-50-system-design-interview-questions-for-2024-5dbk)
- [Most Asked System Design Questions (50 interviews) — Medium/Javarevisited](https://medium.com/javarevisited/i-appeared-in-50-system-design-interviews-here-are-the-most-frequently-asked-questions-and-how-20e3b12952aa)
- [45 Curated FAANG System Design Questions — Medium](https://medium.com/@systemdesignio/45-curated-system-design-questions-and-solutions-i-practiced-to-crack-faang-interviews-1bbe5908d689)
- [AI System Design Interview Questions (2026) — System Design Handbook](https://www.systemdesignhandbook.com/blog/ai-system-design-interview-questions/)
