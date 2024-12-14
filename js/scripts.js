document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalCards = 20; // Total cards yang tersedia
    const cardsPerPage = 16; // Setiap halaman menampilkan 16 card
    let currentPage = 1; // Halaman pertama

    // Array data card task
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
        { img: "assets/badges/merigi_badge2.png", title: "Judul Tugas 2" },
        { img: "assets/badges/merigi_badge3.png", title: "Judul Tugas 3" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
    ];

    // Fungsi untuk mengisi kartu ke dalam container
    function loadCards(page) {
        container.innerHTML = ''; // Clear existing cards
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        for (let i = start; i < end && i < tasks.length; i++) {
            const task = tasks[i];
            const card = `
                <div class="card">
                    <img src="${task.img}" alt="Badge ${i + 1}">
                    <h3>${task.title}</h3>
                    <a href="#" class="read-btn">Pelajari</a>
                </div>
            `;
            container.innerHTML += card;
        }

        // Disable tombol prev/next berdasarkan halaman
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page * cardsPerPage >= tasks.length;
    }

    // Event listener untuk tombol "Sebelumnya"
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadCards(currentPage);
        }
    });

    // Event listener untuk tombol "Selanjutnya"
    nextBtn.addEventListener('click', () => {
        if (currentPage * cardsPerPage < tasks.length) {
            currentPage++;
            loadCards(currentPage);
        }
    });

    // Load halaman pertama
    loadCards(currentPage);
});
