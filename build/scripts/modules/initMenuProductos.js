function initMenuProductos() {
  const Buttons = document.querySelectorAll(".menu__buttons--item");
  Buttons.forEach((element) => {
    console.log(element);
    element.addEventListener("click", () => {
      Buttons.forEach((b) => b.classList.remove("menu__buttons--active"));

      // Agregar la clase al clicado
      element.classList.add("menu__buttons--active");
    });
  });
}

export default initMenuProductos;
