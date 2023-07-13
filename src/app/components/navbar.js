export default class Navbar {
  constructor() {
    this.navbarToggle = document.querySelector('.navbar__toggle');
    this.sidenav = document.querySelector('.navbar__list');
    this.navbarLinks = document.querySelectorAll('.navbar__link');
  }

  init() {
    this.navbarToggle?.addEventListener('click', () => {
      this.toggle();
    });

    window.addEventListener('hashchange', () => {
      this.navbarLinks?.forEach((link) => {
        if (link.href === window.location.href) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      this.close();
    });
  }

  open() {
    this.sidenav?.setAttribute('data-visible', true);
    this.navbarToggle?.setAttribute('aria-expanded', true);
  }

  close() {
    this.sidenav?.setAttribute('data-visible', false);
    this.navbarToggle?.setAttribute('aria-expanded', false);
  }

  opened() {
    return this.sidenav?.getAttribute('data-visible') === 'true';
  }

  toggle() {
    if (this.opened()) {
      this.close();
    } else {
      this.open();
    }
  }
}
