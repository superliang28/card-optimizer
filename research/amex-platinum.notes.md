# Amex Platinum (US consumer) research notes

Research date: 2026-09-29. Cardholder's selected airline for the fee credit: United.
Companion file: `amex-platinum.json`. Raw downloads (HTML/PDF/text) are in `research/raw/`.

## Method and limits

- ~14 WebFetch calls to americanexpress.com / Amex-owned properties, 6 Amex benefit-guide PDFs parsed locally
  (pypdf), plus ~25 fetches of secondary sources and ~25 web searches (the WebSearch budget was exhausted
  late in the session; everything after that came from WebFetch, curl and local PDF parsing).
- The per-benefit official terms live on `global.americanexpress.com/card-benefits/...`, which is a
  logged-in SPA. WebFetch returned only "Benefits Dashboard" and the browser (not logged in) redirected to
  the Blue Cash Preferred dashboard, so I could NOT read the long-form Platinum benefit terms page directly.
  Substitutes used: the public card page's own benefit copy (curl of
  `americanexpress.com/us/credit-cards/card/platinum/`, live Sept 2026, footnote "*As of 01/2026" for the
  lounge count), the Sept 18, 2025 U.S. Consumer Platinum Card Fact Sheet PDF, Amex Credit Intel articles
  (dated Dec 2025 - Jul 2026), the Amex Travel benefits FAQ, thecenturionlounge.com access policy,
  and the Amex Assurance / AIG benefit-guide PDFs linked from the public policy pages.
- Trip Delay, Trip Cancellation and Cell Phone Protection policy pages on americanexpress.com did not expose
  PDF links (they returned a generic 644 KB shell). Their limits are taken from the card page's official
  benefit copy (which states the limits verbatim) and cross-checked with TPG and Upgraded Points.

## What was verified from official Amex sources (and where)

