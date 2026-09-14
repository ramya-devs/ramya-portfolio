const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const progress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});

const sections = [...document.querySelectorAll('main section[id]')];
const navItems = [...document.querySelectorAll('.nav-links a:not(.nav-resume)')];

function updatePageUI() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
  backTop.classList.toggle('show', scrollTop > 500);

  let current = 'home';
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 130) current = section.id;
  });
  navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
}

window.addEventListener('scroll', updatePageUI, { passive: true });
updatePageUI();

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();
