import './assets/styles/styles.css';

function toggleNavbar() {
  const navbarList = document.querySelector('.navbar__list');
  const navbarToggle = document.querySelector('.navbar__toggle');

  navbarToggle?.addEventListener('click', () => {
    if (navbarList?.getAttribute('data-visible') === 'true') {
      navbarList?.setAttribute('data-visible', false);
      navbarToggle?.setAttribute('aria-expanded', false);
    } else {
      navbarList?.setAttribute('data-visible', true);
      navbarToggle?.setAttribute('aria-expanded', true);
    }
  });
}

function listeners() {
  toggleNavbar();
}

listeners();