| Item | Official value | Source (date) |
|---|---|---|
| Annual fee | $895 Basic; $195 each Additional Platinum; $0 Companion | Card page FAQ (live Sept 2026); Credit Intel fee article (Jul 17, 2026); Additional Card T&C |
| FX fee | None | Card page ("No Foreign Transaction Fees") |
| Earning | 5X flights direct w/ airline or Amex Travel, up to $500,000/calendar year; 5X prepaid hotels on Amex Travel; 1X everything else | Card page; fact sheet |
| Hotel credit | $300 semiannual (Jan-Jun / Jul-Dec) = $600/yr, prepaid FHR (any length) or THC (2-night min) via Amex Travel; no enrollment; up to 90 days to post; refunds reverse | Card page; Amex Travel FAQ; fact sheet |
| Airline fee credit | $200/calendar yr, one selected airline; examples: bags, in-flight refreshments, change fees, overweight bags, lounge day passes, pet kennel, phone reservation fees; 8 weeks to post | Card page; Credit Intel (Dec 15, 2025) lists exclusions: tickets, upgrades, mileage purchases, gift cards, duty free, award tickets |
| Uber Cash | $15/mo + $20 Dec = $200; US rides/orders; add card to Uber; expires monthly | Card page; Credit Intel (Apr 9, 2026); uber.com/amex |
| Uber One | up to $120/calendar yr on auto-renewing Uber One | Card page; fact sheet |
| Resy | $100/quarter = $400; 10,000+ US Resy restaurants; enrollment | Card page; Credit Intel (Jul 17, 2026): excludes restaurant software, Resy gift cards, gift cards at restaurants; 8 weeks |
| Digital Entertainment | $25/mo = $300; Disney+, Disney+ bundle, ESPN streaming, Hulu, NYT, Paramount+, Peacock, WSJ, YouTube Premium, YouTube TV; enrollment | Card page; Credit Intel (Feb 5, 2026) |
| lululemon | $75/quarter = $300; US stores excl. outlets + lululemon.com; enrollment | Card page; fact sheet; Credit Intel (Jul 17, 2026) |
| Oura | $200/calendar yr, ring at ouraring.com; enrollment | Card page; fact sheet |
| Equinox | $300/calendar yr, club membership or Equinox+ (auto-renew); enroll at platinum.equinox.com | Card page; fact sheet |
| Walmart+ | $12.95 + tax per month, one monthly membership, excl. Plus Ups | Card page; fact sheet; Credit Intel |
| CLEAR+ | up to $219/calendar yr (was $209 on the Sept 2025 fact sheet) | Card page (live) shows $219 |
| Global Entry / TSA PreCheck | $120 every 4 yrs / up to $85 every 4.5 yrs (5-yr PreCheck via official enrollment provider) | Card page; fact sheet |
| Venue Collection | 10% back on concessions up to $250/calendar yr, enrollment | Card page |
| Lounges | 1,550+ lounges (as of 01/2026); Centurion; 10 Delta Sky Club visits; Priority Pass (enrollment) | Card page; fact sheet |
| Centurion access | 3 hrs before departure; 5 hrs for connections; guests $50 adult / $30 child 2-17; same-flight rule; $75k spend -> 2 free guests through Jan 31 of following year | thecenturionlounge.com/info/access/ (live, undated) |
| Delta Sky Club | 10 visits per Medallion Year (Feb 1-Jan 31); 24-hr visit definition; $75k -> unlimited; $50/guest, $25 Grab and Go; same-day Delta flight, Basic Economy excluded; ACMs get own 10 | delta.com/us/en/delta-sky-club/access |
| Status | Marriott Bonvoy Gold Elite; Hilton Honors Gold (80% bonus etc.); Leaders Club Sterling (5% bonus, 5 pre-arrival upgrades); Avis/Hertz/National (enroll online) | Card page |
| Car rental LDI | Secondary; up to $75,000 per rental agreement; 30 consecutive days; excludes Australia, Italy, New Zealand | CRLDI Benefit Guide 371-397 (rev 4.24, file dated 04/02/2026) mapped to "Platinum Card from American Express" on the policy page |
| Premium Car Rental Protection | $19.95 Basic ($75k primary) / $24.95 Plus ($100k primary) per rental, 42 days (30 WA); excludes AU, IE, IL, IT, JM, NZ | PCRP terms PDF |
| Purchase Protection | $10,000 per purchase, $50,000/yr, 90 days | PP Benefit Guide 316-404 (Platinum mapping) + card page copy |
| Extended Warranty | +1 yr on warranties <= 5 yrs; $10,000/item, $50,000/yr | EW Benefit Guide 314-399 (Platinum mapping) + card page |
| Return Protection | $300/item, $1,000/yr, 90 days, US purchases | RP Benefit Guide (Rev 10-20, 10.09.23) + card page |
| Baggage Insurance | $2,000 checked, $3,000 carry-on, $3,000 combined/person, $1,000 high-risk, $10,000/trip aggregate | BIP Benefit Guide 311-329 (Platinum mapping); 311-328 is the NY-resident $1,250 schedule |
| Trip Delay | $500/trip, >6 hrs, 2 claims per 12 months; round trip paid entirely with card; AIG | Card page copy |
| Trip Cancellation/Interruption | $10,000/trip, $20,000 per 12 months; AIG | Card page copy |
| Cell Phone Protection | $800/claim, 2 claims/12 months, $50 deductible, prior month's bill paid with card; AIG | Card page copy |
| Premium Global Assist | 24/7, >100 miles from home; med transport at no cost only if Amex coordinates | Card page |
| Platinum Member Airfares | 30+ airlines, intl F/J/PE + select domestic economy, up to 8 passengers, Amex Travel only, 5X | amextravel Platinum Member Airfares page |
| MR redemption mechanics | Pay with Points for flights/prepaid hotels/prepaid cars/cruises/packages; 5,000-point minimum; non-prepaid hotels/cars excluded; "transfer points to 20 airline and hotel travel partners" | Amex how-to-pay-with-points page; card page |

## Verified only from secondary sources (official page unreachable); marked in JSON where material

