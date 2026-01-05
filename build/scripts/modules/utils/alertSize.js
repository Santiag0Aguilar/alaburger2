function alertSize() {
  const alerta = document.createElement("div");

  alerta.classList.add("alerta__size");
  alerta.textContent = "Por favor selecciona";

  setTimeout(() => {
    alerta.remove();
  }, 2000);
  return alerta;
}

export default alertSize;
