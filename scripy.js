document.addEventListener("DOMContentLoaded", () => {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    const PASSO_FONTE = 10;
    const FONTE_MAXIMA = 150;
    const FONTE_MINIMA = 80;

    // Carrega e aplica as preferências salvas no localStorage
    let tamanhoAtualFonte = parseInt(localStorage.getItem("tamanhoFonte")) || 100;
    const altoContrasteAtivo = localStorage.getItem("altoContraste") === "true";

    document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;

    if (altoContrasteAtivo) {
        document.body.classList.add("alto-contraste");
        if (btnContraste) btnContraste.setAttribute("aria-pressed", "true");
    }

    // Alternar Alto Contraste
    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const estaAtivo = document.body.classList.toggle("alto-contraste");
            btnContraste.setAttribute("aria-pressed", estaAtivo.toString());
            localStorage.setItem("altoContraste", estaAtivo);
        });
    }

    // Aumentar Tamanho da Fonte
    if (btnAumentar) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoAtualFonte < FONTE_MAXIMA) {
                tamanhoAtualFonte += PASSO_FONTE;
                document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
                localStorage.setItem("tamanhoFonte", tamanhoAtualFonte);
            }
        });
    }

    // Diminuir Tamanho da Fonte
    if (btnDiminuir) {
        btnDiminuir.addEventListener("click", () => {
            if (tamanhoAtualFonte > FONTE_MINIMA) {
                tamanhoAtualFonte -= PASSO_FONTE;
                document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
                localStorage.setItem("tamanhoFonte", tamanhoAtualFonte);
            }
        });
    }
});