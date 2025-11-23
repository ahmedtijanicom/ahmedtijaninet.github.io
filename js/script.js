/**
 * Script.js
 * Consolidated logic for Ahmed Tijani Portfolio
 * Features: I18n, Mobile Menu, Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Internationalization (I18n) ---
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('lang') || 'en';
    let translations = {};

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            translations = await response.json();
            currentLang = lang;
            localStorage.setItem('lang', lang);
            
            // Update HTML attributes
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            
            updateUI();
        } catch (error) {
            console.error('I18n Error:', error);
        }
    }

    function updateUI() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        // Update active button
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event Listeners for Language
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                loadLanguage(lang);
            }
        });
    });

    // Initial Load
    loadLanguage(currentLang);


    // --- 2. Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }


    // --- 3. Animations (Anime.js) ---
    if (typeof anime !== 'undefined') {
        // Hero Animations
        anime({
            targets: ['.profile-pic', '#hero h1', '#hero h2', '.tagline', '.cta-buttons .btn'],
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200, {start: 300}),
            easing: 'easeOutExpo'
        });

        // Scroll Animations (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section h2, .card, .tech-category').forEach(el => {
            el.style.opacity = '0'; // Initial state
            observer.observe(el);
        });
    }

});
