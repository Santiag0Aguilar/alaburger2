import fetchBebidas from "../fetch/fetchBebidas.js";

async function CrearBebidas() {
  const data = await fetchBebidas();
  const bebidas = data.bebidas;

  const items = [];

  Object.entries(bebidas).forEach(([key, value]) => {
    // ------------ 1. ARRAY (ej: micheladas) ------------
    if (Array.isArray(value)) {
      value.forEach((bebida) => {
        items.push(crearItem(bebida.nombre, bebida.precio, bebida.sabores));
      });
    }

    // ------------ 2. NUMERO (ej: azulitos: 90) ------------
    else if (typeof value === "number") {
      items.push(crearItem(key, value));
    }

    // ------------ 3. OBJETO (ej: mojitos, refrescos, agua_de_mazapan) ------------
    else if (typeof value === "object") {
      // Caso con precio y sabores
      if (value.precio !== undefined) {
        items.push(crearItem(key, value.precio, value.sabores));
      }
      // Caso donde es un objeto de precios (ej: refrescos, agua de mazapán)
      else {
        Object.entries(value).forEach(([subKey, subValue]) => {
          items.push(crearItem(`${key} - ${subKey}`, subValue));
        });
      }
    }
  });

  return items;
}

// ===================================================
// 🧱 Constructor de un item del menú (reutilizable)
// ===================================================

function crearItem(nombre, precio, sabores = null) {
  const Item = document.createElement("div");
  Item.classList.add("menu__interfaz--item");

  Item.innerHTML = `
    <div class="item__texto">
      <h3>${formatearTexto(nombre)}</h3>
      ${
        sabores
          ? `<p class="item__sabores">Sabores: ${sabores.join(", ")}</p>`
          : ""
      }
    </div>

    <div class="item__precio">
      <p class="YellowSpan">$${precio}</p>

      <div class="item__precio--button">
        <img src="build/img/shopping-cart-svgrepo-com.svg" alt="">
        <button>Pedir</button>
      </div>
    </div>
  `;

  return Item;
}

// ===================================================
// 🛠 Convierte claves como "mojito_frutos_rojos" a "Mojito Frutos Rojos"
// ===================================================
function formatearTexto(texto) {
  return texto.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default CrearBebidas;
