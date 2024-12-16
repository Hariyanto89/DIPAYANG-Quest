// Import Firestore dari firebase.js
import { db } from './firebase.js'; // Mengimpor konfigurasi Firebase
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Metode Firestore

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
  const container = document.querySelector('.card-container'); // Kontainer untuk kartu tugas
  const prevBtn = document.getElementById('prev-btn'); // Tombol untuk halaman sebelumnya
  const nextBtn = document.getElementById('next-btn'); // Tombol untuk halaman berikutnya
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

    visibleTasks.forEach((task) => {
      const card = document.createElement('div');
      card.className = 'card';
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
