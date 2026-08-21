document.addEventListener("DOMContentLoaded", () => {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    const PASSO = 10;
    const MIN_FONTE = 80;
    const MAX_FONTE = 150;

    // Função de leitura com proteção contra restrições no localStorage
    const obterItemSalvo = (chave) => {
        try {
            return localStorage.getItem(chave);
        } catch (erro) {
            return null;
        }
    };

    // Função de escrita com proteção contra erros em navegadores ou arquivos locais
    const salvarItem = (chave, valor) => {
        try {
            localStorage.setItem(chave, valor);
        } catch (erro) {
            // Ignora a exceção caso a escrita seja bloqueada
        }
    };

    // --- ESCALA DE TAMANHO DA FONTE ---
    let tamanhoAtual = parseInt(obterItemSalvo("tamanhoFonte"), 10) || 100;

    const aplicarTamanhoFonte = (novoTamanho) => {
        tamanhoAtual = Math.min(Math.max(novoTamanho, MIN_FONTE), MAX_FONTE);
        document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        salvarItem("tamanhoFonte", tamanhoAtual.toString());
    };

    // Aplica a preferência de tamanho ao iniciar
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
    const contrasteAtivo = obterItemSalvo("altoContraste") === "true";

    const aplicarContraste = (ativo) => {
        document.body.classList.toggle("alto-contraste", ativo);
        if (btnContraste) {
            btnContraste.setAttribute("aria-pressed", ativo.toString());
        }
        salvarItem("altoContraste", ativo.toString());
    };

    // Aplica o alto contraste ao iniciar, caso esteja salvo como ativo
    if (contrasteAtivo) {
        aplicarContraste(true);
    }

    if (btnContraste) {
        btnContraste.addEventListener("click", () => {
            const estadoAtual = document.body.classList.contains("alto-contraste");
            aplicarContraste(!estadoAtual);
        });
    }
});