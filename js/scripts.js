// Import Firestore dari firebase.js
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { db } from './firebase.js'; // Mengimpor konfigurasi Firebase
import { collection, query, where, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Metode Firestore

const auth = getAuth();

// Fungsi untuk login
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login berhasil:", userCredential.user);
  } catch (error) {
    console.error("Gagal login:", error.message);
  }
};

// Fungsi untuk mendapatkan data tugas berdasarkan ID pengguna
const fetchPlayerTasks = async (playerId) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("playerId", "==", playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Gagal mengambil tugas:", error);
    return [];
  }
};

// Mendengarkan status login pengguna
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Pengguna masuk:", user.uid);
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    // Ambil data pemain dan tugas
    const tasks = await fetchPlayerTasks(user.uid);
    renderTasks(tasks);

    // Render informasi pemain
    document.getElementById('player-id').innerText = user.uid;
    document.getElementById('player-name').innerText = user.displayName || "Anonim";
    // Tambahkan data lainnya jika ada
  } else {
    console.log("Pengguna belum masuk.");
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
  }
});

// Event untuk login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  await loginUser(email, password);
});

// Fungsi untuk merender tugas
const renderTasks = (tasks) => {
  const container = document.querySelector('.card-container');
  container.innerHTML = ''; // Hapus kartu sebelumnya
  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${task.img}" alt="Badge">
      <h3>${task.title}</h3>
      <a href="#" class="read-btn">Pelajari</a>
    `;
    container.appendChild(card);
  });
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
  const cardsPerPage = 8; // Jumlah kartu per halaman
  let currentPage = 0; // Halaman saat ini dimulai dari 0

  // Ambil data tugas dari Firestore
  const allTasks = await getTasks();

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

  // Event untuk tombol halaman sebelumnya
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
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
