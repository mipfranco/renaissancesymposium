/* =====================================================
   MENU MOBILE
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");

    });

}


/* Fecha o menu ao clicar em um link */

if (navigation) {

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

        });

    });

}


/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const button =
        item.querySelector("button");

    if (!button) return;


    button.addEventListener("click", () => {

        const estavaAberto =
            item.classList.contains("open");


        /* Fecha todas as perguntas */

        faqItems.forEach(other => {

            other.classList.remove("open");


            const span =
                other.querySelector("button span");


            if (span) {

                span.textContent = "+";

            }

        });


        /* Abre somente a selecionada */

        if (!estavaAberto) {

            item.classList.add("open");


            const span =
                item.querySelector("button span");


            if (span) {

                span.textContent = "−";

            }

        }

    });

});


/* =====================================================
   CARROSSEL DE PALESTRANTES
===================================================== */

const speakersSlider =
    document.getElementById("speakersSlider");

const prevSpeaker =
    document.getElementById("prevSpeaker");

const nextSpeaker =
    document.getElementById("nextSpeaker");

const speakerDots =
    document.getElementById("speakerDots");

const speakers =
    document.querySelectorAll(".speaker");


let currentSpeakerPage = 0;


/* =====================================================
   QUANTIDADE DE PALESTRANTES POR PÁGINA
===================================================== */

function speakersPerPage() {

    /*
       Celular
       1 palestrante
    */

    if (window.innerWidth <= 600) {

        return 1;

    }


    /*
       Tablet e desktop
       2 palestrantes
    */

    return 2;

}


/* =====================================================
   CRIAR BOLINHAS DOS PALESTRANTES
===================================================== */

function createSpeakerDots() {

    if (!speakerDots) return;


    speakerDots.innerHTML = "";


    const perPage =
        speakersPerPage();


    const totalPages =
        Math.ceil(
            speakers.length /
            perPage
        );


    for (
        let i = 0;
        i < totalPages;
        i++
    ) {

        const dot =
            document.createElement("span");


        dot.classList.add(
            "speaker-dot"
        );


        if (i === 0) {

            dot.classList.add(
                "active"
            );

        }


        dot.addEventListener(
            "click",
            () => {

                currentSpeakerPage = i;

                scrollToSpeakerPage();

            }
        );


        speakerDots.appendChild(dot);

    }

}


/* =====================================================
   ROLAR PARA A PÁGINA DOS PALESTRANTES
===================================================== */

function scrollToSpeakerPage() {

    if (!speakersSlider) return;


    const pageWidth =
        speakersSlider.clientWidth;


    speakersSlider.scrollTo({

        left:
            currentSpeakerPage *
            pageWidth,

        behavior: "smooth"

    });


    updateSpeakerDots();

}


/* =====================================================
   ATUALIZAR BOLINHAS DOS PALESTRANTES
===================================================== */

function updateSpeakerDots() {

    const dots =
        document.querySelectorAll(
            ".speaker-dot"
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(

                "active",

                index ===
                currentSpeakerPage

            );

        }
    );

}


/* =====================================================
   SETA ESQUERDA — PALESTRANTES
===================================================== */

if (prevSpeaker) {

    prevSpeaker.addEventListener(
        "click",
        () => {

            if (
                currentSpeakerPage > 0
            ) {

                currentSpeakerPage--;

                scrollToSpeakerPage();

            }

        }
    );

}


/* =====================================================
   SETA DIREITA — PALESTRANTES
===================================================== */

if (nextSpeaker) {

    nextSpeaker.addEventListener(
        "click",
        () => {

            const perPage =
                speakersPerPage();


            const totalPages =
                Math.ceil(
                    speakers.length /
                    perPage
                );


            if (
                currentSpeakerPage <
                totalPages - 1
            ) {

                currentSpeakerPage++;

                scrollToSpeakerPage();

            }

        }
    );

}


/* =====================================================
   INICIAR PALESTRANTES
===================================================== */

createSpeakerDots();


/* =====================================================
   RESPONSIVIDADE DOS PALESTRANTES
===================================================== */

window.addEventListener(
    "resize",
    () => {

        currentSpeakerPage = 0;


        createSpeakerDots();


        if (speakersSlider) {

            speakersSlider.scrollTo({

                left: 0,

                behavior: "instant"

            });

        }

    }
);


