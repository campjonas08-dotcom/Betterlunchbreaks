(() => {
  const $ = id => document.getElementById(id), day = window.Dining.day;
  day.forEach((slot, i) => {const option=document.createElement('option'); option.value=i; option.textContent=slot.time; $('dining-time').append(option);});
  $('dining-time').value='8';
  function render() {
    const index=Number($('dining-time').value), s=day[index], lunch=index>=7&&index<=10;
    $('people-count').textContent=s.people; $('wait-count').textContent=s.wait;
    const open=window.Dining.capacity-s.people;
    $('open-count').textContent=`${Math.max(0,open-10)}–${Math.min(window.Dining.capacity,open+10)}`;
    $('crowd-detail').textContent=lunch?'The busiest stretch of the day.':s.people>=180?'A mealtime crowd is settling in.':'A quieter time to grab a meal.';
    $('crowd').textContent=lunch?'Lunch rush':s.people>=180?'Mealtime peak':'Plenty of breathing room';
    const full=Math.round(s.people/window.Dining.capacity*100); $('meter-fill').style.width=`${full}%`; $('occupancy').textContent=`About ${full}% full`;
    $('recommendation-title').textContent=s.people>=275?'Need a table? Try after the lunch rush.':s.people>=180?'The hall is filling up.':'More room to sit down and settle in.';
    $('recommendation-copy').textContent=s.people>=275?'Lunch is most crowded from 11:30 AM to 1 PM. Come around 2 PM for more open seating.':s.people>=180?'Breakfast peaks around 9–10 AM, and dinner around 5–6 PM. Quieter times give you more choice of tables.':'Fewer people inside means a better chance of finding a table together.';
    $('forecast').replaceChildren(...day.slice(index, index+3).map((slot,i)=>{
      const row=document.createElement('div'); if(!i)row.className='forecast-now';
      const label=document.createElement('span');label.textContent=slot.time;
      const value=document.createElement('strong');value.textContent=String(slot.people);
      const unit=document.createElement('small');unit.textContent='people';row.append(label,value,unit);return row;
    }));
    document.querySelectorAll('.rush-column').forEach((bar,i)=>{bar.classList.toggle('selected-time',i===index);});
  }
  $('rush-chart').replaceChildren(...day.map((slot,i)=>{
    const column=document.createElement('button');column.type='button';column.className=`rush-column ${i>=7&&i<=10?'lunch-peak':slot.people>=180?'meal-peak':''}`;
    column.setAttribute('aria-label',`${slot.time}, ${slot.people} people inside`);
    const bar=document.createElement('span');bar.className='rush-bar';bar.style.height=`${slot.people/window.Dining.capacity*150}px`;
    const value=document.createElement('strong');value.textContent=slot.people;bar.append(value);
    const label=document.createElement('span');label.textContent=slot.time.replace(':00','').replace(' AM','a').replace(' PM','p');
    column.append(bar,label);column.addEventListener('click',()=>{$('dining-time').value=i;render();});return column;
  }));
  $('dining-time').addEventListener('change',render);render();
})();
