import fetchPapas from "../fetch/fetchPapas.js";

async function CrearPapas() {
  const data = await fetchPapas();

  const items = []; // aquí acumularemos cada item del menú

  data.papas.forEach((papa) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${papa.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${papa.precio}</p>
 
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

export default CrearPapas;
