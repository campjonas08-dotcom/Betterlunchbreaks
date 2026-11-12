(() => {
  const $ = id => document.getElementById(id);
  function render() {
    const s = window.Dining.scenarios[$('scenario').value];
    $('wait-count').textContent = s.wait; $('open-count').textContent = s.range;
    $('wait-detail').textContent = s.wait < 5 ? 'A quick stop between classes.' : s.wait > 12 ? 'Give yourself a little more time.' : 'Lunch is picking up.';
    $('crowd').textContent = s.crowd; $('meter-fill').style.width = `${s.occupancy * 100}%`;
    $('occupancy').textContent = `About ${Math.round(s.occupancy * 100)}% full`;
    $('recommendation-title').textContent = s.tip; $('recommendation-copy').textContent = s.copy;
    $('forecast').replaceChildren(...[s.wait, ...s.next].map((wait, i) => {
      const row = document.createElement('div'); row.className = i === 0 ? 'forecast-now' : '';
      const label = document.createElement('span'); label.textContent = ['Now', 'In 15 min', 'In 30 min'][i];
      const value = document.createElement('strong'); value.textContent = `~${wait}`;
      const unit = document.createElement('small'); unit.textContent = 'min wait'; row.append(label, value, unit); return row;
    }));
  }
  $('scenario').addEventListener('change', render); render();
  $('rush-chart').replaceChildren(...window.Dining.trend.map(([time, wait]) => {
    const column = document.createElement('div'); column.className = 'rush-column'; column.setAttribute('role', 'listitem'); column.setAttribute('aria-label', `${time}, ${wait} minute wait`);
    const bar = document.createElement('div'); bar.className = 'rush-bar'; bar.style.height = `${wait * 8}px`;
    const value = document.createElement('strong'); value.textContent = wait;
    const label = document.createElement('span'); label.textContent = time;
    bar.append(value); column.append(bar, label); return column;
  }));
})();
