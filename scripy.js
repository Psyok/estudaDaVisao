document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos da barra de acessibilidade
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-aumentar-texto");
    const btnDiminuir = document.getElementById("btn-diminuir-texto");

    // Configurações da escala de texto
    const PASSO = 10;
    const MIN_FONTE = 80;
    const MAX_FONTE = 150;

    // Métodos seguros para localStorage (evita erros em ambientes restritos/file://)
    const obterItemSalvo = (chave) => {
        try {
            return localStorage.getItem(chave);
        } catch (erro) {
            return null;
        }
    };

    const salvarItem = (chave, valor) => {
        try {
            localStorage.setItem(chave, valor);
        } catch (erro) {
            // Ignora o erro se o armazenamento estiver bloqueado pelo navegador
        }
    };

    // --- CONTROLE DE TAMANHO DA FONTE ---
    let tamanhoAtual = parseInt(obterItemSalvo("tamanhoFonte"), 10) || 100;

    const aplicarTamanhoFonte = (novoTamanho) => {
        tamanhoAtual = Math.min(Math.max(novoTamanho, MIN_FONTE), MAX_FONTE);
        document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        salvarItem("tamanhoFonte", tamanhoAtual.toString());
    };

    // Aplica o tamanho salvo na inicialização
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

    // --- CONTROLE DE ALTO CONTRASTE ---
    const contrasteAtivo = obterItemSalvo("altoContraste") === "true";

    const aplicarContraste = (ativo) => {
        document.body.classList.toggle("alto-contraste", ativo);
        if (btnContraste) {
            btnContraste.setAttribute("aria-pressed", ativo.toString());
        }
        salvarItem("altoContraste", ativo.toString());
    };

    // Aplica o estado de contraste salvo na inicialização
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