async function carregarNavbar() {
  const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
  const isInPages = window.location.pathname.includes('/pages/');
  const isMobile = window.innerWidth <= 768;

  const links = {
    IMAGES_PATH: isMobile ? `${pathPrefix}images/adventist-symbol--black.png` : `${pathPrefix}images/adventist-symbol--white.png`,
    INDEX_LINK: isInPages ? '../index.html' : '#inicio',
    SOBRE_LINK: isInPages ? 'sobre.html' : 'pages/sobre.html',
    ESTUDO_LINK: isInPages ? 'estudo.html' : 'pages/estudo.html',
    PROGRAMACAO_LINK: isInPages ? 'programacao.html' : 'pages/programacao.html'
  };

  try {
    if (!document.querySelector('link[href*="navbar.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${pathPrefix}components/navbar/navbar.css`;
      document.head.appendChild(link);
    }

    const response = await fetch(`${pathPrefix}components/navbar/navbar.html`);
    if (!response.ok) throw new Error('Erro ao carregar navbar');
    let navbarHTML = await response.text();

    Object.entries(links).forEach(([placeholder, url]) => {
      navbarHTML = navbarHTML.replace(new RegExp(placeholder, 'g'), url);
    });

    if (document.querySelector('body > nav')) {
      document.querySelector('body > nav').outerHTML = navbarHTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    setupHamburguer();
  } catch (error) {
    console.error('Erro ao carregar navbar:', error);
  }
}

function setupHamburguer() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-links button');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}

async function carregarFooter() {
  const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
  const isInPages = window.location.pathname.includes('/pages/');

  const links = {
    IMAGES_PATH: `${pathPrefix}images/adventist-symbol--white.png`,
    INDEX_LINK: isInPages ? '../index.html' : '#inicio',
    SOBRE_LINK: isInPages ? 'sobre.html' : 'pages/sobre.html',
    ESTUDO_LINK: isInPages ? 'estudo.html' : 'pages/estudo.html',
    PROGRAMACAO_LINK: isInPages ? 'programacao.html' : 'pages/programacao.html',
    CONTATO_LINK: isInPages ? '../index.html#sobre' : '#sobre'
  };

  try {
    if (!document.querySelector('link[href*="footer.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${pathPrefix}components/footer/footer.css`;
      document.head.appendChild(link);
    }

    const response = await fetch(`${pathPrefix}components/footer/footer.html`);
    if (!response.ok) throw new Error('Erro ao carregar footer');
    let footerHTML = await response.text();

    Object.entries(links).forEach(([placeholder, url]) => {
      footerHTML = footerHTML.replace(new RegExp(placeholder, 'g'), url);
    });

    if (document.querySelector('body > footer')) {
      document.querySelector('body > footer').outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  } catch (error) {
    console.error('Erro ao carregar footer:', error);
  }
}

carregarNavbar();
carregarFooter();

