# Discover it Cash Back — research notes (data as of 2026-09-29)

Researched 2026-09-28/29. ~45 fetches/searches. Official Discover/Capital One pages first, then DoC/TPG/NerdWallet/Upgraded Points/Frequent Miler/CNBC/AwardWallet/Bankrate to confirm.

## Headline state (September 2026)

- Card still exists, still Discover-branded, still on the Discover Network, still $0 annual fee, still no FX fee, still 5% rotating (activate, $1,500/quarter combined, then 1%) + 1% everywhere + first-year Cashback Match.
- Big structural change: Discover is now "a division of Capital One, N.A." (acquisition closed 2025-05-18). Discover it accounts began migrating to Capital One's website/app on **2026-07-27** in waves through early 2027. Earn rates and the calendar are unchanged; redemption rules and ancillary features change on migration (details below). Whether a given cardholder's account has migrated yet determines which redemption rules apply.
- No 2027 calendar quarters announced yet (checked TPG/CNBC/AwardWallet/Upgraded Points articles dated Sept 1–24, 2026 and two targeted searches). Expect Q1 2027 around Dec 1, 2026.

## What I verified from OFFICIAL sources

| Fact | Source | Notes / "last updated" seen |
|---|---|---|
| No annual fee; 5% quarterly up to quarterly max when you activate; 1% on all other purchases | discover.com/credit-cards/cash-back/it-card.html | Page footer "© 2026 Capital One"; issuer copy "Discover, a division of Capital One, N.A., Member FDIC". |
| Cashback Match exact terms (365 days from approval, added within 2 billing periods; exclusions incl. transfers from "Discover or Capital One" deposit accounts; new cardholders only; no purchase minimums; redeeming during the year does not reduce match) | it-card.html footnote + FAQ accordion | Verbatim captured via curl of page HTML. |
| Acceptance "99% of places that take credit cards nationwide" | it-card.html footnote | "According to the Feb 2026 issue of the Nilson Report." |
| 0% intro APR 15 mo purchases + BT; then 18.49%–28.49% variable; BT fee applies | it-card.html | Sept 2026 copy. |
| Card Lock, CreditWise (TransUnion report, FICO Score 8, dark-web SSN alerts), virtual cards (eligibility/merchant caveats) | it-card.html footnotes 3, 4, 7 | These are Capital One-platform features now marketed on the Discover page. |
| Legacy benefits list: $0 Fraud Liability, Freeze It, free FICO Credit Score, SSN dark-web alerts, 24/7 US-based service, contactless, digital wallets; NO purchase/travel protections listed | discover.com/credit-cards/member-benefits/ | Page carries banner: "Discover Bank recently merged into Capital One, N.A." Content may not apply to accounts already on Capital One's platform. |
| Rewards never expire for life of account; check/credit on closure; gift cards need a minimum | discover.com/credit-cards/cash-back/cashback-bonus.html and redeem-cashback.html | cashback-bonus.html still shows a STALE example ("restaurants and drug stores through 3/31/24"). |
| Cashback Bonus Program Terms: earn only when processed (1–2 billing periods); no earn on cash advances/BT/portion paid with rewards/deposit transfers/illegal/Cash at Checkout; digital wallets & third-party processors may not earn if insufficient detail; activation channels (online, one-click email, app, 1-800-347-2683); transaction date must be on/before last day of quarter (online may be ship date); MCC-based grouping; redemption: statement credit from a penny (incl. minimum payment — legacy), electronic deposit from a penny (3 business days), Pay with Cashback Bonus at select merchants from a penny, gift cards (min applies), charity from a penny; rewards never expire; paid out if closed or unused 18 months | Ts_Cs_Discover_It_SM.pdf (text extracted with pypdf) | Document code CM.TCIT.L.0823, "©2023 DISCOVER BANK" — i.e., August 2023 version; pre-acquisition, still the only public program-terms PDF. |
| Cardmember Agreement / Pricing Schedule: example terms as of **06/30/26**: APR 17.49%–26.49% (purch/BT), 28.49% cash advance; no penalty APR; annual fee none; BT fee 5%; cash advance $10 or 5%; late fee none first time then up to $41; returned payment up to $30; **no foreign transaction fee line** (fee table has none); foreign-currency section only describes conversion rate (government/interbank rate chosen by issuer); "'Discover' refer to Capital One, N.A., the issuer of your Card"; governed by Virginia law | Prime_Cardmember_Agreement_Updates_063026.pdf (text extracted with pypdf) | Code CMAPRDI063026. |
| Amazon Pay with Rewards terms: eligible cards (Discover it, it Chrome, it Miles, Student variants…); Amazon.com online orders only; some digital goods & Subscribe & Save excluded; no fee | discover.com/credit-cards/amazon/terms-conditions.html | "Last modified: July 31, 2025". |
| PayPal: "$1 Cashback Bonus or 100 Miles = $1"; no fee; not for sending money, recurring payments, in-store, non-USD | paypal.com/us/webapps/mpp/pay-with-rewards/discover | |
| Discover Global Network: 185+ countries/territories; alliance partners (Diners Club Intl, PULSE, JCB, UnionPay, RuPay, Elo, BC Card, Troy, mada, Mercury, NAPAS, Prosa, etc.) | discoverglobalnetwork.com/our-network/reach-and-acceptance/ | Data "as of December 31, 2024". |
| Capital One transition FAQ (card.discover.com/integration-faq): earn rate unchanged; must still activate each quarter for 5% up to $1,500; activations carry over; rewards balance carries over, won't expire; gift cards ≥5% added value with **new $25 minimum**; **cannot apply rewards to minimum payment**; **Pay with Rewards with Apple Pay not available**; new: redeem to cover recent purchases (cash cards), gift cards for Miles cards; auto statement credit needs re-enrollment; Capital One Travel/Entertainment 5%; Capital One Offers up to 15%; virtual card numbers; card brand and network unchanged; no annual fee; primary keeps card number; authorized users get new numbers | card.discover.com/integration-faq/html/integration-faq.html; capitalone.com/updates/discover/consumer-card/; capitalone.com/updates/discover/card-faqs/ | Card FAQs: transitions "throughout 2026 and early 2027"; $0 liability for unauthorized charges; Apple Pay recurring subscriptions may need re-establishing. |
| Capital One transition guide | capitalone.com/learn-grow/money-management/more-to-discover/ | Published 2026-07-09: "5% cash back bonuses and the year-end match program aren't going anywhere." |
| Acquisition closed 2025-05-18; Discover-branded cards continue; Discover/PULSE/Diners Club networks join Capital One | investor.capitalone.com press release | |

