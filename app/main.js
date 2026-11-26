// main.js — bootstrap. One job: render the current hash route on load
// and whenever it changes, and redraw charts when the window resizes.
import { render } from "./views.js";

window.addEventListener("hashchange", render);
let resizeTimer = 0;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 150);
});
render();
