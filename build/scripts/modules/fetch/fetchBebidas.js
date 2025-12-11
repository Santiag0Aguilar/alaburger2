async function fetchBebidas() {
  try {
    const url =
      "https://github.com/Santiag0Aguilar/alaburger2/blob/main/data/bebidas.json";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchBebidas;
