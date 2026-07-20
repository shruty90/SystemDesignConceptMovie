# Video Design Spec — Must-Have Rules

**Scope:** every video/movie in every sub-directory of this repo (`01-scale-problems/` … `05-fundamentals/`), existing and future.

These are **must-haves**, not preferences. A video that misses one of these is not done. This doc sits alongside [`ANIMATION-DESIGN.md`](./ANIMATION-DESIGN.md), which covers narrative structure, palette, and engine detail — where the two overlap, this file wins.

---

## 1. The progress bar must be a real scrubber

The progress/scroll bar is **draggable**, not decorative.

- Dragging the handle seeks the video to that point.
- On release, playback **resumes from the dragged-to position** — not from the start of the scene, not from where it was before the drag.
- If the video was playing before the drag, it keeps playing after. If it was paused, it stays paused on the new frame.
- Narration must cancel the old line and start the line at the new position. No overlapping voices.
- The bar shows position across the **whole video**, not just the current scene.

**Test:** drag to 70%, let go — the narration and the visuals both pick up at 70%.

---

## 2. Animation must match the narration, literally

If the narration or captions say **"many servers,"** the screen shows **many servers** — not one. Same for "many queues," "three copies," "thousands of users," "two databases."

- Say a number, show that number (up to ~8; above that, show a crowd that reads as "a lot").
- Say "it crashes," something visibly crashes. Say "it slows down," something visibly slows.
- Never let a visual contradict the words on screen. A mismatch is the fastest way to lose the learner's trust.

**Test:** mute the video, read the captions only — the picture should still be telling the same story.

---

## 3. The studio card

Every video opens with:

> **Shruty Popcorn Production Presents**
> *<STORY NAME>*

Exact wording, every time. The story name follows on its own beat, not the same line.

---

## 4. Make the open feel like a movie

The presents-slide gets real production value:

- The studio name animates in (fade/scale/glow), holds, then the title lands with its own hit.
- Letterboxed and cinematic from the first frame. No cold starts.
- The cinematic feel comes from **timing, motion, and typography** — the beats are held long enough to land.

**No background music.** No score, no sting, no ambient bed — not on the studio card, not anywhere in the video. The narrator's voice is the only audio. Nothing may compete with it or play underneath it.

---

## 5. Tell the audience what they're about to learn

The slide immediately after the title card states the subject **plainly**, before any story begins.

> "You're about to watch a tutorial on handling **scale** — what breaks when a system built for a hundred people meets a million."

- Name the category in plain words.
- Say what problem the video solves and what the learner will be able to answer afterward.
- No mystery here — save the suspense for the villain reveal. The audience should never be 30 seconds in wondering what this is about.

---

## 6. Creative decisions come back to Shruty

Video creation is **collaborative, not autonomous**. While building any video, keep asking questions and keep the creative calls with me:

- Ask before locking in the villain, the tone/genre, the analogies, and the pop-culture references.
- Ask when there's a fork worth having an opinion on (detective noir vs. mission control vs. classic hero movie).
- Offer options rather than a single finished thing — 2–3 directions, then build the chosen one.
- Check in mid-build, not only at the end.

Silence is not approval. When in doubt, ask.

---

## 7. Pop culture is allowed

Pop-culture references are welcome where they genuinely help the explanation.

- Use them as **analogies that teach**, not decoration.
- Keep them broad enough that a smart 12-year-old gets them.
- Don't let a reference outrun the concept — if explaining the reference takes longer than explaining the idea, cut it.
- Run bigger swings past me first (see rule 6).

---

## 8. The animation is the memory device

**People remember pictures, not sentences.** The visual is what survives after the narration is forgotten — so the image carries the concept, and it has to be the sharpest thing in the frame.

Every animation must do a specific job: make the learner remember one tool from that folder's `TOOLBOX.md`.

- **One picture, one tool.** The visual should map cleanly onto a single toolbox entry. If a learner recalls the image in an interview, they should be able to name the tool from it.
- **The picture must be the thing itself.** A cache is something kept close by and reused. A queue is a line. A shard is a whole thing cut into pieces. Don't animate a vague abstraction and label it.
- **If the animation doesn't match the example in the narration, cut it.** A near-miss visual is worse than none — it competes with the words and the learner remembers the wrong picture.
- **No decorative motion.** If a moving element isn't teaching the tool, it's stealing attention from the one that is.
- **The mismatch test:** could someone describe the animation back to you and land on the right tool? If they'd say "something moved around," the animation has failed.
- **Reuse the same visual language for the same tool across videos.** A queue should look like a queue in every folder — repetition is what makes it stick.

**Test:** pause on any hero scene, hide the text, and ask "which toolbox entry is this?" There should be exactly one answer.

---

## Pre-ship checklist

- [ ] Progress bar drags, seeks, and resumes correctly from the drop point
- [ ] Every "many / N of something" line has matching visuals on screen
- [ ] Opens with "Shruty Popcorn Production Presents" + story name
- [ ] Presents slide is cinematic through motion and timing — and has **no** music
- [ ] No background audio anywhere; narration is the only sound
- [ ] Slide 2 states exactly what the tutorial covers
- [ ] Creative choices were reviewed with Shruty, not assumed
- [ ] Pop-culture references (if any) teach something and are age-appropriate
- [ ] Every animation maps to exactly one `TOOLBOX.md` entry and passes the text-hidden test
- [ ] No decorative or near-miss visuals — anything that doesn't teach the tool was cut
- [ ] Still satisfies the `ANIMATION-DESIGN.md` checklist
