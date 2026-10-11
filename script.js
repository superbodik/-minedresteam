const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

const marqueeTrack = document.getElementById('marqueeTrack');
marqueeTrack.innerHTML += marqueeTrack.innerHTML;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelector('[data-count]')) {
                animateCounters(entry.target);
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounters(container) {
    container.querySelectorAll('[data-count]').forEach(counter => {
        const target = +counter.dataset.count;
        const duration = 1600;
        const start = performance.now();
        const step = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

const cards = document.querySelectorAll('.card, .project-card, .glass-panel');

window.addEventListener('mousemove', e => {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.transform = `perspective(900px) rotateY((x−rect.width/2)/40deg)rotateX({(x - rect.width / 2) / 40}deg) rotateX((x−rect.width/2)/40deg)rotateX({(rect.height / 2 - y) / 40}deg) translateY(-6px)`;
        } else {
            card.style.transform = '';
        }
    });
});
