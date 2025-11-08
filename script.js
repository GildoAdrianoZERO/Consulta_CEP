const cepInput = document.getElementById('cepInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultadoBox = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');

const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidadeUf = document.getElementById('cidadeUf');

function limparResultador(){
    logradouro.textContent = '';
    bairro.textContent = '';
    cidadeUf.textContent = '';
    resultadoBox.classList.add('hidden');
    mensagemErro.textContent = '';
}

function exibirResultado(data){
    logradouro.textContent = data.logradouro || 'N/A';
    bairro.textContent = data.bairro || 'N/A';
    cidadeUf.textContent = `${data.localidade} - ${data.uf}`;

    resultadoBox.classList.remove('hidden');
    mensagemErro.textContent = '';
}

async function consultarCEP() {
    limparResultador(); 

    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8){
        mensagemErro.textContent = 'Por favor, digite um CEP válido com 8 digitos.';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try{
        const response = await fetch(url);

        const data = await response.json();

        if(data.erro){
            mensagemErro.textContent = `CEP ${cep} não encontrado`;
           limparResultador();

        } else {
            exibirResultado(data);
        }
    } catch (error){
        mensagemErro.textContent = 'Erro ao consultar CEP. Verifique sua conexão ou tente novamente.';
        console.error('Erro na requisição da API:', error);
        limparResultador();

    }

}

buscarBtn.addEventListener('click', consultarCEP);