import getCategoria from "./save_filter.js";
import {
  agregarAlCarrito,
  obtenerPrecio,
  tieneOptions,
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
      console.log(producto);
      const precioCh =
        producto.variants?.[0]?.type === "size"
          ? producto.basePrice + producto.variants[0].options[0].priceModifier
          : null;

      const precioGd =
        producto.variants?.[0]?.type === "size"
          ? producto.basePrice + producto.variants[0].options[1].priceModifier
          : null;

      /* Actualizacion inicio AQUI */
      const opcionesHTML = (producto.variants ?? [])
        .filter((variant) => variant.type === "seleccion")
        .map((variant) => {
          const opciones = (variant.options ?? [])
            .map((opt) => `<option value="${opt.label}">${opt.label}</option>`)
            .join("");

          return `
      <form class="form__size">
        <select
          class="select__option"
          data-key="${variant.key}"
          required
        >
          <option value="" selected disabled>
            --${variant.label}--
          </option>
          ${opciones}
        </select>
      </form>
    `;
        })
        .join("");

      /* Actualizacion fin aqui */
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
          ${opcionesHTML}



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

        const selects = card.querySelectorAll(".select__option");

        const selections = {};
        let faltaSeleccion = false;

        // 🔥 Solo valida si hay selects
        if (selects.length > 0) {
          selects.forEach((select) => {
            if (!select.value) {
              faltaSeleccion = true;
              return;
            }
            selections[select.dataset.key] = select.value;
          });

          if (faltaSeleccion) {
            body.appendChild(alertSize());
            return;
          }
        }

        let option = null;

        if (tieneOptions(producto)) {
          const selectOption = card.querySelector(".select__option");

          if (!selectOption.value) {
            body.appendChild(alertSize()); // puedes crear alertOption luego
            return;
          }

          option = selectOption.value;
        }

        const precio = obtenerPrecio(producto, size);
        console.log(precio);
        agregarAlCarrito({
          id: producto.id,
          nombre: producto.nombre,
          size,
          selections, // {} si no aplica
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
