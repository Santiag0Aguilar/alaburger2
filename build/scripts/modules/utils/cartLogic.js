/* Agregar productos + precios + tamaños */
import { getCart, saveCart } from "./cartStorage.js";

export function tieneTamanios(producto) {
  return producto.variants?.[0]?.type === "size";
}

export function tieneOptions(producto) {
  return producto.variants?.[0]?.type === "seleccion";
}

export function obtenerPrecio(producto, seleccion = null) {
  if (!seleccion) return producto.basePrice;

  const variant = producto.variants[0];
  const opcion = variant.options.find((opt) => opt.label === seleccion);

  return producto.basePrice + opcion.priceModifier;
}

export function agregarAlCarrito({
  id,
  nombre,
  size = null,
  selections = {},
  precio,
}) {
  const cart = getCart();

  const existente = cart.find(
    (item) =>
      item.id === id &&
      item.size === size &&
      JSON.stringify(item.selections || {}) === JSON.stringify(selections)
  );

  if (existente) {
    existente.cantidad++;
  } else {
    cart.push({
      id,
      nombre,
      size,
      selections,
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
