import "normalize.css";

import "./assets/style.css";
import "./views/Home.js";

const App = document.getElementById("app"),
  VHome = document.createElement("v-home");

App.innerHTML = "";
App.appendChild(VHome);