- MR cents-per-point values (1.0 flights, ~0.7 hotels/other travel, 0.6 statement credit, 0.5-1.0 gift cards,
  0.7 Amazon/PayPal): TPG MR guide (Aug 20, 2026). Amex's public pages do not publish cpp.
- Transfer partner ratios, minimums, excise-tax offset fee ($0.0006/pt, $99 cap, U.S. airlines only),
  Etihad removal (Jun 30, 2026) and Leaders Club addition (Jul 2026, 4:1): Upgraded Points (Aug 21, 2026),
  TPG (Aug 20, 2026). Partner count (20) matches the official card page.
- Priority Pass: 2 free guests, restaurant/Minute Suites exclusion since Aug 2019: Upgraded Points (Aug 13, 2026),
  MileLion. Escape / Plaza Premium 2 guests: Upgraded Points.
- Lufthansa lounge access ending Oct 1, 2026: TPG (Apr 10, 2026), Frequent Miler (Apr 13, 2026), OMAAT,
  TravelUpdate. Multiple independent reports of an Amex notice; not seen on an Amex page in this session.
- Saks credit: new applicants excluded from Mar 26, 2026; retired for all Jul 1, 2026 (last use Jun 30):
  TPG (Mar 31, 2026) quoting Amex ("Starting July 1, this benefit will be retired"), NerdWallet (Mar 30, 2026),
  Frequent Miler. The live card page no longer lists Saks, consistent with removal.
- Uber VIP -> Signature Support (May 7, 2026): Upgraded Points (May 11, 2026); uber.com/amex now describes
  "Signature Support for Amex" (official Uber page).
- Events by Amex branding ended Jun 10, 2026: Upgraded Points (May 11, 2026); card page now shows
  "Premium Events Collection" and "Amex Special Ticket Access".
- Digital Entertainment Aug 1, 2026 Peacock bundle/add-on/third-party exclusion: Upgraded Points (Jul 10 and
  Aug 26, 2026) quoting the updated official terms.
- CLEAR $209 -> $219 effective Jul 1, 2026: Upgraded Points (Aug 20, 2026) quoting Amex; confirmed by the live
  card page showing "$219 CLEAR+ Credit".
- Hertz status = President's Circle (upgraded from Five Star in 2022; still current per Upgraded Points Jul 10, 2026).
  The Amex card page says only "complimentary premium status" for Avis/Hertz/National.
- Airline-credit United data points (Economy Plus, Club passes, bags work; TravelBank stopped ~Feb 2026;
  award fees stopped ~Jul 2026): Upgraded Points (Jul 10, 2026); TravelUpdate (Jan 9, 2026) showed TravelBank
  still working on Jan 4-7, 2026, so the cutoff is early 2026.
- Additional Card Member rules for credits (shared caps; Uber Cash Basic-only) are from Amex Credit Intel /
  Upgraded Points and long-standing terms; the Uber Cash ACM exclusion is flagged as unverified in the JSON.
- SoulCycle At-Home Bike $300 credit: listed by Upgraded Points and Doctor of Credit, absent from the live card
  page and fact sheet; included with `verified: false`.
- Welcome offer (up to 175,000 points after $12,000 in 6 months, varies): Upgraded Points; not in the schema.

## Ambiguities / judgment calls

- `credits[].amount` is the per-period amount (e.g., Resy 100 quarterly, Uber Cash 15 monthly) with the annual
  total in `schedule`; Walmart+ is recorded as 13 (rounded from $12.95) because the schema wants whole dollars.
- Global Entry/TSA PreCheck uses `period: "one-time"` with the 4 / 4.5-year cadence in `schedule`.
- CLEAR and Walmart+ `enrollmentRequired` set to false per the official fact sheet / Credit Intel wording
  (the "enroll" in the CLEAR terms refers to enrolling with CLEAR). Upgraded Points says both require Amex
  enrollment; the benefits dashboard is the tie-breaker for a real cardholder.
- Earning category for prepaid Amex Travel hotels is `portal-travel` (there is no direct-hotel bonus; `hotels`
  direct = 1X). No `merchantRates` (the card has no named-merchant earning bonuses; Uber etc. are credits).
