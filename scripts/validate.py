#!/usr/bin/env python3
"""Validate data/*.json for the Which Card? app. Exit code 1 on any error.

Run:  python3 scripts/validate.py
"""
import json, re, sys, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
errors, warnings = [], []
E = errors.append
W = warnings.append

def load(name):
    p = DATA / name
    try:
        return json.loads(p.read_text())
    except Exception as ex:  # noqa
        E(f"{name}: invalid JSON ({ex})")
        return None

cards_doc = load("cards.json")
cats_doc = load("categories.json")
merch_doc = load("merchants.json")
profile = load("profile.json")
if errors:
    print("\n".join(errors)); sys.exit(1)

CATS = set(cats_doc["categories"].keys())
TAGS = set(k for k in cats_doc["purchaseTags"].keys() if not k.startswith("_"))
CURRENCIES = set(cards_doc.get("currencies", {}).keys())
PERIODS = {"monthly", "quarterly", "semiannual", "annual-calendar", "annual-cardmember", "one-time"}
PROTS = {"rentalCar", "purchaseProtection", "extendedWarranty", "returnProtection", "cellPhone", "tripDelay", "tripCancellation", "baggageDelay", "lostLuggage", "travelAccident", "roadsideAssistance", "travelEmergencyAssistance"}
NETWORKS = {"visa", "mastercard", "amex", "discover"}
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
today = datetime.date.today().isoformat()

meta = cards_doc.get("meta", {})
if not DATE.match(str(meta.get("dataAsOf", ""))):
    E("meta.dataAsOf must be YYYY-MM-DD")
elif meta["dataAsOf"] > today:
    E("meta.dataAsOf is in the future")

for cid, cur in cards_doc.get("currencies", {}).items():
    if cur.get("unit") not in {"points", "percent"}:
        E(f"currency {cid}: unit must be points|percent")
    if cid not in profile.get("valuations", {}):
        W(f"currency {cid}: no default valuation in profile.json (1.0 assumed)")

ids = set()
for c in cards_doc.get("cards", []):
    cid = c.get("id", "?")
    if cid in ids: E(f"duplicate card id {cid}")
    ids.add(cid)
    for k in ["id", "name", "issuer", "network", "annualFee", "foreignTransactionFee", "currency", "earning", "protections", "sources", "dataAsOf"]:
        if k not in c: E(f"{cid}: missing {k}")
    if c.get("network") not in NETWORKS: E(f"{cid}: bad network {c.get('network')}")
    if c.get("currency", {}).get("id") not in CURRENCIES: E(f"{cid}: currency id not in currencies map")
    if not DATE.match(str(c.get("dataAsOf", ""))): E(f"{cid}: dataAsOf must be YYYY-MM-DD")
    if not c.get("sources"): E(f"{cid}: no sources")
    has_base = False
    for i, e in enumerate(c.get("earning", [])):
        cats = ([e.get("category")] if e.get("category") else []) + list(e.get("categories", []))
        if not cats: E(f"{cid}.earning[{i}]: no category")
        for x in cats:
            if x not in CATS: E(f"{cid}.earning[{i}]: unknown category {x}")
        if "everything" in cats: has_base = True
        if not isinstance(e.get("rate"), (int, float)): E(f"{cid}.earning[{i}]: rate must be a number")
        if e.get("currency") and e["currency"] not in CURRENCIES: E(f"{cid}.earning[{i}]: unknown currency {e['currency']}")
        if e.get("via") and e["via"] not in {"apple-pay", "portal", "direct", "installments"}: E(f"{cid}.earning[{i}]: bad via {e['via']}")
        if e.get("cap") and not isinstance(e["cap"].get("amount"), (int, float)): E(f"{cid}.earning[{i}]: cap.amount must be a number")
    if not has_base: E(f"{cid}: no 'everything' base rate")
    for i, m in enumerate(c.get("merchantRates", [])):
        if not m.get("merchant"): E(f"{cid}.merchantRates[{i}]: missing merchant")
        if not isinstance(m.get("rate"), (int, float)): E(f"{cid}.merchantRates[{i}]: rate must be a number")
        if m.get("validThrough") and not DATE.match(str(m["validThrough"])): E(f"{cid}.merchantRates[{i}]: validThrough must be YYYY-MM-DD")
        if m.get("validThrough") and m["validThrough"] < today: W(f"{cid}.merchantRates[{i}]: {m['merchant']} offer expired {m['validThrough']}; remove or renew")
    for i, cr in enumerate(c.get("credits", [])):
        for k in ["id", "name", "amount", "period"]:
            if k not in cr: E(f"{cid}.credits[{i}]: missing {k}")
        if cr.get("period") not in PERIODS: E(f"{cid}.credits[{i}]: bad period {cr.get('period')}")
        if not isinstance(cr.get("amount"), (int, float)): E(f"{cid}.credits[{i}]: amount must be a number")
        for t in cr.get("categoryTags", []):
            if t not in CATS: E(f"{cid}.credits[{i}]: unknown categoryTag {t}")
        if cr.get("endsOn") and cr["endsOn"] < today: W(f"{cid}.credits[{i}]: {cr['name']} ended {cr['endsOn']}; remove it")
    for k, v in (c.get("protections") or {}).items():
        if k not in PROTS: E(f"{cid}.protections: unknown key {k}")
        if not isinstance(v, dict) or "has" not in v: E(f"{cid}.protections.{k}: needs a 'has' boolean")
    if c.get("rotating"):
        r = c["rotating"]
        cur_q = None
        for i, q in enumerate(r.get("quarters", [])):
            for k in ["start", "end", "categories"]:
                if k not in q: E(f"{cid}.rotating.quarters[{i}]: missing {k}")
            if not (DATE.match(str(q.get("start", ""))) and DATE.match(str(q.get("end", "")))): E(f"{cid}.rotating.quarters[{i}]: bad dates")
            for x in (q.get("canonical", {}).get("categories", [])):
                if x not in CATS: E(f"{cid}.rotating.quarters[{i}]: unknown canonical category {x}")
            if q.get("start", "") <= today <= q.get("end", ""): cur_q = q
        if not cur_q: E(f"{cid}: rotating calendar has no entry covering today ({today}); add the current quarter")
        else:
            nxt = [q for q in r["quarters"] if q["start"] > today]
            if not nxt: W(f"{cid}: next quarter's rotating categories not loaded yet")

for m in merch_doc["merchants"]:
    for x in m.get("c", []):
        if x not in CATS: E(f"merchant {m['n']}: unknown category {x}")
    for n in m.get("no", []):
        if n not in NETWORKS: E(f"merchant {m['n']}: bad network {n}")
    for o in m.get("only", []):
        if o not in ids: E(f"merchant {m['n']}: only= references unknown card {o}")

if errors:
    print("ERRORS:"); print("\n".join(" - " + e for e in errors))
if warnings:
    print("WARNINGS:"); print("\n".join(" - " + w for w in warnings))
print(f"cards: {len(ids)}, merchants: {len(merch_doc['merchants'])}, categories: {len(CATS)}, dataAsOf: {meta.get('dataAsOf')}")
sys.exit(1 if errors else 0)
