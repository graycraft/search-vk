import "../components/FieldNumber.js";
import { AGE } from "../lib/constants.js";

class VHome extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(this.newFormFind);
  }
  get newButtonSearch() {
    const button = document.createElement("button");

    button.addEventListener("click", this.onClickSearch.bind(this));
    button.textContent = "Search";
    button.type = "button";

    return button;
  }
  get newFieldDay() {
    const field = document.createElement("c-field-number");

    field.label = "Day";
    field.max = "31";
    field.value = "1";

    return field;
  }
  get newFieldMonth() {
    const field = document.createElement("c-field-number");

    field.label = "Month";
    field.max = "12";
    field.value = "1";

    return field;
  }
  get newFieldYear() {
    const field = document.createElement("c-field-number");

    field.label = "Year";
    field.max = this.yearMax;
    field.min = this.yearMin;
    field.value = this.yearMin;

    return field;
  }
  get newFieldsetFind() {
    const fieldset = document.createElement("fieldset");

    this.buttonSearch = this.newButtonSearch;
    this.fieldDay = this.newFieldDay;
    this.fieldMonth = this.newFieldMonth;
    this.fieldYear = this.newFieldYear;
    this.legendFind = this.newLegendFind;
    fieldset.appendChild(this.legendFind);
    fieldset.appendChild(this.fieldDay);
    fieldset.appendChild(this.fieldMonth);
    fieldset.appendChild(this.fieldYear);
    fieldset.appendChild(this.buttonSearch);

    return fieldset;
  }
  get newLegendFind() {
    const legend = document.createElement("legend");

    legend.textContent = "Find people by date of birth";

    return legend;
  }
  get newFormFind() {
    const form = document.createElement("form");

    this.fieldsetFind = this.newFieldsetFind;
    form.appendChild(this.fieldsetFind);
    //form.innerHTML = this.template;

    return form;
  }
  get newListFound() {
    const ol = document.createElement("ol");

    this.users.forEach(user => {
      ol.appendChild(this.newListItem(user));
    });

    return ol;
  }
  newListItem(j) {
    const li = document.createElement("li");

    li.textContent = JSON.stringify(j);

    return li;
  }
  /*get template() {
    return `
      <fieldset>
        <legend>Find people by date of birth</legend>
        <c-field-number label="Day" max="31" value="1"></c-field-number>
        <c-field-number label="Month" max="12" value="1"></c-field-number>
        <c-field-number label="Year" max="${this.yearMax}" min="${
      this.yearMin
    }" value="${this.yearMin}"></c-field-number>
        <button onclick="onClickSearch()" type="button">Apply</button>
      </fieldset>
    `;
  }*/
  get yearMax() {
    return String(this.yearNow - AGE.MIN);
  }
  get yearMin() {
    return String(this.yearNow - AGE.MAX);
  }
  get yearNow() {
    return new Date().getFullYear();
  }
  onClickSearch(e) {
    const params = {
      birth_day: this.fieldDay.value,
      birth_month: this.fieldMonth.value,
      birth_year: this.fieldYear.value,
      fields: "bdate,domain,maiden_name,middle_name,photo_50",
      v: "5.89"
    };

    VK.Api.call("users.search", params, r => {
      console.dir(r);
      if (r.response) {
        this.users = r.response.items;
        this.shadowRoot.appendChild(this.newListFound);
      }
    });
  }
}

window.customElements.define("v-home", VHome);
