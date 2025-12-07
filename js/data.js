// data.js
import { db } from "./firebase.js";
import { doc, getDoc, getDocs, addDoc, updateDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function addSchool(name){
  const ref = await addDoc(collection(db,"schools"),{ name, classes:[], createdAt: serverTimestamp() });
  return ref.id;
}

export async function listSchools(){
  const snaps = await getDocs(collection(db,"schools"));
  return snaps.docs.map(d => ({ id:d.id, ...d.data() }));
}

export async function addClassToSchool(schoolId, className){
  const ref = doc(db,"schools",schoolId);
  const snap = await getDoc(ref);
  if(!snap.exists()) throw new Error('School not found');
  const data = snap.data();
  data.classes = data.classes || [];
  // avoid duplicate
  if(!data.classes.find(c=>c.name === className)){
    data.classes.push({ name: className, teacher: null, students: [] });
    await updateDoc(ref, { classes: data.classes });
  }
  return data.classes;
}

export async function assignTeacher(schoolId, className, teacherEmail){
  const ref = doc(db,"schools",schoolId);
  const snap = await getDoc(ref);
  if(!snap.exists()) throw new Error('School not found');
  const data = snap.data();
  data.classes = data.classes || [];
  const cls = data.classes.find(c=>c.name === className);
  if(!cls) throw new Error('Class not found');
  cls.teacher = teacherEmail;
  await updateDoc(ref, { classes: data.classes });
  return cls;
}

export async function addStudentsBulk(schoolId, className, names){
  const ref = doc(db,"schools",schoolId);
  const snap = await getDoc(ref);
  if(!snap.exists()) throw new Error('School not found');
  const data = snap.data();
  data.classes = data.classes || [];
  const cls = data.classes.find(c=>c.name === className);
  if(!cls) throw new Error('Class not found');
  cls.students = cls.students || [];
  for(const n of names){
    const name = n.trim();
    if(!name) continue;
    if(!cls.students.find(s=>s.name.toLowerCase()===name.toLowerCase())){
      cls.students.push({ name, uid: null, grades: {} });
    }
  }
  await updateDoc(ref, { classes: data.classes });
  return cls.students;
}

export async function addGrade(schoolId, className, studentName, subject, grade){
  const ref = doc(db,"schools",schoolId);
  const snap = await getDoc(ref);
  if(!snap.exists()) throw new Error('School not found');
  const data = snap.data();
  data.classes = data.classes || [];
  const cls = data.classes.find(c=>c.name === className);
  if(!cls) throw new Error('Class not found');
  cls.students = cls.students || [];
  let st = cls.students.find(s=>s.name.toLowerCase()===studentName.toLowerCase());
  if(!st){
    st = { name: studentName, uid: null, grades: {} };
    cls.students.push(st);
  }
  st.grades = st.grades || {};
  if(!st.grades[subject]) st.grades[subject] = [];
  st.grades[subject].push(Number(grade));
  await updateDoc(ref, { classes: data.classes });
  return st.grades;
}
