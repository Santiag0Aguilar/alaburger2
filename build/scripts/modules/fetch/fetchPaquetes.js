import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchPaquetes = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/paquetes.json"
);

export default fetchPaquetes;
