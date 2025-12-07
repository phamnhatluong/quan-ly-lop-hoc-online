// js/panel.js
document.addEventListener("auth-ready", ()=>{
    console.log("📌 Dashboard ready — user đã load");
    initApp();   // gọi hàm khởi chạy chức năng
});

export function updateRoleUI(){
  const role = window.currentUser?.role || null;
  document.getElementById('panel-principal').classList.toggle('hidden', role !== 'principal');
  document.getElementById('panel-teacher').classList.toggle('hidden', role !== 'teacher');
  document.getElementById('panel-student').classList.toggle('hidden', role !== 'student');
}

// expose for direct call from index script
window.UI = window.UI || {};
window.UI.updateRoleUI = updateRoleUI;
window.UI.show = window.UI.show || function(id){ document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden')); document.getElementById(id).classList.remove('hidden'); };
window.UI.toDashboard = window.UI.toDashboard || function(){ if(!window.currentUser) return alert('Vui lòng đăng nhập'); UI.show('panel-dashboard'); };
