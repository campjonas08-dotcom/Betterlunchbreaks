(() => {
  const $ = id => document.getElementById(id), day = window.Dining.day;
  day.forEach((slot, i) => {const option=document.createElement('option'); option.value=i; option.textContent=slot.time; $('dining-time').append(option);});
  $('dining-time').value='8';
  function render() {
    const index=Number($('dining-time').value), s=day[index], lunch=index>=7&&index<=10;
    $('wait-count').textContent=s.wait;
    $('open-count').textContent=`${Math.max(0,s.open-10)}–${s.open+10}`;
    $('wait-detail').textContent=lunch?'The busiest stretch of the day.':s.wait>=10?'A mealtime crowd is settling in.':'A quieter time to grab a meal.';
    $('crowd').textContent=lunch?'Lunch rush':s.wait>=10?'Mealtime peak':'Plenty of breathing room';
    const full=Math.round((324-s.open)/324*100); $('meter-fill').style.width=`${full}%`; $('occupancy').textContent=`About ${full}% full`;
    $('recommendation-title').textContent=s.wait>=18?'Tight schedule? Come after 1.':s.wait>=10?'Leave a little extra time.':'A good time for a quick lunch.';
    $('recommendation-copy').textContent=s.wait>=18?'Lunch is busiest from 11:30 AM to 1 PM. Try 2 PM for a shorter wait.':s.wait>=10?'Breakfast peaks around 9–10 AM, and dinner around 5–6 PM. Plan your break around the crowd.':'Find a spot, enjoy your food, and head back to class without the rush.';
    $('forecast').replaceChildren(...day.slice(index, index+3).map((slot,i)=>{
      const row=document.createElement('div'); if(!i)row.className='forecast-now';
      const label=document.createElement('span');label.textContent=slot.time;
      const value=document.createElement('strong');value.textContent=`~${slot.wait}`;
      const unit=document.createElement('small');unit.textContent='min wait';row.append(label,value,unit);return row;
    }));
    document.querySelectorAll('.rush-column').forEach((bar,i)=>{bar.classList.toggle('selected-time',i===index);});
  }
  $('rush-chart').replaceChildren(...day.map((slot,i)=>{
    const column=document.createElement('button');column.type='button';column.className=`rush-column ${i>=7&&i<=10?'lunch-peak':slot.wait>=10?'meal-peak':''}`;
    column.setAttribute('aria-label',`${slot.time}, ${slot.wait} minute wait`);
    const bar=document.createElement('span');bar.className='rush-bar';bar.style.height=`${slot.wait*5}px`;
    const value=document.createElement('strong');value.textContent=slot.wait;bar.append(value);
    const label=document.createElement('span');label.textContent=slot.time.replace(':00','').replace(' AM','a').replace(' PM','p');
    column.append(bar,label);column.addEventListener('click',()=>{$('dining-time').value=i;render();});return column;
  }));
  $('dining-time').addEventListener('change',render);render();
})();
