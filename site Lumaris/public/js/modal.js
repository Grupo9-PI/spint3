//aqui é o modal.js

let modal = document.getElementById("meuModal");
let btn = document.getElementById("abrirModal");
let span = document.getElementById("fecharModal");
let abrirModalBtn = document.getElementById("abrirModal");
let fecharModalBtn = document.getElementById("fecharModal");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
abrirModalBtn.onclick = () => {
    modal.style.display = "block";
};

fecharModalBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Modal de mensagem
function mostrarMensagem(texto) {
    document.getElementById("mensagemModalTexto").innerText = texto;
    document.getElementById("modalMensagem").style.display = "block";
}

function fecharModalMensagem() {
    document.getElementById("modalMensagem").style.display = "none";
}

// Modal de confirmação
let acaoConfirmar = null;

function confirmar(mensagem, callback) {
    document.getElementById("textoConfirmar").innerText = mensagem;
    document.getElementById("modalConfirmar").style.display = "block";
    acaoConfirmar = callback;
}

function confirmarAcao() {
    fecharModalConfirmar();
    if (acaoConfirmar) acaoConfirmar();
}

function fecharModalConfirmar() {
    document.getElementById("modalConfirmar").style.display = "none";
}

// Modal de prompt
let acaoPrompt = null;

function pedirValor(mensagem, callback) {
    document.getElementById("promptTexto").innerText = mensagem;
    document.getElementById("inputPrompt").value = "";
    document.getElementById("modalPrompt").style.display = "block";
    acaoPrompt = callback;
}

function confirmarPrompt() {
    const valor = document.getElementById("inputPrompt").value.trim();
    fecharModalPrompt();
    if (acaoPrompt) acaoPrompt(valor);
}

function fecharModalPrompt() {
    document.getElementById("modalPrompt").style.display = "none";
}

/*tbm chamar o modal.css */