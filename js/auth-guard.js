import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.currentUser=null;

onAuthStateChanged(auth,async u=>{
 if(!u) return location.href="index.html";
 let s=await getDoc(doc(db,"users",u.uid));
 window.currentUser={uid:u.uid,...s.data()};

 document.dispatchEvent(new Event("auth-ready"));
});
