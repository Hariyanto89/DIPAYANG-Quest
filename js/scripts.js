document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');

    for (let i = 1; i <= 20; i++) {
        const card = `
            <div class="card">
                <img src="https://via.placeholder.com/150" alt="Comic ${i}">
                <h3>Judul Tugas ${i}</h3>
                <a href="#" class="read-btn">Pelajari</a>
            </div>
        `;
        container.innerHTML += card;
    }
});
