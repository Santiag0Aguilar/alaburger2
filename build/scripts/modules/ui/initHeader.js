function initHeader() {
  const IconMenu = document.querySelector(".menu-icon");
  const Menu = document.querySelector(".header__desplegable");

  IconMenu.addEventListener("click", () => {
    Menu.classList.toggle("active");
  });
  console.log(Menu);
}

initHeader();

export default initHeader;
