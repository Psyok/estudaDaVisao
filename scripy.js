/* ==============================
   CONFIGURAÇÃO INICIAL
============================== */

let tamanhoFonte = 100;

const tamanhoMinimo = 80;
const tamanhoMaximo = 140;
const incremento = 10;


/* ==============================
   AUMENTAR FONTE
============================== */

function aumentarFonte() {

    if (tamanhoFonte < tamanhoMaximo) {

        tamanhoFonte += incremento;

        document.documentElement.style.fontSize =
            tamanhoFonte + "%";
    }
}


/* ==============================
   DIMINUIR FONTE
============================== */

function diminuirFonte() {

    if (tamanhoFonte > tamanhoMinimo) {

        tamanhoFonte -= incremento;

        document.documentElement.style.fontSize =
            tamanhoFonte + "%";
    }
}


/* ==============================
   ALTO CONTRASTE
============================== */

function contraste() {

    const corpo = document.body;
    const botao = document.getElementById("botaoContraste");

    corpo.classList.toggle("alto-contraste");

    const contrasteAtivo =
        corpo.classList.contains("alto-contraste");

    botao.setAttribute(
        "aria-pressed",
        contrasteAtivo
    );

    botao.setAttribute(
        "aria-label",
        contrasteAtivo
            ? "Desativar modo de alto contraste"
            : "Ativar modo de alto contraste"
    );
}


/* ==============================
   RESTAURAR CONFIGURAÇÕES
============================== */

function resetar() {

    tamanhoFonte = 100;

    document.documentElement.style.fontSize = "100%";

    document.body.classList.remove("alto-contraste");

    const botao = document.getElementById("botaoContraste");

    if (botao) {

        botao.setAttribute(
            "aria-pressed",
            "false"
        );

        botao.setAttribute(
            "aria-label",
            "Ativar modo de alto contraste"
        );
    }
}


/* ==============================
   ATALHOS DO TECLADO
============================== */

document.addEventListener("keydown", function (event) {

    /* Ctrl + + → aumentar fonte */
    if (event.ctrlKey && (event.key === "+" || event.key === "=")) {

        event.preventDefault();

        aumentarFonte();
    }


    /* Ctrl + - → diminuir fonte */
    if (event.ctrlKey && event.key === "-") {

        event.preventDefault();

        diminuirFonte();
    }


    /* Ctrl + 0 → restaurar */
    if (event.ctrlKey && event.key === "0") {

        event.preventDefault();

        resetar();
    }

});