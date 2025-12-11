import fetchPaquetes from "../fetch/fetchPaquetes.js";

async function CrearPaquetes() {
  const data = await fetchPaquetes();

  const items = [];

  data.paquetes.forEach((paquete) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${paquete.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${paquete.precio}</p>
 
        <div class="item__precio--button">
          <img src="build/img/shopping-cart-svgrepo-com.svg" alt="">
          <button>Pedir</button>
        </div>
      </div>
    `;

    items.push(Item);
  });

  return items;
}

export default CrearPaquetes;
