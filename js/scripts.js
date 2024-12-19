// Import Firestore dari firebase.js
import { db, auth, loginWithEmailPassword, fetchQuestions, updatePlayerProgress } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        // Simpan data tambahan pengguna ke Firestore
        await addDoc(collection(db, "Users"), { name, email, userId });

        alert('Pendaftaran berhasil!');
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    } catch (error) {
        alert('Pendaftaran gagal: ' + error.message);
    }
});

document.getElementById('switch-to-signup')?.addEventListener('click', () => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
});

document.getElementById('switch-to-login')?.addEventListener('click', () => {
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        document.getElementById('player-id').textContent = user.uid;
    } else {
        console.log("No user logged in.");
        document.getElementById('player-id').textContent = '-';
        alert('Anda telah logout.');
    }
});

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

// Event DOMContentLoaded untuk menjalankan kode setelah halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cardsPerPage = 8;
    let currentPage = 0;

    // Ambil data tugas dari Firestore
    const allTasks = await getTasks();

    // Fungsi untuk merender kartu tugas
    const renderCards = () => {
        container.innerHTML = '';
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        const visibleTasks = allTasks.slice(start, end);

        visibleTasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.className = 'card game-card';
            card.dataset.game = index % 2 === 0 ? 'game1' : 'game2';
            card.innerHTML = `
                <img src="${task.img}" alt="Badge">
                <h3>${task.title}</h3>
                <a href="#" class="read-btn">Pelajari</a>
            `;
            container.appendChild(card);
        });

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= Math.ceil(allTasks.length / cardsPerPage) - 1;

        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const game = card.dataset.game;
                if (game === "game1") {
                    window.location.href = "game1.html";
                } else if (game === "game2") {
                    window.location.href = "game2.html";
                }
            });
        });
    };

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderCards();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(allTasks.length / cardsPerPage) - 1) {
            currentPage++;
            renderCards();
        }
    });

    renderCards();
});

// Login event handling
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userId = await loginWithEmailPassword(email, password);

    if (userId) {
        document.getElementById('player-id').textContent = userId;
        alert('Login berhasil!');
    } else {
        alert('Login gagal!');
    }
});

// Logout event handling
document.getElementById('logout-btn')?.addEventListener('click', () => {
    auth.signOut();
    alert('Logout berhasil!');
    document.getElementById('player-id').textContent = '-';
});

export const loginWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user.uid;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
};

console.log("Auth:", auth);
console.log("DB:", db);

document.addEventListener('DOMContentLoaded', async () => {
    if (!auth.currentUser) {
        alert('Silakan login terlebih dahulu.');
        window.location.href = 'login.html';
    } else {
        console.log('User is authenticated:', auth.currentUser.uid);
        // Render tasks or other data
    }
});
