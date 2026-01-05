import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchPapas = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/papas.json"
);

export default fetchPapas;
