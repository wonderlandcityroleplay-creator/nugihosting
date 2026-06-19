/* ==================== MOBILE MENU TOGGLE ==================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/* ==================== PRICE TOGGLE FUNCTIONALITY ==================== */
const priceToggle = document.getElementById('priceToggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const yearlyPrices = document.querySelectorAll('.yearly-price');

if (priceToggle) {
    priceToggle.addEventListener('change', () => {
        monthlyPrices.forEach(price => {
            price.style.display = priceToggle.checked ? 'none' : 'inline';
        });

        yearlyPrices.forEach(price => {
            price.style.display = priceToggle.checked ? 'inline' : 'none';
        });
    });
}

/* ==================== FAQ TOGGLE FUNCTIONALITY ==================== */
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');

    // Close other open FAQs
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });

    document.querySelectorAll('.faq-question').forEach(item => {
        if (item !== button) {
            item.classList.remove('active');
        }
    });

    // Toggle current FAQ
    answer.classList.toggle('active');
    button.classList.toggle('active');
}

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ==================== COUNTER ANIMATION ==================== */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.pricing-card, .feature-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

/* ==================== ACTIVE NAV LINK ==================== */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ==================== BUTTON CLICK EFFECTS ==================== */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/* ==================== FORM SUBMISSION HANDLING ==================== */
// For future form implementation
function handleFormSubmit(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
}

/* ==================== COPY PROMO CODE ==================== */
function copyPromoCode() {
    const promoCode = 'NUGIDISKON30';
    navigator.clipboard.writeText(promoCode).then(() => {
        alert('Kode promo berhasil disalin: ' + promoCode);
    }).catch(() => {
        alert('Gagal menyalin kode promo');
    });
}

/* ==================== LOAD MORE FUNCTIONALITY ==================== */
function loadMoreFeatures() {
    const hiddenItems = document.querySelectorAll('.feature-item.hidden');
    hiddenItems.forEach((item, index) => {
        if (index < 3) {
            item.classList.remove('hidden');
        }
    });
}

/* ==================== DARK MODE TOGGLE ==================== */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check if dark mode was previously enabled
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

/* ==================== PERFORMANCE OPTIMIZATION ==================== */
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ==================== ANALYTICS TRACKING (Optional) ==================== */
function trackButtonClick(buttonName) {
    console.log(`Button clicked: ${buttonName}`);
    // Add your analytics code here
}

/* ==================== KEYBOARD SHORTCUTS ==================== */
document.addEventListener('keydown', (e) => {
    // Press '?' to see shortcuts
    if (e.key === '?') {
        console.log('Available shortcuts:');
        console.log('Home: H');
        console.log('Pricing: P');
        console.log('Features: F');
    }
    
    if (e.key.toLowerCase() === 'h') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key.toLowerCase() === 'p') {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key.toLowerCase() === 'f') {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
});

/* ==================== PAGE LOAD ANIMATION ==================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ==================== CONSOLE MESSAGE ==================== */
console.log('%cNugi Hosting', 'font-size: 24px; font-weight: bold; color: #0066cc;');
console.log('%cSolusi Hosting Terpercaya Anda', 'font-size: 14px; color: #666;');
