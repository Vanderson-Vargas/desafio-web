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

var swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    simulateTouch: true,
    allowTouchMove: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Config padrão
    effect: "coverflow",
    centeredSlides: false,
    slidesPerView: 4,

    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: false,
    },

    
    breakpoints: {
        // Mobile
        0: {
            slidesPerView: 1.2,
            effect: "slide",
            centeredSlides: false,
        },

        // Tablet
        768: {
            slidesPerView: 2,
            effect: "slide",
            centeredSlides: false,
        },

        // Desktop
        1024: {
            slidesPerView: 4,
            effect: "coverflow",
            centeredSlides: false,
        }
    }
});

function openModal(estudo) {
    const modal = document.getElementById('modal-container')
    if (!modal) return;

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
    if (estudoPresencial) estudoPresencial.href = 'https://wa.me/5551997228925' || '#';

    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'modal-container' || e.target.id == "fechar") {
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}