const botaoPesquisar = document.querySelector("[data-tipo=botaoPesquisar]")
const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'content-type': 'application/json;charset=utf-8',
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

function validaCamposRecebidos(data) {
    if (data.complemento == "") {
        let complemento = document.querySelector("[data-tipo=complemento]").parentNode;
        complemento.style.display = "none";
    }
    if (data.logradouro == "") {
        let logradouro = document.querySelector("[data-tipo=logradouro]").parentNode;
        logradouro.style.display = "none";
    }
    if (data.bairro == "") {
        let bairro = document.querySelector("[data-tipo=bairro]").parentNode;
        bairro.style.display = "none";
    }
}

/**Função abaixo retorna os elementos para a tela
 * Isso porque se consultarmos um CEP que só retorna Cidade e UF, na próxima consulta
 * só retornrão esses dados. Dessa forma, retorno os campos pra tela com "display=block"!;
 */
function retornaCampos(data) {
    if (data.complemento !== "") {
        let complemento = document.querySelector("[data-tipo=complemento]").parentNode;
        complemento.style.display = "block";
    }
    if (data.logradouro !== "") {
        let logradouro = document.querySelector("[data-tipo=logradouro]").parentNode;
        logradouro.style.display = "block";
    }
    if (data.bairro !== "") {
        let bairro = document.querySelector("[data-tipo=bairro]").parentNode;
        bairro.style.display = "block";
    }
}

function consultarCep() {
    botaoPesquisar.disabled = true; //evita vários cliques no botão enquanto realiza o fetch
    let valorDoCep = cep.value;
    const url = `https://viacep.com.br/ws/${valorDoCep}/json`;
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('Cep inválido, tente novamente.');
                document.querySelector("[data-tipo=cep]").value = '';
                botaoPesquisar.disabled = false;
                return
            }
            preencherCampos(data);
            validaCamposRecebidos(data);
            document.querySelector("[data-tipo=cep]").value = '';
            botaoPesquisar.disabled = false;
            retornaCampos(data)
        })
}

botaoPesquisar.addEventListener("click", consultarCep);