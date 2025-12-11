async function fetchTacos() {
  try {
    const url = "../../../../data/tacos.json";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchTacos;
