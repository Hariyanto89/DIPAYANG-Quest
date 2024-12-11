document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');

    for (let i = 1; i <= 14; i++) {
        const card = `
            <div class="card">
                <img src="https://via.placeholder.com/150" alt="Comic ${i}">
                <h3>Comic Title ${i}</h3>
                <a href="#" class="read-btn">Read Now</a>
            </div>
        `;
        container.innerHTML += card;
    }
});
