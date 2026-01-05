import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchBebidas = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/bebidas.json"
);

export default fetchBebidas;
