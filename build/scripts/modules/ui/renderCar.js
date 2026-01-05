import { getCart } from "./../utils/cartStorage.js";
import { actualizarCantidad, eliminarItem } from "./../utils/cartLogic.js";
import { actualizarContadorCarrito } from "./cartCounter.js";
import alertAdd from "../utils/alertAdd.js";

const body = document.querySelector("body");
export function renderCarrito() {
  const contenedor = document.querySelector(".cart__items");
  if (!contenedor) return;

  const cart = getCart();
  contenedor.innerHTML = "";

  if (!cart.length) {
    contenedor.innerHTML = '<p class="empty__car">Carrito vacío</p>';
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="cart__item"
        data-id="${item.id}"
        data-size="${item.size ?? ""}"
      >
        <p class="cart__item--name">
          ${item.nombre}
          ${item.size ? `(${item.size})` : ""}
        </p>

        <input
          type="number"
          min="1"
          class="cart__qty"
          value="${item.cantidad}"
        />

        <p>$${subtotal}</p>

        <button class="cart__remove">✖</button>
      </div>
    `;
  });

  contenedor.innerHTML += `
    <div class="cart__total">
      <strong>Total:<span class="YellowSpan">$${total}</span></strong>
    </div>
  `;

  bindCartEvents();
}

function bindCartEvents() {
  document.querySelectorAll(".cart__qty").forEach((input) => {
    // Guardar valor cuando el usuario entra al input
    input.addEventListener("focus", (e) => {
      e.target.dataset.prevValue = e.target.value;
    });

    input.addEventListener("change", (e) => {
      const input = e.target;
      const item = input.closest(".cart__item");

      const prevValue = Number(input.dataset.prevValue ?? input.value);
      const newValue = Number(input.value);

      actualizarCantidad(item.dataset.id, item.dataset.size || null, newValue);

      if (newValue > prevValue) {
        body.appendChild(alertAdd(item.dataset.id, true));
      }

      if (newValue < prevValue) {
        body.appendChild(alertAdd(item.dataset.id, false));
      }

      renderCarrito();
      actualizarContadorCarrito();
    });
  });

  document.querySelectorAll(".cart__remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = e.target.closest(".cart__item");
      body.appendChild(alertAdd(item.dataset.id, false));
      eliminarItem(item.dataset.id, item.dataset.size || null);
      renderCarrito();
      actualizarContadorCarrito();
    });
  });
}

renderCarrito();
