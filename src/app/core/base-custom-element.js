export default class BaseCustomElement extends HTMLElement {
  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // HTMLElement methods ///////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////////////////////

  // Executed when the custom element is instanced.
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // Executed when the custom element is added to the DOM.
  connectedCallback() {
    this.render();
    this.afterFirstRender();
  }

  // Excecuted when the custom element is removed from the DOM.
  disconnectedCallback() {}

  // Method to declare attributes to observe on changes.
  // This method must be overrided.
  // Atributte's name can't have mayus. (ex. attributename or attribute-name)
  static get observedAttributes() {
    return [];
  }

  // Executed when any attribute of the component changes.
  // Use this.setAttribute('attributename', 'New value here'); to execute this callback.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
    this.render();
  }

  // Executed when the component is moved to a new document.
  // (ex. someone called document.adoptNode(el)).
  adoptedCallback() {}

  // ///////////////////////////////////////////////////////////////////////////////////////////////
  // BaseCustomElement methods /////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////////////////////

  // Executed after the component was added to the DOM.
  afterFirstRender() {}

  // Use to update the template in the html.
  // Executed when the component is added to the DOM or when any attribute of the component changes.
  // Render the parameter htmlTemplate or the content from htmlTemplate method.
  render(htmlTemplate = null) {
    this.innerHTML = htmlTemplate ?? this.htmlTemplate();
  }

  // Executed in render method to get HTML template.
  // This method must be overrided.
  htmlTemplate() {
    return `<p>${this.localName} works!</p>`;
  }

  // Used to create a getter and a setter.
  // When the setter is called, the render method will be executed.
  createSetter(defaultValue) {
    let value = defaultValue;
    const getValue = () => value;
    const setValue = (newValue) => {
      value = newValue;
      this.render();
    };
    return [getValue, setValue];
  }
}

// Extends this BaseCustomElement class to create a new custom element.
// class ExampleCustomElement extends BaseCustomElement {}

// Define custom element to use it in html
// customElements.define('example-custom-element', ExampleCustomElement);

// Use custom element in .html
// <example-custom-element myattr="value here" example-attr="other value">
// </example-custom-element>

// Use setAttribute to execute attributeChangedCallback and render the changes.
// this.setAttribute('attributename', 'New value here');