## Verified only via reputable SECONDARY sources (official page unavailable)

- **2026 calendar categories and Discover's per-quarter fine print.** Discover's public calendar page (cashback-calendar.html) displayed "Oops. Something went wrong… the rewards calendar is not working at this time" on 2026-09-28. Its static data file (`/content/dam/dfs/credit-cards/static/json/cashback-calendar/offers.json`) is stale — logicalDate "November 1, 2020" with 2020–2021 quarters — so it was useless for 2026. I therefore relied on Doctor of Credit's quarterly roundups (which paste Discover's activation-page terms verbatim) and cross-checked categories/dates against NerdWallet, TPG, CNBC Select, Upgraded Points, AwardWallet, Bankrate, FinanceBuzz, Travel Sisters and Credit Karma. All agree on:
  - Q1 (Jan 1–Mar 31): Grocery Stores, Wholesale Clubs, Select Streaming Services (announced ~Nov 30/Dec 1, 2025). Streaming list per DoC quoting Discover: Amazon Music, Amazon Prime Video, AMC+, Apple Music, Apple TV, Audible, DirecTV Stream, Fandango at Home, Google Play Music and Video, Max, iHeartRadio, MLB.TV, Netflix, Pandora, Paramount Plus, Peacock, SiriusXM, Sling TV, Spotify, Starz, YouTube Music, YouTube Premium, YouTube TV. Walmart/Target excluded from grocery entirely; convenience/discount stores may not qualify; wholesale-club affiliated services and in-club merchants may not qualify.
  - Q2 (Apr 1–Jun 30): Restaurants, Home Improvement Stores (announced Feb 28/Mar 1, 2026). Verbatim captured.
  - Q3 (Jul 1–Sep 30): Gas Stations & EV Charging, Transportation (airlines + commuter bus/train/ferry), Drugstores (announced May 31/Jun 1, 2026). Verbatim exclusions captured (no taxis/rideshare/bike-scooter share/limos/parking/tolls/car rental/cruise; OTAs may not qualify; supermarket/supercenter/wholesale-affiliated gas & EV may not qualify; in-store pharmacies may not qualify). First time airlines included.
  - Q4 (Oct 1–Dec 31): Restaurants, Entertainment, Utilities (announced Sep 1, 2026; activation open). Verbatim captured from DoC/CNBC/NerdWallet. First time Entertainment and Utilities included.
