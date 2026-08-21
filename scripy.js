function inicializarAcessibilidade() {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    const PASSO = 10;
    const MIN_FONTE = 80;
    const MAX_FONTE = 160;

    // Leitura do localStorage com tratamento de erros (impede travamento se bloqueado)
    function lerStorage(chave) {
        try {
            return localStorage.getItem(chave);
        } catch (e) {
            return null;
        }
    }

    // Gravação no localStorage com tratamento de erros
    function salvarStorage(chave, valor) {
        try {
            localStorage.setItem(chave, valor);
        } catch (e) {
            // Ignora se a gravação for negada pelo navegador
        }
    }

    // --- ESCALA DE TAMANHO DA FONTE ---
    let tamanhoAtual = parseInt(lerStorage("tamanhoFonte"), 10) || 100;

    function aplicarTamanhoFonte(novoTamanho) {
        tamanhoAtual = Math.min(Math.max(novoTamanho, MIN_FONTE), MAX_FONTE);
        document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        salvarStorage("tamanhoFonte", tamanhoAtual.toString());
    }

    // Aplica o tamanho de fonte inicial ao carregar a página
    aplicarTamanhoFonte(tamanhoAtual);

    if (btnAumentar) {
        btnAumentar.addEventListener("click", () => {
            aplicarTamanhoFonte(tamanhoAtual + PASSO);
        });
    }

    if (btnDiminuir) {
        btnDiminuir.addEventListener("click", () => {
            aplicarTamanhoFonte(tamanhoAtual - PASSO);
        });
    }

    // --- MODO ALTO CONTRASTE ---
    const contrasteSalvo = lerStorage("altoContraste") === "true";

    function aplicarContraste(ativo) {
        if (ativo) {
            document.body.classList.add("alto-contraste");
        } else {
            document.body.classList.remove("alto-contraste");
        }

        if (btnContraste) {
            btnContraste.setAttribute("aria-pressed", ativo ? "true" : "false");
        }
        salvarStorage("altoContraste", ativo ? "true" : "false");
    }

    // Aplica o contraste inicial se houver preferência salva
    if (contrasteSalvo) {
        aplicarContraste(true);
    }

    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const estaAtivo = document.body.classList.contains("alto-contraste");
            aplicarContraste(!estaAtivo);
        });
    }
}

// Garante a execução independentemente de como o script foi carregado
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarAcessibilidade);
} else {
    inicializarAcessibilidade();
}