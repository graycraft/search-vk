class CFieldNumber extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement("style");
    const shadowRoot = this.attachShadow({ mode: "open" });

    style.textContent = `
      .message { color: white }
      label { 
        display: block;
        margin-bottom: .5em;
        padding: .25em
      }
      label.invalid { background-color: red }
      label.valid { background-color: green }
    `;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this.newLabelElement);
  }
  get newMessageElement() {
    const div = document.createElement("div");

    div.className = "message";

    return div;
  }
  get newInputElement() {
    const input = document.createElement("input");

    input.addEventListener("input", this.listenInput);
    input.max = this.getAttribute("max");
    input.min = this.getAttribute("min") || "1";
    input.step = this.getAttribute("step");
    input.type = "number";
    input.value = this.getAttribute("value");

    return input;
  }
  get label() {
    return this.spanLabel.textContent;
  }
  set label(v) {
    this.spanElement.textContent = v + " ";
  }
  get max() {
    return this.inputElement.max;
  }
  set max(v) {
    this.inputElement.max = v;
  }
  get min() {
    return this.inputElement.min;
  }
  set min(v) {
    this.inputElement.min = v;
  }
  get step() {
    return this.inputElement.step;
  }
  set step(v) {
    this.inputElement.step = v;
  }
  get value() {
    return this.inputElement.value;
  }
  set value(v) {
    this.inputElement.value = v;
  }
  get newLabelElement() {
    const label = document.createElement("label");

    this.spanElement = this.newSpanElement;
    this.inputElement = this.newInputElement;
    this.messageElement = this.newMessageElement;
    label.appendChild(this.spanElement);
    label.appendChild(this.inputElement);
    label.appendChild(this.messageElement);

    return label;
  }
  get newSpanElement() {
    const span = document.createElement("span");

    span.className = "label";
    span.textContent = this.getAttribute("label") + " ";

    return span;
  }
  listenInput(e) {
    if (this.validity.valid) {
      this.parentElement.classList.add("valid");
      this.parentElement.classList.remove("invalid");
      this.nextElementSibling.textContent = "";
    } else {
      this.parentElement.classList.add("invalid");
      this.parentElement.classList.remove("valid");
      this.nextElementSibling.textContent = this.validationMessage;
    }
  }
}

window.customElements.define("c-field-number", CFieldNumber);
