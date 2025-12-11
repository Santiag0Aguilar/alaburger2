import fetchTacos from "../fetch/fetchTacos.js";

async function CrearTacos() {
  const data = await fetchTacos();

  const items = [];

  data.tacos.forEach((taco) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${taco.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${taco.precio}</p>
 
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

export default CrearTacos;
