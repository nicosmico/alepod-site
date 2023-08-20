import BaseCustomElement from '../../core/base-custom-element';
import './contact-buttons.css';

export default class ContactButtons extends BaseCustomElement {
  htmlTemplate() {
    return `
    <a class="rounded-button button--primary width-100 box-shadow-1" href="tel:+56991759200" target="_blank" data-test="contact-call">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path stroke="currentColor" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
      </svg>
      <span>Llamar</span>
    </a>
    <a class="rounded-button button--green width-100 box-shadow-1" href="https://wa.me/+56991759200" target="_blank" data-test="contact-whatsapp">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path stroke="currentColor" d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
      <path stroke="currentColor" d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
      </svg>
      <span>Whatsapp</span>
    </a>
    `;
  }
}
