// forum.js - global forum
import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function startForumRender(boxId, inputId, btnId){
  const box = document.getElementById(boxId);
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if(!box || !input || !btn) return;

  const q = query(collection(db,"global_forum"), orderBy("time","asc"));
  onSnapshot(q, snap=>{
    box.innerHTML = '';
    snap.forEach(d=>{
      const m = d.data();
      const el = document.createElement('div');
      el.style.padding = '6px 0';
      el.innerHTML = `<b>${m.user}</b>: ${m.msg} <small style="color:#888">(${new Date(m.time.seconds*1000).toLocaleString()})</small>`;
      box.appendChild(el);
    });
    box.scrollTop = box.scrollHeight;
  });

  btn.onclick = async ()=>{
    if(!window.currentUser) return alert('Vui lòng đăng nhập');
    const txt = input.value.trim();
    if(!txt) return;
    await addDoc(collection(db,"global_forum"),{ user: window.currentUser.name||window.currentUser.email, msg: txt, time: serverTimestamp() });
    input.value = '';
  };
}
