$(document).ready(function() {
    // Mobile Menu Toggle
    const menuToggle = $('#mobile-menu');
    const navLinks = $('.nav-links');

    menuToggle.on('click', function() {
        navLinks.toggleClass('active');
        menuToggle.text(navLinks.hasClass('active') ? '✕' : '☰');
    });

    // Close menu when clicking a link
    $('.nav-links a').on('click', function() {
        navLinks.removeClass('active');
        menuToggle.text('☰');
    });

    // Intersection Observer for Fade-in Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
            }
        });
    }, observerOptions);

    $('.section').each(function() {
        observer.observe(this);
    });

    // Multi-language Support
    function loadLanguage(lang) {
        $.ajax({
            url: `lang/${lang}.json`,
            dataType: 'json',
            success: function(translations) {
                $('[data-i18n]').each(function() {
                    const key = $(this).data('i18n');
                    if (translations[key]) {
                        // Check if it's an input placeholder or standard text
                        if ($(this).is('input, textarea')) {
                            $(this).attr('placeholder', translations[key]);
                        } else {
                            $(this).html(translations[key]);
                        }
                    }
                });

                // Handle Direction (RTL for Arabic)
                if (lang === 'ar') {
                    $('html').attr('dir', 'rtl');
                    $('body').css('font-family', "'Tahoma', 'Segoe UI', sans-serif");
                } else {
                    $('html').attr('dir', 'ltr');
                    $('body').css('font-family', "'Inter', sans-serif");
                }

                // Update Active Button
                $('.lang-btn').removeClass('active');
                $(`.lang-btn[data-lang="${lang}"]`).addClass('active');

                // Save Preference
                localStorage.setItem('selectedLang', lang);
            },
            error: function() {
                console.error('Error loading language file');
            }
        });
    }

    // Language Switcher Click Event
    $('.lang-btn').on('click', function() {
        const lang = $(this).data('lang');
        loadLanguage(lang);
    });

    // Load Saved Language or Default to English
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    loadLanguage(savedLang);
});
