import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchPostres = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/postres.json"
);

export default fetchPostres;