- `baggageDelay.has = false`: the Baggage Insurance Plan covers lost/damaged/stolen bags only.
- `travelAccident.has = false`: no standalone travel accident insurance is listed; AD&D exists only inside the
  rental-car coverages.
- Fact sheet said Additional Card = $195 and DoC said the same; the Additional Card T&C page says $195 for
  accounts opened on/after Aug 17, 2023 (a search snippet claiming "first additional card free" was not
  supported by the fetched official page and was discarded).
- The Upgraded Points "Equinox/Hertz changes" article is timestamped "Updated July 9, 2026" but its Equinox
  change sentence refers to January 1, 2023; I re-fetched to confirm the year and did NOT record any 2027
  Equinox change.

## "Last updated" dates seen on official documents

- Card page: live Sept 29, 2026 (lounge count footnote "*As of 01/2026"; hotel count "As of 07/2025";
  FHR value "based on 2025 bookings").
- U.S. Consumer Platinum Card Fact Sheet PDF: "NEW AND ENHANCED BENEFITS (EFFECTIVE SEPTEMBER 18, 2025)";
  footnotes as of 3/2025-7/2025. It still shows $209 CLEAR and the Saks credit (both since changed).
- Credit Intel articles: airline credit Dec 15, 2025; digital entertainment Feb 5, 2026; Uber Apr 9, 2026;
  shopping/wellness Jul 17, 2026; Resy Jul 17, 2026; fee Jul 17, 2026.
- CRLDI Benefit Guide 371-397: EDT 2.20, REV 4.24, file stamped 04022026. PP 316-404 / EW 314-399 /
  BIP 311-329: EDT 10.20, REV 4.24. RP guide: Rev 10-20, dated 10.09.23. PCRP terms: Policy AX0610 (undated).

## Source URLs and what each established

- americanexpress.com/us/credit-cards/card/platinum/ - fee, earning, every current credit amount/period, lounge
  summary, status list, protection limits, Venue Collection, no FX fee, Companion/Additional card fees.
- .../press-kits/platinum-refresh/U-S-Consumer-Platinum-Card-Fact-Sheet.pdf - Sept 18, 2025 refresh detail,
  what was new vs unchanged, TSA PreCheck 4.5-year cadence, Walmart+ Plus Ups exclusion, Equinox enrollment URL.
- Credit Intel: digital entertainment (service list, enrollment, shared cap), Uber (expiry, US-only, Uber One
  toggle), airline (inclusions/exclusions, January change window), Resy (exclusions, Platinum Nights),
  shopping/wellness (Walmart+ automatic, Oura, lululemon, Equinox), fee article.
- amextravel FAQ travel-benefits - hotel credit windows, prepaid requirement, no enrollment, 90 days, refunds.
- amextravel platinum-member-airfares - program scope; how-to-pay-with-points - 5,000-point minimum.
- thecenturionlounge.com/info/access/ - current Centurion access and guest policy.
- delta.com/us/en/delta-sky-club/access - Sky Club rules for Platinum.
- uber.com/us/en/u/amex/ - Uber Cash amounts, Uber Cash toggle, Signature Support.
- Amex policy pages + PDFs (CRLDI, PP, EW, RP, BIP, PCRP) - insurance limits and exclusions.
- Doctor of Credit (Sept 18, 2025; Jun 24, 2026) - refresh table; Oura official terms text.
- Upgraded Points (multiple, Jul-Sept 2026) - 2026 change dates, lounge guest rules, transfer ratios,
  airline-credit data points, cell phone terms, status tiers.
- TPG (Aug 2026, Apr 2026, Mar 2026, Jan 2026, Dec 2025) - MR values/fee, Platinum Member Airfares + Lufthansa,
  Saks retirement, Centurion changes, travel protections.
- Frequent Miler / OMAAT / NerdWallet / TravelUpdate - corroboration of Lufthansa, Centurion, Saks, and the
  2026 change timeline.
