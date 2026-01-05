import { getCart } from "./../utils/cartStorage.js";

export function actualizarContadorCarrito() {
  const contador = document.querySelector(".cart__count");
  if (!contador) return;

  const cart = getCart();

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  console.log(totalItems);
  contador.textContent = totalItems;
}

actualizarContadorCarrito();
