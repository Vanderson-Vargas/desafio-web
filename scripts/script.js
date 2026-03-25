document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("inicio");

  function updateNav() {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", scrollY > 60);
    if (navbar && hero) {
      navbar.classList.toggle("dark-links", scrollY + 80 >= (hero.offsetTop + hero.offsetHeight));
    }
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

  /* SWIPER */
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 4,

    simulateTouch: true,
    allowTouchMove: true,
    clickable: true,

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  /* JSON */
  function carregarEstudos() {
    return fetch('../config/estudos.json')
      .then(response => {
        if (!response.ok) throw new Error('Falha ao buscar estudos.json: ' + response.status);
        return response.json();
      })
      .then(estudos => {
        const container = document.querySelector('.swiper-wrapper');
        if (!container) return;
        estudos.forEach(estudo => {
          const card = document.createElement('div');
          card.classList.add('card', 'swiper-slide');
          

          const img = document.createElement('img');
          img.classList.add('card__image');
          img.src = estudo.imagem;
          img.alt = estudo.nome || 'card image';

          const title = document.createElement('span');
          title.classList.add('card__title');
          title.textContent = estudo.nome || '';

          card.addEventListener('click', () => {
            openModal(estudo);
          });

          card.appendChild(img);
          card.appendChild(title);
          container.appendChild(card);
        });
        if (swiper && typeof swiper.update === 'function') swiper.update();
      })
      .catch(error => console.error('Erro ao carregar estudos:', error));
  }

  carregarEstudos();
});

/*MODAL*/

function openModal(estudo){
    const modal = document.getElementById('modal-container')
    if (!modal) return;
    
    // Preencher o modal com os dados do estudo
    const h1 = modal.querySelector('h1');
    const p = modal.querySelector('p');
    const img = modal.querySelector('#modal-image');
    const linkPdf = modal.querySelector('#link-pdf');
    const linkLivro = modal.querySelector('#link-livro');
    const linkYtb = modal.querySelector('#link-ytb');
    const estudoPresencial = modal.querySelector('#estudo-presencial');
    
    if (h1) h1.textContent = estudo.nome || 'Estudo';
    if (p) p.textContent = estudo.descricao || '';
    if (img) img.src = estudo.imagem || '';
    if (linkPdf) linkPdf.href = estudo.pdf || '#';
    if (linkLivro) linkLivro.href = estudo.livro || '#';
    if (linkYtb) linkYtb.href = estudo.youtube || '#';
    if (estudoPresencial) estudoPresencial.href = '#' || '#';
    
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) =>{
        if (e.target.id == 'modal-container' || e.target.id == "fechar"){
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}