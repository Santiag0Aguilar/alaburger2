import fetchBurgers from "../fetch/fetchBurgers.js";

async function initMenuProductos() {
  const Buttons = document.querySelectorAll(".menu__buttons--item");

  const data = await fetchBurgers();
  console.log(data);

  Buttons.forEach((element) => {
    console.log(element);
    element.addEventListener("click", () => {
      Buttons.forEach((b) => b.classList.remove("menu__buttons--active"));
      console.log(element.dataset.producto);
      // Agregar la clase al clicado
      element.classList.add("menu__buttons--active");
    });
  });
}

export default initMenuProductos;
