# Wells Fargo Autograph Card — research notes

Card id: `wells-fargo-autograph` (the $0-annual-fee Autograph, NOT Autograph Journey / Premier Autograph)
Data as of: 2026-09-29. Research performed 2026-09-28/29 with ~25 fetches and ~20 searches.

## Official documents read (with their stated dates)

| Document | URL | Date shown |
|---|---|---|
| Card marketing page (offer, categories, benefits, 17 footnotes) | https://creditcards.wellsfargo.com/cards/autograph-visa-credit-card/ | footer code LRC-0826 (Aug 2026); (c) 2026 |
| Important Credit Terms + Part 2 "Summary of the Wells Fargo Rewards Program Terms and Conditions and the Wells Fargo Autograph Visa Card Addendum" | https://www.wellsfargo.com/credit-cards/autograph-visa/terms/?lang=en | **Effective December 30, 2025**; disclosure DT1-02252028-18-9113595-1.1 |
| Guide to Benefits (HTML version of the Visa guide) | https://www.wellsfargo.com/credit-cards/autograph-visa/guide-to-benefits/?lang=en | **"benefits in effect as of 09/15/2025"** (inner insurance disclosure still says "Effective 09/01/2024, this Guide replaces all prior disclosures"); Travel & Emergency form #VTEAS-2023 (Stand 09/23); administrator Assurant / Virginia Surety Company |
| Eligible streaming services page (wellsfargo.com/autographstreaming) | https://www.wellsfargo.com/credit-cards/autograph-visa/streaming/ | DT1-07142026-18-8589086-1.1 (Jul 2026) |
| Wells Fargo Rewards overview | https://www.wellsfargo.com/rewards/ | none |
| Credit card help/FAQ | https://www.wellsfargo.com/help/credit-cards/ | none |
| Newsroom: JetBlue transfer partner | https://newsroom.wf.com/.../2025/Wells-Fargo-Welcomes-JetBlue-as-Newest-Rewards-Points-Transfer-Partner/default.aspx | Nov 4, 2025 |
| Newsroom: Wyndham transfer partner | https://newsroom.wf.com/.../2026/Wells-Fargo-Welcomes-Wyndham-to-Rewards-Points-Transfer-Program/default.aspx | Apr 15, 2026 |
| Newsroom: Cathay Pacific transfer partner | https://newsroom.wf.com/.../2026/Wells-Fargo-Adds-Cathay-Pacific-as-New-Rewards-Points-Transfer-Partner/default.aspx | Apr 28, 2026 |
| Autograph Card Exclusives site | https://entertainment.wf.com/ | none |

Raw HTML/text of the card page, terms page, guide to benefits and streaming page were saved alongside these notes (`wf-autograph-*.html/.txt`) for audit.

