import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchBurgers = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/burgers.json"
);

export default fetchBurgers;
