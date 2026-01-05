function initMenu() {
  const IconMenu = document.querySelector(".menu-icon");
  const Menu = document.querySelector(".header__desplegable");

  IconMenu.addEventListener("click", () => {
    console.log("click en menu");
    Menu.classList.toggle("active");
  });
  console.log(Menu);
}

export default initMenu;
