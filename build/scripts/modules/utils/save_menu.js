import { cargarMenuCompleto } from "./../fetch/fetch_productos.js";

let menuData = {};

export const initMenu = async () => {
  menuData = await cargarMenuCompleto();
};

export const getCategoria = (categoria) => {
  return menuData[categoria] || [];
};

console.log(awaitinitMenu());
