// firebase.js

// Mengimpor modul Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAw6mmGUrDyFiVoRdejZZJ7U_Cp7Od-8aI",
  authDomain: "dipayang-quest.firebaseapp.com",
  projectId: "dipayang-quest",
  storageBucket: "dipayang-quest.appspot.com", 
  messagingSenderId: "769511051480",
  appId: "1:769511051480:web:76606871be7200ce3047ad",
  measurementId: "G-BEP9KDRTCG"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore untuk database
const db = getFirestore(app);

// Inisialisasi Firebase Auth
const auth = getAuth();

// Fungsi login menggunakan akun Google
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Login berhasil:', user);

    // Simpan data pemain ke Firestore jika belum ada
    const userRef = doc(db, 'players', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Jika pemain belum ada, buat dokumen baru
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        level: 1,
        xp: 0,
        tokens: 0,
        lives: 3,
        badges: [],
        certificates: [],
        gameHistory: []
      });
    }

    return user;
  } catch (error) {
    console.error("Login dengan Google gagal:", error);
  }
};

// Fungsi untuk logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Logout berhasil');
  } catch (error) {
    console.error('Logout gagal', error);
  }
};

// Fungsi untuk mengupdate progres pemain
export const updatePlayerProgress = async (userId, xpGained, tokensGained) => {
  try {
    const playerRef = doc(db, 'players', userId);
    const docSnap = await getDoc(playerRef);

    if (docSnap.exists()) {
      const playerData = docSnap.data();
      let newXp = playerData.xp + xpGained;
      let newTokens = playerData.tokens + tokensGained;
      let newLevel = Math.floor(newXp / 1000) + 1;

      // Update data progres pemain
      await updateDoc(playerRef, {
        xp: newXp,
        tokens: newTokens,
        level: newLevel
      });

      // Tambahkan riwayat permainan
      await updateDoc(playerRef, {
        gameHistory: arrayUnion(`Gained ${xpGained} XP and ${tokensGained} tokens`)
      });

      console.log('Progres pemain berhasil diperbarui');
    }
  } catch (error) {
    console.error("Gagal memperbarui progres pemain:", error);
  }
};

// Fungsi untuk mengambil data pemain
export const getPlayerData = async (userId) => {
  try {
    const playerRef = doc(db, 'players', userId);
    const docSnap = await getDoc(playerRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('Data pemain tidak ditemukan');
      return null;
    }
  } catch (error) {
    console.error("Gagal mengambil data pemain:", error);
    return null;
  }
};

// Fungsi untuk memantau status login pengguna
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

// Mengekspor modul Firebase agar bisa digunakan di file lain
export { db, auth };
