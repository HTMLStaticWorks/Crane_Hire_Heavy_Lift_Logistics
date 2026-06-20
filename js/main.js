document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header ---
    const header = document.querySelector('.navbar');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // --- Active Nav Link Highlighting ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Theme Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeIcons(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlEl.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(btn => {
            if (theme === 'dark') {
                btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
            } else {
                btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
            }
        });
    }

    // --- RTL Toggle ---
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const savedRtl = localStorage.getItem('rtl');
    
    if (savedRtl === 'true') {
        htmlEl.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = htmlEl.getAttribute('dir') === 'rtl';
            if (isRtl) {
                htmlEl.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter-value');
    
    const counterCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // ms
                let startTimestamp = null;
                
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    target.innerText = Math.floor(progress * endValue);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = endValue + (target.getAttribute('data-suffix') || '');
                    }
                };
                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(counterCallback, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
});
