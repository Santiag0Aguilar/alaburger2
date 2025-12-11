import fetchAlitas from "../fetch/fetchAlitas.js";

async function CrearAlitas() {
  const data = await fetchAlitas();

  const items = []; // aquí acumularemos cada item del menú

  data.alitas.forEach((alita) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${alita.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${alita.precio}</p>
 
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

export default CrearAlitas;
