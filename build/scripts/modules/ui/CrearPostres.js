import fetchPostres from "../fetch/fetchPostres.js";

async function CrearPostres() {
  const data = await fetchPostres();

  const items = [];

  data.postres.forEach((postre) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${postre.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${postre.precio}</p>
 
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

export default CrearPostres;
