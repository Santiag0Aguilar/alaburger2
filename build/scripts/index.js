import getMenu from "./modules/ui/getMenu.js";
import { actualizarContadorCarrito } from "./modules/ui/cartCounter.js";
import { renderCarrito } from "./modules/ui/renderCar.js";
import { initWhatsAppButton } from "./modules/utils/whatsappButton.js";
import { initCartNotes } from "./modules/ui/initNotes.js";
import initHeader from "./modules/ui/initHeader.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initMenuProductos();
  initHeader();
  HeaderActive();
  getMenu();
  actualizarContadorCarrito();
  renderCarrito();
  initWhatsAppButton();
  initCartNotes();
});
console.log("----- index.js loaded -----");
