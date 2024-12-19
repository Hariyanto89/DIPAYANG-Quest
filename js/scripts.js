// Import Firestore dari firebase.js
import { db, auth, loginWithEmailPassword, fetchQuestions, updatePlayerProgress, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Event untuk signup
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const logoutButton = document.getElementById("logout-btn");

// Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Logged in:", userCredential.user);
            alert("Login sukses!");
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Login gagal: " + error.message);
        });
});

// Signup
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            alert("Akun berhasil dibuat!");
        })
        .catch((error) => {
            console.error("Signup error:", error);
            alert("Signup gagal: " + error.message);
        });
});

// Logout
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("Logged out");
            alert("Logout sukses!");
        })
        .catch((error) => {
            console.error("Logout error:", error);
            alert("Logout gagal: " + error.message);
        });
});

    
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

// Switcher antara login dan signup
document.getElementById('switch-to-signup')?.addEventListener('click', () => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
});

document.getElementById('switch-to-login')?.addEventListener('click', () => {
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

// State Auth untuk login/logout
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        document.getElementById('player-id').textContent = user.uid;
    } else {
        console.log("No user logged in.");
        document.getElementById('player-id').textContent = '-';
    }
});

// Fungsi menambah tugas
const addTask = async (task) => {
    try {
        await addDoc(collection(db, "tasks"), task);
        console.log(`Tugas \"${task.title}\" berhasil ditambahkan.`);
    } catch (error) {
        console.error("Gagal menambahkan tugas:", error);
    }
};

// Fungsi mengambil tugas dari Firestore
const getTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        return [];
    }
};

// Data tugas contoh
const sampleTasks = [
    { img: "assets/icon/gamechapter1.jpg", title: "Petani Aseters" },
    { img: "assets/icon/gamechapter2.jpg", title: "Gelombang Aset Tani" },
    { img: "assets/icon/gamechapter3.jpg", title: "Menghias Aset Tani" },
];

// Rendering kartu tugas
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.card-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cardsPerPage = 8;
    let currentPage = 0;

    // Ambil data tugas dari Firestore
    const allTasks = await getTasks();
    if (allTasks.length === 0) {
        allTasks.push(...sampleTasks);
    }

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
                if (!auth.currentUser) {
                    alert("Silakan login untuk bermain.");
                    window.location.href = 'login.html';
                    return;
                }

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

// Login form
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

// Logout button
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
