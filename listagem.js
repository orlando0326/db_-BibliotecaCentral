
(function () {
    "use strict";

    function criarCelula(valor) {
        const td = document.createElement("td");
        td.textContent = String(valor == null ? "" : valor);
        return td;
    }

    function mostrarMensagem(tbody, mensagem) {
        tbody.replaceChildren();
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = mensagem;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    function listarLivros() {
        const tbody = document.getElementById("listaLivros");
        if (!tbody) {
            console.error('Listagem não iniciada: não foi encontrado <tbody id="listaLivros">.');
            return;
        }

        if (!window.BibliotecaStorage) {
            mostrarMensagem(tbody, "Erro: armazenamento.js não foi carregado.");
            console.error("armazenamento.js deve ser carregado antes de listagem.js.");
            return;
        }

        try {
            const livros = window.BibliotecaStorage.listar();
            livros.sort(function (a, b) {
                return Number(a.codigo) - Number(b.codigo);
            });

            tbody.replaceChildren();

            if (livros.length === 0) {
                mostrarMensagem(tbody, "Nenhum livro cadastrado ainda.");
                return;
            }

            livros.forEach(function (livro) {
                const tr = document.createElement("tr");

                const tdCodigo = criarCelula(livro.codigo);
                const etiquetaCodigo = document.createElement("span");
                etiquetaCodigo.className = "codigo";
                etiquetaCodigo.textContent = String(livro.codigo);
                tdCodigo.replaceChildren(etiquetaCodigo);

                tr.appendChild(tdCodigo);
                tr.appendChild(criarCelula(livro.titulo));
                tr.appendChild(criarCelula(livro.autor));
                tr.appendChild(criarCelula(livro.ano));
                tbody.appendChild(tr);
            });
        } catch (erro) {
            console.error("Erro ao mostrar os livros:", erro);
            mostrarMensagem(tbody, "Não foi possível carregar os livros. Confira o armazenamento do navegador.");
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", listarLivros);
    } else {
        listarLivros();
    }
})();
