// services/menuService.js
import generalFetch from "../utils/generalFetch.js";

const URL_BASE =
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data2";

const categorias = [
  "alitas",
  "bebidas",
  "burgers",
  "cazuelas",
  "papas",
  "paquetes",
  "postres",
  "tacos",
];

const normalizeMenu = (menuArray) => {
  return menuArray.reduce((acc, categoria) => {
    acc[categoria.categoria] = {
      byId: categoria.productos.reduce((prodAcc, producto) => {
        prodAcc[producto.id] = producto;
        return prodAcc;
      }, {}),
      allIds: categoria.productos.map((p) => p.id),
    };
    return acc;
  }, {});
};

export const cargarMenuCompleto = async () => {
  const requests = categorias.map((cat) =>
    generalFetch(`${URL_BASE}/${cat}.json`)
  );

  const resultados = await Promise.all(requests);
  return normalizeMenu(resultados);
};
