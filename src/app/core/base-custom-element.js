export default class BaseCustomElement extends HTMLElement {
  /**
   * HTML ELEMENT METHODS
   */

  // Set defaults or perform other pre-rendering processes.
  // constructor() {
  //   super();
  // }

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
  // Use this.setAttribute('attributeName', 'New value hehe'); to execute this callback
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
    this._render();
  }

  // Logic executed when the component is moved to a new document
  // adoptedCallback() {
  // }

  /**
   * CUSTOM METHODS
   */

  // Define template to render
  render() {
    return `${this.localName} works!`;
  }

  // Render template
  _render() {
    // console.log(`${this.localName} -> _render()`);
    this.innerHTML = this.render();
  }

  // Define properties to observe and render the component when they change
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
