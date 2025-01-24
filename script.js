function checkVisibility() {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        } else {
            if (element.classList.contains('visible')) {
                element.classList.remove('visible');
            }
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
checkVisibility();


