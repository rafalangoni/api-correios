let cep = document.querySelector("[data-tipo=cep]");
let valorDoCep = cep.value;
const botaoPesquisar = document.querySelector("[data-tipo=botaoPesquisar]")
const url = `https://viacep.com.br/ws/${valorDoCep}/json`;
const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    }
}

function preencherCampos(data) {
    const logradouro = document.querySelector("[data-tipo=logradouro]");
    const cidade = document.querySelector("[data-tipo=cidade]");
    const estado = document.querySelector("[data-tipo=estado]");
    const bairro = document.querySelector("[data-tipo=bairro]");
    const complemento = document.querySelector("[data-tipo=complemento]");

    logradouro.textContent = data.logradouro;
    cidade.textContent = data.localidade;
    estado.textContent = data.uf;
    bairro.textContent = data.bairro;
    complemento.textContent = data.complemento;
}

function consultarCep() {
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('Cep inválido, tente novamente.');
                valorDoCep = '';
                return
            }
            preencherCampos(data);
        })
}

botaoPesquisar.addEventListener("click", consultarCep);