document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ANIMAÇÕES AO ENTRAR NA TELA
  ===================================================== */

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        obs.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });


  document
    .querySelectorAll(".reveal")
    .forEach(el => observer.observe(el));


  /* =====================================================
     ABAS DA PROGRAMAÇÃO
  ===================================================== */

  const tabs = document.querySelectorAll(
    ".schedule-tabs button"
  );

  const panels = document.querySelectorAll(
    ".schedule-panel"
  );


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const target = tab.dataset.tab;


      /* Ativa a aba clicada */

      tabs.forEach(t => {

        t.classList.toggle(
          "active",
          t === tab
        );

      });


      /* Mostra o conteúdo correspondente */

      panels.forEach(panel => {

        panel.classList.toggle(
          "active",
          panel.id === target
        );

      });

    });

  });


  /* =====================================================
     DEPOIMENTOS
  ===================================================== */

  const slides = [
    ...document.querySelectorAll(".testimonial")
  ];


  const dotsWrap = document.getElementById("dots");

  const prev = document.getElementById("prevTest");

  const next = document.getElementById("nextTest");


  let current = 0;

  let interval;


  /* =====================================================
     CRIA AS BOLINHAS

     Uma bolinha para cada depoimento.

     Como existem 5 depoimentos,
     serão criadas exatamente 5 bolinhas.
  ===================================================== */

  slides.forEach((_, index) => {

    const dot = document.createElement("button");


    dot.type = "button";


    dot.setAttribute(
      "aria-label",
      `Ir para depoimento ${index + 1}`
    );


    dot.addEventListener("click", () => {

      showTestimonial(index);

      restartAutoplay();

    });


    dotsWrap.appendChild(dot);

  });


  /* Pega as bolinhas criadas */

  const dots = [
    ...dotsWrap.children
  ];


  /* =====================================================
     MOSTRAR DEPOIMENTO
  ===================================================== */

  function showTestimonial(index) {

    /* Faz o carrossel voltar para o começo
       quando chegar ao último */

    current =
      (index + slides.length) % slides.length;


    /* Ativa somente o depoimento atual */

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === current
      );

    });


    /* Ativa somente a bolinha atual */

    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === current
      );

    });

  }


  /* =====================================================
     BOTÃO ANTERIOR
  ===================================================== */

  prev.addEventListener("click", () => {

    showTestimonial(
      current - 1
    );

    restartAutoplay();

  });


  /* =====================================================
     BOTÃO PRÓXIMO
  ===================================================== */

  next.addEventListener("click", () => {

    showTestimonial(
      current + 1
    );

    restartAutoplay();

  });


  /* =====================================================
     AUTOPLAY

     Troca automaticamente a cada 6,5 segundos.
  ===================================================== */

  function startAutoplay() {

    interval = setInterval(() => {

      showTestimonial(
        current + 1
      );

    }, 6500);

  }


  /* =====================================================
     REINICIAR AUTOPLAY
  ===================================================== */

  function restartAutoplay() {

    clearInterval(interval);

    startAutoplay();

  }


  /* =====================================================
     INICIALIZAÇÃO

     Começa no primeiro depoimento.
  ===================================================== */

  showTestimonial(0);

  startAutoplay();

});

/* =====================================================
   MENU RESPONSIVO
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");

        siteNav.classList.toggle("active");

        const isOpen = siteNav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

    });


    /* Fecha o menu ao clicar em um link */

    siteNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            siteNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        });

    });

}