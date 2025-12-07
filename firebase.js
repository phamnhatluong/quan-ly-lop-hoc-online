// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // Nếu bạn có config riêng hãy thay ở đây
  apiKey: "AIzaSyBc8H5YOYIyQ035kowGn00KdqxK0JzGhlk",
  authDomain: "quan-ly-lop-hoc-14fb6.firebaseapp.com",
  projectId: "quan-ly-lop-hoc-14fb6",
  storageBucket: "quan-ly-lop-hoc-14fb6.appspot.com",
  messagingSenderId: "213036321639",
  appId: "1:213036321639:web:5cd59573cea663e91b7dc2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
