import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchTacos = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/tacos.json"
);

export default fetchTacos;
