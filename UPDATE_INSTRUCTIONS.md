# Quarterly benefits refresh — instructions for the automated routine

You are refreshing the benefits data behind a personal credit card optimizer web app.
The app is static (GitHub Pages) and reads `data/cards.json`, `data/merchants.json`,
`data/categories.json` and `data/profile.json`. Your job is to make `data/cards.json`
reflect each card's CURRENT benefits, then validate and push. Do not redesign anything.

## Ground rules
1. Official sources first: the issuer's card page, rewards program terms, guide to benefits
   (PDF), cardmember agreement, newsroom. Reputable secondary sources (The Points Guy,
   NerdWallet, Doctor of Credit, Frequent Miler, One Mile at a Time, Upgraded Points) only to
   spot changes or confirm; the official source wins on conflicts. Read the actual terms.
2. Every rate, cap, credit amount, and protection limit must be traceable to a URL in the
   card's `sources` list. Never invent a benefit. If a benefit was removed, delete it from
   the data and record the removal (with date) in that card's `recentChanges`.
3. Preserve the structured fields the app depends on (documented below). When you change a
   rate or add a rule, keep or add the appropriate flags (`via`, `usOnly`, `stack`,
   `requires`, `activation`, `excludeMerchants`, `canonical`, `portalName`, `currency`).
4. Do not edit `app.js`, `index.html`, `styles.css`, `sw.js` unless a data change
   genuinely requires it (it should not).
5. Keep JSON formatted with 2-space indentation. Run `python3 scripts/validate.py` and fix
   every ERROR before committing. Warnings should be resolved when possible.

## What to check, per card (10 cards)
For each card in `data/cards.json`:
- Annual fee, foreign transaction fee, network (Apple Card issuer transition; Bilt issuer).
- Earning rates, category definitions, caps and after-cap rates. Named-merchant rates
  (`merchantRates`) and their end dates (e.g., Chase/Lyft, Apple Card partner merchants).
- Every credit: amount, period, reset schedule, eligible merchants, enrollment requirement,
  how-to-use rules, and whether it still exists. Look for NEW credits.
- Protections: rental car (primary/secondary), purchase protection, extended warranty,
  return protection, cell phone protection, trip delay/cancellation, baggage, travel accident.
- Perks (lounges, status, memberships) and program changes affecting point values.
- `recentChanges`: keep entries from the last 18 months, dated; drop older ones.
- `gotchas`: keep accurate.
- `sources`: refresh; remove dead links; add the pages you relied on.
- Set the card's `dataAsOf` to today (YYYY-MM-DD).

Specific things that change often:
- **Discover it Cash Back**: `rotating.quarters` must include the current quarter and the
  next quarter (Discover publishes the full-year calendar each December; check
  discover.com/credit-cards/cash-back/cashback-calendar). For each quarter fill
  `canonical.categories` (ids from `data/categories.json`), `canonical.merchants`
  (merchant names that appear in `data/merchants.json` aliases, e.g. "Amazon.com",
  "Target", "Walmart", "PayPal"), and `canonical.tags` (`apple-pay` when the category is
  digital wallets). Remove quarters older than 12 months.
- **Amex Platinum / Gold**: credits are added, removed, and re-scheduled frequently; the
  digital entertainment and dining credit merchant lists change.
- **Apple Card**: the 3% partner merchant list and the issuer (Goldman Sachs → JPMorgan
  Chase transition) and any benefit changes that come with it.
- **Bilt Palladium**: Bilt Cash mechanics, housing-points unlock rate, transfer partners,
  merchant credits, hotel credit rules.
- **Chase Freedom Unlimited / Prime Visa**: partner benefits (Lyft, DoorDash, Instacart)
  with end dates; Amazon rotating 10% items are not tracked.
- **Marriott Boundless**: limited-time credits (airline credit windows), Free Night Award
  top-up rules, Bonvoy devaluations that change the point valuation.
- **Wells Fargo Autograph**: transfer partners, category definitions.
- **Blue Cash Preferred**: streaming eligible list, Disney Bundle credit status.

## Merchant directory
`data/merchants.json` is mostly stable. Only touch it to (a) add a merchant that a new credit
or merchant rate refers to (so the app can match it), (b) fix an Apple Pay acceptance fact
(`ap`), or (c) fix a network acceptance fact (`no`). Do not remove entries.

