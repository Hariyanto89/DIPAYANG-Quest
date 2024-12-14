document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');

    // Define an array of images and titles for the cards
    const tasks = [
        { img: "assets/badges/merigi_badge.png", title: "Petani Aseters" },
        { img: "assets/badges/merigi_badge2.png", title: "Judul Tugas 2" },
        { img: "assets/badges/merigi_badge3.png", title: "Judul Tugas 3" },
        { img: "assets/badges/merigi_badge4.png", title: "Judul Tugas 4" },
        { img: "assets/badges/merigi_badge5.png", title: "Judul Tugas 5" },
        { img: "assets/badges/merigi_badge6.png", title: "Judul Tugas 6" },
        { img: "assets/badges/merigi_badge7.png", title: "Judul Tugas 7" },
        // Continue for up to 20 tasks
    ];

    // Loop through the array to create the cards
    tasks.forEach((task, index) => {
        const card = `
            <div class="card">
                <img src="${task.img}" alt="Badge ${index + 1}">
                <h3>${task.title}</h3>
                <a href="#" class="read-btn">Pelajari</a>
            </div>
        `;
        container.innerHTML += card;
    });
});
