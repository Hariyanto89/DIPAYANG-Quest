function checkAnswer(isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    if (isCorrect) {
        feedbackText.textContent = "Benar! Anda mendapat 100 XP.";
        feedbackDiv.classList.remove('hidden', 'incorrect');
        feedbackDiv.classList.add('correct');
    } else {
        feedbackText.textContent = "Salah. Coba lagi!";
        feedbackDiv.classList.remove('hidden', 'correct');
        feedbackDiv.classList.add('incorrect');
    }
    
    // Tampilkan feedback selama beberapa detik
    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
    }, 2000);
}

function updateProgress(value) {
    const progressBar = document.getElementById('level-progress');
    progressBar.value = value; // Update progress level
}

// Contoh: update progress ke 30%
updateProgress(30);

// Data pertanyaan
const questions = [
  {
    question: "Apa fungsi utama dari aset daerah?",
    options: [
      { text: "✅ Untuk pelayanan publik", correct: true },
      { text: "❌ Untuk disewakan ke pihak swasta", correct: false },
    ],
  },
  {
    question: "Apa tujuan pengelolaan aset daerah?",
    options: [
      { text: "✅ Efisiensi dan efektivitas penggunaan", correct: true },
      { text: "❌ Menambah pengeluaran daerah", correct: false },
    ],
  },
  // Tambahkan pertanyaan lainnya di sini
];

let currentQuestionIndex = 0;
let lives = 3;

// Elemen DOM
const gameContent = document.querySelector(".game-content");
const playerLives = document.getElementById("player-lives");

// Fungsi untuk memperbarui tampilan pertanyaan
function loadQuestion(index) {
  if (index >= questions.length) {
    alert("Selamat! Anda telah menyelesaikan semua pertanyaan!");
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
