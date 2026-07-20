# Animation Design Standard

**Scope:** every animated tutorial ("movie") in this repo — the existing four, and every system design scenario added later. This is the spec to follow. Deviating from it is a bug, not a style choice.

Existing movies this standard is derived from:

| Folder | File | Title | Villain | Heroes |
|---|---|---|---|---|
| `01-scale-problems/` | `movie-news-feed.html` | THE FEED | SCALE | 7 |
| `02-resource-constrained-problems/` | `movie-data-monster.html` | THE DATA MONSTER | THE MONSTER | 6 |
| `03-database-read-write-problems/` | `movie-double-booking.html` | THE DOUBLE BOOKING | THE RACE | 6 |
| `04-ai-systems/` | `movie-pick-of-the-day.dc.html` | PICK OF THE DAY | CHAOS | 8 |
| `05-fundamentals/` | `Case File 7 - The Frozen Feed.html` | CASE FILE #7 | *(no villain — detective variant)* | 8 clues |

---

## 1. Core premise

Each category gets **one movie** that teaches the whole category as a story. Not a slideshow of diagrams — a narrative with a villain, heroes, and a final battle. The learner should be able to answer the category's headline interview question after watching once.

**Three non-negotiables:**

1. **A villain personifies the constraint.** Scale, the Monster, the Race, Chaos. The villain is the thing that breaks the naive design.
2. **Each hero is one toolbox concept.** Heroes map 1:1 to entries in that folder's `TOOLBOX.md`. Six to eight heroes. No more — the movie stops being memorable.
3. **Every hero gets a playground analogy.** Cafeteria lines, backpacks, photocopied textbooks, the homework drop-box, pizza delivery. The analogy comes *before* the technical explanation, always.

---

## 2. Narrative structure

Fixed three-act shape. Scene titles use the `Act N · Label` format shown below.

| # | Scene | Title string | Purpose |
|---|---|---|---|
| S0 | Title card | *(empty)* | Studio card, movie title, tagline |
| S1 | The peaceful world | `Act One · <calm label>` | Naive design that works fine, small |
| S2 | Enter the villain | `Act One · Enter the Villain` | Villain reveal + 3–4 scary stat cards |
| S3 | The fall | `Act One · The Crash` | Naive design breaks visibly |
| S4–S10 | Heroes, one per scene | `Act Two · Hero N of M` | Analogy → superpower → catchphrase |
| S11 | Roll call | `Act Two · Roll Call` | All heroes recapped in one screen; tease the mystery hero |
| S12 | Assembling the team | `Act Three · Assembling the Team` | The full architecture, built up node by node |
| S13 | The final battle | `Act Three · The Final Battle` | The hard edge case + the mystery hero that solves it |
| S14 | What beat the villain | `What Beat the <Villain>` | Exactly **four** takeaway ideas |
| S15 | Pop quiz | `Pop Quiz!` | 3 interactive questions |
| S16 | The end | `The End` | Rolling credits |

**The mystery hero.** Hold one concept back — the category's signature trade-off (hybrid fan-out for Scale, hybrid push/pull, optimistic vs pessimistic locking, explore-vs-exploit). Tease it at Roll Call, reveal it at the Final Battle. This is the beat that makes the movie land.

**Act Three must build, not appear.** The architecture assembles one node per narration line so the learner sees the request path form.

---

## 3. Scene anatomy

Every scene is `{el, title, lines[]}`, optionally `interactive:true`.

- **4–6 narration lines per scene.** Under 4 feels rushed; over 6 and the visual runs out of things to reveal.
- **One line = one visual reveal.** Elements carry `data-l="N"` and appear when narration reaches line N. Never reveal everything at once.
- **Hero scenes have a fixed layout:** big floating icon left, `Hero #N · The <Nickname>` + concept name right, analogy chip, superpower chip, gold catchphrase banner across the bottom.
- **Catchphrases are the memory hook.** Short, imperative, quotable: *"Never make everyone stand in one line."* *"Why ask twice?"* *"Too big to carry? Cut it up."* One per hero, repeated at Roll Call.

---

## 4. Narration voice

The narrator is a **movie trailer voice explaining to a smart 12-year-old.**

- Short sentences. Read them aloud — if you run out of breath, cut.
- Analogy first, mechanism second, jargon last and only once named.
- Say the number, don't show it alone: "one hundred million," not "100M."
- No unexplained acronyms. CDN gets introduced as "the World Tour" before it is ever called a CDN.
- Emoji belong in the visuals, never in narration text — they get stripped before speaking anyway.

**Delivery styling** is derived from the text automatically:

| Trigger | Rate | Pitch | Effect |
|---|---|---|---|
| catchphrase / "remember:" | 0.90 | 1.12 | bright, deliberate |
| villain words, "explodes", "game over" | 0.93 | 0.86 | low menace |
| quiz / "correct" / "exactly" | 1.02 | 1.10 | upbeat |
| ends in `?` | 1.00 | 1.06 | lift |
| default | 1.00 | 1.00 | — |

---

## 5. Visual system

Fixed **960×540** stage, letterboxed with black bars top and bottom, centered and scaled to fit the window. Never reflow the stage responsively — scale it.

### Palette (do not invent new colors)

```
--bg     #07091a   page background
--stage  #0d1130   stage base (radial gradient to #141a45 / #080b22)
--ink    #e8ecff   primary text
--dim    #98a0d4   secondary text
--red    #ff4d6d   villain, failure, overload
--green  #3ddc97   healthy, correct answers
--gold   #ffd166   catchphrases, scene titles, emphasis
--blue   #4dabff   flow arrows, technical highlights
--purple #b388ff   analogy chips
```

