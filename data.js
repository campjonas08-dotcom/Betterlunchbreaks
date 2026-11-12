/* Synthetic data only. Replace this model when a campus pilot has a data source. */
window.DiningDemo = (() => {
  const tables = Array.from({length: 6}, (_, i) => ({
    id: `A${i + 1}`,
    seats: Array.from({length: 4}, (_, j) => ({id: `A${i + 1}-${j + 1}`, taken: (i * 4 + j) % 3 === 0}))
  }));
  const baseSectionFilled = tables.flatMap(t => t.seats).filter(s => s.taken).length;
  return {total: 324, otherSectionFilled: 141 - baseSectionFilled, tables,
    findSeat(id) {return tables.flatMap(t => t.seats).find(s => s.id === id);},
    isValidCheckin(value) {return typeof value === 'string' && Boolean(this.findSeat(value)) && !this.findSeat(value).taken;},
    counts(checkin) {
      const sectionFilled = baseSectionFilled + (this.isValidCheckin(checkin) ? 1 : 0);
      return {filled: this.otherSectionFilled + sectionFilled, open: this.total - this.otherSectionFilled - sectionFilled, sectionFilled, sectionTotal: 24};
    }
  };
})();