/* =====================================================
   CARROSSEL DE DEPOIMENTOS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const slider =
            document.getElementById(
                "testimonialSlider"
            );


        const prev =
            document.getElementById(
                "prevTestimonial"
            );


        const next =
            document.getElementById(
                "nextTestimonial"
            );


        const dotsContainer =
            document.getElementById(
                "testimonialDots"
            );


        const cards =
            document.querySelectorAll(
                ".testimonial"
            );


        /* Verifica se existem depoimentos */

        if (
            !slider ||
            !dotsContainer ||
            cards.length === 0
        ) {

            console.log(
                "Carrossel de depoimentos não encontrado."
            );

            return;

        }


        let currentPage = 0;


        /* =================================================
           QUANTIDADE DE DEPOIMENTOS
        ================================================= */

        function getPerPage() {

            /*
               Celular:
               1 depoimento
            */

            if (
                window.innerWidth <= 600
            ) {

                return 1;

            }


            /*
               Tablet e desktop:
               3 depoimentos
            */

            return 3;

        }


        /* =================================================
           TOTAL DE PÁGINAS
        ================================================= */

        function getTotalPages() {

            return Math.ceil(

                cards.length /
                getPerPage()

            );

        }


        /* =================================================
           CRIAR BOLINHAS
        ================================================= */

        function createDots() {

            dotsContainer.innerHTML = "";


            const totalPages =
                getTotalPages();


            for (
                let i = 0;
                i < totalPages;
                i++
            ) {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type = "button";


                dot.className =
                    "testimonial-dot";


                if (
                    i === currentPage
                ) {

                    dot.classList.add(
                        "active"
                    );

                }


                dot.addEventListener(
                    "click",
                    () => {

                        currentPage = i;

                        goToPage();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }

        }


        /* =================================================
           IR PARA UMA PÁGINA
        ================================================= */

        function goToPage() {

            const perPage =
                getPerPage();


            const card =
                cards[0];


            const cardWidth =
                card.offsetWidth;


            const style =
                window.getComputedStyle(
                    slider
                );


            const gap =
                parseFloat(
                    style.gap
                ) || 0;


            const scrollAmount =
                (cardWidth + gap) *
                perPage;


            slider.scrollTo({

                left:
                    currentPage *
                    scrollAmount,

                behavior: "smooth"

            });


            updateDots();

        }


        /* =================================================
           ATUALIZAR BOLINHAS
        ================================================= */

        function updateDots() {

            const dots =
                dotsContainer.querySelectorAll(
                    ".testimonial-dot"
                );


            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(

                        "active",

                        index === currentPage

                    );

                }
            );

        }


        /* =================================================
           SETA ESQUERDA
        ================================================= */

        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    if (
                        currentPage > 0
                    ) {

                        currentPage--;

                        goToPage();

                    }

                }
            );

        }


        /* =================================================
           SETA DIREITA
        ================================================= */

        if (next) {

            next.addEventListener(
                "click",
                () => {

                    const totalPages =
                        getTotalPages();


                    if (
                        currentPage <
                        totalPages - 1
                    ) {

                        currentPage++;

                        goToPage();

                    }

                }
            );

        }


        /* =================================================
           INICIAR
        ================================================= */

        createDots();


        /* =================================================
           RESPONSIVIDADE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                currentPage = 0;


                slider.scrollTo({

                    left: 0,

                    behavior: "instant"

                });


                createDots();

            }
        );

    }
);


/* =====================================================
   CONTAGEM REGRESSIVA
===================================================== */

const dataEvento =
    new Date(
        "2026-10-30T08:30:00-03:00"
    ).getTime();


const daysElement =
    document.getElementById("days");


const hoursElement =
    document.getElementById("hours");


const minutesElement =
    document.getElementById("minutes");


const secondsElement =
    document.getElementById("seconds");


function atualizarContagem() {

    /*
       Se a contagem não estiver
       presente no HTML, não faz nada.
    */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    const agora =
        new Date().getTime();


    const distancia =
        dataEvento - agora;


    /* =================================================
       EVENTO COMEÇOU
    ================================================= */

    if (distancia <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    /* =================================================
       DIAS
    ================================================= */

    const dias =
        Math.floor(

            distancia /
            (1000 * 60 * 60 * 24)

        );


    /* =================================================
       HORAS
    ================================================= */

    const horas =
        Math.floor(

            (distancia %
                (1000 * 60 * 60 * 24)) /

            (1000 * 60 * 60)

        );


    /* =================================================
       MINUTOS
    ================================================= */

    const minutos =
        Math.floor(

            (distancia %
                (1000 * 60 * 60)) /

            (1000 * 60)

        );


    /* =================================================
       SEGUNDOS
    ================================================= */

    const segundos =
        Math.floor(

            (distancia %
                (1000 * 60)) /

            1000

        );


    /* =================================================
       MOSTRAR RESULTADO
    ================================================= */

    daysElement.textContent =
        String(dias).padStart(
            2,
            "0"
        );


    hoursElement.textContent =
        String(horas).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutos).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(segundos).padStart(
            2,
            "0"
        );

}


/* Executa imediatamente */

atualizarContagem();


/* Atualiza a cada segundo */

setInterval(
    atualizarContagem,
    1000
);