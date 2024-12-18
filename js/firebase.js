// firebase.js
// Mengimpor modul Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAw6mmGUrDyFiVoRdejZZJ7U_Cp7Od-8aI",
  authDomain: "dipayang-quest.firebaseapp.com",
  projectId: "dipayang-quest",
  storageBucket: "dipayang-quest.appspot.com", // Dikoreksi agar sesuai dengan format Firebase Storage
  messagingSenderId: "769511051480",
  appId: "1:769511051480:web:76606871be7200ce3047ad",
  measurementId: "G-BEP9KDRTCG"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore untuk database
const db = getFirestore(app);

// Inisialisasi Storage untuk file seperti gambar atau dokumen
const storage = getStorage(app);

// Inisialisasi Firebase Auth
const auth = getAuth();

// Fungsi untuk login dengan email dan password
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Login berhasil!", user.uid); // UID pemain yang unik
    return user.uid; // Mengembalikan UID pemain
  } catch (error) {
    console.error("Login gagal", error);
    return null;
  }
};

// Mengekspor modul Firebase agar bisa digunakan di file lain
export { db, storage, auth };

// Fungsi untuk mengambil semua pertanyaan dari Firestore
export const fetchQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, "Questions"));
  let questions = [];
  querySnapshot.forEach((doc) => {
    questions.push(doc.data());
  });
  return questions;
};

// Fungsi untuk memperbarui progress pemain
export const updatePlayerProgress = async (userId, progress) => {
  const userDocRef = doc(db, "Users", userId);
  await updateDoc(userDocRef, progress);
};
