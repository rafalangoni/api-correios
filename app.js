const cep = document.querySelector("[data-tipo=cep]");
const valorDoCep = cep.value;
const botaoPesquisar = document.querySelector("[data-tipo=botaoPesquisar]")
const url = `https://viacep.com.br/ws/${valorDoCep}/json`;
const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    }
}

function consultarCep(){
    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            if(data.erro){
                console.log("erro")
            }
            console.log(data);
        } )
    }
    
    
    botaoPesquisar.addEventListener("click", () => {
        consultarCep();
})