- **2018 benefit cuts** (purchase protection, extended warranty, return guarantee, auto rental insurance, flight accident insurance ended 2018-02-28; price protection ended 2018-10-31): creditcards.com, AwardWallet, Forbes, TPG. Official corroboration is by absence — Discover's member-benefits page lists none of these and there is no Guide to Benefits for the card.
- **Online Privacy Protection discontinued 2026-01-15** for all customers ("Capital One… does not plan to continue offering this free service"): Clark.com quoting Discover's notice (fetch was 403'd; text obtained via search snippet). Discover's OPP URLs now 404 — consistent.
- **Costco**: warehouses Visa-only since 2016; Costco.com dropped Discover after 2023-11-15 (DoC, myFICO, Miles to Memories).
- **Migration date 2026-07-27 and cardholder email contents**: DoC (May 2026), Upgraded Points (2026-05-12), Frequent Miler (2026-05-12), TPG (2026-07-27), Money.com (2026-07-17), AwardWallet (2026-07-30), Kudos (2026-09-02).
- **International acceptance quality** (patchy in W. Europe/Canada/S. America; strong US/Japan/China/India): creditcards.com, WalletHub, Forbes, TPG 2018 piece. Discover's own legacy mobile FAQ (faq_intl.html) is badly outdated ("accepted in Canada, Central America, Mexico, the Caribbean and China") — do not rely on it.

## Could NOT verify / flagged `verified: false`

- **Capital One Travel 5% scope** for migrated Discover it accounts. Official pages only say "Capital One Travel (5% cash back)". The hotels/vacation-rentals/rental-cars(/activities) scope comes from the cardholder email as quoted by DoC and Upgraded Points. Flights not listed. Left as an earning entry with `verified:false`.
- **Capital One Entertainment 5%** — official pages confirm the 5%, scope (tickets/events via portal) from secondary. `verified:false`.
- **Referral program continuing** ($100/referral, $500/yr) — Frequent Miler only. `verified:false`.
- Whether Discover cashback will become transferable to/from other Capital One rewards accounts — DoC's email quote says "may be eligible… only between certain Capital One rewards accounts"; no official detail. Not included in JSON.
- Exact date each individual account migrates — waves; cardholders are notified in advance. Not knowable generically.

## Conflicts / ambiguities resolved

1. **APR**: card page (Sept 2026) 18.49%–28.49% vs. Pricing Schedule example (06/30/26) 17.49%–26.49% vs. US News 17.49%–26.49%. Card page is the current applicant offer; schedule is explicitly an "example of terms available as of 06/30/26". Both recorded in perks note. Not schema-critical.
2. **Q3 2026 categories**: CardRatings' page said "Gas stations, drug stores, home improvement". Every other source plus DoC's verbatim terms say Gas/EV, Transportation (airlines + transit), Drugstores. Treated CardRatings as an error.
3. **Q1 2026 streaming list**: Kudos added Disney+ and Hulu; DoC's Discover-quoted list does not include them (Discover's list has never included Disney+/Hulu). Official-derived list wins; Disney+/Hulu left out.
4. **Benefits lost at migration**: A first-pass summary of the Frequent Miler article claimed FICO score, Freeze It, Online Privacy Protection and Discover Deals were "removed" by migration. A targeted re-read showed the article does not say that — it lists only Apple Pay Pay-with-Rewards, minimum-payment redemption and the $25 gift-card minimum. AwardWallet (2026-07-30) says "$0 fraud liability, credit score access, and identity alerts" are maintained. Reality: Freeze It → Card Lock; Discover FICO Score → CreditWise FICO Score 8 (TransUnion); OPP was killed for everyone on 2026-01-15 independent of migration; **Discover Deals** was discontinued 2018-10-31 and is irrelevant. JSON reflects this.
5. **International reach**: official DGN says 185+ countries/territories; secondary sources say 190+/200+. Used the official 185+.
6. **Issuer field**: schema enumerates "Discover"; legal issuer is now Capital One, N.A. Kept `"issuer": "Discover"` and documented.
7. **Gift-card minimum**: Program Terms PDF (2023) says "subject to a minimum" without a number; secondary sources and Bankrate say $5 on legacy platform; Capital One FAQ says $25 post-migration. Both recorded.
8. **Minimum-payment redemption**: allowed per 2023 Program Terms (legacy) — explicitly removed on Capital One platform (official FAQ). Recorded as a migration change.

## Redemption summary (for the tool)

