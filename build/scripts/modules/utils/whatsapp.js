/* Generar mensaje */
import { getCart } from "./cartStorage.js";
import { getNotes, getFormData } from "./cartNotes.js";
import generalAlert from "./generalAlert.js";

const body = document.querySelector("body");
export function generarMensajeWhatsApp() {
  const cart = getCart();
  if (!cart.length) return "";

  const form = getFormData() || {};
  const propina = Number(form.propina) || 0;
  const efectivo = Number(form.efectivo) || 0;
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
    if (item.selections?.burger) mensaje += ` (${item.selections.burger})`;
    if (item.selections?.salsa) mensaje += ` (${item.selections.salsa})`;

    mensaje += `\n  ➕ Cantidad: ${item.cantidad}`;
    mensaje += `\n  💲 Subtotal: $${subtotal}\n\n`;
  });

  /* Notas por producto / carrito */
  const notes = getNotes();
  if (notes) {
    mensaje += "📝 *Notas del pedido*\n";
    mensaje += `${notes}\n\n`;
  }

  /* ===================== */
  /* INFO DEL FORMULARIO */
  /* ===================== */

  mensaje += "━━━━━━━━━━━━━━━\n";
  mensaje += "📋 *Datos del pedido*\n";

  if (form.pedido) {
    mensaje += `📦 *Tipo de pedido:* ${form.pedido}\n`;
  }

  if (form.pago) {
    mensaje += `💳 *Forma de pago:* ${form.pago}\n`;
  }

  if (form.pedido === "para llevar" && form.direccion) {
    mensaje += `📍 *Dirección:* ${form.direccion}\n`;
  }

  if (form.pago === "efectivo" && form.efectivo) {
    mensaje += `💵 *Pagaré con:* $${form.efectivo}\n`;
  }

  if (form.indicaciones) {
    mensaje += `📝 *Indicaciones:* ${form.indicaciones}\n`;
  }

  if (form.nombre) {
    mensaje += `👤 *Recibe:* ${form.nombre}\n`;
    mensaje += `👨‍🍳 ${form.nombre} , tu pedido se está preparando. #InnBeta `;
  }

  /* Datos bancarios si es transferencia */
  if (form.pago === "transferencia") {
    mensaje +=
      "\n━━━━━━━━━━━━━━━\n" +
      "\n🏦 *Datos para transferencia*\n" +
      "BBVA\n" +
      "Tarjeta de débito\n" +
      "4152 3136 2163 2301\n\n" +
      "N° de cuenta\n" +
      "157 831 7082\n\n" +
      "A nombre de\n" +
      "Diana Jamila Cruz Resendiz\n";
  }

  if (form.propina) {
    mensaje += `\nPropina:\n` + form.propina;
  }
  if (propina > 0) {
    mensaje += "\n━━━━━━━━━━━━━━━\n";
    mensaje += `Total sin propina:* $${total}`;
    mensaje += "\n━━━━━━━━━━━━━━━\n";
    mensaje += `💖 *Propina:* $${propina}\n`;
    total += propina;
  }
  /* Cambio si paga en efectivo */
  if (form.pago === "efectivo" && efectivo >= total) {
    const cambio = efectivo - total;
    mensaje += `💸 *Cambio:* $${cambio}\n`;
  }
  mensaje +=
    "\n━━━━━━━━━━━━━━━\n" +
    `💵 *Total a pagar con propina: $${total}*\n\n` +
    "✅ *Gracias por ordenar en AlaBurger* 🍔";

  return encodeURIComponent(mensaje);
}

export function enviarPedidoWhatsApp(telefono) {
  const cart = getCart();
  if (!cart.length) return;

  const form = getFormData() || {};

  const propina = Number(form.propina) || 0;
  const efectivo = Number(form.efectivo) || 0;

  const totalReal = calcularTotalConPropina(cart, propina);

  /* 🚨 VALIDACIÓN CLAVE */
  if (
    form.pedido === "para llevar" &&
    form.pago === "efectivo" &&
    efectivo < totalReal
  ) {
    body.appendChild(
      generalAlert(
        `El monto en efectivo no puede ser menor al total.\n\nTotal a pagar: $${totalReal}`
      )
    );
    return;
  }

  const mensaje = generarMensajeWhatsApp();
  if (!mensaje) return;

  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}

function calcularTotalConPropina(cart, propina = 0) {
  let total = 0;

  cart.forEach((item) => {
    total += item.precio * item.cantidad;
  });

  return total + propina;
}
