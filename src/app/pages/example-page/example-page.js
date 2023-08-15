import '../../../assets/styles/styles.css';

console.log('This is an example page with his own js file');

// Custom Element example class
class ExampleCustomElement extends HTMLElement {
  // Executed when the custom element is instanced.
  constructor() {
    super();
    console.log('constructor()');
  }

  // Executed when the custom element is added to the DOM.
  // Use this.innerHTML = '<h1>Example component works!</h1>' to render content.
  connectedCallback() {
    console.log('connectedCallback()');
    this.innerHTML = '<p>Example component works!</p>';
  }

  // Excecuted when the custom element is removed from the DOM.
  disconnectedCallback() {
    console.log('disconnectedCallback()');
  }

  // Method to declare attributes to observe on changes.
  // Atributte's name can't have mayus. (ex. exampleattr or example-attr)
  static get observedAttributes() {
    console.log('observedAttributes()');
    return ['myattr', 'example-attr'];
  }

  // Executed when any attribute of the component changes.
  // Use this.setAttribute('attributeName', 'New value here'); to execute this callback.
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback()', { name, oldValue, newValue });
    if (oldValue === newValue) return;
    this[name] = newValue;
  }

  // Executed when the component is moved to a new document.
  // (ex. someone called document.adoptNode(el)).
  adoptedCallback() {
    console.log('adoptedCallback()');
  }
}

// Define custom element to use it in html
customElements.define('example-custom-element', ExampleCustomElement);

// Use custom element in .html
// <example-custom-element myattr="value here" example-attr="other value"></example-custom-element>
