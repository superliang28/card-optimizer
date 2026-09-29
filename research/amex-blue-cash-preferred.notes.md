# Blue Cash Preferred Card from American Express — research notes

Researched 2026-09-28 (data as of 2026-09-29 per SPEC). Card id `amex-blue-cash-preferred`.
Method: official americanexpress.com / global.americanexpress.com pages (several are JS-rendered, so they were read
through the browser pane rather than a plain fetch), the card's application Terms & Conditions page, the Amex
rewards-information site, and the four AMEX Assurance benefit-guide PDFs, then cross-checked against TPG, NerdWallet,
Doctor of Credit, Upgraded Points, Frequent Miler, OMAAT, AwardWallet and US Credit Card Guide.
Roughly 45 fetches/searches were made in total. The WebSearch budget ran out near the end; everything after that
was done with direct fetches and the browser.

## Verified from official sources

### Fees
- Annual fee: "$0 intro annual fee for the first year, then $95" (card page FAQ, 2026-09-28).
- Foreign transaction fee: "2.7% on each transaction after conversion to U.S. dollars" (card page FAQ).
- Purchase APR / intro APR: not captured (the rates table is loaded in a separate iframe that did not render
  as text). Not required by the schema. Upgraded Points (May 2026) reports 0% intro APR for 12 months then
  19.74%–28.74% variable — unverified.

### Earning (Rewards Program terms, verbatim on the "Earn Cash Back" benefit page and the application T&C page)
> "6% cash back on the first $6,000 of eligible purchases in a calendar year (then 1%) at supermarkets located in the
> U.S. (superstores, convenience stores, warehouse clubs, and meal-kit delivery services are not considered
> supermarkets); 6% cash back on eligible purchases of U.S. streaming subscriptions from select providers ... If a
> subscription is bundled with another product or service or billed by a third party (such as a digital platform, a
> cable, telecommunications, or internet provider, or a car manufacturer), the purchase may not be eligible; 3% cash
> back on eligible purchases on transit, including trains, taxicabs, ride share services, ferries, tolls, parking,
> buses, and subways (airfare, car rental and cruises are not considered transit); 3% cash back on eligible purchases
> of gasoline at gas stations located in the U.S. (superstores, supermarkets and warehouse clubs that sell gasoline are
> not considered gas stations); and 1% cash back on all other eligible purchases."

- Cap: $6,000 per **calendar** year (not cardmember year). Confirmed by the terms ("in a calendar year") and by
  the BCP membership guide page ("on up to $6,000 per calendar year").
