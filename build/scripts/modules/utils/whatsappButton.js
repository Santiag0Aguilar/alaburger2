import { enviarPedidoWhatsApp } from "./whatsapp.js";

export function initWhatsAppButton() {
  const btn = document.querySelector(".btn__whatsapp");
  if (!btn) return;

  btn.addEventListener("click", () => {
    enviarPedidoWhatsApp("5627347647"); // tu número
  });
}

initWhatsAppButton();
