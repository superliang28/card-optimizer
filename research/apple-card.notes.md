# Apple Card — research notes (data as of 2026-09-29)

Card id: `apple-card`. Researched 2026-09-28/29 for the card-selection tool. ~20 web searches and ~45 fetches
(WebFetch + curl; Goldman Sachs and Mastercard block bots, so their PDFs/pages were read from Wayback Machine
snapshots — see "Could not verify directly").

## Headline verified facts

| Item | Value | Source (official) |
|---|---|---|
| Issuer today | Goldman Sachs Bank USA, Salt Lake City Branch, Member FDIC | apple.com/apple-card footer; Customer Agreement p.2 |
| Issuer change | Chase to become issuer; announced 2026-01-07; "approximately 24 months" (≈ early 2028); subject to regulatory approval; Goldman services accounts until then | apple.com/newsroom 2026/01; goldmansachs.com press release 2026-01-07; jpmorganchase.com IR; learn.applecard.apple/transition |
| Network | Mastercard; Apple/Chase/GS all state Mastercard stays after transition | same |
| Annual fee | $0 — agreement fee table: Annual None, Transaction None, Penalty None, Other None | Customer Agreement p.1 |
| Foreign transaction fee | 0% — "We do not add any foreign exchange rate fee"; conversion by Mastercard International | Customer Agreement, "Transactions made in foreign currencies" |
| APR | 17.49%–27.74% variable (Prime 6.75% as of 06/30/2026 + 10.74%–20.99%; cap 29.99%); "Rates as of July 1, 2026" | Customer Agreement p.1; apple.com footnote |
| Cash advances | Prohibited ("Cash Advances and Cash Equivalents" listed under uses not permitted) | Customer Agreement p.3–4 |
| 3% Apple | Apple retail/online store, iTunes, Apple Music, other Apple-owned properties, App Store incl. in-app purchases; ACMI purchases get 3% up front; excludes Apple goods via third-party retailers/resellers and third-party wallets | Customer Agreement "Daily Cash Program"; apple.com |
| 3% partners (Apple Pay required) | Ace Hardware, Booking.com, ChargePoint, Duane Reade, Exxon, Mobil, Hertz, Nike, Uber, Uber Eats, Walgreens (11 brands; Exxon/Mobil and Walgreens/Duane Reade share terms) | support.apple.com/en-us/120400 (Published 2026-09-25); apple.com/apple-card |
| 2% | All Apple Pay purchase transactions | Customer Agreement |
| 1% | All other purchase transactions (titanium card, virtual card number, third-party wallet) | Customer Agreement; support 120400: "3% ... is not offered for purchases made with a titanium Apple Card or using your virtual card number" |
| Stacking | Only the highest percentage applies | Customer Agreement |
| Caps / expiration | None; "no limit to how much Daily Cash you can get"; "never expires or loses its value" | support 119575 (Published 2026-09-14); apple.com |
| Deposit mechanics | Automatic transfer to Daily Cash Election (Apple Cash or Savings) "at least once every Business Day"; if none, accrues and can be redeemed as statement credit; credited/paid out on closure | Customer Agreement; support 119575 |
| Clawback | Returns/disputes/merchant credits → "Daily Cash Adjustment" charged to account | Customer Agreement p.7–8 |
| Savings APY | 3.50% as of 2026-09-23 (raised from 3.40% on 2026-09-22) | learn.applecard.apple/savings; support 102163 (Published 2026-09-23) |
| Savings max balance | $1,000,000 (Deposit Account Agreement "Effective March 19, 2026"); FDIC standard coverage | Deposit Account Agreement p.1, p.4 (Wayback 2026-03-20) |
| Savings eligibility | Owners & Co-Owners only; not Participants; not in Guam/NMI/USMOI; opening Savings elects all Daily Cash to Savings; cannot split | support 119575, 102163 |
| Apple Card Family | Family Sharing group; up to 6 people (owner + 5 incl. one Co-Owner); Co-Owner 18+, jointly liable, reported as owner, can merge credit lines; Participants 13+, spend limits/locks/notifications; 18+ Participants can opt in to credit reporting as authorized user | support 109303 (Published 2026-09-14); apple.com footnotes |
| ACMI | 0% APR; iPhone 24 mo (AT&T/T-Mobile/Verizon), iPad/Watch/Mac/Vision Pro/Studio Display/accessories 12 mo, Apple TV/AirPods/Beats Flex 6 mo; taxes & shipping at variable APR; not refurbished/EPP/business/gov storefronts | support 102730 (Published 2026-08-10); apple.com footnote |
| Costco | US warehouses & gas: Visa credit only (Apple Pay accepted but card must be Visa); Costco.com accepts Mastercard | customerservice.costco.com a_id/719 |

