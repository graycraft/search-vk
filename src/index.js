import "normalize.css";

import "./assets/style.css";
import "./views/Home.js";

const App = document.getElementById("app"),
  VHome = document.createElement("v-home"),
  apiId = new URL(document.location).searchParams.get("vkApiId"),
  divMessage = newDivMessage();

App.innerHTML = "";
App.appendChild(divMessage);
App.appendChild(VHome);

window.vkAsyncInit = () => {
  try {
    VK.init({ apiId });
  } catch (x) {
    setDivMessage(divMessage, "invalid", `${x.name}: ${x.message}`);
  }
};
window.setTimeout(() => {
  const element = document.createElement("script");

  element.addEventListener("error", e => {
    // prettier-ignore
    setDivMessage(
      divMessage,
      "invalid",
      `${e.type}: ${e.message || `Failed to load \`${e.target.src}\`. 
      Check your browser settings and network connection.`}`
    );
  });
  element.addEventListener("load", e => {
    setDivMessage(
      divMessage,
      "valid",
      `VK Open API initialized with App ID ${apiId}`
    );
  });
  element.async = true;
  element.src = "//vk.com/js/api/openapi.js";
  element.type = "text/javascript";
  document.getElementById("vk_api_transport").appendChild(element);
}, 0);

function newDivMessage() {
  const div = document.createElement("div");

  div.className = "message";
  div.style.color = "white";

  return div;
}
function setDivMessage(w, a, t) {
  if (a === "valid") {
    w.style.backgroundColor = "green";
  } else if (a === "invalid") {
    w.style.backgroundColor = "red";
  }
  w.textContent = t;
}
