// js/wheel.js
(function(){
  const btn = document.getElementById('btn-spin');
  const listEl = document.getElementById('list');
  const roller = document.getElementById('roller');
  const mask = document.getElementById('mask');
  const result = document.getElementById('result');

  function clearRoller(){ if(roller){ roller.style.transition='none'; roller.style.transform='translateY(0)'; roller.innerHTML=''; } }

  function buildItems(names, repeats){
    const nodes=[]; for(let i=0;i<repeats;i++){ for(const n of names){ const d=document.createElement('div'); d.className='slot-item'; d.textContent=n; nodes.push(d); } }
    nodes.forEach(n=>roller.appendChild(n)); return nodes;
  }

  function spinOnce(){
    const raw = listEl?.value.trim();
    if(!raw) return alert('Nhập tên (mỗi dòng 1 tên)');
    const names = raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    clearRoller();
    const repeats = 12;
    const nodes = buildItems(names,repeats);
    requestAnimationFrame(()=> {
      const itemH = nodes[0].getBoundingClientRect().height;
      const pick = Math.floor(Math.random()*names.length);
      const targetIndex = (repeats-2)*names.length + pick;
      const maskCenter = mask.getBoundingClientRect().height/2;
      const translateY = targetIndex * itemH - maskCenter + (itemH/2);
      roller.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
      roller.style.transform = `translateY(-${translateY}px)`;
      setTimeout(()=>{
        nodes[targetIndex].classList.add('win');
        result.innerText = `🎉 Chúc mừng: ${names[pick]}!`;
      }, 3000);
    });
  }

  if(btn) btn.addEventListener('click', spinOnce);

  // block wheel page if not logged — redirect handled in wheel.html too
  window.Wheel = { spin: spinOnce };
})();
