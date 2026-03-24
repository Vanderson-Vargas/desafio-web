data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js";
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const navbar = document.getElementById("navbar");
  const hero = document.getElementById("inicio");

  function updateNav() {
    const scrollY = window.scrollY;
    navbar.classList.toggle("scrolled", scrollY > 60);
    navbar.classList.toggle("dark-links", scrollY + 80 >= hero.offsetTop + hero.offsetHeight);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let cur = "";
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    navLinks.forEach(a => {
      const href = a.getAttribute("href");
      if (href === "#inicio") {
        a.classList.remove("active");
      } else {
        a.classList.toggle("active", href === "#" + cur);
      }
    });
  }, { passive: true });

  /*SWIPPER*/

  var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });