// js/auth.js
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function register(){
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();  // SỬA: Đúng ID
  const pass = document.getElementById('reg-pass').value.trim();
  const role = document.getElementById('reg-role').value;
  console.log('Register attempt:', { name, email, role });  // DEBUG: Kiểm tra giá trị
  if(!name || !email || !pass) return alert('Nhập đủ thông tin');
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, 'users', cred.user.uid), { name, email, role, created_at: Date.now() });
    alert('Đăng ký thành công!');
    await afterLogin(cred.user);
  }catch(e){
    console.error('Register error:', e.code, e.message);  // DEBUG: Log chi tiết
    if (e.code === 'auth/email-already-in-use') alert('Email đã tồn tại!');
    else if (e.code === 'auth/weak-password') alert('Mật khẩu quá yếu (ít nhất 6 ký tự)!');
    else alert('Lỗi đăng ký: ' + e.message);
  }
}

export async function login(){
  const email = document.getElementById('login-email').value.trim();  // SỬA: Đúng ID
  const pass = document.getElementById('login-pass').value.trim();
  console.log('Login attempt:', { email });  // DEBUG: Kiểm tra giá trị
  if(!email || !pass) return alert('Nhập email & mật khẩu');
  try{
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    await afterLogin(cred.user);
  }catch(e){
    console.error('Login error:', e.code, e.message);  // DEBUG: Log chi tiết
    if (e.code === 'auth/user-not-found') alert('Tài khoản không tồn tại!');
    else if (e.code === 'auth/wrong-password') alert('Mật khẩu sai!');
    else alert('Lỗi đăng nhập: ' + e.message);
  }
}

export async function afterLogin(user){
  try{
    const snap = await getDoc(doc(db, 'users', user.uid));
    if(!snap.exists()) {
      alert('Người dùng không tồn tại trong Firestore – thử đăng ký lại');
      return;
    }
    window.currentUser = { uid: user.uid, ...snap.data() };
    document.getElementById('user-info').innerText = `👤 ${window.currentUser.name} (${window.currentUser.role})`;
    if(window.DATA && typeof window.DATA.loadAll === 'function') await window.DATA.loadAll();
    if(window.UI && typeof window.UI.updateRoleUI === 'function') window.UI.updateRoleUI();
    document.getElementById('page-login').classList.add('hidden');
    document.getElementById('page-dashboard').classList.remove('hidden');
  }catch(e){
    console.error('AfterLogin error:', e);
    alert('Lỗi sau login: ' + e.message);
  }
}