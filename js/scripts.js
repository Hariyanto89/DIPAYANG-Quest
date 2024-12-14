document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cardsPerPage = 16;
    let currentPage = 0;

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
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
    ];

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
