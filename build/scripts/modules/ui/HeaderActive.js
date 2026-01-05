function HeaderActive() {
  const Header = document.querySelector(".header__top");
  console.log(Header);
  const ActivarHeader = document.querySelector(".ActivarHeader");

  window.addEventListener("scroll", () => {
    const topSeccion = ActivarHeader.offsetTop;
    const scrollActual = window.scrollY;

    if (scrollActual >= topSeccion) {
      // Usuario bajó hasta la sección o más abajo
      Header.classList.add("HeaderActiveScroll");
    } else {
      // Usuario subió por encima del top de la sección
      Header.classList.remove("HeaderActiveScroll");
    }
  });
}

export default HeaderActive;
