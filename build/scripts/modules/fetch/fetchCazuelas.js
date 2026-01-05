import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchCazuelas = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/cazuelas.json"
);

export default fetchCazuelas;
