import asyncio
import os
import shutil
from pathlib import Path

from playwright.async_api import async_playwright

root = Path(__file__).resolve().parent
html = root / 'movie-news-feed.html'
out_dir = root / 'export_frames'
out_dir.mkdir(exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 960, 'height': 640})
        await page.goto('file://' + str(html), wait_until='networkidle')
        await page.wait_for_timeout(1000)
        await page.evaluate('''() => {
            const overlay = document.getElementById('overlay');
            if (overlay) overlay.style.display = 'none';
            const btn = document.getElementById('btnStart');
            if (btn) btn.click();
        }''')
        await page.wait_for_timeout(3000)
        for i in range(12):
            await page.screenshot(path=str(out_dir / f'frame_{i:02d}.png'), full_page=True)
            await page.wait_for_timeout(1000)
        await browser.close()

asyncio.run(main())
print('Captured frames in:', out_dir)
