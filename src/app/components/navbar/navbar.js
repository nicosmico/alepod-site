import BaseCustomElement from '../../core/base-custom-element';
import './navbar.css';
import logoAlepodSquare from '../../../assets/images/logo-alepod-square.svg';

export default class Navbar extends BaseCustomElement {
  toggleButton = null;
  menuList = null;

  constructor() {
    super();
    this.htmlTemplate = () => `
      <button class="navbar__toggle" aria-expanded="false"><span class="sr-only">Menu</span></button>
      <img class="navbar__logo" src="${logoAlepodSquare}" alt="Logo cuadrado de Alepod.">

      <ul class="navbar__list bg-primary txt-on-primary flex-column gap-2" data-visible="false">
        <li><a class="navbar__link uppercase ft-headline active" href="#home">
          <span>01</span>Agendar hora
        </a></li>
        <li><a class="navbar__link uppercase ft-headline" href="#locations">
          <span>02</span>Localidades
        </a></li>
        <li><a class="navbar__link uppercase ft-headline" href="#questions">
          <span>03</span>Preguntas
        </a></li>
        <li><a class="navbar__link uppercase ft-headline" href="#comments">
          <span>04</span>Comentarios
        </a></li>
        <li><a class="navbar__link uppercase ft-headline" href="#about-me">
          <span>05</span>Sobre mi
        </a></li>
      </ul>
    `;
  }

  afterFirstRender() {
    this.toggleButton = document.querySelector('.navbar__toggle');
    this.menuList = document.querySelector('.navbar__list');
    this.menuLinks = document.querySelectorAll('.navbar__link');
    this.updateActiveLink();

    this.toggleButton.addEventListener('click', () => {
      this.toggleMenu();
    });

    // TODO: See if this is need after add scroll logic
    window.addEventListener('hashchange', () => {
      this.updateActiveLink();
      this.closeMenu();
    });
  }

  toggleMenu() {
    return this.menuOpened() ? this.closeMenu() : this.openMenu();
  }

  menuOpened() {
    return this.menuList.getAttribute('data-visible') === 'true';
  }

  openMenu() {
    this.menuList.setAttribute('data-visible', true);
    this.toggleButton.setAttribute('aria-expanded', true);
  }

  closeMenu() {
    this.menuList.setAttribute('data-visible', false);
    this.toggleButton.setAttribute('aria-expanded', false);
  }

  updateActiveLink() {
    const url = new URL(window.location.href);
    const { hash } = url;

    if (!hash) {
      this.menuLinks[0].classList.add('active');
      return;
    }

    this.menuLinks.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
