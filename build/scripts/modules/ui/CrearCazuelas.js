import fetchCazuelas from "../fetch/fetchCazuelas.js";

async function CrearCazuelas() {
  const data = await fetchCazuelas();

  const items = [];

  data.cazuelitas.forEach((cazuela) => {
    const Item = document.createElement("div");
    Item.classList.add("menu__interfaz--item");

    Item.innerHTML = `
      <div class="item__texto">
        <h3>${cazuela.nombre}</h3>
      </div>

      <div class="item__precio">
        <p class="YellowSpan">$${cazuela.precio}</p>
 
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

export default CrearCazuelas;
