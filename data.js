/* Curated sample dining data. */
window.Dining = {
  scenarios: {
    quiet: {wait: 3, range: '210–240', occupancy: .3, crowd: 'Quiet · plenty of room', next: [4, 6], tip: 'A good time to settle in.', copy: 'Grab a meal and enjoy a little breathing room before your next class.'},
    lunch: {wait: 7, range: '50–70', occupancy: .81, crowd: 'Steady · seats available', next: [12, 5], tip: 'Have 25 minutes? Make a lunch of it.', copy: 'Allow about seven minutes before eating, plus time to walk back to class.'},
    rush: {wait: 16, range: '0–20', occupancy: .96, crowd: 'Busy · limited seating', next: [11, 6], tip: 'Short break? Try a little later.', copy: 'The crowd eases after the rush. A to-go meal can help if your next class is close.'}
  },
  trend: [['10:30',3], ['11:00',5], ['11:30',9], ['12:00',16], ['12:30',12], ['1:00',7], ['1:30',4], ['2:00',3]]
};