## Protections — what Apple Card actually carries

Conclusion: **No purchase protection, no extended warranty, no return/price protection, no cell-phone protection,
no rental-car CDW, no trip cancellation/interruption/delay, no baggage, no travel accident, no roadside, no travel
emergency assistance.**

Evidence chain:
1. **Customer Agreement (Wayback 2026-07-20, current rates)** — the only benefits language is under "NETWORK BENEFITS":
   "The Network makes benefits available with your Account that are not part of this Agreement and are subject to
   change or cancellation. Details about Network benefits can be found in Apple Wallet or by reviewing card.apple.com."
   Zero mentions of warranty, insurance, purchase protection, or a Guide to Benefits. No "Guide to Benefits" PDF
   exists for Apple Card anywhere I could find.
2. **Apple's official benefits page (learn.applecard.apple/benefits)** — lists as the Mastercard benefit only
   "identity theft protection". Nothing else.
3. **Mastercard's Apple Card benefits page (mastercard.com/apple-card-mastercard-benefits.html)** — live URL returns
   403 to bots; only Wayback snapshot is **2023-02-17**. It lists: Zero Liability Protection, Mastercard ID Theft
   Protection (Generali Global Assistance; enroll at applecard.idprotectiononline.com), ID Theft Resolution Services
   (1-877-837-0678), ShopRunner, Mastercard Travel & Lifestyle Services, Priceless Cities, Priceless Golf, onefinestay
   10% off. **No** Purchase Assurance, Extended Warranty, MasterRental, trip insurance, cell phone protection.
4. **applecard.idprotectiononline.com** returns HTTP 200 on 2026-09-28 (JS app; content not readable by fetch) —
   the ID Theft Protection enrollment portal is still live.
5. **ShopRunner**: shoprunner.com/mastercard → 404; ShopRunner ended as an Amex benefit 2025-03-31 and no current Apple
   or Mastercard page mentions it. Treated as defunct.
6. Secondary confirmation: HelloSafe (updated 2026-07-08, "Zero insurance"), WalletHub (no travel insurance, no
   extended warranty, no purchase protection), Apple Community thread 253497042. All agree.

Marked `verified: false`: Mastercard Travel & Lifestyle Services / Priceless / onefinestay (only in 2023 snapshot; not
on any current Apple page) and the generic "Mastercard Global Service" line under travelEmergencyAssistance.

## Merchant list — change history (for the 18-month window and context)

- 2019-08-20 launch: Uber/Uber Eats. 2019-09-12 Walgreens/Duane Reade. 2019-09-19 T-Mobile. 2019-11-25 Nike.
  2020-06-29 Exxon/Mobil. 2020-08-03 Panera Bread. 2022-04-19 Ace Hardware. (MacRumors guide.)
- 2024-12-09: Booking.com + ChargePoint added; Booking.com 2% Travel Credits perk; Panera removal announced
  (YourMileageMayVary 2024-12-09; Appleosophy). NerdWallet's summary says Nov 19, 2024 for the additions — the
  YMMV article dated Dec 9 says "effective immediately"; I could not open NerdWallet (403) to reconcile. Recorded as
  2024-12-09 with this caveat.
- 2025-02-01: Panera Bread → 2% (9to5Mac 2025-01-18).
- 2025-05-08: Uber One 6-month trial launched; T-Mobile drop announced (MacRumors 2025-05-08; Doctor of Credit).
- 2025-07-01: T-Mobile → 2% (MacRumors PSA).
- 2025-11-04: Hertz added (MacRumors 2025-11-04). Support article 120400 confirms current terms.
- **Chevron / Texaco: no evidence they were ever Apple Card partners.** Searches for "Apple Card" + Chevron/Texaco
  returned only Exxon/Mobil results. The caller's list item "Chevron/Texaco" appears to be a mix-up (possibly with
  another card's gas partner). Flagged in recentChanges/gotchas so the tool does not surface it.

## Promotions (all ended; not ongoing credits)
- 2025-08-15 → 09-15: 5% at Exxon/Mobil/ChargePoint, $500 cap, $25 max (MacRumors 2025-08-18).
- 2026-06-15 → 07-15: 6% at Nike, $500 cap, $30 max (MacRumors 2026-06-15).
- 2026-08-18 → 09-15: 5% at Booking.com/Hertz/ChargePoint/Exxon/Mobil, $750 cap, $37.50 max (MacRumors 2026-08-18).
  Apple runs these via Wallet > Rewards & Offers; none active on 2026-09-29 that I could find.

