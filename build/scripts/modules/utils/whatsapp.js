/* Generar mensaje */
import { getCart } from "./cartStorage.js";
import { getNotes } from "./cartNotes.js";

export function generarMensajeWhatsApp() {
  const cart = getCart();
  if (!cart.length) return "";

  let total = 0;

  let mensaje =
    "🔥 *ALA BURGER* 🔥\n" +
    "━━━━━━━━━━━━━━━\n" +
    "🍔 *Pedido del cliente*\n\n";

  cart.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    mensaje += `• ${item.nombre}`;
    if (item.size) mensaje += ` (${item.size})`;
    mensaje += `\n  ➕ Cantidad: ${item.cantidad}`;
    mensaje += `\n  💲 Subtotal: $${subtotal}\n\n`;
  });

  const notes = getNotes();
  if (notes) {
    mensaje += "📝 *Notas del pedido*\n" + `${notes}\n\n`;
  }

  mensaje +=
    "━━━━━━━━━━━━━━━\n" +
    `💵 *Total a pagar: $${total}*\n\n` +
    "✅ *Gracias por ordenar en AlaBurger* 🍔";

  return encodeURIComponent(mensaje);
}

export function enviarPedidoWhatsApp(telefono) {
  const mensaje = generarMensajeWhatsApp();
  if (!mensaje) return;

  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}
