/* Generar mensaje */
import { getCart } from "./cartStorage.js";
import { getNotes, getFormData } from "./cartNotes.js";
import generalAlert from "./generalAlert.js";

const body = document.querySelector("body");

/* ===================== */
/* WHATSAPP MESSAGE */
/* ===================== */
export function generarMensajeWhatsApp() {
  const cart = getCart();
  if (!cart.length) return "";

  const form = getFormData() || {};
  const propina = Number(form.propina) || 0;
  const efectivo = Number(form.efectivo) || 0;
  const envio = getCostoEnvio();

  let mensaje =
    "🔥 *ALA BURGER* 🔥\n" +
    "━━━━━━━━━━━━━━━\n" +
    "🍔 *Pedido del cliente*\n\n";

  cart.forEach((item) => {
    const itemSubtotal = item.precio * item.cantidad;

    mensaje += `• ${item.nombre}`;
    if (item.size) mensaje += ` (${item.size})`;
    if (item.selections?.burger) mensaje += ` (${item.selections.burger})`;
    if (item.selections?.salsa) mensaje += ` (${item.selections.salsa})`;

    mensaje += `\n  ➕ Cantidad: ${item.cantidad}`;
    mensaje += `\n  💲 Subtotal: $${itemSubtotal}\n\n`;
  });

  /* Notas */
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

  mensaje += `📦 *Tipo de pedido:* ${form.pedido}\n`;
  mensaje += `💳 *Forma de pago:* ${form.pago}\n`;

  if (form.pedido === "domicilio") {
    mensaje += `📍 *Dirección:* ${form.direccion}\n`;
  }

  if (form.pago === "efectivo") {
    mensaje += `💵 *Pagaré con:* $${efectivo}\n`;
  }

  if (form.indicaciones) {
    mensaje += `📝 *Indicaciones:* ${form.indicaciones}\n`;
  }

  mensaje += `👤 *Recibe:* ${form.nombre}\n`;
  mensaje += `👨‍🍳 ${form.nombre}, tu pedido se está preparando. #InnBeta\n`;

  /* Transferencia */
  if (form.pago === "transferencia") {
    mensaje +=
      "\n━━━━━━━━━━━━━━━\n" +
      "🏦 *Datos para transferencia*\n" +
      "BBVA\n" +
      "Tarjeta de débito\n" +
      "4152 3136 2163 2301\n\n" +
      "N° de cuenta\n" +
      "157 831 7082\n\n" +
      "A nombre de\n" +
      "Diana Jamila Cruz Resendiz\n";
  }

  /* ===================== */
  /* TOTALES */
  /* ===================== */

  if (propina > 0) {
    mensaje += `💖 *Propina:* $${propina}\n`;
  }

  if (envio > 0) {
    mensaje += `🚚 *Envío:* $${envio}\n`;
  }

  const totalFinal = calcularTotalReal(cart, propina, envio);

  if (form.pago === "efectivo" && efectivo >= totalFinal) {
    mensaje += `💸 *Cambio:* $${efectivo - totalFinal}\n`;
  }

  mensaje +=
    "\n━━━━━━━━━━━━━━━\n" +
    `💵 *Total a pagar: $${totalFinal}*\n\n` +
    "✅ *Gracias por ordenar en AlaBurger* 🍔";

  return encodeURIComponent(mensaje);
}

/* ===================== */
/* SEND TO WHATSAPP */
/* ===================== */
export function enviarPedidoWhatsApp(telefono) {
  const cart = getCart();
  if (!cart.length) return;

  const form = getFormData() || {};
  const propina = Number(form.propina) || 0;
  const efectivo = Number(form.efectivo) || 0;
  const envio = getCostoEnvio();

  /* ===================== */
  /* VALIDACIONES OBLIGATORIAS */
  /* ===================== */

  const camposObligatorios =
    form.pedido &&
    form.pago &&
    form.nombre &&
    (form.pedido !== "domicilio" || form.direccion) &&
    (form.pago !== "efectivo" || efectivo > 0) &&
    (form.pedido !== "domicilio" || hayColoniaSeleccionada());
  if (!camposObligatorios) {
    body.appendChild(generalAlert("Todos los campos son obligatorios"));
    return;
  }

  const totalReal = calcularTotalReal(cart, propina, envio);

  /* 🚨 VALIDACIÓN DE EFECTIVO */
  if (
    form.pedido === "domicilio" &&
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

/* ===================== */
/* HELPERS */
/* ===================== */
function calcularTotalReal(cart, propina = 0, envio = 0) {
  let total = 0;

  cart.forEach((item) => {
    total += item.precio * item.cantidad;
  });

  return total + propina + envio;
}

function getCostoEnvio() {
  const select = document.querySelector("#colonia");
  if (!select) return 0;

  const optionSelected = select.options[select.selectedIndex];
  if (!optionSelected) return 0;

  return Number(optionSelected.dataset.precio) || 0;
}

function hayColoniaSeleccionada() {
  const select = document.querySelector("#colonia");
  return select && select.value !== "";
}
