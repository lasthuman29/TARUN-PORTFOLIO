/* ================================
   TARUN SINGH — PORTFOLIO SCRIPT
   ================================ */

/* --- TYPED TEXT ANIMATION --- */
const typedWords = ['Analyst', 'Visualization Expert', 'BI Developer', 'Insight Engineer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const currentWord = typedWords[wordIndex];

  if (isDeleting) {
    typedEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typedWords.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

setTimeout(type, 1200);


/* --- NAVBAR SCROLL EFFECT --- */
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
});


/* --- HAMBURGER MENU --- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});


/* --- SCROLL REVEAL --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, index) => {
        if (sib === entry.target) {
          delay = index * 120;
        }
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* --- SKILL BAR ANIMATION --- */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach((bar, i) => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, i * 100);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillBarObserver.observe(el));


/* --- SMOOTH SCROLL FOR NAV --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* --- ACTIVE NAV LINK HIGHLIGHT --- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${id}` && !link.classList.contains('nav-cta')) {
          link.style.color = 'white';
          link.style.background = 'rgba(255,255,255,0.1)';
        }
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(sec => activeLinkObserver.observe(sec));


/* --- COUNTER ANIMATION (hero stats) --- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isFloat = target.toString().includes('.');
  const hasPercent = el.dataset.suffix === '%';
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = isFloat
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);
    el.textContent = value + (hasPercent ? '%' : (el.dataset.suffix || ''));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent.trim();
        const match = text.match(/[\d.]+/);
        if (match) {
          const value = parseFloat(match[0]);
          const suffix = text.replace(match[0], '');
          num.dataset.suffix = suffix;
          animateCounter(num, value);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


/* --- CURSOR GLOW ON MOUSE MOVE (hero section only) --- */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mx', `${x}%`);
    hero.style.setProperty('--my', `${y}%`);
  });
}


/* --- CARD TILT EFFECT --- */
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
