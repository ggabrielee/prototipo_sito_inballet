document.addEventListener("DOMContentLoaded", () => {
    // MENU MOBILE (HAMBURGER)
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.nav-menu');

    if (header && nav) {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Apri il menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(toggle);

        toggle.addEventListener('click', () => {
            const open = header.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', open);
            toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
        });

        // Su mobile le tendine si aprono al tocco invece che al passaggio del mouse
        nav.querySelectorAll('.dropdown > a').forEach((link) => {
            link.addEventListener('click', (e) => {
                if (!window.matchMedia('(max-width: 1300px)').matches) return;
                e.preventDefault();
                link.parentElement.classList.toggle('open');
            });
        });
    }

    // SEZIONE DRAG AND DROP PER I SOSTENITORI
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    if (!track || !container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        // Ferma momentaneamente l'animazione automatica quando si clicca
        track.style.animation = 'none';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        // Riattiva l'animazione automatica
        track.style.animation = 'scorriLoghi 20s linear infinite';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        track.style.animation = 'scorriLoghi 20s linear infinite';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Moltiplicatore di velocità del trascinamento
        container.scrollLeft = scrollLeft - walk;
    });
});
