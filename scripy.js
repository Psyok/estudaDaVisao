document.addEventListener("DOMContentLoaded", () => {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    const PASSO = 10;
    const MAX_FONTE = 150;
    const MIN_FONTE = 80;

    // Leitura e escrita seguras para evitar travamento em arquivos locais ou iframes
    function lerArmazenamento(chave) {
        try {
            return localStorage.getItem(chave);
        } catch (e) {
            return null;
        }
    }

    function salvarArmazenamento(chave, valor) {
        try {
            localStorage.setItem(chave, valor);
        } catch (e) {
            // Ignora o bloqueio de gravação sem interromper o script
        }
    }

    // Aplicação do tamanho inicial do texto
    let tamanhoAtual = parseInt(lerArmazenamento("tamanhoFonte")) || 100;
    
    function atualizarFonte(novoTamanho) {
        tamanhoAtual = novoTamanho;
        document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        salvarArmazenamento("tamanhoFonte", tamanhoAtual);
    }

    atualizarFonte(tamanhoAtual);

    // Aplicação do estado de alto contraste inicial
    const contrasteAtivo = lerArmazenamento("altoContraste") === "true";
    if (contrasteAtivo) {
        document.body.classList.add("alto-contraste");
        if (btnContraste) btnContraste.setAttribute("aria-pressed", "true");
    }

    // --- EVENTO 1: ALTO CONTRASTE ---
    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const estaAtivo = document.body.classList.toggle("alto-contraste");
            btnContraste.setAttribute("aria-pressed", estaAtivo.toString());
            salvarArmazenamento("altoContraste", estaAtivo);
        });
    }

    // --- EVENTO 2: AUMENTAR FONTE ---
    if (btnAumentar) {
        btnAumentar.addEventListener("click", () => {
            if (tamanhoAtual < MAX_FONTE) {
                atualizarFonte(tamanhoAtual + PASSO);
            }
        });
    }

    // --- EVENTO 3: DIMINUIR FONTE ---
    if (btnDiminuir) {
        btnDiminuir.addEventListener("click", () => {
            if (tamanhoAtual > MIN_FONTE) {
                atualizarFonte(tamanhoAtual - PASSO);
            }
        });
    }
});