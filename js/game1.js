// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { loginWithEmailPassword } from './firebase.js';

const firebaseConfig = {
  apiKey: "AIzaSyAw6mmGUrDyFiVoRdejZZJ7U_Cp7Od-8aI",
  authDomain: "dipayang-quest.firebaseapp.com",
  projectId: "dipayang-quest",
  storageBucket: "dipayang-quest.appspot.com",
  messagingSenderId: "769511051480",
  appId: "1:769511051480:web:76606871be7200ce3047ad",
  measurementId: "G-BEP9KDRTCG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

// Variabel global
let questions = [];
let currentQuestionIndex = 0;
let lives = 3;
let playerId = null;

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

// Fungsi untuk login pemain
const loginPlayer = async () => {
  const email = "user@example.com";  // Contoh email
  const password = "password123";    // Contoh password
  
  playerId = await loginWithEmailPassword(email, password);
  
  if (playerId) {
    console.log("Pemain berhasil login dengan ID:", playerId);
    startGame();  // Memulai game setelah login berhasil
  } else {
    console.log("Login gagal. Silakan coba lagi.");
  }
};

// Contoh: update progress ke 30%
updateProgress(30);

// Variabel global
let questions = [];
let currentQuestionIndex = 0;
let lives = 3;

// Elemen DOM
const gameContent = document.querySelector(".game-content");
const playerLives = document.getElementById("player-lives");
// Fungsi untuk mengambil data pertanyaan
const fetchQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, "Questions"));
  questions = []; // Reset questions
  querySnapshot.forEach((doc) => {
    const questionData = doc.data();
    if (questionData.question && Array.isArray(questionData.options)) {
      questions.push(questionData);
    }
  });
};

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

// Fungsi untuk memulai game
const startGame = async () => {
  if (!playerId) {
    console.error("Pemain belum login!");
    return;
  }
  
  // Mengambil pertanyaan dari Firestore menggunakan playerId
  questions = await fetchQuestions(); // Ambil pertanyaan dari Firestore
  
  if (questions.length > 0) {
    loadQuestion(currentQuestionIndex);  // Menampilkan pertanyaan pertama
  } else {
    console.error("Tidak ada pertanyaan yang ditemukan.");
  }
};

// Memulai permainan dengan login
loginPlayer();

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
    restartGame();
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

// Fungsi untuk memulai game
const startGame = async () => {
  await fetchQuestions(); // Ambil pertanyaan dari Firestore
  if (questions.length > 0) {
    updateLives();
    loadQuestion(currentQuestionIndex); // Mulai game
  } else {
    console.error("Tidak ada pertanyaan yang ditemukan.");
  }
};

// Memulai game
startGame();
