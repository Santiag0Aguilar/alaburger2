/* Generar mensaje */
import { getCart } from "./cartStorage.js";
import { getNotes } from "./cartNotes.js";

export function generarMensajeWhatsApp() {
  const cart = getCart();
  if (!cart.length) return "";

  let total = 0;
  let mensaje = "🛒 *Pedido*\n\n";

  cart.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    mensaje += `• ${item.nombre}`;
    if (item.size) mensaje += ` (${item.size})`;
    mensaje += ` x${item.cantidad} — $${subtotal}\n`;
  });

  const notes = getNotes();
  if (notes) {
    mensaje += `\n📝 *Notas del cliente:*\n${notes}\n`;
  }

  mensaje += `\n💵 *Total: $${total}*`;

  return encodeURIComponent(mensaje);
}

export function enviarPedidoWhatsApp(telefono) {
  const mensaje = generarMensajeWhatsApp();
  if (!mensaje) return;

  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}