- Transit is NOT restricted to the U.S. in the terms (only supermarkets and gas stations say "located in the U.S.").
- Rewards-info retail page (americanexpress.com/us/rewards-info/retail.html), no date shown:
  - Supermarket examples eligible: ALDI, FreshDirect, Gelson's, Hy-Vee, Kings Food Markets, Meijer, ShopRite,
    Smart & Final, Stop & Shop, Trader Joe's, Vons, Whole Foods, Winn-Dixie.
  - Not eligible: specialty stores (bakeries, butchers, cheese shops, fish markets, liquor stores, wine shops),
    superstores (Target, Walmart), warehouse clubs (BJ's, Costco), convenience stores (7-Eleven), meal-kit services
    (Blue Apron, Freshly, HelloFresh), online superstores and big box (Amazon).
  - Gas station definition: merchant whose primary business is selling gasoline (Gulf, Murphy USA, Murphy Express,
    Exxon, Mobil, Hess, Shell). Not eligible: superstores/supermarkets/warehouse clubs selling gas, marina fuel,
    commercial fuel (jet fuel), gas stations inside superstores or warehouse clubs. **EV charging is not mentioned.**
  - Streaming list (32): Amazon Music Unlimited, AMC+, Apple Music, Apple TV+, Audible, Britbox, DirecTV Stream,
    Discovery+, Disney+, ESPN, Fubo TV, HBO Max, Hulu, iHeartRadio, Kindle Unlimited, Luminary, MGM+, MLB.TV,
    NBA League Pass, Netflix, Pandora, Paramount+, Peacock, Prime Video, Sling TV, SiriusXM Streaming and Satellite,
    Spotify, Starz, TIDAL Music, YouTube Music Premium, YouTube Premium, YouTube TV.
    (Upgraded Points' July 2026 list is identical except it writes "ESPN+" where Amex writes "ESPN".)
- Rewards-info travel page: transit merchant must have transit as primary business; "Airfare, car rental, cruises,
  and trams are not considered transit"; list not exhaustive.
- Rewards-info FAQ: purchases via third-party payment accounts, online marketplaces with multiple retailers, or
  third-party card readers may not earn bonus; Apple Pay / Google Pay / Samsung Pay / Amazon One earn the same as
  the card; bonus rewards can take 8–12 weeks to post; "U.S." = 50 states, PR, USVI and other U.S. territories.

### Reward Dollars redemption (official Cash Back Program terms, application T&C page and Amazon benefit page)
- "redeem reward dollars for statement credits or for eligible items at Amazon.com checkout, with no minimum
  redemption amount." "cannot use cash back to pay the Minimum Due."
- Amazon: link card (up to 72 h); Amex charges the full purchase and posts a matching credit, possibly in a
  different cycle; returns handled by Amazon; ask Amex within 60 days to get Reward Dollars re-credited instead of a
  refund.
- Amex Credit Intel article (2026-02-12): statement credit "usually appear[s] within three days"; Reward Dollars
  never expire while the account is in good standing.
- Conflict: OMAAT's review (updated 2026-02-19) still says a $25 minimum applies. Official terms say no minimum;
  the $25 / 25-increment rule is an old (pre-2022) term. Official source wins.

### Statement credits
1. **$120 Disney Streaming Credit** — official page https://global.americanexpress.com/card-benefits/detail/disney-streaming-credit/blue-cash-preferred
   (and identical text on the application T&C page). Up to $10 per calendar month, $120 per calendar year, enrollment
   required, U.S. websites DisneyPlus.com / Hulu.com / Stream.ESPN.com, monthly or annual subscriptions incl. bundles,
   annual plan = one credit in the purchase month, third-party device/platform purchases excluded unless redirected
   to the Disney sites, cable bundles excluded, gift cards and advertising excluded, credit posts in days up to 8
   weeks, no minimum purchase (card page FAQ explicitly says "with no minimum purchase requirement").
   **It still exists in Sept 2026 at $120/yr** — confirmed on the live card page and benefit page.
2. **Amex Venue Collection Concessions Statement Credit** — found in the card's benefit terms and on
   https://global.americanexpress.com/card-benefits/detail/amex-venue-collection/blue-cash-preferred: 10% back on
   food & beverage concessions at participating stadiums/arenas, up to $250 per calendar year, enrollment required,
   one enrolled card per Card Member (across all their Amex cards), offer ends 12/31/2026. Network-wide benefit for
   U.S. consumer and business Amex cards, not BCP-specific. Included in `credits` because it is a real statement
   credit listed in this card's terms.
- No other statement credits exist on this card (no Equinox, Home Chef, etc.). The benefits dashboard lists 18
  benefits: Earn Cash Back, Disney Streaming Credit, Amex Offers, Amazon redemption, Venue Collection, Plan It,
  Purchase Protection, Return Protection, Car Rental Loss and Damage Insurance, Global Assist Hotline, Extended
  Warranty, Send Money, Split Purchases, FICO Score and Insights, CreditSecure, Premium Car Rental Protection,
  Digital Wallets, Amex Special Ticket Access.

### Protections (AMEX Assurance benefit guides linked from the per-card policy pages)
- **Car Rental Loss and Damage Insurance** — Benefit Guide 371-396 Rev. 4/19/2024 (PDF): up to $50,000 per Rental
  Agreement; 30 consecutive days max; "always secondary to any other insurance"; excludes Australia, Italy, New
  Zealand and OFAC countries; excluded vehicles: cargo/custom vans, vans seating >8, cube/box trucks, trucks GVWR
  >= 10,000 lb, commercial/hire use, leased vehicles, antiques (20+ yrs), limousines, off-road vehicles,
  motorcycles, mopeds, RVs, golf carts, campers, trailers; must reserve and pay entire rental with card and decline
  CDW; no liability coverage.
  Note: an automated summary of this PDF initially claimed "primary coverage" and "31 days" — that was wrong; the
  PDF text itself says secondary and 30 days.
- **Purchase Protection** — Guide 316-401 Rev. 4/19/2024: 90 days; $1,000 per Covered Purchase; $50,000 per Eligible
  Card per calendar year; natural disaster $500 per event; lost/mysteriously disappeared items not covered;
  notice within 30 days.
- **Extended Warranty** — Guide 314-399 Rev. 4/19/2024: up to 1 additional year on manufacturer warranties of 5
  years or less; $10,000 per item; $50,000 per card per calendar year.
- **Return Protection** — Guide file dated 10/09/2023: 90 days; $300 per item; $1,000 per account per calendar year
  (based on purchase date); U.S./territory purchases only; call within 90 days, docs within 30 days; long exclusion
  list (jewelry, watches, software, tickets, formal wear, consumables, motorized vehicles, etc.).
- **Not offered**: trip delay, trip cancellation/interruption, baggage delay, lost luggage/baggage insurance plan,
  travel accident insurance, cell phone protection, roadside assistance. None appear among the 18 listed
  benefits; secondary sources (WalletHub, hellosafe, NerdWallet Amex travel-insurance guide) agree.
- **Global Assist Hotline**: referral/coordination only when 100+ miles from home; third-party costs are the
  cardholder's.

## Recent changes (18-month window) — what was established where
- 2025-01-30: five streamers added (NerdWallet). Official list confirms they are present.
- 2025-08-01: Disney credit $7 -> $10/month, minimum spend removed, renamed "Disney Streaming Credit"
  (TPG 2025-08-01, Doctor of Credit 2025-08-01, AwardWallet 2025-08-01, Upgraded Points). Official page shows the
  new terms. No annual fee change.
- Early 2026: welcome offer switched to "as high as $300" (US Credit Card Guide, updated 2026-08-08); targeted $400
  for E*Trade/Morgan Stanley customers (Doctor of Credit); targeted $300 mailers (Frequent Miler).
- 2026-04-15: Doctor of Credit reported an Amex SURVEY floating $135/$160 annual fee, 8% groceries, Resy/AI/cloud
  credits, PetSmart perk. **No announcement as of 2026-09-28**; live card page still shows $95 and the current
  earning structure. Treated as a possible future change only.
- Venue Collection concessions offer: ends 12/31/2026 per official terms (start date not established).

## Could not verify / ambiguous
- **EV charging**: official terms define the 3% category as "purchases of gasoline at gas stations"; EV charging is
  not mentioned anywhere official. A few low-quality sites claim EV charging earns 3%. Recorded as not included /
  unverified.
- **Amazon Fresh**: Amex lists "Amazon" as an excluded online superstore; Amazon Fresh is not named. Assumed excluded.
- **Instacart / Walmart Neighborhood Market**: WalletHub and forum reports say they can code as supermarkets; the
  Amex FAQ says multi-retailer online marketplaces do not earn bonus. Marked unverified in earning notes.
- **Premium Car Rental Protection** fee ($12.95–$24.95) and 42-day term come from Upgraded Points; the official BCP
  PCRP page did not render during my browser session. Marked `verified: false`.
- **Welcome offer** amounts come from secondary sources only; the official page's offer module did not render in
  the fetched text. Marked `verified: false` in perks.
- **APR** figures not captured from the official rates table.
- The Amex benefit pages show no "last updated" date. Dates available: benefit guides Rev. 4/19/2024 (CRLDI, PP,
  EW), RP guide 10/09/2023, Credit Intel article 2026-02-12, application T&C page "©2026 American Express National
  Bank" with the Venue offer "ends 12/31/2026".

## Source log (URL -> what it established)
- https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/ — rates 6/6/3/3/1, $6,000 cap, $0 intro then $95, 2.7% FX, $120 Disney credit "no minimum purchase", Return Protection $300/$1,000, PP $1,000/$50,000/90 days, EW 1 yr/5 yrs/$10,000/$50,000, CRLDI secondary & AU/IT/NZ exclusion, Global Assist, Amazon redemption, ticket access, Send & Split.
- https://global.americanexpress.com/card-benefits/detail/blue-cash-preferred-631/blue-cash-preferred — full Rewards Program terms (category definitions and exclusions, redemption with no minimum, cannot pay Minimum Due).
- https://global.americanexpress.com/card-benefits/detail/disney-streaming-credit/blue-cash-preferred — full Disney Streaming Credit terms.
- https://global.americanexpress.com/card-benefits/view-all/blue-cash-preferred — the 18 listed benefits (via link extraction).
- https://global.americanexpress.com/card-benefits/detail/amex-venue-collection/blue-cash-preferred — Venue Collection concessions credit terms (10%, $250/yr, ends 12/31/2026).
- https://global.americanexpress.com/card-benefits/detail/redeem-cash-back/blue-cash-preferred — Amazon redemption mechanics.
- https://global.americanexpress.com/card-benefits/detail/global-assist/blue-cash-preferred — Global Assist scope.
- https://global.americanexpress.com/card-benefits/detail/{car-rental-insurance,purchase-protection,extended-warranty,return-protection}/blue-cash-preferred — headline limits and pointers to CRLDIterms/PPterms/EWterms/RPterms.
- https://www.americanexpress.com/us/credit-cards/card-application/apply/supplementary/terms/blue-cash-preferred-credit-card/36195-9-0 — consolidated benefit terms (Disney, Venue, Reward Dollars, Plan It, Send & Split, Additional Card Members up to 10, Lowest Hotel Rates Guarantee, Instant Card Number).
- https://www.americanexpress.com/en-us/benefits/rewards/rewards-information/index.html — rewards FAQ (merchant coding, third-party payments, wallets, 8–12 week posting, U.S. definition).
- https://www.americanexpress.com/us/rewards-info/retail.html — supermarket / gas / streaming definitions, examples and the 32-provider list.
- https://www.americanexpress.com/us/content/rewards-info/travel.html — transit definition and exclusions (incl. trams).
- https://www.americanexpress.com/en-us/credit-cards/credit-intel/amex-cash-back-reward-dollars/ — redemption timing, no expiration, no minimum.
- https://www.americanexpress.com/en-us/account/get-started/bcp/earn-rewards and .../uncover-your-benefits — membership guide confirming "per calendar year" cap and benefit list.
- https://www.americanexpress.com/us/credit-cards/features-benefits/policies/*.html — per-card benefit-guide PDF links for BCP.
- CRLDI / PP / EW / RP benefit-guide PDFs (URLs in JSON `sources`) — all protection limits, durations, exclusions, revision dates.
- TPG (2025-08-01) https://thepointsguy.com/credit-cards/blue-cash-preferred-increases-disney-bundle-credit/ — Disney credit increase details.
- Doctor of Credit (2025-08-01) enhanced streaming benefits; (2026-04-15) survey on possible changes.
- Upgraded Points news (Disney credit), streaming list (updated 2026-07-10), benefits page (updated 2026-05-19: PCRP fee, FX 2.7%).
- NerdWallet (2025-01-30 five streamers added). AwardWallet (2025-08-01 Disney change). OMAAT review (updated 2026-02-19; contains the outdated $25 minimum). Frequent Miler card page (welcome offer, application rules). US Credit Card Guide (updated 2026-08-08; "as high as" offer model, Target/Walmart/Costco exclusions).
