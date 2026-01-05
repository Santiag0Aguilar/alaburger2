const CART_KEY = "carrito";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function obtenerPrecio(producto, size) {
  if (!size) return producto.basePrice;

  const variant = producto.variants[0];

  const opcion = variant.options.find((opt) => opt.label === size);
  return producto.basePrice + opcion.priceModifier;
}
