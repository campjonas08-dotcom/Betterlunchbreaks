/* Hypothetical hall scanner scenarios; no campus feed is connected. */
window.Dining = (() => {
  const scenarios = {
    quiet: {label: 'Between classes', entries: 370, exits: 290, arrivals: 3},
    lunch: {label: 'Lunch building', entries: 465, exits: 324, arrivals: 7},
    rush: {label: 'Lunch rush', entries: 720, exits: 366, arrivals: 12}
  };
  function estimate(entries, exits, capacity, stay, arrivals) {
    const inside = Math.max(0, entries - exits);
    const seated = Math.min(capacity, inside), queue = Math.max(0, inside - capacity);
    const turnover = capacity / stay;
    const wait = inside < capacity ? 0 : Math.ceil((queue + 1) / turnover);
    const open = capacity - seated;
    const range = open === 0 ? 'Near capacity' : `${Math.max(0, Math.floor((open - 10) / 10) * 10)}–${Math.min(capacity, Math.ceil((open + 10) / 10) * 10)}`;
    return {inside, seated, queue, wait, open, range, occupancy: seated / capacity,
      forecast: [15, 30].map(minutes => {
        const people = Math.max(0, inside + (arrivals - Math.min(inside / stay, turnover)) * minutes);
        return {minutes, wait: people < capacity ? 0 : Math.ceil((people - capacity + 1) / turnover)};
      })};
  }
  return {scenarios, estimate};
})();
