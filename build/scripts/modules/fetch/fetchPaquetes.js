async function fetchPaquetes() {
  try {
    const url = "../../../../data/paquetes.json";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchPaquetes;
