// firebase.js
// Mengimpor modul Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { loginWithEmailPassword } from './firebase.js';
import { db, auth, storage } from './firebase.js';

console.log("Auth instance:", auth);
try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("Login berhasil:", userCredential.user);
} catch (error) {
  console.error("Login gagal, kode error:", error.code, ", pesan:", error.message);
}

const email = "test@example.com";
const password = "password123";
const userId = await loginWithEmailPassword(email, password);

if (userId) {
  console.log("Login berhasil! User ID:", userId);
} else {
  console.error("Login gagal. Periksa kembali email dan password.");
}

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

// Fungsi untuk mengambil semua tugas dari Firestore
export const getTasksFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    console.error("Gagal mengambil data tugas", error);
    return [];
  }
};

// Fungsi untuk memperbarui progress pemain
export const updatePlayerProgress = async (userId, progress) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    await updateDoc(userDocRef, progress);
    console.log("Progress pemain berhasil diperbarui");
  } catch (error) {
    console.error("Gagal memperbarui progress pemain", error);
  }
};
