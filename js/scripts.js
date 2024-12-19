// Import Firestore dari firebase.js
import { db } from './firebase.js'; // Mengimpor konfigurasi Firebase
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Metode Firestore

// Fungsi untuk menambah data pemain ke Firestore
const addPlayerData = async (player) => {
  try {
    await addDoc(collection(db, "players"), player);
    console.log(`Data pemain "${player.name}" berhasil ditambahkan.`);
  } catch (error) {
    console.error("Gagal menambahkan data pemain:", error);
  }
};

// Event DOMContentLoaded untuk menjalankan kode setelah halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.card-container'); // Kontainer kartu tugas
  const prevBtn = document.getElementById('prev-btn'); // Tombol halaman sebelumnya
  const nextBtn = document.getElementById('next-btn'); // Tombol halaman berikutnya
  const cardsPerPage = 8; // Jumlah kartu per halaman
  let currentPage = 0; // Halaman saat ini dimulai dari 0
  
// Inisialisasi data tugas statis
const staticTasks = [
  { img: "assets/icon/projectmanagement.png", title: "Project Management", link: "https://hariyanto89.github.io/Quest.ID/tasks/ProjectManagement.html" },
  { img: "assets/icon/gamechapter2.jpg", title: "Gelombang Aset Tani", link: "game2.html" },
  { img: "assets/icon/gamechapter3.jpg", title: "Menghias Aset Tani", link: "game3.html" },
  { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4", link: "game4.html" },
  { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5", link: "game5.html" },
  { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6", link: "game6.html" },
  { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7", link: "game7.html" },
];

  // Fungsi untuk merender kartu tugas
  const renderCards = () => {
    container.innerHTML = ''; // Bersihkan kartu sebelumnya
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleTasks = staticTasks.slice(start, end);

    visibleTasks.forEach((task) => {
      const card = document.createElement('div');
      card.className = 'card game-card';
      card.innerHTML = `
        <img src="${task.img}" alt="Badge">
        <h3>${task.title}</h3>
        <a href="${task.link}" class="read-btn">Pelajari</a>
      `;
      container.appendChild(card);
    });

    // Perbarui status tombol pagination
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= Math.ceil(staticTasks.length / cardsPerPage) - 1;
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
    if (currentPage < Math.ceil(staticTasks.length / cardsPerPage) - 1) {
      currentPage++;
      renderCards();
    }
  });

  // Render awal kartu tugas
  renderCards();

  // Simpan data pemain contoh ke Firebase (contoh statis, bisa disesuaikan dengan input pengguna)
  const samplePlayer = {
    id: "12345",
    name: "Pemain 1",
    level: 10,
    xp: 2500,
    tokens: 100,
    lives: 3,
    badges: ["badge1", "badge2"],
    certificates: ["cert1"],
    history: ["game1", "game2"]
  };

  // Tambahkan data pemain ke Firebase
  addPlayerData(samplePlayer);
});

const validateAnswers = async () => {
  try {
    const response = await fetch('data/ProjectManagement.json');
    if (!response.ok) throw new Error('Gagal mengakses file JSON');
    const data = await response.json();
    const correctAnswers = data.answers;
    const userAnswers = [...document.querySelectorAll('.question input')].map(input => input.value);

    return correctAnswers.every((answer, index) => answer === userAnswers[index]);
  } catch (error) {
    console.error('Error validating answers:', error);
    return false; // Kembalikan false jika terjadi error
  }
};

document.getElementById('submit-answers').addEventListener('click', async () => {
  const answers = [...document.querySelectorAll('.question input')].map(input => input.value);
  const taskId = 'ProjectManagement';
  const playerId = localStorage.getItem('playerId') || ''; // Atau sesuai dengan cara Anda mendapatkan ID pemain

  // Validasi jawaban
  if (await validateAnswers()) {
    try {
      // Simpan jawaban ke Firebase
      await addDoc(collection(db, 'task_results'), {
        playerId,
        taskId,
        answers,
        timestamp: new Date(),
      });
      alert('Semua jawaban benar! Lanjutkan ke tugas berikutnya.');
      window.location.href = 'task2.html';
    } catch (error) {
      console.error('Gagal menyimpan jawaban:', error);
    }
  } else {
    alert('Jawaban Anda belum benar. Coba lagi.');
  }
});

// Mengambil data tugas dari JSON
const loadTaskData = async () => {
  const response = await fetch('data/ProjectManagement.json');
  const taskData = await response.json();

  // Mengisi data tugas di halaman
  document.getElementById('task-title').textContent = taskData.taskTitle;
  document.getElementById('task-description').textContent = taskData.description;
  document.getElementById('task-hint').src = taskData.hintImage || '';

  // Menambahkan pertanyaan ke halaman
  const questionsContainer = document.getElementById('questions-container');
  taskData.questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <p>${question.question}</p>
      ${question.options.map(option => `
        <label>
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        </label>
      `).join('')}
    `;
    questionsContainer.appendChild(questionElement);
  });
};

document.addEventListener('DOMContentLoaded', loadTaskData);
