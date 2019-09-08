import "../components/FieldNumber.js";
import "../components/Fieldset.js";
import { AGE, VKONTAKTE } from "../lib/constants.js";

class VHome extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" }),
      style = document.createElement("style");

    style.textContent = `
      img {
        border: 1px white solid;
        vertical-align: middle;
      }
    `;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(this._newFormFind());
  }
  _newButtonSearch() {
    const button = document.createElement("button");

    button.addEventListener("click", this._onClickSearch.bind(this));
    button.textContent = "Search";
    button.type = "button";

    return button;
  }
  _newDetailsFound(f) {
    const details = document.createElement("details");

    this.summaryFound = this._newSummaryFound();
    details.appendChild(this.summaryFound);

    return details;
  }
  _newFieldDay() {
    const field = document.createElement("c-field-number");

    field.label = "Day";
    field.max = "31";
    field.value = "";

    return field;
  }
  _newFieldMonth() {
    const field = document.createElement("c-field-number");

    field.label = "Month";
    field.max = "12";
    field.value = "";

    return field;
  }
  _newFieldYear() {
    const field = document.createElement("c-field-number");

    field.label = "Year";
    field.max = this.yearMax;
    field.min = this.yearMin;
    field.value = "";

    return field;
  }
  _newFieldsetFind() {
    const fieldset = document.createElement("c-fieldset");

    this.buttonSearch = this._newButtonSearch();
    this.fieldDay = this._newFieldDay();
    this.fieldMonth = this._newFieldMonth();
    this.fieldYear = this._newFieldYear();
    fieldset.legend = "Find people by date of birth";
    fieldset.nodes = [
      this.fieldDay,
      this.fieldMonth,
      this.fieldYear,
      this.buttonSearch
    ];

    return fieldset;
  }
  _newFormFind() {
    const form = document.createElement("form");

    this.detailsFound = this._newDetailsFound();
    this.fieldsetFind = this._newFieldsetFind();
    form.appendChild(this.fieldsetFind);
    form.appendChild(this.detailsFound);

    return form;
  }
  _newListFound(l) {
    const ol = document.createElement("ol");

    l.forEach(user => {
      ol.appendChild(this._newListItem(user));
    });

    return ol;
  }
  _newListItem(j) {
    const li = document.createElement("li");

    li.innerHTML = `
      <img alt="Loading image…" src="${j.photo_50}" />
      <b>${j.first_name} ${j.middle_name || j.nickname} ${j.last_name ||
      j.maiden_name}</b>
      <span>${j.bdate || ""}</span>
      <a href="https://vk.com/${j.domain}">${j.domain}</a>
    `;

    return li;
  }
  _newSummaryFound() {
    const summary = document.createElement("summary");

    summary.textContent = 'Click "Search" to found users';

    return summary;
  }
  _onClickSearch(e) {
    const params = {
      birth_day: this.fieldDay.value,
      birth_month: this.fieldMonth.value,
      birth_year: this.fieldYear.value /* || VK.USER.MIN_YEAR*/,
      count: VKONTAKTE.USER.MAX_COUNT,
      fields: VKONTAKTE.USER.SEARCH_FIELDS.join(),
      v: VKONTAKTE.VERSION
    };

    try {
      VK.Api.call("users.search", params, r => {
        console.dir(r);
        if (r.response) {
          const listFound = this._newListFound(r.response.items);

          if (!this.listFound) {
            this.detailsFound.appendChild(listFound);
          } else {
            this.listFound.replaceWith(listFound);
          }
          this.summaryFound.textContent = `Found ${
            r.response.count
          } users. Click here to see the first ${r.response.items.length}`;
          this.fieldsetFind.message = "";
          this.fieldsetFind.state = "valid";
          this.listFound = listFound;
        }
        if (r.error) {
          this.fieldsetFind.message = `${r.error.error_code}: ${
            r.error.error_msg
          }`;
          this.fieldsetFind.state = "invalid";
        }
      });
    } catch (x) {
      this.fieldsetFind.message = `${x.name}: ${x.message}`;
      this.fieldsetFind.state = "invalid";
    }
  }
  get yearMax() {
    return String(this.yearNow - AGE.MIN);
  }
  get yearMin() {
    return String(this.yearNow - AGE.MAX);
  }
  get yearNow() {
    return new Date().getFullYear();
  }
}

// Catch CodeSandbox `DOMException` bug
try {
  customElements.define("v-home", VHome);
} catch (x) {
  console.log(x);
}
