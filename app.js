/* Which Card? — personal credit card optimizer
   Plain JS, no build step. Data lives in data/*.json and is refreshed quarterly by a cloud routine. */
(function () {
  'use strict';

  // ---------- utilities ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (tag, attrs, ...children) => {
    const n = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      n.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    }
    return n;
  };
  const norm = (s) => String(s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9&+.'\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const pct = (v) => (Math.round(v * 100) / 100).toString().replace(/\.?0+$/, '') + '%';
  const money = (v) => '$' + (Number.isInteger(v) ? v : v.toFixed(2));
  const cname = (cr) => String(cr.name || '').replace(/^\$\d[\d,]*\s*/, '');
  const wordIn = (hay, needle) => {
    if (!needle) return false;
    const re = new RegExp('(^|[^a-z0-9])' + needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])');
    return re.test(hay);
  };
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const fmtDate = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const daysUntil = (d) => Math.ceil((d - new Date()) / 86400000);

  // ---------- state ----------
  const App = { data: null, settings: {}, state: { query: '', applePay: 'auto', abroad: false, tab: 'search', resolved: null } };
  const SETTINGS_KEY = 'whichcard-settings-v1';
  const loadSettings = () => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'); } catch (e) { return {}; } };
  const saveSettings = () => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(App.settings)); } catch (e) { /* private mode */ } };
  const profile = () => Object.assign({}, App.data.profile, App.settings, { valuations: Object.assign({}, App.data.profile.valuations, App.settings.valuations || {}) });
  const cpp = (currencyId) => { const v = profile().valuations[currencyId]; return v === undefined ? 1.0 : Number(v); };

  // ---------- data loading ----------
  async function loadJSON(path) {
    const r = await fetch(path + '?v=' + Date.now(), { cache: 'no-store' }).catch(() => null);
    if (r && r.ok) return r.json();
    const c = await caches.match(path).catch(() => null);
    if (c) return c.json();
    throw new Error('Could not load ' + path);
  }
  async function loadAll() {
    const [cards, categories, merchants, prof] = await Promise.all([
      loadJSON('data/cards.json'), loadJSON('data/categories.json'), loadJSON('data/merchants.json'), loadJSON('data/profile.json')
    ]);
    App.data = { cards: cards.cards, meta: cards.meta || {}, currencies: cards.currencies || {}, categories: categories.categories, tags: categories.purchaseTags, merchants: merchants.merchants, profile: prof };
    App.settings = loadSettings();
  }

  // ---------- resolution: text -> merchant / categories / tags ----------
  function detectTags(q) {
    const found = []; let stripped = q;
    for (const [id, t] of Object.entries(App.data.tags)) {
      if (id.startsWith('_')) continue;
      for (const kw of t.keywords) {
        const k = norm(kw);
        if (wordIn(q, k)) { found.push(id); stripped = stripped.replace(k, ' ').replace(/\s+/g, ' ').trim(); break; }
      }
    }
    return { tags: found, stripped };
  }
  function scoreAlias(q, alias) {
    const a = norm(alias);
    if (!a) return 0;
    if (q === a) return 100 + a.length;
    if (wordIn(q, a)) return 70 + a.length;
    if (q.length >= 3 && a.startsWith(q)) return 40 + q.length;
    if (q.length >= 4 && a.includes(q)) return 30 + q.length;
    if (q.length >= 3 && wordIn(a, q)) return 25 + q.length;
    return 0;
  }
  function matchMerchant(q) {
    let best = null;
    for (const m of App.data.merchants) {
      let s = 0;
      for (const alias of [m.n, ...(m.a || [])]) s = Math.max(s, scoreAlias(q, alias));
      if (s > 0 && (!best || s > best.score)) best = { merchant: m, score: s };
    }
    return best;
  }
  function matchCategory(q) {
    let best = null;
    for (const [id, c] of Object.entries(App.data.categories)) {
      let s = 0;
      for (const kw of [c.label, ...(c.keywords || [])]) s = Math.max(s, scoreAlias(q, kw));
      if (s > 0 && (!best || s > best.score)) best = { id, score: s };
    }
    return best;
  }
  function expandCategories(cats) {
    const out = []; const seen = new Set();
    const add = (c) => { if (!c || seen.has(c)) return; seen.add(c); out.push(c); const def = App.data.categories[c]; if (def && def.parents) def.parents.forEach(add); };
    cats.forEach(add);
    return out;
  }
  function resolve(text) {
    const q0 = norm(text);
    if (!q0) return null;
    const { tags, stripped } = detectTags(q0);
    const q = stripped || q0;
    const m = matchMerchant(q);
    const c = matchCategory(q);
    let merchant = null, cats = [];
    if (m && (!c || m.score >= c.score - 10)) { merchant = m.merchant; cats = merchant.c.slice(); }
    else if (c) { cats = [c.id]; }
    else if (tags.includes('abroad')) { cats = ['everything']; }
    else return { unresolved: true, tags, text };
    const categories = expandCategories(cats);
    if (!categories.includes('everything')) categories.push('everything');
    return { text, merchant, primary: cats[0], categories, tags, unresolved: false };
  }
  function suggestions(text) {
    const q = norm(text);
    if (q.length < 2) return [];
    const out = [];
    for (const m of App.data.merchants) {
      let s = 0; for (const alias of [m.n, ...(m.a || [])]) s = Math.max(s, scoreAlias(q, alias));
      if (s) out.push({ type: 'merchant', label: m.n, sub: (m.c || []).map(c => (App.data.categories[c] || {}).label).filter(Boolean).slice(0, 2).join(' · '), score: s, value: m.n });
    }
    for (const [id, c] of Object.entries(App.data.categories)) {
      let s = 0; for (const kw of [c.label, ...(c.keywords || [])]) s = Math.max(s, scoreAlias(q, kw));
      if (s) out.push({ type: 'category', label: c.label, sub: 'Category', score: s - 5, value: c.label, icon: c.icon });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 8);
  }

  // ---------- evaluation ----------
  function merchantMatchesName(merchant, name) {
    if (!merchant) return false;
    const n = norm(name);
    return [merchant.n, ...(merchant.a || [])].some(a => { const x = norm(a); return x === n || wordIn(x, n) || wordIn(n, x); });
  }
  function currentQuarter(card, date) {
    if (!card.rotating || !card.rotating.quarters) return { current: null, next: null };
    const d = date || todayISO();
    const qs = card.rotating.quarters.slice().sort((a, b) => a.start.localeCompare(b.start));
    const current = qs.find(q => q.start <= d && d <= q.end) || null;
    const next = qs.find(q => q.start > d) || null;
    return { current, next };
  }
  function ruleValue(card, rule) {
    const cur = rule.currency || card.currency.id;
    const unit = rule.unit || (App.data.currencies[cur] && App.data.currencies[cur].unit) || card.currency.unit;
    const v = unit === 'percent' ? Number(rule.rate) * cpp(cur) : Number(rule.rate) * cpp(cur);
    return { value: v, currency: cur, unit };
  }
  function describeRate(card, rule) {
    const cur = rule.currency || card.currency.id;
    const curDef = App.data.currencies[cur] || card.currency;
    const unit = rule.unit || curDef.unit;
    return unit === 'percent' ? pct(rule.rate) + (cur === 'bilt-cash' ? ' Bilt Cash' : curDef.shortName ? ' ' + curDef.shortName : '') : rule.rate + 'x ' + (curDef.shortName || curDef.name || 'points');
  }
  function ruleMatches(rule, ctx) {
    const cats = rule.categories ? rule.categories.concat(rule.category ? [rule.category] : []) : [rule.category];
    return cats.some(c => ctx.categories.includes(c));
  }
  function checkConditions(card, rule, ctx) {
    const p = profile();
    const notes = [];
    let status = 'ok';
    if (rule.excludeMerchants && rule.excludeMerchants.some(n => merchantMatchesName(ctx.merchant, n))) return { status: 'no', reason: 'Excluded merchant' };
    if (rule.includeMerchants && !rule.includeMerchants.some(n => merchantMatchesName(ctx.merchant, n))) return { status: 'no', reason: 'Only at listed merchants' };
    if (rule.usOnly && ctx.abroad) return { status: 'no', reason: 'US merchants only' };
    if (rule.requires === 'prime' && !p.primeMember) return { status: 'no', reason: 'Requires Prime membership' };
    if (rule.via === 'apple-pay') {
      if (ctx.applePay === 'no') return { status: 'no', reason: 'Needs Apple Pay' };
      if (ctx.applePay === 'unknown') { status = 'maybe'; notes.push('only if you pay with Apple Pay'); }
      else notes.push('pay with Apple Pay');
    }
    if (rule.via === 'portal') notes.push('book through ' + (rule.portalName || "the card's travel portal"));
    if (rule.via === 'direct') notes.push('book directly with the ' + (ctx.categories.includes('flights') ? 'airline' : 'provider'));
    if (rule.activation) { if (p.discoverActivates === false) status = 'maybe'; notes.push('activate the quarterly category first'); }
    if (rule.cap) notes.push('cap: ' + money(rule.cap.amount) + ' spend per ' + String(rule.cap.period).replace('-', ' ') + (rule.cap.afterCapRate !== undefined ? ', then ' + rule.cap.afterCapRate + (card.currency.unit === 'percent' ? '%' : 'x') : ''));
    if (rule.validThrough && rule.validThrough < todayISO()) return { status: 'no', reason: 'Offer ended' };
    if (rule.validThrough) notes.push('through ' + rule.validThrough);
    if (rule.notFor && rule.notFor.includes(ctx.primary)) return { status: 'no', reason: 'Not for this category' };
    if (rule.uncertain) { status = 'maybe'; notes.push(rule.uncertainNote || 'not confirmed for your account'); }
    return { status, notes };
  }
  function evaluateCard(card, ctx) {
    const p = profile();
    const res = { card, excluded: null, best: null, maybe: null, stack: [], effective: 0, effectiveMaybe: null, credits: [], protections: [], warnings: [], tips: [], notes: [] };
    const m = ctx.merchant;
    if (m && m.no && m.no.includes(card.network)) { res.excluded = `${m.n} does not accept ${netName(card.network)}`; return res; }
    if (m && m.only && !m.only.includes(card.id)) { res.excluded = `${m.n} only takes its own issuer's cards`; return res; }
    const catDef = App.data.categories[ctx.primary] || {};
    if (catDef.exclusiveCards && !catDef.exclusiveCards.includes(card.id)) { res.excluded = catDef.exclusiveReason || 'Not usable for this category'; return res; }

    const candidates = [];
    const stack = [];
    for (const rule of card.earning || []) {
      if (!ruleMatches(rule, ctx)) continue;
      const cond = checkConditions(card, rule, ctx);
      if (cond.status === 'no') continue;
      const rv = ruleValue(card, rule);
      const entry = { rule, value: rv.value, status: cond.status, notes: cond.notes, label: describeRate(card, rule), source: 'category' };
      if (rule.stack) stack.push(entry); else candidates.push(entry);
    }
    for (const mr of card.merchantRates || []) {
      if (!merchantMatchesName(m, mr.merchant)) continue;
      const rule = Object.assign({ category: ctx.primary }, mr);
      const cond = checkConditions(card, rule, ctx);
      if (cond.status === 'no') continue;
      const rv = ruleValue(card, rule);
      candidates.push({ rule, value: rv.value, status: cond.status, notes: cond.notes, label: describeRate(card, rule) + ' at ' + mr.merchant, source: 'merchant' });
    }
    if (card.rotating) {
      const { current } = currentQuarter(card);
      if (current) {
        const canon = current.canonical || {};
        const excludedCat = (canon.excludeCategories || []).some(c => ctx.categories.includes(c));
        const excludedMerch = (canon.excludeMerchants || []).some(n => merchantMatchesName(m, n));
        const catHit = !excludedCat && !excludedMerch && (canon.categories || []).some(c => ctx.categories.includes(c) && c !== 'everything');
        const merchHit = !excludedMerch && (canon.merchants || []).some(n => merchantMatchesName(m, n));
        const applePayHit = (canon.tags || []).includes('apple-pay') && ctx.applePay !== 'no';
        if (catHit || merchHit || applePayHit) {
          const rule = { category: ctx.primary, rate: current.rate || 5, activation: card.rotating.activationRequired, cap: { amount: card.rotating.capPerQuarter, period: 'quarter', afterCapRate: 1 } };
          const cond = checkConditions(card, rule, ctx);
          if (applePayHit && !catHit && !merchHit && ctx.applePay === 'unknown') cond.status = 'maybe', cond.notes.push('only if paying with Apple Pay / digital wallet');
          candidates.push({ rule, value: ruleValue(card, rule).value, status: cond.status, notes: cond.notes.concat([`this quarter's 5% category: ${current.categories.join(', ')}`]), label: (current.rate || 5) + '% rotating category', source: 'rotating' });
        }
      }
    }
    const okC = candidates.filter(c => c.status === 'ok').sort((a, b) => b.value - a.value);
    const maybeC = candidates.filter(c => c.status === 'maybe').sort((a, b) => b.value - a.value);
    res.best = okC[0] || null;
    res.maybe = maybeC[0] && (!res.best || maybeC[0].value > res.best.value) ? maybeC[0] : null;
    res.stack = stack;
    const stackVal = stack.reduce((s, e) => s + e.value, 0);
    res.effective = (res.best ? res.best.value : 0) + stackVal;
    if (res.maybe) res.effectiveMaybe = res.maybe.value + stackVal;
    if (ctx.abroad && card.foreignTransactionFee) {
      res.effective -= card.foreignTransactionFee;
      if (res.effectiveMaybe !== null) res.effectiveMaybe -= card.foreignTransactionFee;
      res.warnings.push(`${card.foreignTransactionFee}% foreign transaction fee (already subtracted)`);
    }
    if (ctx.abroad && card.network === 'discover') res.warnings.push('Discover acceptance is limited outside the US');
    if (ctx.abroad && card.network === 'amex') res.warnings.push('Amex is accepted less widely than Visa/Mastercard abroad');
    if (m && m.ap === false && card.id === 'apple-card') res.warnings.push(`${m.n} does not take Apple Pay, so Apple Card earns only its 1% base rate`);

    if (card.dateBonus && new Date().getDate() === card.dateBonus.dayOfMonth && (!card.dateBonus.validThrough || card.dateBonus.validThrough >= todayISO()) && ctx.primary !== 'rent') res.tips.push(card.dateBonus.label);
    // portal tips for travel-type queries
    const travelish = ['flights', 'hotels', 'car-rental', 'travel', 'marriott'].some(c => ctx.categories.includes(c)) && !ctx.categories.includes('portal-travel');
    if (travelish) for (const rule of card.earning || []) {
      if (rule.category === 'portal-travel' || (rule.categories || []).includes('portal-travel')) {
        const v = ruleValue(card, rule).value;
        if (v > res.effective + 0.01) res.tips.push(`${describeRate(card, rule)} if booked through ${rule.portalName || "the issuer's travel portal"} instead (${pct(v)} value; portal bookings usually forgo hotel elite credit and may cost more)`);
      }
    }
    // credits
    for (const cr of card.credits || []) {
      const byMerchant = (cr.merchants || []).some(n => merchantMatchesName(m, n));
      const byCat = !byMerchant && (cr.categoryTags || []).some(t => ctx.categories.includes(t) && t !== 'everything');
      if (byMerchant || byCat) res.credits.push({ credit: cr, direct: byMerchant });
    }
    // protections
    const relevant = new Set();
    for (const c of ctx.categories) { if (c === 'everything' && ctx.primary !== 'everything') continue; ((App.data.categories[c] || {}).protections || []).forEach(x => relevant.add(x)); }
    for (const t of ctx.tags) ((App.data.tags[t] || {}).protections || []).forEach(x => relevant.add(x));
    for (const key of relevant) {
      const pr = (card.protections || {})[key];
      if (pr && pr.has) res.protections.push({ key, ...pr });
    }
    res.protectionScore = res.protections.reduce((s, pr) => s + (pr.coverage === 'primary' ? 2 : 1), 0);
    return res;
  }
  const netName = (n) => ({ visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express', discover: 'Discover' })[n] || n;
  const PROT_LABEL = { rentalCar: 'Rental car collision coverage', purchaseProtection: 'Purchase protection', extendedWarranty: 'Extended warranty', returnProtection: 'Return protection', cellPhone: 'Cell phone protection', tripDelay: 'Trip delay reimbursement', tripCancellation: 'Trip cancellation / interruption', baggageDelay: 'Baggage delay', lostLuggage: 'Lost luggage', travelAccident: 'Travel accident insurance', roadsideAssistance: 'Roadside assistance', travelEmergencyAssistance: 'Travel & emergency assistance' };
  function protSummary(pr) {
    const bits = [];
    if (pr.coverage) bits.push(pr.coverage);
    if (pr.perClaim) bits.push('up to ' + money(pr.perClaim) + '/claim');
    if (pr.perItem) bits.push('up to ' + money(pr.perItem) + '/item');
    if (pr.perTrip) bits.push('up to ' + money(pr.perTrip) + '/trip');
    if (pr.perPerson) bits.push('up to ' + money(pr.perPerson) + '/person');
    if (pr.perYear) bits.push(money(pr.perYear) + '/yr');
    if (pr.days) bits.push(pr.days + ' days');
    if (pr.hoursRequired) bits.push('after ' + pr.hoursRequired + 'h');
    if (pr.extraYears) bits.push('+' + pr.extraYears + ' yr');
    if (pr.deductible !== undefined) bits.push(money(pr.deductible) + ' deductible');
    if (pr.claimsPerYear) bits.push(pr.claimsPerYear + ' claims/yr');
    if (pr.limit && !pr.perClaim) bits.push(pr.limit);
    return bits.join(' · ');
  }

  function recommend(resolved) {
    const m = resolved.merchant;
    let applePay = App.state.applePay;
    if (applePay === 'auto') applePay = resolved.tags.includes('apple-pay') ? 'yes' : (m ? (m.ap === true ? 'yes' : m.ap === false ? 'no' : 'unknown') : 'unknown');
    const abroad = App.state.abroad || resolved.tags.includes('abroad');
    const ctx = { merchant: m, primary: resolved.primary, categories: resolved.categories, tags: resolved.tags, applePay, abroad };
    const results = App.data.cards.map(c => evaluateCard(c, ctx));
    const ranked = results.filter(r => !r.excluded).sort((a, b) => (b.effective - a.effective) || (b.protectionScore - a.protectionScore));
    const excluded = results.filter(r => r.excluded);
    return { ctx, ranked, excluded };
  }

  // ---------- credits calendar ----------
  function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59); }
  function endOfQuarter(d) { const q = Math.floor(d.getMonth() / 3); return new Date(d.getFullYear(), q * 3 + 3, 0, 23, 59); }
  function endOfHalf(d) { return d.getMonth() < 6 ? new Date(d.getFullYear(), 6, 0, 23, 59) : new Date(d.getFullYear(), 12, 0, 23, 59); }
  function endOfYear(d) { return new Date(d.getFullYear(), 12, 0, 23, 59); }
  function creditDeadline(card, cr) {
    const now = new Date();
    const p = profile();
    switch (cr.period) {
      case 'monthly': return { date: endOfMonth(now), label: 'this month' };
      case 'quarterly': return { date: endOfQuarter(now), label: 'this quarter' };
      case 'semiannual': return { date: endOfHalf(now), label: 'this half-year' };
      case 'annual-calendar': return { date: endOfYear(now), label: 'this calendar year' };
      case 'annual-cardmember': {
        const ann = (p.cardAnniversaries || {})[card.id];
        if (ann) { const [mm, dd] = ann.split('-').map(Number); let d = new Date(now.getFullYear(), mm - 1, dd, 23, 59); if (d < now) d = new Date(now.getFullYear() + 1, mm - 1, dd, 23, 59); d.setDate(d.getDate() - 1); return { date: d, label: 'your cardmember year' }; }
        return { date: null, label: 'your cardmember year (anniversary not set)' };
      }
      default: return { date: null, label: cr.period || '' };
    }
  }
  function allCredits() {
    const out = [];
    for (const card of App.data.cards) for (const cr of card.credits || []) {
      if (cr.period === 'one-time') continue;
      const dl = creditDeadline(card, cr);
      out.push({ card, credit: cr, deadline: dl.date, deadlineLabel: dl.label, days: dl.date ? daysUntil(dl.date) : null });
    }
    return out.sort((a, b) => (a.days === null) - (b.days === null) || (a.days - b.days));
  }

  // ---------- rendering ----------
  const root = () => $('#app');
  function render() {
    const r = root(); r.innerHTML = '';
    r.appendChild(renderHeader());
    const main = el('main', { class: 'main' });
    if (App.state.tab === 'search') main.appendChild(renderSearch());
    else if (App.state.tab === 'credits') main.appendChild(renderCredits());
    else if (App.state.tab === 'cards') main.appendChild(renderCards());
    else main.appendChild(renderSettings());
    r.appendChild(main);
    r.appendChild(renderTabs());
    r.appendChild(renderInstallHint());
  }
  function renderHeader() {
    const meta = App.data.meta || {};
    return el('header', { class: 'header' },
      el('div', { class: 'brand' }, el('span', { class: 'logo' }, '💳'), el('h1', null, 'Which Card?')),
      el('div', { class: 'meta' }, 'Benefits data as of ', el('strong', null, meta.dataAsOf || '—'), meta.nextUpdate ? ' · next refresh ' + meta.nextUpdate : '')
    );
  }
  function renderTabs() {
    const tabs = [['search', '🔍', 'Search'], ['credits', '📅', 'Credits'], ['cards', '🗂️', 'Cards'], ['settings', '⚙️', 'Settings']];
    return el('nav', { class: 'tabs' }, tabs.map(([id, icon, label]) => el('button', { class: 'tab' + (App.state.tab === id ? ' active' : ''), onclick: () => { App.state.tab = id; render(); window.scrollTo(0, 0); } }, el('span', { class: 'tab-icon' }, icon), el('span', null, label))));
  }
  function renderInstallHint() {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
    let dismissed = false; try { dismissed = localStorage.getItem('whichcard-install-dismissed') === '1'; } catch (e) { }
    if (!isIOS || standalone || dismissed) return el('span');
    return el('div', { class: 'install-hint' }, el('span', null, 'Add to Home Screen: tap Share ', el('span', { class: 'share-icon' }, '⎋'), ' then "Add to Home Screen".'), el('button', { class: 'link', onclick: (e) => { try { localStorage.setItem('whichcard-install-dismissed', '1'); } catch (x) { } e.target.closest('.install-hint').remove(); } }, 'Dismiss'));
  }

  const QUICK = [['Dining', 'restaurant'], ['Groceries', 'grocery'], ['Gas', 'gas'], ['Amazon', 'amazon'], ['Costco', 'costco'], ['Flights', 'flight'], ['Marriott', 'marriott'], ['Other hotels', 'hotel'], ['Car rental', 'car rental'], ['Uber', 'uber'], ['Lyft', 'lyft'], ['Streaming', 'streaming'], ['Phone bill', 'phone bill'], ['Drugstore', 'drugstore'], ['Apple', 'apple store'], ['Rent', 'rent'], ['Abroad', 'abroad'], ['Big purchase', 'big purchase electronics'], ['Everything else', 'everything else']];

  function renderSearch() {
    const wrap = el('section', { class: 'search' });
    const input = el('input', { type: 'search', id: 'q', class: 'q', placeholder: 'Merchant or purchase, e.g. "Costco gas", "Uber Eats", "flight to Tokyo"', value: App.state.query, autocomplete: 'off', autocorrect: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'search' });
    const sugg = el('div', { class: 'suggestions', hidden: true });
    const run = (text) => { App.state.query = text; App.state.resolved = resolve(text); sugg.hidden = true; renderResults(); };
    input.addEventListener('input', () => {
      const s = suggestions(input.value);
      sugg.innerHTML = ''; sugg.hidden = s.length === 0;
      s.forEach(x => sugg.appendChild(el('button', { class: 'sugg', onclick: () => { input.value = x.value; run(x.value); } }, el('span', { class: 'sugg-icon' }, x.type === 'category' ? (x.icon || '🏷️') : '🏪'), el('span', { class: 'sugg-text' }, el('span', { class: 'sugg-label' }, x.label), el('span', { class: 'sugg-sub' }, x.sub)))));
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { run(input.value); input.blur(); } });
    input.addEventListener('search', () => { if (!input.value) { App.state.query = ''; App.state.resolved = null; renderResults(); } });
    wrap.appendChild(el('div', { class: 'search-box' }, input, sugg));

    const toggles = el('div', { class: 'toggles' },
      el('label', { class: 'toggle' }, 'Apple Pay ', el('select', { onchange: (e) => { App.state.applePay = e.target.value; renderResults(); } },
        ['auto', 'yes', 'no'].map(v => el('option', { value: v, selected: App.state.applePay === v }, v === 'auto' ? 'auto-detect' : v === 'yes' ? 'yes' : 'no')))),
      el('label', { class: 'toggle' }, el('input', { type: 'checkbox', checked: App.state.abroad, onchange: (e) => { App.state.abroad = e.target.checked; renderResults(); } }), ' Outside the US')
    );
    wrap.appendChild(toggles);
    wrap.appendChild(el('div', { class: 'chips' }, QUICK.map(([label, q]) => el('button', { class: 'chip' + (App.state.query === q ? ' active' : ''), onclick: () => { input.value = q; run(q); } }, label))));
    wrap.appendChild(el('div', { id: 'results' }));
    setTimeout(renderResults, 0);
    return wrap;
  }

  function renderResults() {
    const box = $('#results'); if (!box) return; box.innerHTML = '';
    $$('.chip').forEach(c => c.classList.toggle('active', c.textContent === (QUICK.find(x => x[1] === App.state.query) || [])[0]));
    const r = App.state.resolved;
    if (!r) { box.appendChild(el('p', { class: 'hint' }, 'Type a store, app, or kind of purchase. Tap a chip for common cases. Results rank all your cards by real value using your point valuations from Settings.')); return; }
    if (r.unresolved) {
      box.appendChild(el('div', { class: 'card-box' }, el('p', null, `I don't recognize "${r.text}". Pick the closest category:`),
        el('div', { class: 'chips wrap' }, Object.entries(App.data.categories).map(([id, c]) => el('button', { class: 'chip', onclick: () => { App.state.query = c.label; App.state.resolved = resolve(c.label); renderResults(); } }, (c.icon || '') + ' ' + c.label)))));
      return;
    }
    const { ctx, ranked, excluded } = recommend(r);
    const catDef = App.data.categories[r.primary] || {};
    // context line
    const ctxBits = [];
    ctxBits.push(r.merchant ? `${r.merchant.n}` : catDef.label);
    if (r.merchant) ctxBits.push('treated as ' + r.categories.filter(c => c !== 'everything').slice(0, 3).map(c => (App.data.categories[c] || {}).label || c).join(' / '));
    if (ctx.abroad) ctxBits.push('outside the US');
    if (ctx.applePay === 'yes') ctxBits.push('Apple Pay available'); else if (ctx.applePay === 'no') ctxBits.push('no Apple Pay');
    box.appendChild(el('div', { class: 'context' }, el('span', { class: 'ctx-icon' }, catDef.icon || '🏷️'), el('span', null, ctxBits.join(' · '))));
    if (r.merchant && r.merchant.note) box.appendChild(el('div', { class: 'note' }, r.merchant.note));
    for (const t of r.tags) { const td = App.data.tags[t]; if (td && td.label && t !== 'abroad') box.appendChild(el('div', { class: 'note' }, td.label)); }

    if (!ranked.length) { box.appendChild(el('div', { class: 'card-box' }, 'None of your cards works here.')); }
    else {
      const top = ranked[0];
      box.appendChild(renderTopCard(top, ranked, ctx));
      const rest = ranked.slice(1);
      if (rest.length) {
        const list = el('div', { class: 'ranked' }, el('h3', null, 'All cards, ranked'));
        rest.forEach((res, i) => list.appendChild(renderRankedRow(res, i + 2, ctx)));
        box.appendChild(list);
      }
    }
    // credits section
    const credits = ranked.flatMap(res => res.credits.map(c => ({ card: res.card, ...c })));
    if (credits.length) {
      const sec = el('div', { class: 'section' }, el('h3', null, '💵 Credits you can use here'));
      credits.sort((a, b) => (b.direct - a.direct)).forEach(({ card, credit, direct }) => {
        const dl = creditDeadline(card, credit);
        sec.appendChild(el('div', { class: 'credit-row' },
          el('div', { class: 'credit-head' }, el('strong', null, `${money(credit.amount)} ${cname(credit)}`), el('span', { class: 'muted' }, ` · ${card.shortName || card.name}`)),
          el('div', { class: 'credit-meta' }, `${credit.period.replace('-', ' ')}${dl.date ? ' · use by ' + fmtDate(dl.date) : ''}${credit.enrollmentRequired ? ' · enrollment required' : ''}${direct ? '' : ' · may apply (check merchant list)'}`),
          credit.howToUse ? el('details', { class: 'credit-how' }, el('summary', null, 'How to use'), el('div', null, credit.howToUse)) : null));
      });
      box.appendChild(sec);
    }
    // protections section
    const relevantKeys = new Set(); ranked.forEach(res => res.protections.forEach(p => relevantKeys.add(p.key)));
    if (relevantKeys.size) {
      const sec = el('div', { class: 'section' }, el('h3', null, '🛡️ Protections that matter for this purchase'));
      for (const key of relevantKeys) {
        const rows = ranked.filter(res => res.protections.some(p => p.key === key)).map(res => ({ res, p: res.protections.find(p => p.key === key) }));
        rows.sort((a, b) => ((b.p.coverage === 'primary') - (a.p.coverage === 'primary')) || ((b.p.perClaim || b.p.perTrip || b.p.perItem || 0) - (a.p.perClaim || a.p.perTrip || a.p.perItem || 0)));
        const det = el('details', { class: 'prot' }, el('summary', null, el('strong', null, PROT_LABEL[key] || key), el('span', { class: 'muted' }, ` · ${rows.length} of your usable cards`)));
        rows.forEach(({ res, p }) => det.appendChild(el('div', { class: 'prot-row' }, el('span', { class: 'prot-card' }, res.card.shortName || res.card.name), el('span', { class: 'prot-detail' }, protSummary(p) || 'included', p.notes ? el('span', { class: 'muted' }, ' — ' + p.notes) : null))));
        sec.appendChild(det);
      }
      box.appendChild(sec);
    }
    if (excluded.length) {
      const sec = el('details', { class: 'section excluded' }, el('summary', null, `${excluded.length} card${excluded.length > 1 ? 's' : ''} not usable here`));
      excluded.forEach(res => sec.appendChild(el('div', { class: 'excl-row' }, el('strong', null, res.card.shortName || res.card.name), ' — ', res.excluded)));
      box.appendChild(sec);
    }
  }
  function valueLine(res) {
    const bits = [];
    if (res.best) bits.push(res.best.label);
    else bits.push('no bonus');
    res.stack.forEach(s => bits.push('+ ' + s.label));
    return bits.join(' ');
  }
  function renderTopCard(top, ranked, ctx) {
    const runner = ranked[1];
    const why = [];
    if (top.best) why.push(top.best.label + (top.stack.length ? ' plus ' + top.stack.map(s => s.label).join(' + ') : ''));
    if (top.best && top.best.rule && top.best.rule.conditions && (top.best.rule.rate === 0 || top.best.source === 'category' && top.best.rule.category === ctx.primary && ctx.primary === 'rent')) why.push(top.best.rule.conditions);
    (top.best ? top.best.notes : []).forEach(n => why.push(n));
    if (runner && runner.effective > 0) {
      const diff = top.effective - runner.effective;
      why.push(diff < 0.05 ? `Essentially tied with ${runner.card.shortName || runner.card.name}` : `Beats ${runner.card.shortName || runner.card.name} (${pct(runner.effective)}) by ${pct(diff)}`);
    }
    const box = el('div', { class: 'top' },
      el('div', { class: 'top-label' }, 'Use this card'),
      el('div', { class: 'top-name', style: `--accent:${top.card.color || '#3b82f6'}` }, el('span', { class: 'swatch' }), top.card.name),
      el('div', { class: 'top-value' }, el('span', { class: 'big' }, pct(top.effective)), el('span', { class: 'muted' }, ' value back', top.effectiveMaybe && top.effectiveMaybe > top.effective ? ` (up to ${pct(top.effectiveMaybe)} ${top.maybe.notes.join('; ')})` : '')),
      el('ul', { class: 'why' }, why.map(w => el('li', null, w))),
      top.tips.length ? el('div', { class: 'tips' }, top.tips.map(t => el('div', { class: 'tip' }, '💡 ' + t))) : null,
      top.warnings.length ? el('div', { class: 'warn' }, top.warnings.map(w => el('div', null, '⚠️ ' + w))) : null
    );
    // Better-protection alternative
    const relevantKeys = new Set(); ranked.forEach(res => res.protections.forEach(p => relevantKeys.add(p.key)));
    if (relevantKeys.size) {
      const alt = ranked.slice(1).find(res => res.protectionScore > top.protectionScore && (top.effective - res.effective) <= 1.5);
      if (alt) box.appendChild(el('div', { class: 'alt' }, `🛡️ If protection matters more than ${pct(top.effective - alt.effective)}: ${alt.card.shortName || alt.card.name} adds ${alt.protections.filter(p => !top.protections.some(q => q.key === p.key)).map(p => PROT_LABEL[p.key]).join(', ') || 'stronger coverage'}.`));
    }
    return box;
  }
  function renderRankedRow(res, rank, ctx) {
    const det = el('details', { class: 'row' });
    const label = valueLine(res);
    det.appendChild(el('summary', null,
      el('span', { class: 'rank' }, rank),
      el('span', { class: 'row-name', style: `--accent:${res.card.color || '#94a3b8'}` }, el('span', { class: 'swatch' }), res.card.shortName || res.card.name),
      el('span', { class: 'row-val' }, pct(res.effective), res.effectiveMaybe && res.effectiveMaybe > res.effective ? el('span', { class: 'muted small' }, ` (up to ${pct(res.effectiveMaybe)}*)`) : null)));
    const body = el('div', { class: 'row-body' }, el('div', null, label));
    (res.best ? res.best.notes : []).forEach(n => body.appendChild(el('div', { class: 'muted' }, '• ' + n)));
    if (res.maybe) body.appendChild(el('div', { class: 'muted' }, '• ' + res.maybe.label + ': ' + res.maybe.notes.join('; ')));
    res.tips.forEach(t => body.appendChild(el('div', { class: 'tip' }, '💡 ' + t)));
    res.warnings.forEach(w => body.appendChild(el('div', { class: 'warn-inline' }, '⚠️ ' + w)));
    det.appendChild(body);
    return det;
  }

  function renderCredits() {
    const sec = el('section', { class: 'credits' });
    const items = allCredits();
    const groups = [['Use within 7 days', i => i.days !== null && i.days <= 7], ['Rest of this month', i => i.days !== null && i.days > 7 && i.days <= daysUntil(endOfMonth(new Date()))], ['This quarter', i => i.days !== null && i.days > daysUntil(endOfMonth(new Date())) && i.days <= daysUntil(endOfQuarter(new Date()))], ['Later this year', i => i.days !== null && i.days > daysUntil(endOfQuarter(new Date()))], ['Cardmember-year credits', i => i.days === null]];
    sec.appendChild(el('h2', null, 'Credits expiring'));
    sec.appendChild(el('p', { class: 'hint' }, 'Unused credits reset on these dates. Nothing here tracks whether you already used them; it is a calendar of deadlines.'));
    for (const [title, filt] of groups) {
      const rows = items.filter(filt);
      if (!rows.length) continue;
      const g = el('div', { class: 'group' }, el('h3', null, title));
      rows.forEach(i => g.appendChild(el('details', { class: 'credit-row' },
        el('summary', null, el('span', { class: 'credit-amt' }, money(i.credit.amount)), el('span', { class: 'credit-name' }, cname(i.credit)), el('span', { class: 'credit-card muted' }, i.card.shortName || i.card.name), el('span', { class: 'credit-when' }, i.deadline ? fmtDate(i.deadline) : '')),
        el('div', { class: 'credit-body' },
          el('div', null, `${i.credit.period.replace('-', ' ')}${i.credit.schedule ? ' · ' + i.credit.schedule : ''}`),
          i.credit.merchants && i.credit.merchants.length ? el('div', null, 'Where: ' + i.credit.merchants.join(', ')) : null,
          i.credit.howToUse ? el('div', null, i.credit.howToUse) : null,
          i.credit.enrollmentRequired ? el('div', { class: 'warn-inline' }, 'Enrollment required in the card account before use.') : null))));
      sec.appendChild(g);
    }
    // Discover quarter
    const disc = App.data.cards.find(c => c.rotating);
    if (disc) {
      const { current, next } = currentQuarter(disc);
      const g = el('div', { class: 'group' }, el('h3', null, `${disc.shortName || disc.name} 5% categories`));
      g.appendChild(el('div', { class: 'card-box' },
        el('div', null, el('strong', null, 'This quarter: '), current ? `${current.categories.join(', ')} (${current.start} to ${current.end})` : 'calendar not loaded for the current quarter'),
        current && current.notes ? el('div', { class: 'muted' }, current.notes) : null,
        el('div', null, el('strong', null, 'Next quarter: '), next ? `${next.categories.join(', ')} (from ${next.start})` : 'not yet announced'),
        el('div', { class: 'muted' }, `Activate each quarter. Cap ${money(disc.rotating.capPerQuarter)} of spend per quarter, then 1%.`)));
      sec.appendChild(g);
    }
    return sec;
  }

  function renderCards() {
    const sec = el('section', { class: 'cards' }, el('h2', null, 'Your cards'));
    for (const c of App.data.cards) {
      const det = el('details', { class: 'card-det' });
      det.appendChild(el('summary', null, el('span', { class: 'row-name', style: `--accent:${c.color || '#94a3b8'}` }, el('span', { class: 'swatch' }), c.name), el('span', { class: 'muted small' }, `${netName(c.network)} · ${c.annualFee ? money(c.annualFee) + '/yr' : 'no fee'}${c.foreignTransactionFee ? ' · ' + c.foreignTransactionFee + '% FTF' : ' · no FTF'}`)));
      const body = el('div', { class: 'card-body' });
      body.appendChild(el('h4', null, 'Earning'));
      const tbl = el('table', { class: 'earn' });
      (c.earning || []).slice().sort((a, b) => ruleValue(c, b).value - ruleValue(c, a).value).forEach(r => tbl.appendChild(el('tr', null, el('td', null, describeRate(c, r)), el('td', null, (r.categories || [r.category]).map(x => (App.data.categories[x] || {}).label || x).join(', '), r.conditions ? el('div', { class: 'muted small' }, r.conditions) : null, r.cap ? el('div', { class: 'muted small' }, 'Cap ' + money(r.cap.amount) + ' per ' + r.cap.period) : null), el('td', { class: 'muted' }, pct(ruleValue(c, r).value)))));
      (c.merchantRates || []).forEach(r => tbl.appendChild(el('tr', null, el('td', null, describeRate(c, r)), el('td', null, r.merchant, r.conditions ? el('div', { class: 'muted small' }, r.conditions) : null), el('td', { class: 'muted' }, pct(ruleValue(c, r).value)))));
      body.appendChild(tbl);
      if (c.rotating) { const { current } = currentQuarter(c); body.appendChild(el('div', { class: 'muted' }, 'Rotating 5% this quarter: ' + (current ? current.categories.join(', ') : 'n/a'))); }
      body.appendChild(el('div', { class: 'muted small' }, 'Points valued at ' + cpp(c.currency.id) + '¢ each (' + c.currency.name + '). ' + (c.currency.redemption || '')));
      if ((c.credits || []).length) { body.appendChild(el('h4', null, 'Credits')); (c.credits).forEach(cr => body.appendChild(el('div', { class: 'li' }, el('strong', null, `${money(cr.amount)} ${cname(cr)}`), ` — ${cr.period.replace('-', ' ')}${cr.schedule ? '; ' + cr.schedule : ''}${cr.enrollmentRequired ? '; enroll first' : ''}`, cr.howToUse ? el('div', { class: 'muted small' }, cr.howToUse) : null))); }
      const prots = Object.entries(c.protections || {}).filter(([k, v]) => v && v.has);
      body.appendChild(el('h4', null, 'Protections'));
      if (prots.length) prots.forEach(([k, v]) => body.appendChild(el('div', { class: 'li' }, el('strong', null, PROT_LABEL[k] || k), ' — ', protSummary(v) || 'included', v.notes ? el('div', { class: 'muted small' }, v.notes) : null)));
      else body.appendChild(el('div', { class: 'muted' }, 'No purchase or travel protections.'));
      if ((c.perks || []).length) { body.appendChild(el('h4', null, 'Other perks')); c.perks.forEach(p => body.appendChild(el('div', { class: 'li' }, el('strong', null, p.name), p.details ? ' — ' + p.details : ''))); }
      if ((c.gotchas || []).length) { body.appendChild(el('h4', null, 'Gotchas')); c.gotchas.forEach(g => body.appendChild(el('div', { class: 'li' }, '• ' + g))); }
      if ((c.recentChanges || []).length) { body.appendChild(el('h4', null, 'Recent changes')); c.recentChanges.forEach(g => body.appendChild(el('div', { class: 'li muted small' }, '• ' + g))); }
      if ((c.sources || []).length) body.appendChild(el('details', { class: 'sources' }, el('summary', null, 'Sources'), c.sources.map(s => el('div', null, el('a', { href: s, target: '_blank', rel: 'noopener' }, s.replace(/^https?:\/\//, '').slice(0, 70))))));
      det.appendChild(body);
      sec.appendChild(det);
    }
    return sec;
  }

  function renderSettings() {
    const p = profile();
    const sec = el('section', { class: 'settings' }, el('h2', null, 'Settings'));
    sec.appendChild(el('p', { class: 'hint' }, 'Point values (cents per point) drive every ranking. Defaults come from data/profile.json in your GitHub repo and apply on all devices; changes made here are saved on this device only.'));
    const vals = el('div', { class: 'vals' });
    const currencies = App.data.currencies;
    for (const [id, def] of Object.entries(currencies)) {
      const inp = el('input', { type: 'number', step: '0.05', min: '0', value: p.valuations[id] !== undefined ? p.valuations[id] : 1, onchange: (e) => { App.settings.valuations = App.settings.valuations || {}; App.settings.valuations[id] = Number(e.target.value); saveSettings(); } });
      vals.appendChild(el('label', { class: 'val' }, el('span', null, el('strong', null, def.name), def.note ? el('span', { class: 'muted small' }, ' ' + def.note) : null), el('span', { class: 'val-in' }, inp, el('span', { class: 'muted' }, '¢'))));
    }
    sec.appendChild(vals);
    const bools = [['primeMember', 'I have an active Amazon Prime membership (Prime Visa 5%)'], ['discoverActivates', 'I activate Discover 5% categories every quarter']];
    for (const [k, label] of bools) sec.appendChild(el('label', { class: 'toggle block' }, el('input', { type: 'checkbox', checked: p[k] !== false, onchange: (e) => { App.settings[k] = e.target.checked; saveSettings(); } }), ' ' + label));
    sec.appendChild(el('button', { class: 'btn', onclick: () => { App.settings = {}; saveSettings(); render(); } }, 'Reset to repo defaults'));
    const meta = App.data.meta || {};
    sec.appendChild(el('div', { class: 'about' }, el('h3', null, 'About the data'),
      el('div', null, `Benefits data as of ${meta.dataAsOf || '—'}. ${meta.nextUpdate ? 'Next scheduled refresh: ' + meta.nextUpdate + '.' : ''}`),
      el('div', { class: 'muted small' }, 'Sources are the issuers\' official card pages, rewards terms and guides to benefits, listed per card under the Cards tab. Targeted offers (Amex Offers, Chase Offers, Discover Deals) are not included. Always confirm a credit\'s terms in your card account before relying on it.'),
      meta.repo ? el('div', null, el('a', { href: meta.repo, target: '_blank', rel: 'noopener' }, 'Data repository')) : null));
    return sec;
  }

  // ---------- boot ----------
  async function boot() {
    try { await loadAll(); }
    catch (e) { root().innerHTML = `<div class="error">Could not load card data (${e.message}). If you are offline, open the app once while online.</div>`; return; }
    const params = new URLSearchParams(location.search);
    if (params.get('q')) { App.state.query = params.get('q'); App.state.resolved = resolve(App.state.query); }
    render();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
  }
  document.addEventListener('DOMContentLoaded', boot);
  App.resolve = resolve; App.recommend = recommend; App.allCredits = allCredits;
  window.WhichCard = App; // for debugging in the console
})();
