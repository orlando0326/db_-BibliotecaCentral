
(function () {
    "use strict";

    const CHAVE_LIVROS = "bibliotecaCentralLivros";

    function listar() {
        let dados;
        try {
            dados = window.localStorage.getItem(CHAVE_LIVROS);
        } catch (erro) {
            const novoErro = new Error("Não foi possível acessar o armazenamento do navegador.");
            novoErro.code = "STORAGE_INDISPONIVEL";
            throw novoErro;
        }

        if (!dados) return [];

        try {
            const livros = JSON.parse(dados);
            if (!Array.isArray(livros)) throw new Error("Formato inválido");
            return livros;
        } catch (erro) {
            const novoErro = new Error("Os dados de livros salvos estão inválidos.");
            novoErro.code = "DADOS_INVALIDOS";
            throw novoErro;
        }
    }

    function salvarTodos(livros) {
        try {
            window.localStorage.setItem(CHAVE_LIVROS, JSON.stringify(livros));
        } catch (erro) {
            const novoErro = new Error("O navegador não conseguiu salvar os livros.");
            novoErro.code = "FALHA_AO_SALVAR";
            throw novoErro;
        }
    }

    function adicionar(livro) {
        const livros = listar();
        const duplicado = livros.some(function (item) {
            return Number(item.codigo) === Number(livro.codigo);
        });

        if (duplicado) {
            const erro = new Error("Já existe um livro com esse código.");
            erro.code = "CODIGO_DUPLICADO";
            throw erro;
        }

        livros.push(livro);
        salvarTodos(livros);
        return livro;
    }

    window.BibliotecaStorage = Object.freeze({
        listar: listar,
        adicionar: adicionar
    });
})();
