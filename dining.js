(() => {
  const $=id=>document.getElementById(id), model=window.Dining;
  const clock=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'2-digit',timeZoneName:'short'});
  function render() {
    const now=new Date(), minute=model.auburnMinute(now), s=model.snapshot(minute), lunch=minute>=690&&minute<=780;
    $('dining-clock').textContent=clock.format(now);$('dining-clock').dateTime=now.toISOString();
    $('people-count').textContent=s.people;$('wait-count').textContent=s.wait;$('open-count').textContent=s.open;
    $('crowd-detail').textContent=lunch?'The busiest stretch of the day.':s.people>=180?'A mealtime crowd is settling in.':'A quieter time to find a table.';
    $('crowd').textContent=lunch?'Lunch rush':s.people>=180?'Mealtime peak':'Plenty of breathing room';
    $('meter-fill').style.width=`${s.full}%`;$('occupancy').textContent=`About ${s.full}% full`;
    $('recommendation-title').textContent=s.people>=275?'Need a table? Try after the lunch rush.':s.people>=180?'The hall is filling up.':'More room to sit down and settle in.';
    $('recommendation-copy').textContent=s.people>=275?'Lunch is most crowded from 11:30 AM to 1 PM. Come around 2 PM for more open seating.':s.people>=180?'Breakfast peaks around 9–10 AM, and dinner around 5–6 PM. Quieter times give you more choice of tables.':'Fewer people inside means a better chance of finding a table together.';
    $('forecast').replaceChildren(...[0,15,30].map(offset=>{
      const row=document.createElement('div');if(!offset)row.className='forecast-now';
      const label=document.createElement('span');label.textContent=offset?`In ${offset} min`:'Now';
      const value=document.createElement('strong');value.textContent=model.snapshot(minute+offset).people;
      const unit=document.createElement('small');unit.textContent='people';row.append(label,value,unit);return row;
    }));
    let closest=0;model.day.forEach((slot,i)=>{if(Math.abs(slot.minute-minute)<Math.abs(model.day[closest].minute-minute))closest=i;});
    document.querySelectorAll('.rush-column').forEach((bar,i)=>bar.classList.toggle('selected-time',i===closest));
  }
  $('rush-chart').replaceChildren(...model.day.map((slot,i)=>{
    const column=document.createElement('div');column.className=`rush-column ${i>=7&&i<=10?'lunch-peak':slot.people>=180?'meal-peak':''}`;
    column.setAttribute('role','listitem');column.setAttribute('aria-label',`${slot.time}, ${slot.people} people inside`);
    const bar=document.createElement('span');bar.className='rush-bar';bar.style.height=`${slot.people/model.capacity*150}px`;
    const value=document.createElement('strong');value.textContent=slot.people;bar.append(value);
    const label=document.createElement('span');label.textContent=slot.time.replace(':00','').replace(' AM','a').replace(' PM','p');
    column.append(bar,label);return column;
  }));
  $('rush-chart').setAttribute('role','list');
  render();setInterval(render,30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
  window.addEventListener('pageshow',render);window.addEventListener('focus',render);
})();
