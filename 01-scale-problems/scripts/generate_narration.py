import asyncio
import os
import re
import sys
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "audio"
OUT_DIR.mkdir(exist_ok=True)

SCENES = [
    "Grab your popcorn. Every system design interview is really a story in disguise.",
    "And every great story needs a villain worth remembering.",
    "Once, there was a small app where friends shared little moments and funny posts. It lived on one server.",
    "That server held everything — posts, likes, followers — inside one database.",
    "A thousand users scrolled happily. Requests arrived, answers came back, and the system barely noticed.",
    "Fifteen percent effort. Life was calm. Almost too calm.",
    "Then the app went viral, and the villain arrived. Its name was scale, and it came in like a storm.",
    "One hundred million users. That is not a crowd — it is a movement.",
    "Half a million people refresh the feed every single second, and the pressure never lets up.",
    "And scale's sharpest weapon was simple: a celebrity post. One post, one hundred million feeds, all at once.",
    "The users swarmed in, and our one little server stood alone against the tide.",
    "It groaned under the pressure. The database was asked the same questions again and again, as if the whole room kept asking for the same page at once.",
    "One hundred percent effort. The app froze. Users left. And suddenly, the story needed heroes.",
    "Meet our first hero: the Load Balancer, the doorman of the system.",
    "Imagine a school cafeteria with only one lunch line. Pure chaos. Now imagine ten counters, each guiding students to the shortest line.",
    "That is exactly what the Load Balancer does. It stands at the front door and spreads traffic across many servers, so no single machine is crushed.",
    "Say it with me: never make everyone stand in one line.",
    "But what if there is only one server to begin with? Then our second hero arrives: the Clone Army.",
    "Think of substitute teachers who can step into any classroom because the lesson plan lives on a shared drive, not in one person's head.",
    "Our servers work the same way. Each clone is identical, remembers nothing personal, and can serve any user. When demand rises, we add more clones. Engineers call this scaling out.",
    "The catchphrase is simple: any clone can help any user.",
    "Hero number three arrives with speed: the Cache.",
    "Imagine walking to the store every time you want a snack. Exhausting. A wiser approach is to keep your favorite snacks in your backpack.",
    "The Cache behaves like that backpack. It stores the most popular answers in lightning-fast memory, so a million people asking for the same trending post do not all hammer the database.",
    "Catchphrase: why ask twice?",
    "Hero number four is Read Replicas, the copy machines of the system.",
    "Thirty students, one textbook. Everyone waits. But when that textbook is copied, the whole class can read at once.",
    "Replicas are photocopies of the database. Read traffic spreads across them, while one simple rule holds: new writes go to the original, and reads come from the copies.",
    "Remember: copies for reading, the original for writing.",
    "Hero number five is Sharding, the splitter.",
    "Picture an encyclopedia so heavy it barely fits in your arms. The solution is not to struggle harder. You split it into volumes, one for each letter range.",
    "Sharding cuts a giant database into smaller pieces by a key, such as the username. Each piece lives on its own machine, and a trick called consistent hashing remembers exactly where each volume belongs.",
    "Catchphrase: too big to carry? Cut it up.",
    "Hero number six is the Message Queue, the mailroom of the story.",
    "Think of a homework drop box. A paper does not need to be graded the instant it is handed in. It waits safely in the tray and is processed in order.",
    "When a user posts, the app can acknowledge it immediately and send the slower work — such as updating follower feeds — into the queue. Worker robots handle that work in the background, retrying anything that fails.",
    "Catchphrase: not everything needs an answer right now.",
    "Our final hero is the CDN, the world tour of delivery.",
    "One pizza shop serving the entire planet would leave half the world waiting. The wiser move is to open shops in every neighborhood.",
    "The CDN stores copies of photos and videos in hundreds of locations around the globe, so a user in Japan can download from nearby, not from a faraway server.",
    "Catchphrase: keep copies close to the fans.",
    "Our seven heroes stand together. The doorman splits the line. The clone army serves everyone.",
    "The Cache keeps snacks in the backpack. The copy machines duplicate the textbook.",
    "The splitter cuts the encyclopedia. The mailroom holds the homework.",
    "The world tour delivers pizza everywhere. And one mystery hero is still waiting in the wings.",
    "Now the final plan comes into focus. The team takes its place on the battlefield.",
    "Photos and videos are handled by the CDN before they ever reach the core.",
    "Everything else passes through the doorman to the clone army.",
    "The clones check the cache first, because most feeds are already waiting there, ready to go.",
    "New posts are written to the original database, then spread across replicas and shards.",
    "And the slower work — copying posts into followers' feeds — drops into the queue, where worker robots handle it calmly.",
    "But scale still has one more trick. The celebrity. One hundred million followers.",
    "If our workers copy that post into one hundred million feeds, the whole system groans. One post. One hundred million writes. Game over?",
    "No. Because now the mystery hero steps out of the shadows: Hybrid Fan-out.",
    "For regular users with only a few hundred followers, we push. We copy their posts into friends' feeds right away, like handing out a handful of invitations.",
    "For celebrities, we do not copy. Instead, when you open the app, it pulls their latest posts fresh and mixes them into your feed. One copy, read by millions.",
    "Your ready-made feed, plus fresh celebrity posts, merges in a fifth of a second. The villain falls to its knees.",
    "So how do you beat scale? Four ideas. That is all.",
    "First, spread the work. Many small machines beat one big machine.",
    "Second, do not repeat work. Cache the popular stuff. Why ask twice?",
    "Third, do slow work later. Queues keep the app feeling instant.",
    "And fourth, treat giants differently. Push for regular users, pull for celebrities.",
    "Pop quiz. Prove you were paying attention. Question one: a million people ask for the same trending post. Who saves the day? Click your answer.",
    "Question two: users in Japan say videos load slowly from a server in America. Which hero helps?",
    "Last one. A celebrity with one hundred million followers posts. What is the smart plan?",
    "Scale is defeated. And here is the secret: you now know the real answer to one of the most famous interview questions of all — design a news feed for one hundred million users.",
    "Spread the work. Cache the popular stuff. Queue the slow stuff. Treat celebrities differently.",
    "Roll credits. See you in the next movie."
]

async def generate_one(text, idx):
    out_path = OUT_DIR / f"scene_{idx:02d}.mp3"
    if out_path.exists():
        return out_path
    communicate = edge_tts.Communicate(text, voice='en-GB-RyanNeural', rate='-5%', volume='+0%')
    await communicate.save(str(out_path))
    return out_path

async def main():
    for idx, line in enumerate(SCENES, 1):
        await generate_one(line, idx)
        print(f"generated {idx}/{len(SCENES)}")

asyncio.run(main())
