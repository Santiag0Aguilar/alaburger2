/* la idea aqui es solo llevar la categoria indicada */
import { cargarMenuCompleto } from "./../fetch/fetch_productos.js";

const menu = await cargarMenuCompleto();

export default function getCategoria(categoria) {
  const categoriaFinal = categoria || "burgers";
  return menu[categoriaFinal];
}
