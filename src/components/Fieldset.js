class CFieldset extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" }),
      style = document.createElement("style");

    style.textContent = `
      .message { color: white; }
      button {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }
      fieldset {
        margin-bottom: .5em;
        padding: .5em 1em;
      }
      fieldset.invalid { background-color: red; }
      fieldset.valid { background-color: green; }
    `;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this._newFieldsetElement());
  }
  _newDivMessageElement() {
    const div = document.createElement("div");

    div.className = "message";

    return div;
  }
  _newDivNodesElement() {
    const div = document.createElement("div");

    div.className = "nodes";

    return div;
  }
  _newFieldsetElement() {
    const fieldset = document.createElement("fieldset");

    this.legendElement = this._newLegendElement();
    this.messageElement = this._newDivMessageElement();
    this.nodesElement = this._newDivNodesElement();
    fieldset.appendChild(this.legendElement);
    fieldset.appendChild(this.nodesElement);
    fieldset.appendChild(this.messageElement);

    return fieldset;
  }
  _newLegendElement() {
    const legend = document.createElement("legend");

    legend.textContent = this.getAttribute("legend");

    return legend;
  }
  _validateInput(w, a) {
    if (a === "valid") {
      w.parentElement.classList.add(a);
      w.parentElement.classList.remove("invalid");
    } else if (a === "invalid") {
      w.parentElement.classList.add(a);
      w.parentElement.classList.remove("valid");
    }
  }
  get legend() {
    return this.legendElement.textContent;
  }
  set legend(v) {
    this.legendElement.textContent = v;
  }
  get message() {
    return this.messageElement.textContent;
  }
  set message(v) {
    this.messageElement.textContent = v;
  }
  get nodes() {
    return this.nodesElement.childNodes;
  }
  set nodes(v) {
    v.forEach(node => this.nodesElement.appendChild(node));
  }
  get state() {
    return this.messageElement.textContent;
  }
  set state(v) {
    this._validateInput(this.messageElement, v);
  }
  static get observedAttributes() {
    return ["legend", "message", "nodes", "state"];
  }
}

// Catch CodeSandbox `DOMException` bug
try {
  customElements.define("c-fieldset", CFieldset);
} catch (x) {
  console.log(x);
}
