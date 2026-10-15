document.addEventListener("DOMContentLoaded", () => {
    // SEZIONE DRAG AND DROP PER I SOSTENITORI
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    
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