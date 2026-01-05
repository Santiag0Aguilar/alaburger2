import getCategoria from "./save_filter.js";
import {
  agregarAlCarrito,
  obtenerPrecio,
  tieneTamanios,
} from "./../utils/cartLogic.js";
import { actualizarContadorCarrito } from "./cartCounter.js";
import alertAdd from "../utils/alertAdd.js";
import alertSize from "../utils/alertSize.js";

export default function getMenu() {
  const Btns = document.querySelectorAll(".menu__buttons--item");
  const contenedorItems = document.querySelector(".menu__interfaz");
  const body = document.querySelector("body");

  if (!Btns) return;
  if (!contenedorItems) return;

  function renderCategoria(categoria = "burgers") {
    const informacion = getCategoria(categoria).byId;
    contenedorItems.innerHTML = "";

    let html = "";

    Object.keys(informacion).forEach((key) => {
      const producto = informacion[key];

      const precioCh =
        producto.variants?.[0]?.type === "size"
          ? producto.basePrice + producto.variants[0].options[0].priceModifier
          : null;

      const precioGd =
        producto.variants?.[0]?.type === "size"
          ? producto.basePrice + producto.variants[0].options[1].priceModifier
          : null;

      html += `
        <article class="menu__interfaz--item"
          data-id="${producto.id}"
          data-nombre="${producto.nombre}"
          data-producto='${JSON.stringify(producto)}'
        >
          <div class="item__texto">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion ?? "Pruébalo ahora"}</p>
          </div>

          <div class="item__precio">
            <div class="item__precio--data">
              ${
                precioCh !== null
                  ? `<p><span>Ch:</span>$${precioCh}</p>`
                  : `<p>$${producto.basePrice}</p>`
              }
              ${precioGd !== null ? `<p><span>Gd:</span>$${precioGd}</p>` : ""}
            </div>

            ${
              tieneTamanios(producto)
                ? `
                <form class="form__size">
                  <select class="select__size" required>
                    <option value="" selected disabled>
                      --Selecciona tamaño--
                    </option>
                    <option value="Chica">Ch</option>
                    <option value="Grande">Gd</option>
                  </select>
                </form>
              `
                : ""
            }

            <div class="item__precio--button">
              <button class="btn-add">Agregar</button>
            </div>
          </div>
        </article>
      `;
    });

    contenedorItems.innerHTML = html;
    bindAddButtons();
  }

  function bindAddButtons() {
    const botones = document.querySelectorAll(".item__precio--button");

    botones.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".menu__interfaz--item");
        const producto = JSON.parse(card.dataset.producto);

        let size = null;

        if (tieneTamanios(producto)) {
          const select = card.querySelector(".select__size");
          if (!select.value) {
            body.appendChild(alertSize());

            return;
          }
          size = select.value;
        }

        const precio = obtenerPrecio(producto, size);
        console.log(precio);
        agregarAlCarrito({
          id: producto.id,
          nombre: producto.nombre,
          size,
          precio,
        });

        console.log(localStorage);

        actualizarContadorCarrito();

        body.appendChild(alertAdd(producto.nombre, true));
      });
    });
  }

  renderCategoria();

  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      renderCategoria(btn.dataset.producto);
    });
  });
}

getMenu();
