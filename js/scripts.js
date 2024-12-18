// Import Firestore dari firebase.js
import { db } from './firebase.js'; // Mengimpor konfigurasi Firebase
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Metode Firestore
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Fungsi untuk mendapatkan data tugas berdasarkan ID pemain
const fetchPlayerTasks = async (playerId) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("playerId", "==", playerId));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderTasks(tasks); // Render tugas ke UI
  } catch (error) {
    console.error("Gagal mengambil tugas pemain:", error);
  }
};

const auth = getAuth();

// Fungsi untuk login pengguna
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login berhasil:", userCredential.user);
  } catch (error) {
    console.error("Gagal login:", error.message);
  }
};

// Mendengarkan status login
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Pengguna masuk:", user.uid);
    fetchPlayerTasks(user.uid); // Ambil tugas berdasarkan ID pengguna
  } else {
    console.log("Pengguna belum masuk.");
    // Redirect ke halaman login jika diperlukan
    window.location.href = "login.html";
  }
});

// Fungsi untuk menambahkan atau memperbarui data pemain
const addOrUpdatePlayer = async (player) => {
  try {
    const playerRef = doc(db, "players", player.id); // ID pemain sebagai referensi dokumen
    await setDoc(playerRef, player, { merge: true }); // Menambahkan atau memperbarui data pemain
    console.log(`Pemain dengan ID ${player.id} berhasil ditambahkan atau diperbarui.`);
  } catch (error) {
    console.error("Gagal menambahkan atau memperbarui data pemain:", error);
  }
};

// Fungsi untuk mendapatkan data pemain berdasarkan ID
const getPlayerData = async (playerId) => {
  try {
    const playerRef = doc(db, "players", playerId);
    const playerDoc = await getDoc(playerRef);
    if (playerDoc.exists()) {
      return playerDoc.data();
    } else {
      console.log("Data pemain tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data pemain:", error);
    return null;
  }
};

// Fungsi untuk menambah tugas ke Firestore
const addTask = async (task) => {
  try {
    await addDoc(collection(db, "tasks"), task);
    console.log(`Tugas \"${task.title}\" berhasil ditambahkan.`);
  } catch (error) {
    console.error("Gagal menambahkan tugas:", error);
  }
};

// Fungsi untuk mengambil data tugas dari Firestore
const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
    return [];
  }
};

// Inisialisasi data tugas contoh (hanya digunakan untuk pengisian awal)
const sampleTasks = [
        { img: "assets/icon/gamechapter1.jpg", title: "Petani Aseters" },
        { img: "assets/icon/gamechapter2.jpg", title: "Gelombang Aset Tani" },
        { img: "assets/icon/gamechapter3.jpg", title: "Menghias Aset Tani" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
        { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge2.png", title: "Judul Tugas 2" },
        { img: "assets/badges/merigi_badge3.png", title: "Judul Tugas 3" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
        { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge2.png", title: "Judul Tugas 2" },
        { img: "assets/badges/merigi_badge3.png", title: "Judul Tugas 3" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
        { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge2.png", title: "Judul Tugas 2" },
        { img: "assets/badges/merigi_badge3.png", title: "Judul Tugas 3" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
        { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" }
];

// Menambah data tugas contoh ke Firestore (Hanya jika belum ada data)
// sampleTasks.forEach(addTask); // Uncomment baris ini jika ingin menambahkan data contoh

// Event DOMContentLoaded untuk menjalankan kode setelah halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.card-container'); // Kontainer kartu tugas
  const prevBtn = document.getElementById('prev-btn'); // Tombol halaman sebelumnya
  const nextBtn = document.getElementById('next-btn'); // Tombol halaman berikutnya
  const playerInfo = document.querySelector('.player-info'); // Elemen untuk menampilkan data pemain
  const cardsPerPage = 8; // Jumlah kartu per halaman
  let currentPage = 0; // Halaman saat ini dimulai dari 0

  // Ambil data tugas dari Firestore
  const allTasks = await getTasks();

 // Ambil data pemain dari Firestore (misalnya ID pemain disimpan dalam variabel playerId)
  const playerId = "player123"; // Ganti dengan ID pemain yang sesuai
  const playerData = await getPlayerData(playerId);

  if (playerData) {
    // Menampilkan informasi pemain
    playerInfo.innerHTML = `
      <p>ID Pemain: ${playerData.id}</p>
      <p>Nama Pemain: ${playerData.name}</p>
      <p>Level: ${playerData.level}</p>
      <p>XP: ${playerData.xp} / 1000</p>
      <p>DIPAYANG Tokens: ${playerData.dipayangTokens}</p>
      <p>Nyawa: ❤️❤️❤️</p>
      <p>Badges: ${playerData.badges.join(', ')}</p>
      <p>Sertifikat: ${playerData.certificates.join(', ')}</p>
      <p>History Permainan: ${playerData.gameHistory.join(', ')}</p>
    `;
  } else {
    // Jika data pemain tidak ada, tampilkan pesan default
    playerInfo.innerHTML = `
      <p>ID Pemain: -</p>
      <p>Nama Pemain: -</p>
      <p>Level: -</p>
      <p>XP: 0 / 1000</p>
      <p>DIPAYANG Tokens: 0</p>
      <p>Nyawa: ❤️❤️❤️</p>
      <p>Badges: -</p>
      <p>Sertifikat: -</p>
      <p>History Permainan: -</p>
    `;
  }
  
  // Fungsi untuk merender kartu tugas
  const renderCards = () => {
    container.innerHTML = ''; // Bersihkan kartu sebelumnya
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleTasks = allTasks.slice(start, end);

    visibleTasks.forEach((task, index) => {
      const card = document.createElement('div');
      card.className = 'card game-card'; // Tambahkan class game-card untuk event click
      card.dataset.game = index % 2 === 0 ? 'game1' : 'game2'; // Contoh data-game (game1/game2)
      card.innerHTML = `
        <img src="${task.img}" alt="Badge">
        <h3>${task.title}</h3>
        <a href="#" class="read-btn">Pelajari</a>
      `;
      container.appendChild(card);
    });

    // Perbarui status tombol pagination
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= Math.ceil(allTasks.length / cardsPerPage) - 1;

    // Tambahkan event click untuk game-card
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const game = card.dataset.game; // Ambil nilai data-game

        // Redirect ke halaman sesuai dengan game
        if (game === "game1") {
          window.location.href = "game1.html";
        } else if (game === "game2") {
          window.location.href = "game2.html";
        }
      });
    });
  };

  // Event untuk tombol halaman berikutnya
  nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(allTasks.length / cardsPerPage) - 1) {
      currentPage++;
      renderCards();
    }
  });

  // Event untuk tombol halaman berikutnya
  nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(allTasks.length / cardsPerPage) - 1) {
      currentPage++;
      renderCards();
    }
  });

  // Render awal kartu tugas
  renderCards();
});

const renderTasks = (tasks) => {
  const container = document.querySelector('.card-container');
  container.innerHTML = ''; // Hapus konten sebelumnya

  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${task.img}" alt="Task Image">
      <h3>${task.title}</h3>
      <a href="#" class="read-btn">Pelajari</a>
    `;
    container.appendChild(card);
  });
};

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginUser(email, password);
});
