const navbar = document.getElementById('navbar');

navbar.addEventListener('mouseenter', function() {
    navbar.classList.remove('bg-[#003e3e]/95');
    navbar.classList.add('bg-[#003e3e]/98', 'shadow-lg');
});

navbar.addEventListener('mouseleave', function() {
    navbar.classList.remove('bg-[#003e3e]/98', 'shadow-lg');
    navbar.classList.add('bg-[#003e3e]/95');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.classList.add('animate-[fadeInUp_0.8s_ease-out_forwards]');
        }
    });
}, observerOptions);

document.querySelectorAll('.bg-white\\/10').forEach(card => {
    observer.observe(card);
});
