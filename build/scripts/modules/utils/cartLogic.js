/* Agregar productos + precios + tamaños */
import { getCart, saveCart } from "./cartStorage.js";

export function tieneTamanios(producto) {
  return producto.variants?.[0]?.type === "size";
}

export function obtenerPrecio(producto, size = null) {
  if (!size) return producto.basePrice;

  const variant = producto.variants[0];
  const opcion = variant.options.find((opt) => opt.label === size);

  return producto.basePrice + opcion.priceModifier;
}

export function agregarAlCarrito({ id, nombre, size, precio }) {
  const cart = getCart();

  const existente = cart.find((item) => item.id === id && item.size === size);

  if (existente) {
    existente.cantidad++;
  } else {
    cart.push({
      id,
      nombre,
      size,
      precio,
      cantidad: 1,
    });
  }

  saveCart(cart);
}

export function actualizarCantidad(id, size, cantidad) {
  const cart = getCart();

  const item = cart.find((p) => p.id === id && p.size === size);

  if (!item) return;

  item.cantidad = cantidad;

  if (item.cantidad <= 0) {
    eliminarItem(id, size);
    return;
  }

  saveCart(cart);
}

export function eliminarItem(id, size) {
  const cart = getCart().filter((p) => !(p.id === id && p.size === size));

  saveCart(cart);
}
