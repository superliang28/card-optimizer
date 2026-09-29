# Which Card?

A personal, installable web app that answers one question: *which of my credit cards should I
use for this purchase?* Type a merchant or purchase type and it ranks every card by real value
(earning rate × your point valuation), lists the statement credits you can use there, and shows
which protections (rental car, purchase protection, cell phone, trip delay…) cover it.

- **App:** static HTML/JS, no build step, works offline once loaded (PWA). Add it to your
  iPhone home screen from Safari's Share menu.
- **Data:** `data/cards.json` (benefits, credits, protections, sources per card),
  `data/merchants.json` (merchant → category, Apple Pay and network acceptance),
  `data/categories.json` (taxonomy and search keywords), `data/profile.json` (your point
  valuations and preferences).
- **Updates:** a scheduled Claude cloud routine re-researches every card each quarter,
  edits `data/cards.json`, runs `python3 scripts/validate.py`, and pushes to `main`. GitHub
  Pages redeploys automatically. Instructions for the routine are in `UPDATE_INSTRUCTIONS.md`;
  provenance notes live in `research/`.

## Local preview
```
python3 -m http.server 8765
```
then open http://127.0.0.1:8765/.

## Changing your preferences everywhere
Edit `data/profile.json` (valuations in cents per point, Prime membership, etc.) and push.
Per-device tweaks made in the app's Settings tab stay on that device.

## Not included
Targeted offers (Amex Offers, Chase Offers, Discover Deals) are account-specific and are not
modeled. Always confirm a credit's terms in your card account before relying on it.
