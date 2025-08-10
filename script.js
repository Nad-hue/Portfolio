document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    faders.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(element => observer.observe(element));
  }

  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const id = link.getAttribute('href').substring(1);
          link.classList.toggle('active', id === entry.target.id);
        });
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => navObserver.observe(section));

  const toggleBtn = document.getElementById('theme-toggle');
  const applyTheme = mode => {
    document.body.classList.toggle('light', mode === 'light');
    localStorage.setItem('theme', mode);
    toggleBtn.textContent = mode === 'light' ? '🌙' : '☀️';
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.reset();
    formMsg.textContent = 'Gracias por tu mensaje. Te contactaré pronto.';
  });
});
