import {
  saveNotes,
  getNotes,
  getFormData,
  saveFormData,
} from "./../utils/cartNotes.js";

import { getUserLocationLink } from "./../utils/location.js";

/* ========================= */
/* NOTAS DEL CARRITO (TEXTAREA) */
/* ========================= */

export function initCartNotes() {
  const textarea = document.querySelector(".cart__notes");
  if (!textarea) return;

  textarea.value = getNotes();

  textarea.addEventListener("input", () => {
    saveNotes(textarea.value);
  });
}

initCartNotes();

/* ========================= */
/* FORMULARIO DEL PEDIDO */
/* ========================= */

export function initNotes() {
  const pedido = document.getElementById("pedido");
  const pago = document.getElementById("pago");
  const efectivo = document.getElementById("efectivo");
  const direccion = document.getElementById("direccion");
  const indicaciones = document.getElementById("indicaciones");
  const nombre = document.getElementById("nombre");
  const propina = document.getElementById("propina");
  const btnLocation = document.getElementById("btnLocation");
  const selectColonia = document.getElementById("coloniaContenedor");
  if (!pedido || !pago) return;

  const inputs = document.querySelectorAll(
    "#pedido, #pago, #indicaciones, #efectivo, #direccion, #nombre, #propina, #coloniaContenedor"
  );

  /* Mostrar / ocultar campos */
  function actualizarFormulario() {
    const pedidoVal = pedido.value;
    const pagoVal = pago.value;

    // Dirección
    direccion.parentElement.style.display =
      pedidoVal === "domicilio" ? "block" : "none";

    // Botón de ubicación solo si es domicilio
    if (btnLocation) {
      btnLocation.style.display = pedidoVal === "domicilio" ? "block" : "none";
    }
    // Boton de colonia solo si es domicilio
    if (selectColonia) {
      selectColonia.style.display =
        pedidoVal === "domicilio" ? "block" : "none";
    }

    // Efectivo
    efectivo.parentElement.style.display =
      pedidoVal === "domicilio" && pagoVal === "efectivo" ? "block" : "none";
  }

  /* Guardar datos del form */
  function guardarDatos() {
    const data = {
      pedido: pedido.value,
      pago: pago.value,
      indicaciones: indicaciones?.value.trim() || "",
      efectivo: efectivo?.value || "",
      direccion: direccion?.value.trim() || "",
      nombre: nombre?.value.trim() || "",
      propina: propina?.value || "",
    };

    saveFormData(data);
  }

  /* Eventos */
  pedido.addEventListener("change", () => {
    actualizarFormulario();
    guardarDatos();
  });

  pago.addEventListener("change", () => {
    actualizarFormulario();
    guardarDatos();
  });

  inputs.forEach((input) => {
    input.addEventListener("input", guardarDatos);
  });

  /* ========================= */
  /* UBICACIÓN EXACTA (GPS) */
  /* ========================= */

  if (btnLocation) {
    btnLocation.addEventListener("click", async () => {
      try {
        const link = await getUserLocationLink();
        direccion.value = link;

        saveFormData({
          ...getFormData(),
          direccion: link,
        });
      } catch (err) {
        alert("No se pudo obtener la ubicación 📍");
      }
    });
  }

  /* Cargar datos guardados (opcional pero recomendado) */
  const savedData = getFormData();
  if (savedData) {
    pedido.value = savedData.pedido || pedido.value;
    pago.value = savedData.pago || pago.value;
    indicaciones.value = savedData.indicaciones || "";
    efectivo.value = savedData.efectivo || "";
    direccion.value = savedData.direccion || "";
    nombre.value = savedData.nombre || "";
    propina.value = savedData.propina || "";
  }

  actualizarFormulario();
}

initNotes();
