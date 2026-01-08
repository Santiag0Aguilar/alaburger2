import fetchColonias from "../fetch/fetch_colonias.js";

async function renderColonias() {
  const selectColonias = document.querySelector("#colonia");
  if (!selectColonias) return;

  const data = await fetchColonias();
  data.forEach((element) => {
    selectColonias.innerHTML += `
          <option data-precio="${element.costo}" value="${element.id}">${element.nombre}</option>
    `;
  });
}

renderColonias();

export default renderColonias;
