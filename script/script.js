// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ---- TICKER / TEXT SLIDER ----
(function initTicker() {
  const slides = document.querySelectorAll('.ticker-slide');
  const dotsContainer = document.getElementById('tickerDots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let interval;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('ticker-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goTo(i);
      resetInterval();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.ticker-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    const nextIndex = (current + 1) % slides.length;
    goTo(nextIndex);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  resetInterval();
})();

// ---- SMOOTH ACTIVE NAV LINK ----
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--purple)';
    }
  });
}
window.addEventListener('scroll', setActiveLink);

// ---- FADE-UP ON SCROLL ----
function initFadeUps() {
  const fadeEls = document.querySelectorAll('.fade-up');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));
}
initFadeUps();

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fname || !lname || !email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add('visible');

      setTimeout(() => {
        formSuccess.classList.remove('visible');
      }, 5000);
    }, 1200);
  });
}

// ---- PLAN CARD HOVER TILT ----
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    if (!card.classList.contains('recommended')) {
      card.style.transform = `translateY(-6px) rotateY(${x}deg) rotateX(${-y}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('recommended')) {
      card.style.transform = '';
    }
  });
});

// ---- SOCIAL CARD RIPPLE ----
document.querySelectorAll('.social-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(140,29,191,0.12);
      width:4px; height:4px;
      left:${e.offsetX}px; top:${e.offsetY}px;
      transform:translate(-50%,-50%) scale(0);
      animation:ripple 0.6s ease-out forwards;
      pointer-events:none;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
  }
`;
document.head.appendChild(style);