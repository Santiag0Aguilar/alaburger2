import generalFetch from "../utils/generalFetch.js";

async function fetchColonias() {
  const URL =
    "https://raw.githubusercontent.com/Santiag0Aguilar/alaburger2/main/estados/estados.json";
  const data = await generalFetch(URL);
  return data;
}

export default fetchColonias;
