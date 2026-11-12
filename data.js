/* Fixed example numbers for a typical dining day. */
window.Dining = {
  capacity: 324,
  day: [
    {time:'7:00 AM', minute:420, people:64}, {time:'8:00 AM', minute:480, people:104},
    {time:'9:00 AM', minute:540, people:199}, {time:'9:30 AM', minute:570, people:219},
    {time:'10:00 AM', minute:600, people:189}, {time:'10:30 AM', minute:630, people:139},
    {time:'11:00 AM', minute:660, people:194}, {time:'11:30 AM', minute:690, people:284},
    {time:'12:00 PM', minute:720, people:309}, {time:'12:30 PM', minute:750, people:299},
    {time:'1:00 PM', minute:780, people:279}, {time:'2:00 PM', minute:840, people:134},
    {time:'3:00 PM', minute:900, people:79}, {time:'4:00 PM', minute:960, people:129},
    {time:'5:00 PM', minute:1020, people:229}, {time:'5:30 PM', minute:1050, people:254},
    {time:'6:00 PM', minute:1080, people:214}, {time:'7:00 PM', minute:1140, people:119},
    {time:'8:00 PM', minute:1200, people:54}
  ]
};
// Every displayed current value comes from one rounded occupancy snapshot.
window.Dining.snapshot = function(minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  const anchors = [{minute:0,people:0}, {minute:360,people:0}, ...this.day, {minute:1260,people:0}, {minute:1440,people:0}];
  const right = anchors.findIndex(point => point.minute > time);
  const a = anchors[right-1], b = anchors[right];
  const people = Math.max(0, Math.min(this.capacity, Math.round(a.people+(b.people-a.people)*(time-a.minute)/(b.minute-a.minute))));
  return {people, open:this.capacity-people, full:Math.round(people/this.capacity*100), wait:Math.min(10,Math.round(10*Math.pow(people/309,3)))};
};
window.Dining.auburnMinute = function(date) {
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
  return Number(parts.find(p=>p.type==='hour').value)*60+Number(parts.find(p=>p.type==='minute').value);
};
