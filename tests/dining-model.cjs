const assert=require('node:assert/strict');global.window={};require('../data.js');const model=window.Dining;
let maxWait=0;
for(let minute=0;minute<1440;minute++){
 const s=model.snapshot(minute);
 assert.equal(s.people+s.open,model.capacity);
 assert.ok(Number.isInteger(s.people)&&s.people>=0&&s.people<=324);
 assert.ok(s.wait>=0&&s.wait<=10);maxWait=Math.max(maxWait,s.wait);
}
assert.equal(maxWait,10);
assert.equal(model.snapshot(720).people,309);assert.equal(model.snapshot(720).open,15);
assert.equal(model.snapshot(740).people,302);assert.equal(model.snapshot(740).open,22);
assert.equal(model.snapshot(760).people,292);assert.equal(model.snapshot(760).open,32);
assert.equal(model.auburnMinute(new Date('2026-11-12T18:00:00Z')),720);
assert.equal(model.auburnMinute(new Date('2026-07-12T17:00:00Z')),720);
assert.equal(model.snapshot(1440).people,model.snapshot(0).people);
const byPeople=new Map();for(let m=0;m<1440;m++){const s=model.snapshot(m);if(byPeople.has(s.people))assert.equal(s.open,byPeople.get(s.people));byPeople.set(s.people,s.open);}
console.log('PASS every minute: synchronized occupancy/seats, bounded counts, 10-minute peak wait, interpolation, midnight, Auburn CST/CDT and stable availability for equal occupancy');
