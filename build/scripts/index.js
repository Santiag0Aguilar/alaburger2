import HeaderActive from "./modules/ui/HeaderActive.js";
import initMenu from "./modules/ui/initMenu.js";
import initMenuProductos from "./modules/ui/initMenuProductos.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initMenuProductos();
  initMenu();
  HeaderActive();
});
