import logoSvgRaw from '!!raw-loader!../../../assets/images/logo-alepod-square.svg';
import BaseCustomElement from '../../core/base-custom-element';
import './navbar.css';

export default class MainNavbar extends BaseCustomElement {
  menuOpen = false;
  darkTheme = false;

  toggleMenuButton = null;
  toggleThemeButton = null;
  menuList = null;
  menuLinks = null;
  body = null;

  sections = [
    { number: '01', title: 'Agendar hora', href: '#home' },
    { number: '02', title: 'Localidades', href: '#locations' },
    { number: '03', title: 'Preguntas', href: '#questions' },
    { number: '04', title: 'Sobre mi', href: '#about-me' },
    { number: '05', title: 'Comentarios', href: '#comments' },
  ];

  navLink = (section) => `<li><a class="navbar__link uppercase ft-headline active" href="${section.href}" data-test="navbar-link"><span>${section.number}</span>${section.title}</a></li>`;

  constructor() {
    super();

    // Check saved and prefers theme
    const savedDarkTheme = localStorage.getItem('dark-theme');
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.darkTheme = savedDarkTheme ? savedDarkTheme === 'true' : prefersDarkTheme;
  }

  htmlTemplate() {
    const listLinks = this.sections.map((section) => this.navLink(section));

    return `
    <a class="navbar__title f-family-sans-2" href="#home">ALEPOD</a>
    <div class="navbar__logo">${logoSvgRaw}</div>
    <button class="navbar__toggle" aria-expanded="false" data-test="navbar-toggle">
      <span class="sr-only">Menu</span>
    </button>

    <ul class="navbar__list bg-primary txt-on-primary flex-column gap-2" data-visible="false" data-test="navbar-list">
      ${listLinks.join('')}
      <button class="toggle-theme" data-dark="${this.darkTheme}" data-test="navbar-theme-toggle"></button>
    </ul>
    `;
  }

  afterFirstRender() {
    // Selectors
    this.toggleMenuButton = this.querySelector('.navbar__toggle');
    this.toggleThemeButton = this.querySelector('.toggle-theme');
    this.menuList = this.querySelector('.navbar__list');
    this.menuLinks = this.querySelectorAll('.navbar__link');
    this.body = document.querySelector('body');

    // Dark theme
    this.setDarkTheme(this.darkTheme);
    this.toggleThemeButton.addEventListener('click', () => {
      this.setDarkTheme(!this.darkTheme);
      this.closeMenu();
    });

    // Togle menu
    this.toggleMenuButton.addEventListener('click', () => (this.menuOpen ? this.closeMenu() : this.openMenu()));

    // Handle active location
    this.changeActiveOnNavigation();
    window.addEventListener('hashchange', () => {
      this.changeActiveOnNavigation();
    });
  }

  openMenu() {
    this.menuOpen = true;
    this.menuList.setAttribute('data-visible', true);
    this.toggleMenuButton.setAttribute('aria-expanded', true);
    this.classList.remove('txt-primary');
    this.classList.add('txt-on-primary');
  }

  closeMenu() {
    this.menuOpen = false;
    this.menuList.setAttribute('data-visible', false);
    this.toggleMenuButton.setAttribute('aria-expanded', false);
    this.classList.add('txt-primary');
    this.classList.remove('txt-on-primary');
  }

  changeActiveOnNavigation() {
    let hasHash = false;
    this.menuLinks.forEach((link) => {
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
        hasHash = true;
        this.closeMenu();
      } else {
        link.classList.remove('active');
      }
    });

    if (!hasHash) {
      this.menuLinks[0].classList.add('active');
    }
  }

  setDarkTheme(value) {
    this.darkTheme = value;
    if (value) {
      this.body.classList.add('dark');
    } else {
      this.body.classList.remove('dark');
    }
    this.toggleThemeButton.setAttribute('data-dark', value);
    localStorage.setItem('dark-theme', value);
  }
}
