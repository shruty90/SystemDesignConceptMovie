# Scale Problems

**The core question:** "This works for 100 users. Now make it work for 100 million."

## 🎬 Watch the movie first

Open `movie-news-feed.html` in your browser for **THE FEED** — a narrated, animated tutorial that teaches this category as a three-act movie (villain: SCALE; heroes: the toolbox).

**🎙️ Recommended voice:** pick **Google UK English Female** from the voice dropdown below the screen — it's the clearest, most natural narrator (available in Chrome; in Edge, the ⭐ "Natural" voices are also excellent). Editors: see `video-export/` for the Premiere import kit.

These problems test horizontal scaling, load balancing, caching layers, CDNs, fan-out strategies, and stateless service design.

## Popular interview problems in this category

| Problem | Asked at (commonly reported) | Key challenges |
|---|---|---|
| Design a URL Shortener (TinyURL/Bitly) | Amazon, Google, Meta | Hashing, unique ID generation, cache, redirects at scale |
| Design Twitter / News Feed | Meta, Twitter/X | Fan-out on write vs read, celebrity problem, timeline cache |
| Design WhatsApp / Messenger | Meta, Amazon | WebSockets, message delivery guarantees, presence, group chat |
| Design YouTube / Netflix | Google, Netflix | Video upload pipeline, transcoding, CDN, adaptive bitrate |
| Design Instagram | Meta | Photo storage, feed generation, follower graph |
| Design a Notification Service | Amazon, LinkedIn | Fan-out, push/pull, dedup, priority, delivery retries |
| Design Autocomplete / Typeahead | Google, Amazon | Trie/prefix caching, ranking, low latency budget |
| Design a Distributed Web Crawler | Google | Politeness, URL frontier, dedup at billions of pages |
| Design a CDN | Cloudflare, Akamai-style | Edge caching, invalidation, origin shielding |
| Design Uber / location service | Uber, Lyft, DoorDash | Geo-indexing (geohash/quadtree), matching, real-time updates |

## Tutorial roadmap (files to be added)

- `01-url-shortener.md`
- `02-news-feed.md`
- `03-chat-system.md`
- `04-video-streaming.md`
- `05-notification-service.md`

## Sources

- [Most Asked System Design Interview Questions 2026 — LeetCode Discuss](https://leetcode.com/discuss/post/7494779/most-asked-system-design-interview-quest-v1ie/)
- [Top 50 System Design Interview Questions — dev.to](https://dev.to/somadevtoo/top-50-system-design-interview-questions-for-2024-5dbk)
- [FAANG System Design Questions Ranked by Difficulty — Design Gurus](https://designgurus.substack.com/p/30-system-design-interview-questions)
