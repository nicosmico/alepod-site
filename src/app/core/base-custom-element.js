/**
 * BaseCustomElement - A custom element base to provide common functionality for custom elements.
 */
export default class BaseCustomElement extends HTMLElement {
  // constructor() {
  //   super();
  // }

  /**
   * (HTMLElement) Executed when the component is added to the DOM.
   * Excecute afterFirstRender that can be override by child class.
   */
  connectedCallback() {
    this.render();
    if (this.afterFirstRender) this.afterFirstRender();
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
    this.render();
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
  renderTemplate() {
    return `${this.localName} works!`;
  }

  /**
   * Render the defined template
   */
  render() {
    // console.log(`${this.localName} -> render()`);
    this.innerHTML = this.renderTemplate();
  }

  /**
   * Return a getter and setter to render when value change
   */
  createSetter(defaultValue) {
    let value = defaultValue;
    const getValue = () => value;
    const setValue = (newValue) => {
      // console.log('setValue: ', value, newValue);
      value = newValue;
      this.render();
    };
    return [getValue, setValue];
  }
}
