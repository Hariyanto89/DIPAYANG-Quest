// scripts.js
import { db } from './firebase.js'; // Mengimpor Firestore dari firebase.js
import { collection, addDoc, getDocs } from "firebase/firestore"; // Mengimpor metode Firestore

// Fungsi untuk menambah data tugas ke Firestore
const addTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: task.title,
      img: task.img,
    });
    console.log("Tugas berhasil ditambahkan dengan ID:", docRef.id);
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan tugas:", error);
  }
};

// Fungsi untuk mengambil data tugas dari Firestore
const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
  }
};

// Menambah beberapa tugas ke Firestore sebagai contoh
const tasks = [
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
// Menambah tugas-tugas tersebut ke Firestore
tasks.forEach(task => {
  addTask(task);
});

// Event untuk mengambil dan menampilkan tugas setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.card-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const cardsPerPage = 16;
  let currentPage = 0;

  // Fungsi untuk render kartu tugas
  function renderCards() {
    container.innerHTML = ''; // Menghapus kartu yang sudah ada
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;

    getTasks(); // Mengambil data tugas dari Firestore

    // Loop untuk membuat kartu dari data tugas
    tasks.slice(start, end).forEach((task, index) => {
      const card = `
        <div class="card">
          <img src="${task.img}" alt="Badge ${index + 1}">
          <h3>${task.title}</h3>
          <a href="#" class="read-btn">Pelajari</a>
        </div>
      `;
      container.innerHTML += card;
    });

    // Menonaktifkan tombol prev jika sudah di halaman pertama
    prevBtn.disabled = currentPage === 0;

    // Menonaktifkan tombol next jika sudah di halaman terakhir
    nextBtn.disabled = currentPage >= Math.floor(tasks.length / cardsPerPage);
  }

  // Event listener untuk tombol prev dan next
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      renderCards();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < Math.floor(tasks.length / cardsPerPage)) {
      currentPage++;
      renderCards();
    }
  });

  // Render awal
  renderCards();
});

    function renderCards() {
        // Clear the current cards
        container.innerHTML = '';
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        const visibleTasks = tasks.slice(start, end);

        // Loop through the visible tasks to create cards
        visibleTasks.forEach((task, index) => {
            const card = `
                <div class="card">
                    <img src="${task.img}" alt="Badge ${index + 1}">
                    <h3>${task.title}</h3>
                    <a href="#" class="read-btn">Pelajari</a>
                </div>
            `;
            container.innerHTML += card;
        });

        // Disable prev button if on the first page
        prevBtn.disabled = currentPage === 0;

        // Disable next button if on the last page
        nextBtn.disabled = currentPage >= Math.floor(tasks.length / cardsPerPage);
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderCards();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.floor(tasks.length / cardsPerPage)) {
            currentPage++;
            renderCards();
        }
    });

    // Initial render
    renderCards();
});
