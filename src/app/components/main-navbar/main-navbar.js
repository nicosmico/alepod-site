import logoSvgRaw from '!!raw-loader!../../../assets/images/logo-alepod-square.svg';
import BaseCustomElement from '../../core/base-custom-element';
import debounce from '../../utils/debounce';
import './main-navbar.css';

export default class MainNavbar extends BaseCustomElement {
  menuOpen = false;
  darkTheme = false;

  toggleMenuButton = null;
  toggleThemeButton = null;
  menuList = null;
  menuLinks = null;
  body = null;

  sections = {
    home: { number: '01', title: 'Agendar hora', href: '#home' },
    locations: { number: '02', title: 'Localidades', href: '#locations' },
    questions: { number: '03', title: 'Preguntas', href: '#questions' },
    'about-me': { number: '04', title: 'Sobre mi', href: '#about-me' },
    comments: { number: '05', title: 'Comentarios', href: '#comments' },
  };

  sectionsOrder = ['home', 'locations', 'questions', 'about-me', 'comments'];

  navLink = (section) => `<li><a class="navbar__link uppercase ft-headline" href="${section.href}" data-test="navbar-link"><span>${section.number}</span>${section.title}</a></li>`;

  constructor() {
    super();

    const savedDarkTheme = localStorage.getItem('dark-theme');
    this.darkTheme = savedDarkTheme === 'true';
  }

  htmlTemplate() {
    const listLinks = this.sectionsOrder
      .map((sectionName) => this.sections[sectionName])
      .map((section) => this.navLink(section))
      .join('');

    return `
    <a class="navbar__title f-family-sans-2" href="#home">ALEPOD</a>
    <div class="navbar__logo">${logoSvgRaw}</div>
    <button class="navbar__toggle" aria-expanded="false" data-test="navbar-toggle">
      <span class="sr-only">Menu</span>
    </button>

    <ul class="navbar__list bg-primary txt-on-primary flex-column gap-2" data-visible="false" data-test="navbar-list">
      ${listLinks}
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

    // Listen change section on menu
    window.addEventListener('hashchange', () => {
      this.closeMenu();
    });

    // Run async to wait for page custom elements to render
    setTimeout(() => {
      const defaultSection = window.location.hash;
      this.updateActiveSection(defaultSection.length ? defaultSection : this.sections.home.href);

      // Get sections scroll breakpoints
      const sectionsScrollBreakpoints = this.sectionsOrder.reduce((acc, section) => {
        const el = document.getElementById(section);
        acc[section] = {
          top: el.offsetTop,
          bottom: el.offsetTop + el.offsetHeight,
        };
        return acc;
      }, {});

      // Listen scroll changes
      const updateActiveSectionOnScroll = debounce(() => {
        const currentSection = this.sectionsOrder.find((s) => {
          const sectionEl = sectionsScrollBreakpoints[s];
          const scrollY = Math.ceil(window.scrollY) + 1;
          return scrollY >= sectionEl.top && scrollY < sectionEl.bottom;
        });
        this.updateActiveSection(`#${currentSection}`);
      }, 20);
      document.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true, capture: true });
    }, 50);
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

  updateActiveSection(sectionId) {
    this.menuLinks.forEach((link) => {
      if (link.getAttribute('href') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
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
