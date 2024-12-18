// firebase.js
// Mengimpor modul Firebase dari CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Inisialisasi Authentication untuk login pengguna (opsional)
const auth = getAuth(app);

// Mengekspor modul Firebase agar bisa digunakan di file lain
export { db, storage, auth };

import { db } from './firebase.js';
import { collection, getDocs, addDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

function checkAnswer(isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    if (isCorrect) {
        feedbackText.textContent = "Benar! Anda mendapat 100 XP.";
        feedbackDiv.classList.remove('hidden', 'incorrect');
        feedbackDiv.classList.add('correct');
        currentQuestionIndex++; // Pindah ke pertanyaan berikutnya
    } else {
        feedbackText.textContent = "Salah. Coba lagi!";
        feedbackDiv.classList.remove('hidden', 'correct');
        feedbackDiv.classList.add('incorrect');
    }
    
    // Tampilkan feedback selama beberapa detik
    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
        loadQuestion(currentQuestionIndex); // Muat pertanyaan selanjutnya setelah feedback
    }, 2000);
}

function updateProgress(value) {
  const progressBar = document.getElementById('level-progress');
  progressBar.value = value; // Update progress level
}

// Contoh: update progress ke 30%
updateProgress(30);

// Fungsi untuk mengambil data pertanyaan
const fetchQuestions = async () => {
  const questionsContainer = document.querySelector('.game-content');
  const querySnapshot = await getDocs(collection(db, "Questions"));

  const questions = [];
  querySnapshot.forEach((doc) => {
    const questionData = doc.data();
    // Pastikan data yang diambil valid
    if (questionData.question && Array.isArray(questionData.options)) {
      questions.push(questionData);
    }
  });

  return questions;
};

  // Menambahkan pertanyaan ke DOM
  questions.forEach((questionData) => {
    const questionText = questionData.question;
    const options = questionData.options;

    const questionElement = document.createElement('div');
    questionElement.classList.add('question-item');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = questionText;
    questionElement.appendChild(questionTitle);

    const optionsList = document.createElement('ul');
    options.forEach(option => {
      const optionItem = document.createElement('li');
      optionItem.textContent = option.text;
      optionItem.addEventListener('click', () => {
        if (option.correct) {
          alert('Jawaban Benar!');
        } else {
          alert('Jawaban Salah!');
        }
      });
      optionsList.appendChild(optionItem);
    });

    questionElement.appendChild(optionsList);
    questionsContainer.appendChild(questionElement);
  });

  return questions; // Kembalikan array pertanyaan
};

const startGame = async () => {
  const questions = await fetchQuestions(); // Ambil pertanyaan dari Firestore
  if (questions.length > 0) {
    loadQuestion(currentQuestionIndex); // Mulai permainan jika ada pertanyaan
  } else {
    console.error("Tidak ada pertanyaan yang ditemukan.");
  }
};

const saveProgress = async (userId, progress) => {
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { progress });
    console.log("Progress berhasil disimpan.");
  } catch (error) {
    console.error("Error menyimpan progress:", error);
  }
};

let currentQuestionIndex = 0;
let lives = 3;

// Elemen DOM
const gameContent = document.querySelector(".game-content");
const playerLives = document.getElementById("player-lives");

// Fungsi untuk memperbarui tampilan pertanyaan
function loadQuestion(index) {
  if (index >= questions.length) {
    alert("Selamat! Anda telah menyelesaikan semua pertanyaan!");
    restartGame(); // Restart game jika semua pertanyaan sudah dijawab
    return;
  }

  const questionData = questions[index];
  gameContent.innerHTML = `
    <div class="game-card">
      <h3>Pertanyaan ${index + 1}</h3>
      <p>${questionData.question}</p>
      <div class="game-options">
        ${questionData.options
          .map(
            (option, i) => `
          <button class="option-btn" onclick="checkAnswer(${option.correct})">
            ${option.text}
          </button>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// Fungsi untuk memeriksa jawaban
function checkAnswer(isCorrect) {
  if (isCorrect) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    lives--;
    updateLives();
    if (lives === 0) {
      alert("Game Over! Anda kehabisan nyawa.");
      restartGame();
    }
  }
}

// Fungsi untuk memperbarui tampilan nyawa
function updateLives() {
  playerLives.textContent = "❤️".repeat(lives);
}

// Fungsi untuk mereset game
function restartGame() {
  currentQuestionIndex = 0;
  lives = 3;
  updateLives();
  loadQuestion(currentQuestionIndex);
}

// Mulai game
loadQuestion(currentQuestionIndex);

fetchQuestions().then(questions => console.log(questions));
