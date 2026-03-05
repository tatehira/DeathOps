document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const crosshair = cursor.querySelector('.cursor-crosshair');
    const label = cursor.querySelector('.cursor-label');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const activeElements = document.querySelectorAll('a, button, .btn-tactical, .m-card');
    activeElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            label.textContent = 'ENGAGING TARGET';
            crosshair.style.borderColor = '#00ff41';
            label.style.color = '#00ff41';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            label.textContent = 'TARGETING...';
            crosshair.style.borderColor = 'var(--color-primary)';
            label.style.color = 'var(--color-primary)';
        });
    });

    const canvas = document.getElementById('smoke-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 200;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class SmokeParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 200 + 100;
            this.opacity = Math.random() * 0.15;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.1;
            this.color = Math.random() > 0.5 ? 'rgba(50, 50, 50,' : 'rgba(100, 10, 0,';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < -200 || this.x > canvas.width + 200) this.vx *= -1;
            if (this.y < -200 || this.y > canvas.height + 200) this.vy *= -1;
        }

        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            gradient.addColorStop(0, `${this.color}${this.opacity})`);
            gradient.addColorStop(1, `${this.color}0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initSmoke() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SmokeParticle());
        }
    }

    function animateSmoke() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateSmoke);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initSmoke();
    });

    resizeCanvas();
    initSmoke();
    animateSmoke();

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .m-card, .player-tag, .stats-monolith').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    const glitchElements = document.querySelectorAll('.logo, .main-title');
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitch 0.3s infinite';
        });
        el.addEventListener('mouseleave', () => {
            el.style.animation = 'none';
        });
    });

    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        if (isActive) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '90px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(8, 8, 8, 0.95)';
            navLinks.style.padding = '40px';
            navLinks.style.borderBottom = '1px solid var(--color-primary)';
            navLinks.style.gap = '20px';
        } else {
            navLinks.style.display = '';
        }
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 1)';
        } else {
            navbar.style.background = 'rgba(8, 8, 8, 0.85)';
        }
    });
});
