document.addEventListener('DOMContentLoaded', () => {
    // Navbar visual effects on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 253, 248, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(255, 253, 248, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Copy CA to clipboard with warm visual feedback
    const caBox = document.getElementById('ca-box');
    const caText = document.getElementById('ca-text').innerText;
    const copyBtn = document.getElementById('copy-btn');

    const handleCopy = () => {
        navigator.clipboard.writeText(caText).then(() => {
            // Success animation
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copy-success');
            caBox.style.borderColor = 'var(--success)';
            caBox.style.transform = 'scale(0.97)';
            
            setTimeout(() => {
                caBox.style.transform = 'scale(1)';
            }, 150);

            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove('copy-success');
                caBox.style.borderColor = '';
            }, 2500);
        }).catch(err => {
            console.error('Failed to copy CA: ', err);
            copyBtn.innerHTML = '<i class="fas fa-times" style="color: var(--error);"></i>';
            setTimeout(() => copyBtn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
        });
    };

    caBox.addEventListener('click', handleCopy);
    caBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopy();
        }
    });

    // Intersection Observer for bouncy scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find what animation class this element needs to have added
                // e.g., if it has class "fade-in-up", we add "animate-fade-in-up"
                const classList = Array.from(entry.target.classList);
                const animTypes = ['fade-in-up', 'bounce-in', 'pop-in', 'slide-in-left', 'slide-in-right'];
                
                animTypes.forEach(type => {
                    if (classList.includes(type)) {
                        entry.target.classList.add(`animate-${type}`);
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all targets and observe them
    const animationTargets = document.querySelectorAll('.fade-in-up, .bounce-in, .pop-in, .slide-in-left, .slide-in-right');
    animationTargets.forEach(target => {
        observer.observe(target);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