Any amount from $0.01: statement credit, bank deposit, Amazon.com checkout (1:1), PayPal checkout (1:1), charity. Gift cards: 5–20% added value, min $5 legacy / $25 post-migration. Never expires. Post-migration: + redeem against recent purchases; − minimum-payment redemption; − Apple Pay Pay-with-Rewards; auto-redemption needs re-enrollment.

## Protections summary

None of: purchase protection, extended warranty, return protection, price protection, rental-car CDW, trip delay/cancellation, baggage, travel accident, roadside, cell phone. Existing: $0 fraud liability; Freeze It/Card Lock; free FICO (Discover platform) or CreditWise FICO 8 (Capital One platform); SSN dark-web alerts; virtual card numbers (post-migration, eligible accounts); 24/7 service. Online Privacy Protection: discontinued 2026-01-15.

## Source list — what each established

- discover.com/credit-cards/cash-back/it-card.html — card terms, Cashback Match verbatim, APR, 99%/Nilson Feb 2026, Card Lock/CreditWise/virtual card footnotes, Capital One footer.
- discover.com/credit-cards/cash-back/cashback-calendar.html — "$1,500… up to $75 each quarter"; widget error; script/JSON references.
- …/static/json/cashback-calendar/offers.json — stale (2020) official data; documents historical fine-print style only.
- discover.com/credit-cards/cash-back/cashback-bonus.html; …/redeem-cashback.html — no-expiry, gift-card minimum, Capital One banner; stale example.
- Ts_Cs_Discover_It_SM.pdf — Cashback Bonus Program Terms (Aug 2023): earning rules, exclusions, activation channels, redemption list, 18-month payout.
- discover.com/credit-cards/cardmember-agreement/ + Prime_Cardmember_Agreement_Updates_063026.pdf — fees (no FX fee), APR example, issuer = Capital One, N.A.
- discover.com/credit-cards/member-benefits/ — legacy benefit list, no protections.
- discover.com/credit-cards/amazon/terms-conditions.html — Amazon redemption terms (modified 2025-07-31).
- paypal.com/…/pay-with-rewards/discover — PayPal 1:1, restrictions.
- discoverglobalnetwork.com/our-network/reach-and-acceptance/ — 185+ countries, partner networks.
- discover.com/mobile/data/footer/faq_intl.html — outdated international FAQ; collect-call number.
- card.discover.com/integration-faq; capitalone.com/updates/discover/consumer-card/; …/card-faqs/; …/more-to-discover/ — migration facts (what changes/stays), $25 gift-card min, removed redemptions, new benefits, network unchanged.
- investor.capitalone.com — acquisition close 2025-05-18.
- support.stripe.com — Capital One moving its cards to Discover Network (merchant-side view).
- doctorofcredit.com Q1/Q2/Q3/Q4 2026 roundups and Discover posts — verbatim Discover fine print, announcement dates (2025-11-30, 2026-02-28, 2026-05-31, 2026-09-01); migration article; Costco.com article.
- nerdwallet.com Q1/Q2/Q4 2026 (via search snippets; fetches 403) — category confirmation and fine print.
- thepointsguy.com — Q4 2026 + full 2026 calendar (2026-09-01); migration article (2026-07-27); 2018 acceptance piece.
- upgradedpoints.com — 2026 calendar (2026-09-01); migration article (2026-05-12).
- frequentmiler.com — migration details (2026-05-12), Cashback Match continues, referral.
- cnbc.com/select — Q4 fine print, full 2026 table (2026-09-14).
- awardwallet.com — 2026 calendar (2026-09-01); merger explainer (2026-07-30); 2018 cuts.
- creditcards.com — 2018 cuts detail.
- bankrate.com — 2026 calendar, redemption options, gift card $5 (2025-12-11).
- financebuzz.com — per-quarter exclusions (2026-09-22). thetravelsisters.com — dates (2026-09-08). cardratings.com — Q4 fine print (2026-09-24; Q3 row erroneous). creditkarma.com — Q1 fine print (2026-09-03). joinkudos.com — Q1 list (with Disney+/Hulu discrepancy); migration (2026-09-02). money.com — migration (2026-07-17). clark.com — OPP discontinued 2026-01-15. wtop.com — Q2 (2026-04-01). thepointsguy.com/deals/discover-deals-portal-closing-oct — Discover Deals ended 2018-10-31.

## Tooling notes

- WebSearch budget (200/session) was exhausted near the end; final confirmations used direct fetches only.
- 403s: NerdWallet, Kiplinger (truncated), US News, Clark.com, Forbes Advisor. Their content was obtained via search snippets where cited.
- PDFs parsed locally with pypdf after WebFetch failed to read them.
