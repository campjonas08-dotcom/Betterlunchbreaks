(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const key = 'better-lunch-budget-v2';
  const money = cents => (cents / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  const dateISO = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const today = () => dateISO(new Date());
  const validDate = value => typeof value === 'string' && /^20\d\d-\d\d-\d\d$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00`).getTime()) && dateISO(new Date(`${value}T12:00:00`)) === value;
  const cents = id => Math.round(Number($(id).value) * 100);
  const validMoney = value => Number.isSafeInteger(value) && value >= 0 && value <= 10000000;
  function validBudget(b) {
    return b && validMoney(b.total) && b.total > 0 && validMoney(b.starting) && validMoney(b.reserve) && b.reserve <= b.starting &&
      validDate(b.start) && validDate(b.end) && b.start <= b.end && Array.isArray(b.purchases) &&
      (!b.holidays || (Array.isArray(b.holidays) && b.holidays.every(validDate))) && (!b.dayOverride || (Number.isInteger(b.dayOverride) && b.dayOverride > 0 && b.dayOverride <= 26000)) &&
      b.purchases.every(p => p && typeof p.id === 'string' && validMoney(p.amount) && p.amount > 0 && validDate(p.date) &&
        typeof p.note === 'string' && typeof p.category === 'string') && new Set(b.purchases.map(p => p.id)).size === b.purchases.length;
  }
  let budget = null;
  function load() {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {budget = null; return;}
      const value = JSON.parse(raw);
      if (!validBudget(value)) throw new Error('Invalid budget');
      budget = value;
    } catch {budget = null; $('budget-status').textContent = 'Saved budget could not be read. Set up a budget below; browser storage may be unavailable.';}
  }
  function save(message) {
    try {localStorage.setItem(key, JSON.stringify(budget)); $('budget-status').textContent = message;}
    catch {$('budget-status').textContent = `${message} Browser storage is unavailable; changes will be lost after a refresh.`;}
  }
  function showView(view) {
    document.querySelectorAll('.tracker-view').forEach(panel => {panel.hidden = panel.id !== `view-${view}`;});
    document.querySelectorAll('.tracker-nav [data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
  }
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
  function fillSettings() {
    if (budget) {
      for (const id of ['total', 'starting', 'reserve']) $(id).value = (budget[id] / 100).toFixed(2);
      $('start').value = budget.start; $('end').value = budget.end; $('holidays').value = (budget.holidays || []).join(', '); $('day-override').value = budget.dayOverride || '';
    } else {
      $('start').value = today(); const end = new Date(); end.setDate(end.getDate() + 111); $('end').value = dateISO(end);
    }
  }
  function renderBudget() {
    $('budget-empty').hidden = Boolean(budget); $('budget-summary').hidden = !budget;
    $('log-purchase').disabled = !budget;
    $('export').disabled = !budget || !budget.purchases.length;
    $('history').replaceChildren();
    if (!budget) {const li = document.createElement('li'); li.textContent = 'No purchases yet. Save a budget to get started.'; $('history').append(li); return;}
    const stats = window.BudgetModel.stats(budget, today());
    $('balance').textContent = money(stats.balance); $('daily').textContent = money(stats.daily);
    $('available').textContent = money(stats.available); $('earned').textContent = money(stats.earned);
    $('today-spent').textContent = money(stats.todaySpent); $('projected').textContent = money(Math.max(0, stats.projected));
    $('pace').textContent = stats.available < 0 ? `${money(-stats.available)} ahead of what you’ve earned so far. New school days rebuild your available funds.` :
      stats.elapsed === 0 ? 'Your daily budget starts accruing on the first school day of your term.' :
      stats.remaining === 0 ? 'Your term is complete. Available funds include all earned daily budgets.' :
      `${money(stats.available)} earned and unspent. Suggested today: ${money(stats.target || 0)} to spread it through the rest of your term.`;
    $('term-summary').textContent = `${stats.elapsed} of ${stats.totalDays} school days earned · ${stats.remaining} days left · ${money(budget.reserve)} reserved. Unspent daily funds carry forward.`;
    const percent = stats.totalDays ? stats.elapsed / stats.totalDays * 100 : 0;
    $('budget-meter-fill').style.width = `${percent}%`; document.querySelector('.budget-meter').setAttribute('aria-valuenow', String(Math.round(percent)));
    if (!budget.purchases.length) {const li = document.createElement('li'); li.textContent = 'No purchases logged yet.'; $('history').append(li);}
    for (const purchase of [...budget.purchases].reverse()) {
      const li = document.createElement('li'), text = document.createElement('div'), title = document.createElement('strong'), detail = document.createElement('small');
      title.textContent = purchase.note || purchase.category; detail.textContent = `${purchase.date} · ${purchase.category}`;
      text.append(title, detail); const amount = document.createElement('span'); amount.textContent = `−${money(purchase.amount)}`;
      const remove = document.createElement('button'); remove.className = 'text-button'; remove.textContent = 'Remove'; remove.setAttribute('aria-label', `Remove ${purchase.note || purchase.category} ${money(purchase.amount)}`);
      remove.addEventListener('click', () => {budget.purchases = budget.purchases.filter(p => p.id !== purchase.id); save('Purchase removed and balance restored.'); renderBudget();});
      li.append(text, amount, remove); $('history').append(li);
    }
  }
  $('settings-form').addEventListener('submit', event => {
    event.preventDefault();
    const next = {total: cents('total'), starting: cents('starting'), reserve: cents('reserve'), start: $('start').value, end: $('end').value, purchases: budget?.purchases || [], holidays: [...new Set($('holidays').value.split(',').map(d => d.trim()).filter(Boolean))], dayOverride: $('day-override').value ? Number($('day-override').value) : null};
    if (!validBudget(next)) {$('budget-status').textContent = 'Enter valid amounts and term dates from 2000–2099. End must follow start, and reserve cannot exceed starting balance. Check skipped dates and school-day count too.'; return;}
    budget = next; save('Budget saved. Your purchase history is unchanged.'); renderBudget(); showView('overview');
  });
  document.querySelectorAll('[data-amount]').forEach(button => button.addEventListener('click', () => {$('amount').value = button.dataset.amount; $('amount').focus();}));
  $('purchase-form').addEventListener('submit', event => {
    event.preventDefault(); const amount = cents('amount');
    if (!budget) {$('budget-status').textContent = 'Save your term budget before logging a purchase.'; return;}
    const balance = budget.starting - budget.purchases.reduce((sum, p) => sum + p.amount, 0);
    if (!validMoney(amount) || amount <= 0 || amount > balance) {$('budget-status').textContent = 'Enter a positive purchase amount within your remaining balance.'; return;}
    budget.purchases.push({id: crypto.randomUUID(), amount, category: $('category').value, note: $('note').value.trim(), date: today()});
    save(`${money(amount)} purchase logged.`); $('purchase-form').reset(); renderBudget();
  });
  $('export').addEventListener('click', () => {
    if (!budget) return;
    // Prefix spreadsheet formula characters in user-supplied cells.
    const cell = value => `"${String(value).replace(/^[=+@\-\t\r]/, "'$&").replaceAll('"', '""')}"`;
    const rows = [['Date', 'Category', 'Note', 'Amount'], ...budget.purchases.map(p => [p.date, p.category, p.note, (p.amount / 100).toFixed(2)])];
    const url = URL.createObjectURL(new Blob([rows.map(row => row.map(cell).join(',')).join('\r\n')], {type: 'text/csv;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'dining-dollars.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  window.addEventListener('storage', event => {if (event.key === key || event.key === null) {load(); fillSettings(); renderBudget();}});
  load(); fillSettings(); renderBudget();
  document.addEventListener('visibilitychange', () => {if (!document.hidden) renderBudget();});
})();
