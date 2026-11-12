(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const key = 'better-lunch-budget-v2';
  const money = cents => (cents / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  const dateISO = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const today = () => dateISO(new Date());
  const validDate = value => typeof value === 'string' && /^20\d\d-\d\d-\d\d$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00`).getTime()) && dateISO(new Date(`${value}T12:00:00`)) === value;
  function weekdays(start, end) {
    let count = 0;
    for (let day = new Date(`${start}T12:00:00`); dateISO(day) <= end; day.setDate(day.getDate() + 1)) {
      if (day.getDay() !== 0 && day.getDay() !== 6) count++;
    }
    return count;
  }
  const cents = id => Math.round(Number($(id).value) * 100);
  const validMoney = value => Number.isSafeInteger(value) && value >= 0 && value <= 10000000;
  function validBudget(b) {
    return b && validMoney(b.total) && b.total > 0 && validMoney(b.starting) && validMoney(b.reserve) && b.reserve <= b.starting &&
      validDate(b.start) && validDate(b.end) && b.start <= b.end && Array.isArray(b.purchases) &&
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
  let scenario = window.Dining.scenarios.lunch;
  function renderDining() {
    const result = window.Dining.estimate(scenario.entries, scenario.exits, 324, 35, scenario.arrivals);
    $('wait-count').textContent = result.wait;
    $('open-count').textContent = result.range;
    $('wait-detail').textContent = result.wait ? 'Allow extra time before a seat opens.' : 'Seating is likely available on arrival.';
    $('crowd').textContent = result.occupancy > .9 ? 'Busy · consider a quieter period' : result.occupancy > .6 ? 'Filling up · allow a little extra time' : 'Room to settle in';
    $('meter-fill').style.width = `${result.occupancy * 100}%`;
    $('occupancy').textContent = `About ${Math.round(result.occupancy * 10) * 10}% of assumed seating in use`;
    $('recommendation-title').textContent = result.wait ? 'Short break? Consider taking food to go.' : 'Have a break? There’s likely room to eat in.';
    $('recommendation-copy').textContent = result.wait ? `The estimated seating wait is about ${result.wait} minutes. Add time for food, walking, and eating.` : 'The seating estimate is low. Leave time to get food and walk back to class.';
    $('scan-summary').textContent = `${scenario.entries} scan-ins − ${scenario.exits} scan-outs = ${result.inside} people inside. Assumed arrivals: ${scenario.arrivals} per minute.`;
    $('forecast').replaceChildren(...[{minutes: 0, wait: result.wait}, ...result.forecast].map(item => {
      const row = document.createElement('div');
      if (!item.minutes) row.className = 'forecast-now';
      const label = document.createElement('span'); label.textContent = item.minutes ? `In ${item.minutes} min` : 'Now';
      const value = document.createElement('strong'); value.textContent = `~${item.wait}`;
      const unit = document.createElement('small'); unit.textContent = 'min wait';
      row.append(label, value, unit); return row;
    }));
  }
  function setScenario() {
    scenario = {...window.Dining.scenarios[$('scenario').value]};
    $('entries').value = scenario.entries; $('exits').value = scenario.exits;
    $('scan-status').textContent = ''; renderDining();
  }
  $('scenario').addEventListener('change', setScenario);
  $('scan-form').addEventListener('submit', event => {
    event.preventDefault();
    const entries = Number($('entries').value), exits = Number($('exits').value);
    if (!Number.isInteger(entries) || !Number.isInteger(exits) || entries < 0 || exits < 0 || entries > 1000000 || exits > entries) {
      $('scan-status').textContent = 'Use whole scan counts, with scan-outs no greater than scan-ins.'; return;
    }
    scenario = {...scenario, entries, exits}; renderDining();
    $('scan-status').textContent = 'Estimate recalculated from your hypothetical scan totals.';
  });
  function fillSettings() {
    if (budget) {
      for (const id of ['total', 'starting', 'reserve']) $(id).value = (budget[id] / 100).toFixed(2);
      $('start').value = budget.start; $('end').value = budget.end;
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
    const spent = budget.purchases.reduce((sum, p) => sum + p.amount, 0);
    const balance = budget.starting - spent;
    const days = weekdays(budget.start > today() ? budget.start : today(), budget.end);
    const daily = days ? Math.floor(Math.max(0, balance - budget.reserve) / days) : 0;
    $('balance').textContent = money(balance); $('daily').textContent = money(daily);
    const totalDays = weekdays(budget.start, budget.end);
    const elapsed = Math.max(0, totalDays - days);
    const allocated = totalDays ? Math.round(Math.max(0, budget.total - budget.reserve) * elapsed / totalDays) : 0;
    const alreadySpent = Math.max(0, budget.total - budget.starting) + spent;
    $('pace').textContent = balance < 0 ? 'Your logged purchases exceed your starting balance. Check your entries.' :
      !days ? 'No weekdays remain in this term. Update your dates to plan your next term.' :
      balance < budget.reserve ? 'Your balance is below your reserve target.' :
      today() < budget.start ? 'Your term has not started. Your weekday allowance is ready for the first day.' :
      `Spending pace: ${alreadySpent > allocated ? `${money(alreadySpent - allocated)} ahead of` : `${money(allocated - alreadySpent)} under`} the weekday plan.`;
    $('term-summary').textContent = `${days} weekdays remaining · ${money(budget.reserve)} reserved · ${budget.start} to ${budget.end}. Weekends excluded; holidays are included.`;
    const percent = Math.max(0, Math.min(100, balance / budget.total * 100));
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
    const next = {total: cents('total'), starting: cents('starting'), reserve: cents('reserve'), start: $('start').value, end: $('end').value, purchases: budget?.purchases || []};
    if (!validBudget(next)) {$('budget-status').textContent = 'Enter valid amounts and term dates from 2000–2099. End must follow start, and reserve cannot exceed starting balance.'; return;}
    budget = next; save('Budget saved. Your purchase history is unchanged.'); renderBudget();
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
  setScenario(); load(); fillSettings(); renderBudget();
})();
