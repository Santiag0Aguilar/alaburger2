function alertSize() {
  const alerta = document.createElement("div");

  alerta.classList.add("alerta__size");
  alerta.textContent = "Por favor selecciona un tamaño de tu hamburgesa";

  setTimeout(() => {
    alerta.remove();
  }, 2000);
  return alerta;
}

export default alertSize;
