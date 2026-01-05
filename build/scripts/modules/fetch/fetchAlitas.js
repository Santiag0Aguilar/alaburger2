import fetchGeneral from "./../utils/fetchGeneral.js";

const fetchAlitas = await fetchGeneral(
  "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/data/alitas.json"
);

export default fetchAlitas;
