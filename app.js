(() => {
  'use strict';
  const model = window.DiningDemo;
  const key = 'better-lunch-breaks-v1';
  const $ = id => document.getElementById(id);
  let checkin = null;
  let activeTable = null;
  let storageAvailable = true;
  try {const stored = JSON.parse(localStorage.getItem(key)); if (model.isValidCheckin(stored)) checkin = stored;} catch {storageAvailable = false;}
  function announce(message) {$('status').textContent = message;}
  function save() {
    try {localStorage.setItem(key, JSON.stringify(checkin)); storageAvailable = true;}
    catch {storageAvailable = false;}
    return storageAvailable ? '' : ' Browser storage is unavailable; this check-in will not survive a refresh.';
  }
  function seatButton(seat, inDialog) {
    const mine = checkin === seat.id;
    const taken = seat.taken || mine;
    const button = document.createElement('button');
    button.className = `seat ${mine ? 'mine' : taken ? 'taken' : 'available'}`;
    button.textContent = `${mine ? '✓' : taken ? '×' : '○'} ${seat.id.split('-')[1]}`;
    button.setAttribute('aria-label', `Seat ${seat.id}, ${mine ? 'your seat' : taken ? 'taken' : 'open'}`);
    button.dataset.seat = seat.id;
    button.addEventListener('click', () => {
      if (inDialog) reserve(seat.id);
      else openTable(seat.id.split('-')[0]);
    });
    return button;
  }
  function render() {
    const counts = model.counts(checkin);
    $('open-count').textContent = counts.open;
    $('filled-count').textContent = counts.filled;
    $('forecast-open').textContent = counts.open;
    $('meter-fill').style.width = `${counts.filled / model.total * 100}%`;
    $('section-count').textContent = `${counts.sectionTotal - counts.sectionFilled} of ${counts.sectionTotal} seats open`;
    $('tables').replaceChildren(...model.tables.map(table => {
      const card = document.createElement('div'); card.className = 'table-card';
      const label = document.createElement('button'); label.className = 'table-name'; label.textContent = `Table ${table.id}`;
      label.addEventListener('click', () => openTable(table.id)); card.append(label);
      const seats = document.createElement('div'); seats.className = 'table-seats';
      table.seats.forEach(s => seats.append(seatButton(s, false))); card.append(seats); return card;
    }));
    $('my-seat').hidden = !checkin;
    $('my-seat-label').textContent = checkin ? `The Edge · Table ${checkin.split('-')[0]} · Seat ${checkin.split('-')[1]}` : '';
    if (activeTable) renderTable();
  }
  function renderTable() {
    const table = model.tables.find(t => t.id === activeTable);
    $('table-title').textContent = `The Edge · Table ${table.id}`;
    $('table-seats').replaceChildren(...table.seats.map(s => seatButton(s, true)));
  }
  function selectHall(id) {
    document.querySelectorAll('[data-hall]').forEach(b => {
      const selected = b.dataset.hall === id; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected));
    });
    $('edge-panel').hidden = id !== 'edge'; $('preview-panel').hidden = id === 'edge';
  }
  function showChart() {$('seating').hidden = false; $('show-chart').setAttribute('aria-expanded', 'true');}
  function openTable(id) {
    selectHall('edge'); showChart();
    const table = model.tables.find(t => t.id === id);
    if (!table) {announce('Invalid table link. Choose a table in the demo seating chart or try a demo scan.'); return;}
    activeTable = id; renderTable(); $('table-status').textContent = '';
    if (!$('table-dialog').open) $('table-dialog').showModal();
  }
  function reserve(id) {
    const seat = model.findSeat(id);
    let message;
    if (checkin === id) message = `You’re already checked in to seat ${id}. Check out when you leave.`;
    else if (checkin) message = `You already have seat ${checkin}. Check out before choosing another seat.`;
    else if (!seat || seat.taken) message = `Seat ${id} is taken. Please choose an open seat marked ○.`;
    else {checkin = id; const warning = save(); render(); $('table-seats').querySelector(`[data-seat="${id}"]`).focus(); message = `You’re checked in to seat ${id}. Enjoy your break! Remember to check out.${warning}`;}
    $('table-status').textContent = message; announce(message);
  }
  document.querySelectorAll('[data-hall]').forEach(b => b.addEventListener('click', () => {selectHall(b.dataset.hall); announce(b.dataset.hall === 'edge' ? 'The Edge selected. All numbers are demo data.' : 'The Village is a preview. The Edge has the interactive demo.');}));
  $('back-edge').addEventListener('click', () => selectHall('edge'));
  $('show-chart').addEventListener('click', () => {const isOpen = !$('seating').hidden; $('seating').hidden = isOpen; $('show-chart').setAttribute('aria-expanded', String(!isOpen)); if (!isOpen) $('seating').scrollIntoView({block: 'start', behavior: 'smooth'});});
  $('demo-scan').addEventListener('click', () => openTable('A1'));
  $('checkout').addEventListener('click', () => {const previous = checkin; checkin = null; const warning = save(); render(); announce(`Checked out of seat ${previous}. It is open again.${warning}`);});
  $('reset').addEventListener('click', () => {checkin = null; const warning = save(); render(); announce(`Demo reset. 141 of 324 seats filled; 183 open.${warning}`);});
  $('profile').addEventListener('click', () => $('profile-dialog').showModal());
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, a[href], input, select')].filter(el => el.getClientRects().length && !el.disabled);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  }));
  $('table-dialog').addEventListener('close', () => {activeTable = null;});
  // Reflect a second tab's check-out/check-in in this browser, without shared server state.
  window.addEventListener('storage', event => {if (event.key !== key && event.key !== null) return; try {const value = JSON.parse(localStorage.getItem(key)); checkin = model.isValidCheckin(value) ? value : null;} catch {checkin = null;} render(); announce('Demo state updated from another tab in this browser.');});
  model.tables.forEach(table => {const option = document.createElement('option'); option.value = table.id; option.textContent = `Table ${table.id}`; $('sticker-table').append(option);});
  $('sticker-open').addEventListener('click', () => {$('sticker-dialog').showModal();});
  $('generate-sticker').addEventListener('click', () => {
    let url;
    try {url = new URL($('public-url').value); if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error();}
    catch {$('sticker-status').textContent = 'Enter a complete http or https site URL, including its repository path.'; return;}
    url.search = ''; url.hash = ''; url.searchParams.set('table', $('sticker-table').value);
    const qr = qrcode(0, 'M'); qr.addData(url.href); qr.make();
    $('qr').innerHTML = qr.createSvgTag({cellSize: 5, margin: 20, scalable: true});
    const svg = $('qr').querySelector('svg'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Table check-in QR code');
    $('qr-link').href = url.href; $('qr-link').textContent = url.href;
    $('sticker-table-label').textContent = `The Edge · Table ${$('sticker-table').value}`;
    $('sticker').hidden = false; $('print-sticker').hidden = false;
    $('sticker-status').textContent = 'Sticker generated. Test the link on the published site before printing for your pitch.';
  });
  $('print-sticker').addEventListener('click', () => window.print());
  render();
  if (!storageAvailable) announce('Browser storage could not be read. You can try the demo; persistence may be unavailable.');
  const params = new URLSearchParams(location.search);
  if (params.has('table')) openTable(params.get('table'));
})();
