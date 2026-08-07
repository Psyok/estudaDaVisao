//botoes de acessibilidade
document.addEventListener("DOMContentLoaded, () =>"{

const btnContraste = document.getElementById("btn-contrare");
const btnAumentar = document.getElementById("btn-aumentar-texto");
const btnDiminuir = document.getElementById("btn-dimibuir-texto")

//aumente a fonte
let tamanhoAltualFonte = 100;


//função alto contraste

btnContraste.addEventListener("click", () =>){

    document.body.classlist.toogle("alto-contraste");

//acessibilidade para leitores de tela

const ativo = document.body.classList.contarins("alto-contraste
    btnContraste.setAttribute("aria-pressed", ativo))



}
})