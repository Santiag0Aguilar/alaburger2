function generalAlert(mensaje) {
  const alerta = document.createElement("div");

  alerta.classList.add("alerta__geneal");
  alerta.textContent = `${mensaje}`;

  setTimeout(() => {
    alerta.remove();
  }, 2000);
  return alerta;
}

export default generalAlert;
