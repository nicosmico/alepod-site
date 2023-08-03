// TODO: Use shadow dom

export default class BaseWebComponent extends HTMLElement {
  // Set defaults or perform other pre-rendering processes.
  constructor() {
    super();

    // Custom
    this.htmlTemplate = () => `${this.localName} works!`;
    this._render = () => {
      this.innerHTML = this.htmlTemplate();
    };
  }

  // Executed when the component is added to the DOM
  connectedCallback() {
    this._render();
    if (this.afterFirstRender) this.afterFirstRender();
  }

  // Executed when the component is removed from the DOM
  // disconnectedCallback() {
  // }

  // Method to declare atributes to observe on changes
  static get observedAttributes() {
    return [];
  }

  // Executed when any attribute of the component changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
    this._render();
  }

  // Logic executed when the component is moved to a new document
  // adoptedCallback() {
  // }
}
