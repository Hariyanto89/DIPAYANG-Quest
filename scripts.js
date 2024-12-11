document.addEventListener('DOMContentLoaded', () => {
    // Highlight active navigation link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            event.target.classList.add('active');
        });
    });

    // Comic grid interaction (Example: Pop-up preview)
    const comicItems = document.querySelectorAll('.comic');
    comicItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`You clicked on ${item.querySelector('h3').innerText}`);
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects for comic items
    const comicHoverItems = document.querySelectorAll('.comic');
    comicHoverItems.forEach(comic => {
        comic.addEventListener('mouseover', () => {
            comic.style.transform = 'scale(1.05)';
            comic.style.transition = 'transform 0.3s';
        });
        comic.addEventListener('mouseout', () => {
            comic.style.transform = 'scale(1)';
        });
    });
});
