document.addEventListener("DOMContentLoaded", () => {
    // Seleção correta dos elementos pelo ID
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    // Configuração do tamanho de fonte inicial (em porcentagem)
    let tamanhoAtualFonte = 100;
    const PASSO_FONTE = 10; // Aumenta ou diminui de 10% em 10%
    const FONTE_MAXIMA = 150;
    const FONTE_MINIMA = 80;

    // --- FUNÇÃO 1: ALTO CONTRASTE ---
    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            // Alterna a classe no body
            document.body.classList.toggle("alto-contraste");

            // Verifica se está ativo
            const estaAtivo = document.body.classList.contains("alto-contraste");

            // Atualiza o atributo ARIA para leitores de tela
            btnContraste.setAttribute("aria-pressed", estaAtivo);
        });
    }

    // --- FUNÇÃO 2: AUMENTAR FONTE ---
    if (btnAumentar) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoAtualFonte < FONTE_MAXIMA) {
                tamanhoAtualFonte += PASSO_FONTE;
                document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
            }
        });
    }

    // --- FUNÇÃO 3: DIMINUIR FONTE ---
    if (btnDiminuir) {
        btnDiminuir.addEventListener("click", () => {
            if (tamanhoAtualFonte > FONTE_MINIMA) {
                tamanhoAtualFonte -= PASSO_FONTE;
                document.documentElement.style.fontSize = `${tamanhoAtualFonte}%`;
            }
        });
    }
});