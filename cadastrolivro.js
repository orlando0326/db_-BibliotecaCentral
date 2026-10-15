
(function () {
    "use strict";

    function iniciarCadastro() {
        const formulario = document.getElementById("bookForm");
        if (!formulario) {
            console.error('Cadastro não iniciado: não foi encontrado o formulário com id="bookForm".');
            return;
        }

        const campoCodigo = document.getElementById("codigo");
        const campoTitulo = document.getElementById("title");
        const campoAutor = document.getElementById("autor");
        const campoAno = document.getElementById("ano");

        if (!campoCodigo || !campoTitulo || !campoAutor || !campoAno) {
            console.error("Cadastro não iniciado: verifique os IDs codigo, title, autor e ano no HTML.");
            alert("O formulário está incompleto. Verifique os campos do HTML.");
            return;
        }

        if (!window.BibliotecaStorage) {
            console.error("armazenamento.js não foi carregado antes de cadastro.js.");
            alert("Erro: não foi possível carregar o armazenamento dos livros.");
            return;
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const codigo = Number(campoCodigo.value);
            const titulo = campoTitulo.value.trim();
            const autor = campoAutor.value.trim();
            const ano = Number(campoAno.value);
            const anoAtual = new Date().getFullYear();

            if (!Number.isSafeInteger(codigo) || codigo <= 0) {
                alert("Digite um código numérico inteiro maior que zero.");
                campoCodigo.focus();
                return;
            }

            if (!titulo) {
                alert("Digite o título do livro.");
                campoTitulo.focus();
                return;
            }

            if (!autor) {
                alert("Digite o nome do autor.");
                campoAutor.focus();
                return;
            }

            if (!Number.isInteger(ano) || ano < 1 || ano > anoAtual) {
                alert("Digite um ano de publicação entre 1 e " + anoAtual + ".");
                campoAno.focus();
                return;
            }

            const novoLivro = {
                codigo: codigo,
                titulo: titulo,
                autor: autor,
                ano: ano
            };

            try {
                window.BibliotecaStorage.adicionar(novoLivro);
                alert("Livro cadastrado com sucesso!");
                window.location.href = "listagemlivro.html";
            } catch (erro) {
                console.error("Erro ao cadastrar o livro:", erro);
                if (erro.code === "CODIGO_DUPLICADO") {
                    alert("Esse código já está cadastrado. Escolha outro código.");
                } else {
                    alert("Não foi possível salvar o livro. Abra o projeto com o Live Server e tente novamente.");
                }
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCadastro);
    } else {
        iniciarCadastro();
    }
})();
