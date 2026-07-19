# THE FEED — Premiere Pro Import Kit

Everything you need to rebuild the movie in Adobe Premiere with full creative control.

## What's here

- `frames/` — 68 PNG stills (1920×1080), numbered `f_000` → `f_067` in story order. One frame per narration line.
- `the-feed.srt` — every narration line as a subtitle, timed to the intended pacing (~9.7 min total).
- `narration-script.txt` — the full voiceover script with timecodes and scene headings.
- `frame-durations.txt` — exact intended on-screen duration for each frame.

## Import steps

1. **Frames:** File → Import → select the `frames` folder. Do NOT check "Image Sequence" (frame durations vary). Before dragging to the timeline, set Edit → Preferences → Timeline → *Still Image Default Duration* to ~6 seconds, then select all 68 in the bin and drag to V1 in order. Fine-tune each cut using `frame-durations.txt`, or just ride your VO.
2. **Captions:** drag `the-feed.srt` into the project and onto the timeline — Premiere creates a caption track automatically. Restyle in Essential Graphics.
3. **Voiceover:** open `narration-script.txt`, arm the mic (voiceover record button on A1), and read scene by scene. Or paste lines into any TTS tool and import the audio files.
4. **Motion:** add scale/position keyframes (Ken Burns) to stills, and dip-to-black between the three acts. Scene boundaries are marked by the headings in the script.

## Story structure (for editing)

Act I (f_000–f_012): problem + villain · Act II (f_013–f_044): the 7 heroes + roll call · Act III (f_045–f_061): assembly + climax + lessons · Quiz/credits (f_062–f_067).
