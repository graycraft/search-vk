// Polyfill for crossbrowser support of Web Components
import "@webcomponents/custom-elements";
// Render markup consistently across browsers
import "normalize.css";

import "./src/assets/style.css";
import "./src/views/Home.js";

const App = document.getElementById("app"),
  VHome = document.createElement("v-home");

App.innerHTML = "";
App.appendChild(VHome);
