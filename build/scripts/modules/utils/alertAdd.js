function alertAdd(producto, eliminado = false) {
  const alerta = document.createElement("div");

  if (eliminado) {
    alerta.classList.add("alerta__agregado");
    alerta.textContent = `
      Se agrego correctamente una ${producto}
    `;
  } else {
    alerta.classList.add("alerta__eliminado");
    alerta.textContent = `
      Se elimino correctamente una ${producto}
    `;
  }

  setTimeout(() => {
    alerta.remove();
  }, 2000);

  return alerta;
}

alertAdd();
export default alertAdd;
