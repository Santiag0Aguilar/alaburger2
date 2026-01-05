// ...existing code...
import CrearBurgers from "./CrearBurgers.js";
import CrearPapas from "./CrearPapas.js";
import CrearAlitas from "./CrearAlitas.js";
import CrearTacos from "./CrearTacos.js";
import CrearCazuelas from "./CrearCazuelas.js";
import CrearPaquetes from "./CrearPaquetes.js";
import CrearBebidas from "./CrearBebidas.js";
import CrearPostres from "./CrearPostres.js";

function initMenuProductos() {
  const Buttons = document.querySelectorAll(".menu__buttons--item");
  const MenuInterfaz = document.querySelector(".menu__interfaz");

  let burgersCache = null; // 🔥 cache para no recrear los items
  let papasCache = null;
  let alitasCache = null;
  let tacosCache = null;
  let cazuelasCache = null;
  let paquetesCache = null;
  let bebidasCache = null;
  let postresCache = null;

  Buttons.forEach((element) => {
    element.addEventListener("click", async () => {
      Buttons.forEach((b) => b.classList.remove("menu__buttons--active"));
      element.classList.add("menu__buttons--active");

      let producto = element.dataset.producto;

      // limpiar la vista antes de cambiar de categoría
      MenuInterfaz.innerHTML = "";

      switch (producto) {
        case "burgers":
          if (!burgersCache) {
            burgersCache = await CrearBurgers();
          }
          burgersCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "papas":
          if (!papasCache) {
            papasCache = await CrearPapas();
          }
          papasCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "alitas":
          if (!alitasCache) {
            alitasCache = await CrearAlitas();
          }
          alitasCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "tacos":
          if (!tacosCache) {
            tacosCache = await CrearTacos();
          }
          tacosCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "cazuelitas": // mantengo el nombre que usas en el dataset
        case "cazuelas":
          if (!cazuelasCache) {
            cazuelasCache = await CrearCazuelas();
          }
          cazuelasCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "paquetes":
          if (!paquetesCache) {
            paquetesCache = await CrearPaquetes();
          }
          paquetesCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "bebidas":
          if (!bebidasCache) {
            bebidasCache = await CrearBebidas();
          }
          bebidasCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        case "postres":
          if (!postresCache) {
            postresCache = await CrearPostres();
          }
          postresCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
          break;

        default:
          burgersCache.forEach((item) => {
            MenuInterfaz.appendChild(item);
          });
      }
    });
  });
}

export default initMenuProductos;
// ...existing code...
