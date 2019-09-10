class CFieldNumber extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" }),
      style = document.createElement("style");

    style.textContent = `
      .message { color: white; }
      input {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }
      input[type=number]::-webkit-inner-spin-button { opacity: 1; }
      label {
        display: block;
        margin-bottom: .5em;
        padding: .25em;
      }
      label.invalid { background-color: red; }
      label.valid { background-color: green; }
    `;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this._newLabelElement());
  }
  _newDivMessageElement() {
    const div = document.createElement("div");

    div.className = "message";

    return div;
  }
  _newInputElement() {
    const input = document.createElement("input");

    input.addEventListener("input", this._onInput.bind(this));
    input.max = this.getAttribute("max");
    input.min = this.getAttribute("min") || "1";
    input.required = true;
    input.step = this.getAttribute("step");
    input.type = "number";
    input.value = this.getAttribute("value");

    return input;
  }
  _newLabelElement() {
    const label = document.createElement("label");

    this.inputElement = this._newInputElement();
    this.messageElement = this._newDivMessageElement();
    this.spanLabelElement = this._newSpanLabelElement();
    label.appendChild(this.spanLabelElement);
    label.appendChild(this.inputElement);
    label.appendChild(this.messageElement);

    return label;
  }
  _newSpanLabelElement() {
    const span = document.createElement("span");

    span.className = "label";
    span.textContent = this.getAttribute("label") + " ";

    return span;
  }
  _onInput(e) {
    this._setLabelState(this.inputElement);
  }
  _setLabelState(w) {
    if (w.validity.valid) {
      w.parentElement.classList.add("valid");
      w.parentElement.classList.remove("invalid");
      w.nextElementSibling.textContent = "";
    } else {
      w.parentElement.classList.add("invalid");
      w.parentElement.classList.remove("valid");
      w.nextElementSibling.textContent = w.validationMessage;
    }
  }
  get label() {
    return this.spanLabeElement.textContent;
  }
  set label(v) {
    this.spanLabelElement.textContent = v + " ";
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
  get validity() {
    this.inputElement.checkValidity();
    this.inputElement.reportValidity();
    this._setLabelState(this.inputElement);

    return this.inputElement.validity;
  }
  get value() {
    return this.inputElement.value;
  }
  set value(v) {
    this.inputElement.value = v;
  }
  static get observedAttributes() {
    return ["label", "max", "min", "step", "validity", "value"];
  }
}

// Catch CodeSandbox `DOMException` bug
try {
  customElements.define("c-field-number", CFieldNumber);
} catch (x) {
  console.log(x);
}
