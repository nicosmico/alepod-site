/**
 * BaseCustomElement - A custom element base to provide common functionality for custom elements.
 */
export default class BaseCustomElement extends HTMLElement {
  config = {};

  /**
   * Creates a new BaseCustomElement.
   * Set defaults or perform other pre-rendering processes.
   *
   * @param {Object} config - Base configuration.
   * @param {string[]} config.reactiveProperties - Declare reactive properties.
   */
  constructor(config = {}) {
    super();
    this.config = config;
  }

  /**
   * (HTMLElement) Executed when the component is added to the DOM.
   * Excecute afterFirstRender that can be override by child class.
   * Excecute reactiveProperties after first render method.
   */
  connectedCallback() {
    this._render();
    if (this.afterFirstRender) this.afterFirstRender();
    if (this.config.reactiveProperties) this.reactiveProperties(this.config.reactiveProperties);
  }

  /**
   * (HTMLElement) Executed when the component is removed from the DOM
   */
  // disconnectedCallback() {
  // }

  /**
   * (HTMLElement) Method to declare attributes to observe on changes.
   * Atributte's name can't have mayus. Format: simple or simple-with-dash
   * @returns {string[]} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * (HTMLElement) Executed when any attribute of the component changes.
   * Use this.setAttribute('attributeName', 'New value hehe'); to execute this callback.
   *
   * @param {string} name - The name of the changed attribute.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
    this._render();
  }

  /**
   * (HTMLElement) Logic executed when the component is moved to a new document
   */
  // adoptedCallback() {
  // }

  /**
   * Define template to render.
   *
   * @returns {string} The template to render.
   */
  render() {
    return `${this.localName} works!`;
  }

  /**
   * Render template.
   */
  _render() {
    // console.log(`${this.localName} -> _render()`);
    this.innerHTML = this.render();
  }

  /**
   * Define properties to observe and render the component when they change.
   *
   * @param {string[]} props - An array of property names to observe.
   */
  reactiveProperties(props) {
    props.forEach((prop) => {
      const name = prop.toString();

      // Store initial value in '_property' before overwriting it with get/set
      this[`_${name}`] = this[prop];

      Object.defineProperty(this, name, {
        set(value) {
          // console.log(`SET ${this.localName}.${name} -> _render()`);
          this[`_${name}`] = value;
          this._render();
        },
        get() {
        // console.log(`GET ${this.localName}.${name}`);
          return this[`_${name}`];
        },
      });
    });
  }
}
