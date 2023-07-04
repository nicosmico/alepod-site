import './assets/styles/styles.css';

function toggleNavbar() {
  const navbarList = document.querySelector('.navbar__list');
  const navbarToggle = document.querySelector('.navbar__toggle');
  if (navbarList?.getAttribute('data-visible') === 'true') {
    navbarList?.setAttribute('data-visible', false);
    navbarToggle?.setAttribute('aria-expanded', false);
  } else {
    navbarList?.setAttribute('data-visible', true);
    navbarToggle?.setAttribute('aria-expanded', true);
  }
}

function styleActiveLink() {
  const navbarLinks = document.querySelectorAll('.navbar__link');
  navbarLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function listeners() {
  const navbarToggle = document.querySelector('.navbar__toggle');
  navbarToggle?.addEventListener('click', () => {
    toggleNavbar();
  });

  window.addEventListener('hashchange', () => {
    styleActiveLink();
  });
}

listeners();
