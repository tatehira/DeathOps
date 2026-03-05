document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('smoke-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;

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
                this.size = Math.random() * 300 + 200;
                this.opacity = Math.random() * 0.05;
                this.vx = (Math.random() - 0.5) * 0.1;
                this.vy = (Math.random() - 0.5) * 0.05;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < -300 || this.x > canvas.width + 300) this.vx *= -1;
                if (this.y < -300 || this.y > canvas.height + 300) this.vy *= -1;
            }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(255, 69, 0, ${this.opacity})`);
                gradient.addColorStop(1, 'rgba(10, 10, 12, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new SmokeParticle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', init);
        init();
        animate();
    }

    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--color-surface)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
            }
        });
    }

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
