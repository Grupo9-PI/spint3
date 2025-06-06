let modal = document.getElementById("meuModal");
let btn = document.getElementById("abrirModal");
let span = document.getElementById("fecharModal");

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

/*tbm chamar o modal.css */