## Savings APY history (secondary sources; official page only shows current rate)
4.15% (Apr 2023 launch) → 4.50% (Jan 2024) → 4.40%/4.25%/4.10%/3.90% through late 2024 (not itemized here) →
3.75% (Mar 2025) → 3.65% (2025-05-28) → 3.50% (2026-04-23) → 3.40% (Jun 2026) → 3.50% (2026-09-22).
Sources: MacRumors 2025-05-28, 2026-04-23, 2026-09-22; AppleInsider 2026-09-23. Exact June 2026 day not captured.

## Chase transition — what is and isn't known (learn.applecard.apple/transition, fetched 2026-09-28)
Stays the same per Apple: up to 3% unlimited Daily Cash, no fees (annual/late/foreign), Apple Card Family, Savings
access, ACMI, Mastercard network, Wallet/card.apple.com management, Apple Card support channels. TBD: card number
changes "if any", new physical cards, Savings specifics. Credit reports will show Chase after the switch. No action
required now. Goldman's release adds the deal "may not close on the anticipated timeline or at all". MacRumors
(2026-08-20) frames the completion as "by early 2028". Nothing announced about benefit devaluations or additions.
Note: the transition FAQ footnote still shows "Rates as of January 1, 2026" for the same 17.49%–27.74% range;
apple.com shows "as of July 1, 2026" — the range is unchanged, only the as-of stamp differs.

## "Last updated" dates seen on official documents
- Apple Card Customer Agreement (Wayback capture 2026-07-20): no printed revision date; rates table cites Prime Rate
  "as of 06/30/2026" → this is the July 2026 version matching apple.com's "Rates as of July 1, 2026".
- Deposit Account Agreement: "Effective March 19, 2026".
- support.apple.com/en-us/120400 (3% merchants): Published 2026-09-25.
- support.apple.com/en-us/119575 (Daily Cash): Published 2026-09-14.
- support.apple.com/en-us/109303 (Apple Card Family): Published 2026-09-14.
- support.apple.com/en-us/102163 (Savings): Published 2026-09-23; "APY as of September 23, 2026".
- support.apple.com/en-us/104951 and 102730: Published 2026-08-10.
- Mastercard Apple Card benefits page: snapshot 2023-02-17 (page footer © 2019); live page inaccessible.

## Could not verify directly / caveats
- goldmansachs.com (agreement PDFs, press release) and mastercard.com return 403/JS challenge to WebFetch, curl and
  the sandboxed browser. Agreement and Deposit Agreement read from Wayback captures (2026-07-20 and 2026-03-20).
  The press release text was recovered from the raw HTML JSON payload via curl (datePublished 2026-01-07).
- Live Mastercard benefits page for Apple Card could not be read; relied on the 2023 snapshot + Apple's current
  benefits page + card agreement. Risk: Mastercard may have quietly added/removed lifestyle perks since 2023.
- NerdWallet 3% merchants article and Jerry Cards promo article: 403; used search-result summaries only.
- Booking.com/ChargePoint add date: 2024-11-19 (NerdWallet summary) vs 2024-12-09 (YMMV article). Used 2024-12-09.
- Apple Pay acceptance "85 percent of merchants in the United States" is Apple marketing copy, not audited.
- Web search budget was exhausted (200/200) near the end; final confirmations used direct fetches only.

## Schema notes
- `credits` is empty: Apple Card has no statement credits. Partner perks (Uber One trial, Booking.com Travel Credits,
  Hertz discounts) are third-party-fulfilled and live under `perks`.
- Added non-schema fields: `issuerNotes` (top level), `categoryTags` on each `merchantRates` entry (canonical ids so
  the tool can map Uber→rideshare, Exxon/Mobil→gas, ChargePoint→ev-charging, Walgreens/Duane Reade→drugstores,
  Ace→home-improvement, Hertz→car-rental, Booking.com→hotels/car-rental/travel, Uber Eats→dining), and
  `protections.summary`. Two `everything` earning rows (2% Apple Pay, 1% otherwise) because the base rate depends on
  payment method.
- `verified: false` set on: perks[Mastercard Travel & Lifestyle/Priceless/onefinestay]; protections.travelEmergencyAssistance.
