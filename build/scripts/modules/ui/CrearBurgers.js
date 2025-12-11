import fetchBurgers from "../fetch/fetchBurgers.js";

async function CrearBurgers() {
  const data = await fetchBurgers();

  const items = []; // aquí acumularemos cada item del menú

  data.burgers.forEach((burger) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${burger.nombre}</h3>
        <p>${burger.descripcion}</p>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${burger.precio_ch}</p>
        <p class="YellowSpan">$${burger.precio_g}</p>

        <div class="item__precio--button">
          <img src="build/img/shopping-cart-svgrepo-com.svg" alt="">
          <button>Pedir</button>
        </div>
      </div>
    `;

    items.push(Item); // guardamos el item creado
  });

  return items; // 🔥 retorna TODOS los items
}

export default CrearBurgers;