## Currency valuations
Do NOT change `data/profile.json` valuations (they are the cardholder's preference). If a
program devalues points materially (e.g., Marriott award prices up 20%), mention it in the
card's `recentChanges` and in the changelog so the cardholder can adjust.

## After editing
1. Update `meta.dataAsOf` (today) and `meta.nextUpdate` (first day of the next calendar
   quarter, YYYY-MM-DD) in `data/cards.json`. Append an entry to `meta.changelog`:
   `{"date": "YYYY-MM-DD", "summary": "one paragraph of what changed"}` (keep the last 8).
2. Append the same summary, with per-card bullets and source URLs, to `research/CHANGELOG.md`
   (newest first).
3. Run `python3 scripts/validate.py`. It must exit 0.
4. Commit everything to `main` with a message like `Quarterly benefits refresh YYYY-Qn`
   and push. If the push is rejected, create a branch `refresh/YYYY-Qn`, push it, and open a
   pull request against `main` with the changelog summary as the description.
5. If any fact could not be verified from an official source, keep the previous value,
   set `"verified": false` on that object, and list it in the changelog under
   "Needs manual check".

## Data schema for `data/cards.json`
```
{
  "meta": {"dataAsOf": "YYYY-MM-DD", "nextUpdate": "YYYY-MM-DD", "repo": "url", "changelog": [...]},
  "currencies": {"<id>": {"name": "...", "shortName": "MR", "unit": "points|percent", "note": "..."}},
  "cards": [ { ...card... } ]
}
```
Card fields:
- `id`, `name`, `shortName`, `issuer`, `network` (visa|mastercard|amex|discover), `color` (hex),
  `annualFee` (number), `foreignTransactionFee` (percent number), `dataAsOf`, `sources` [urls].
- `currency`: `{id, name, unit, redemption}`; `id` must exist in `meta.currencies`.
- `earning[]`: `{category | categories[], rate, currency?, unit?, stack?, via?, usOnly?,
  requires?, activation?, excludeMerchants?[], includeMerchants?[], cap?{amount, period,
  basis, afterCapRate}, portalName?, conditions, notes, verified?}`
  - `category` ids come from `data/categories.json`. Use `categories` for a rule covering
    several ids. Every card needs an `everything` rule (its base rate).
  - `via`: `apple-pay` (rate needs Apple Pay), `portal` (booked through the issuer's portal;
    set `portalName`), `direct` (booked directly with airline/hotel).
  - `usOnly: true` when the bonus applies only to US merchants (Amex restaurants, supermarkets).
  - `stack: true` for a reward that is earned IN ADDITION to the points rule (Bilt Cash).
    Give it its own `currency` and `unit: "percent"`.
  - `requires: "prime"` for rates that need an Amazon Prime membership.
  - `activation: true` for rates that need quarterly activation.
- `merchantRates[]`: `{merchant, rate, currency?, unit?, via?, validThrough?, conditions, notes}`;
  `merchant` must match a name or alias in `data/merchants.json`.
- `rotating` (Discover only): `{activationRequired, capPerQuarter, quarters[]}` where each
  quarter is `{start, end, rate, categories[strings], canonical{categories[], merchants[], tags[]}, notes}`.
- `credits[]`: `{id, name, amount, period (monthly|quarterly|semiannual|annual-calendar|
  annual-cardmember|one-time), schedule, merchants[], categoryTags[], enrollmentRequired,
  howToUse, expiresUnused, endsOn?, source}`.
- `protections`: keys rentalCar, purchaseProtection, extendedWarranty, returnProtection,
  cellPhone, tripDelay, tripCancellation, baggageDelay, lostLuggage, travelAccident,
  roadsideAssistance, travelEmergencyAssistance; each `{has, coverage?, perClaim?, perYear?,
  perItem?, perTrip?, perPerson?, days?, hoursRequired?, extraYears?, deductible?,
  claimsPerYear?, limit?, conditions?, notes, source}`.
- `perks[]`: `{name, details, source}`; `acceptance`: string; `recentChanges[]`, `gotchas[]`.