A movie may retheme the *hue* for genre reasons — Case File #7 uses a sepia detective palette (`#0a0906` / `#ffe9b0` / `#b8ac8a`) — but keeps red/green/gold semantics identical.

### Color semantics are load-bearing

Red always means the system is failing. Green always means it's healthy or the answer was right. Gold is always the thing to remember. Never use them decoratively.

### Motion vocabulary

| Class | Use for |
|---|---|
| `.floaty` | idle heroes, alive-but-calm (3.2s) |
| `.pulse` | the villain, and anything demanding attention (1.6s) |
| `.shake` | components under load, about to fail (0.6s) |
| `.blink` | critical alarm state only (1.2s) |
| `[data-l].shown` | the reveal: fade + rise with an overshoot ease |

Reveal transition is `.8s`, scene cross-fade is `.9s`. Everything pauses via `body.paused` — no animation may keep running while the movie is paused.

**Restraint rule:** at most two animated elements per scene. Motion means "look here"; if three things move, nothing does.

### Standard components

`.node` (icon + tag) for architecture pieces · `.card` for grid recaps · `.arrow` for flow · `.meter` for load (green→gold→red fill) · `.chip` for explanations (purple border = analogy, blue = technical) · `.stat` for the villain's scary numbers.

---

## 6. Playback engine

**Narration drives everything.** Nothing is on a fixed timer — the next line waits for `speechSynthesis` `onend`, plus a 900ms beat. Scenes advance when their lines run out.

Required behavior:

- **Start overlay.** Browsers block autoplay audio, so the movie cannot begin without a click. The overlay names the movie, the villain, and tells the user to turn sound on.
- **Voice picker,** ranked: Edge Natural/Neural first (⭐), then Online, then Google, then known-good system voices. Changing voice replays the current line.
- **Safety net timer** of `max(3200ms, words × 430ms) + 9000ms` per line, so a failed `onend` can never freeze the movie.
- **Controls:** Play/Pause, Prev, Next, Restart, voice mute, voice select, progress bar, `scene N / total`.
- **Keyboard:** Space = play/pause, ← / → = prev/next scene.
- **Graceful degradation:** with speech off or unavailable, lines advance on the estimated duration. The movie must be fully watchable muted — which is why captions are mandatory.

**Captions** sit in a translucent bar at the bottom, showing the current line verbatim, cross-fading at 250ms.

---

## 7. Quiz scene

Three questions, one per narration line, drawn from three *different* heroes. The movie **blocks** on each until answered — set `waitingAnswer` and do not auto-advance.

- **Correct:** button turns green, options disable, narrator praises with a line that restates the catchphrase, then advances.
- **Wrong:** button shakes red for 900ms then resets, narrator says *"Hmm, not that one. Think about the catchphrases... try again!"*, and the learner retries. **Never** reveal the answer on a wrong guess.

Distractors must be other heroes from the same movie — that's what forces the learner to distinguish them.

---

## 8. Credits

Rolling credits, 34s linear, from `top:540px` to `top:-700px`. Lists the villain in red, the heroes in gold, the mystery hero last, and closes with *"Directed by: You, the future system designer."*

---

## 9. Per-scenario checklist

Before a new movie is considered done:

- [ ] Villain named, personified, and given 3–4 stat cards
- [ ] 6–8 heroes, each mapping to a `TOOLBOX.md` entry in the same folder
- [ ] Every hero has: nickname, playground analogy, superpower line, catchphrase
- [ ] One mystery hero, teased at Roll Call, revealed in the Final Battle
- [ ] Act Three assembles the architecture node-by-node, not all at once
- [ ] Exactly four takeaways in the "What Beat the Villain" scene
- [ ] 3 quiz questions, each with same-movie distractors and retry-on-wrong
- [ ] Every element has `data-l`; nothing appears before its narration line
- [ ] Watchable start to finish with sound off (captions carry it)
- [ ] Pause actually freezes all motion
- [ ] Runs from a `file://` open in Chrome and Edge with no server, no build step, no external requests
- [ ] Folder `README.md` updated with a "🎬 Watch the movie first" section and the recommended voice

---

## 10. File conventions

- **One self-contained HTML file per movie.** No build step, no bundler, no CDN dependency. It must work opened directly from disk, offline.
- **Naming:** `movie-<kebab-slug>.html`, slug taken from the movie title (`movie-news-feed.html` for THE FEED). Genre variants may use their own title (`Case File 7 - The Frozen Feed.html`), but the movie-slug form is preferred for new work.
- **Location:** inside its category folder, alongside that category's `README.md` and `TOOLBOX.md`.
- **Order inside the file:** `<style>` (variables → layout → components → animations) → stage markup, one `<section class="scene">` per scene in order → `scenes[]` script array → engine.
- **Pre-rendered audio** (`scene_NN.mp3`) and `export_movie.py` are optional, for video export only. The HTML must never depend on them.

---

## 11. Adding a new scenario

1. Write the folder's `TOOLBOX.md` first. The heroes come from it — not the other way around.
2. Name the villain, then pick the one hard edge case that becomes the Final Battle.
3. Draft all narration lines end to end, and read them aloud before touching any markup.
4. Assign heroes to `TOOLBOX.md` entries, decide which one is the mystery hero.
5. Copy `01-scale-problems/movie-news-feed.html` as the reference implementation and replace scenes and the `scenes[]` array.
6. Work the §9 checklist.