Could NOT read: the full Wells Fargo Rewards Program Terms and Conditions (wellsfargo.com/rewardsterms redirects to consumercard.wellsfargorewards.com/#/Tnc, a JavaScript app that returns only "Welcome to Wells Fargo Rewards" to a fetcher). Redemption minimums for cash-to-account/ATM therefore come from secondary sources. The Bilt-conversion FAQ (sites.wf.com/bilt-conversion-faq) now just redirects to wellsfargo.com. NerdWallet and Forbes returned HTTP 403; TPG's card page is JS-rendered (used TPG's review and transfer-partner pages instead).

## What was verified from official sources

### Fees
- Annual fee $0; foreign transaction fee none (Important Credit Terms + card page).
- Purchase APR 0% intro 12 months then 18.74/24.74/28.74% variable; BT APR same; cash advance APR 29.74%; BT fee $5 or 3% first 120 days then 5%; cash advance $10 or 5%; late fee up to $40.

### Welcome offer
- 20,000 points after $1,000 net purchases in 3 months ($200 cash value); posts as redeemable within 60 days. Footnote 1 lists the excluded transaction types. Card page also states no bonus if you opened the same card in the last 48 months (from the eligibility text on the page).

### Earning (verbatim category lists from the Dec 30, 2025 Addendum)
"You can earn additional bonus Points when you make net purchases directly with the following merchant categories... 2 more bonus Points (for a total of 3 Points)":
- **Entertainment** (= "popular streaming services"): Books; Music; Continuity/subscription services; Streaming services considered cable and other pay television; Digital goods; Movies. May not earn bonus: streaming bundled with another product/membership/service; streaming that a third party bills "such as a digital platform; a cable, telecommunications, or internet provider; online retailer; or in-vehicle streaming service".
- **Food/Drink Establishments**: Caterers; Drinking places; Eating places and restaurants; Fast food restaurants. May not earn bonus: Bakeries; Grocery stores and other miscellaneous places that serve food or operate restaurants on site; **Third-party delivery services**.
- **Fuel/Charging Stations**: Automated fuel dispensers; Electric vehicle charging stations; Gas stations. May not earn bonus: Auto repair stores; Superstores; Car washes; Warehouse/membership clubs; Grocery stores.
- **Telecommunication Services**: Landline and cell phone providers. May not earn bonus: additional phone services such as insurance or additional data; phones and accessories; phone-plan services that a third party bundles or bills (internet provider, in-vehicle service).
- **Transport**: Ferries; Parking lots and garages; Limousines; Taxis; Passenger railway; Toll bridges and highways.
- **Travel**: Airlines; Hotel/motels; Campgrounds; Timeshares; Cruise lines; Travel agencies; Discount travel sites; Vehicle/auto rentals.
- Catch-all: "We do not control how a retailer classifies their business to a merchant category. Therefore, we reserve the right to determine which purchases qualify for bonus Points. This includes purchases you make using a third-party payment account, with a mobile/wireless card reader, or through an online marketplace with multiple retailers."
- Bonus points "will appear in your Rewards Account and be available for you to use in one to two months after you earn them."
- Card page footnote 2 repeats the same lists ("retailers whose VISA merchant code is classified as..."). Marketing tiles say Transit = "subways, ride shares, parking, tolls and more"; Restaurants = "dining in, take-out, catering, delivery and more".

### Ambiguities / conflicts noted
- **Delivery**: marketing says "delivery" counts; the Terms list "third-party delivery services" as possibly not earning bonus. Official terms win -> flagged in gotchas. Direct-from-restaurant delivery (restaurant MCC) counts.
- **Subways / public transit**: the Terms' Transport list does not literally include local/suburban commuter transportation (subway/bus MCC 4111); the card page says subways count. Recorded as "expected but merchant-coding dependent".
- **Rideshare**: covered via taxis/limousines coding; card page explicitly says "ride shares".
- **Streaming list**: The Terms say "the current list of eligible streaming services... is available at wellsfargo.com/autographstreaming", but that page (Jul 2026 disclosure) names NO merchants; it only repeats the category types and exclusions. I grepped the HTML for Netflix/Hulu/Disney/Spotify/YouTube/Max/Peacock/Paramount/Sirius/Pandora/Amazon/Audible etc. -- none present. So there is no official named list.
- **Prepaid phone plans / MVNOs**: not addressed anywhere official. Marked unverified in the JSON note.
- **Portal travel**: WF's own portal is a travel agency, so 3X applies (TPG confirms), but WF doesn't state a separate portal rate for the Autograph. Marked `verified: false`.

### Redemption
- Terms: redeem for cash redemption, charitable donations, gift cards, travel, Pay with Rewards at PWR merchants, Points Transfer. Points do not expire while account open. Closing all rewards-eligible cards forfeits points (NY residents get a check, per Dec 10, 2023 NY notice). "One Wells Fargo Rewards Point equals 1 Participating Transfer Partner mile, point, or credit, unless we state otherwise." Transfers online only, final.
- Card page: Redeem for Purchases needs a transaction of $1+ and enough points to cover the ENTIRE transaction; credit posts in 5-7 business days. Gift cards "as low as $10". "Transfer your points directly to select travel loyalty programs, in any amount." PWR: no points earned on redeemed portion; sharing preference must be enabled.
- 1 cent/point value for cash, statement credit, gift cards, PayPal, travel portal: consistent across CNBC (Sept 1, 2026), Upgraded Points (Sept 2, 2026), TPG. Official pages state the $200 value of 20,000 points, which implies 1 cent.
- Minimums NOT in the official summary: $25 (2,500 pt) minimum for cash to account/check and $20 increments at WF ATMs come from CNBC/Upgraded Points/Doctor of Credit (2015 article). AwardWallet says 100-point/$1 minimum, which matches Redeem for Purchases only. Flagged as secondary-sourced.

### Transfer partners (as of Sept 2026)
Official press releases confirm JetBlue (1:1), Wyndham (1:2), Cathay Pacific (1:1) and each says the Autograph Card is eligible ("all Wells Fargo credit cards that earn rewards points, including the Autograph and Autograph Journey"). The Nov 2025 JetBlue release additionally lists legacy Visa Signature / Private Bank / Advisors cards as eligible. So the standard Autograph has the SAME partners and ratios as Journey. Full list (TPG May 18 2026, AwardWallet Apr 30 2026, Upgraded Points Sept 28 2026 agree):
- 1:1 airlines: Aer Lingus AerClub; Air France-KLM Flying Blue; Avianca LifeMiles; The British Airways Club; Cathay Pacific (Cathay / Asia Miles); Iberia Club; JetBlue TrueBlue; Virgin Atlantic Flying Club / Virgin Red (Upgraded Points lists Virgin Atlantic and Virgin Red as two partners; TPG treats them as one; AwardWallet lists only "Virgin Red"). Both are Virgin Points.
- 1:2 hotels: Choice Privileges; Wyndham Rewards.
- No minimum, any increment (even 1 point), online only, generally instant. Wells Fargo's own site has no static partner-list page (it lives inside the logged-in rewards app), so the list is press-release + secondary sourced.
- Date nuance: Doctor of Credit reported JetBlue live Oct 27, 2025; WF press release dated Nov 4, 2025. AwardWallet says "added October 2025". Recorded both.

### Protections (Guide to Benefits, effective 09/15/2025)
- Cellular Telephone Protection: $25 deductible; max $600 per claim; max 2 paid claims and $1,200 per 12 months; must pay the monthly Wireless Bill with the card and the charge must post the month immediately preceding the incident; coverage starts first day of the following calendar month; suspended for months after a missed charge; all lines on the bill covered; excludes lost/mysteriously disappeared phones, cracked screens/cosmetic damage not affecting function, tablets/smartwatches, accessories, resale/commercial phones, phones in a carrier's custody, fraud/abuse/wear, Acts of God, confiscation; "supplemental to and excess of valid and collectible insurance"; notify within 60 days, docs within 120 days.
- Auto Rental CDW: max $50,000; 15 consecutive days US / 31 outside US; "In the United States, the coverage provided by this benefit is secondary... Outside the United States, where this benefit is available, the coverage provided is primary even if You have another insurance policy"; must pay full rental with card and/or rewards and decline the rental company's CDW; not available in Israel, Jamaica, Republic of Ireland, Northern Ireland; excludes exotic cars, antiques (>20 yrs), vans other than <=9-seat, open-cargo-bed vehicles, trucks, motorcycles/mopeds, limousines, RVs, vehicles rented with a driver, car-sharing rentals, cars used for hire; notify within 60 days, docs within 365 days.
- Roadside Dispatch: pay-per-use, "Current fee for a standard service call will be confirmed at the time service is requested"; towing up to 5 miles, tire change, jump start, lockout, fuel delivery up to 5 gal, standard winching within 100 ft; vehicles <=10,000 lbs. The $79.95 per-call figure is from WalletHub (Sept 1, 2026) only -> unverified officially.
- Travel and Emergency Assistance Services: referral/assistance only, cardholder pays; message relay, medical/legal referral, emergency transportation and ticket replacement assistance, lost luggage locator, translation, prescription/document delivery, pre-trip info. Covers cardholder and dependents under 22 (per guide summary).
- Emergency Cash Disbursement & Card Replacement; Visa Signature Concierge; Visa Signature Luxury Hotel Collection (book via VisaSignatureHotels.com or Concierge: best rate guarantee, upgrade, Wi-Fi, breakfast for two, $25 F&B credit, VIP status, late checkout).
- **Absent (grep of the full guide returned zero hits for "Purchase", "Warranty", "Baggage", "Accident"; "Trip" only in "Pre-Trip Assistance"; "Luggage" only in the locator service):** purchase protection/security, extended warranty, price protection, return protection, trip cancellation/interruption, trip delay, baggage delay, lost luggage reimbursement, travel accident insurance. Upgraded Points (Sept 2, 2026), WalletHub (Mar 20, 2025), Bankrate (Aug 3, 2026) and CNBC (Sept 21, 2026) all confirm these are missing.

### Other benefits
- My Wells Fargo Deals: activation required; pay merchant directly; digital wallet / third-party / mobile reader payment may not qualify; credit within 60 days (card page footnote 12). The dedicated WF deals page URL could not be located (404s); the card-page footnote is the official source used.
- Autograph Card Exclusives: official footnote 15 (eligible WF credit cardholders, pay with the card in the sales window, first come first served, ticket limits). Perk details (priority window for Autograph-branded cards, $100 tickets, 4 per household, early entry, 30% merch discount, gift) are from AwardWallet Jul 22, 2026 and the 2026 event list (Fall Out Boy SF, Alanis Morissette Houston, Benson Boone NYC Sept 10, 2026).
- Credit Close-Up FICO score; Zero Liability.
- No statement credits of any kind exist on this card (credits: []).

### Acceptance
- Visa Signature. Costco customer-service page confirms US warehouses and gas stations accept "All Visa Cards" and Visa is the only credit network accepted in-warehouse.

## Recent changes (last 18 months) and how each was sourced
- 2025-09-15 new Guide to Benefits effective (official).
- 2025-10-27/11-04 JetBlue 1:1 (DoC + official press release).
- 2025-11-05 last day for Bilt Mastercard applications at WF; 2026-02-07 Bilt Mastercard accounts converted to Autograph Visa (Frequent Miler Nov 18, 2025 quoting WF's letter; CNBC/Kiplinger summaries). Converted cards get standard Autograph terms.
- 2025-12-30 Rewards Terms/Addendum effective (official).
- 2026-04-15 Wyndham 1:2 (official press release).
- 2026-04-28 Cathay Pacific 1:1 (official press release).
- 2026-06 (~June 7-10): rewards accounts no longer combined across WF cards; travel provider changed to Aspire Lifestyles (AMERICAS) Inc.; cruise bookings dropped; email required for travel bookings from June 30, 2026; 2026-09-25 automatic redemptions and gifting of rewards discontinued. Source: Travel with Grant (June 7, 2026) and Doctor of Credit (June 10, 2026), both quoting a Wells Fargo change-in-terms notice. Not found on a public wellsfargo.com page -> secondary-sourced, but two independent reputable sources agree.
- 2026-06/07: Wells Fargo launched the Premier Autograph Visa Infinite (Journey variant) -- a different card, listed only for context; no change to the standard Autograph.
- Welcome offer unchanged at 20,000 points (official page, Sept 2026). No 2026 devaluation of earning categories or benefits found.

## Items marked `verified: false` or otherwise unverified
1. portal-travel 3X (TPG only; WF does not spell out a portal rate for Autograph).
2. Wells Fargo Travel "Preferred Partner Hotels" perks on the Autograph (TPG only).
3. Roadside Dispatch fee ~$79.95 (WalletHub only; guide says fee quoted at time of call).
4. Cash redemption minimum $25 / ATM $20 increments (CNBC, Upgraded Points, DoC; full T&C not fetchable).
5. Prepaid/MVNO phone plans earning 3X (no official statement).
6. Whether subways/buses (MCC 4111) earn 3X (marketing yes; Terms list silent).
7. Autograph Card Exclusives perk specifics (AwardWallet).
8. Sept 25, 2026 gifting/auto-redemption discontinuation (two secondary sources quoting WF notice).

## Search log (what each established)
- wellsfargo.com card page -> offer, categories, benefits list, footnotes 1-17.
- wellsfargo.com terms page (fetched twice + curl) -> Dec 30, 2025 effective date, verbatim category lists, exclusions, APR/fee table, redemption/transfer/expiration language.
- wellsfargo.com guide to benefits (fetched twice + curl) -> 09/15/2025 effective date; all limits; absence of purchase/warranty/trip protections.
- wellsfargo.com streaming page (fetch + curl) -> no named services.
- wellsfargo.com/rewards, /help/credit-cards -> redemption channels, gift cards from $10, link to full T&C (JS app).
- Newsroom JetBlue / Wyndham / Cathay releases -> dates, ratios, eligibility of standard Autograph.
- TPG transfer partners (May 18, 2026), AwardWallet transfer guide (Apr 30, 2026), Upgraded Points transfer guide (Sept 28, 2026) -> full partner list, no-minimum transfers, Virgin Red treatment.
- TPG travel portal guide (Aug 6, 2026) -> 1 cpp portal, 3X for Autograph, Preferred Partner Hotels.
- TPG Autograph review (Jul 5, 2025), CNBC review (Sept 21, 2026), Bankrate benefits guide (Aug 3, 2026), Upgraded Points benefits (Sept 2, 2026), WalletHub benefits (Mar 20, 2025), AwardWallet card page (Jul 3, 2026) -> cross-checks on benefits/absences/redemption.
- Doctor of Credit tag pages + June 10, 2026 post; Travel with Grant June 7, 2026 -> 2026 program changes; JetBlue live date.
- Frequent Miler Nov 18, 2025 -> Bilt conversion details.
- Costco payment page -> Visa-only acceptance.
