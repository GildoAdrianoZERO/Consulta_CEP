// 1. VARIÁVEIS DE ELEMENTOS (DOM)
const cepInput = document.getElementById('cepInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultadoBox = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');

// Elementos de exibição de resultado
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidadeUf = document.getElementById('cidadeUf');
const valorFrete = document.getElementById('valorFrete'); 

// 2. TABELA DE FRETE
const tabelaDeFrete = {
    'PE': {
        'RECIFE': 100.00,
        'OLINDA': 100.00,
        'JABOATÃO DOS GUARARAPES': 100.00,
        'CAMARAGIBE': 100.00,
        'SÃO LOURENÇO DA MATA': 100.00,
        'CABO DE SANTO AGOSTINHO': 160.00,
        'PAULISTA': 100.00,
        'IPOJUCA': 200.00,
        'ABREU E LIMA': 100.00,
        'MORENO': 145.00,
        'IGARASSU': 160.00,
        'ARAÇOIABA': 250.00,
        'ITAPISSUMA': 175.00,
        'ILHA DE ITAMARACÁ': 200.00,
        'ALIANÇA': 300.00,
        'BUENOS AIRES': 250.00,
        'CAMUTANGA': 360.00,
        'CARPINA': 200.00,
        'CONDADO': 300.00,
        'FERREIROS': 350.00,
        'GOIANA': 200.00,
        'ITAMBÉ': 280.00,
        'ITAQUITINGA': 270.00,
        'LAGOA DO ITAENGA': 210.00,
        'LAGOA DO CARRO': 210.00,
        'MACAPARANA': 375.00,
        'NAZARÉ DA MATA': 215.00,
        'PAUDALHO': 190.00,
        'TIMBAÚBA': 315.00,
        'TRACUNHAÉM': 210.00,
        'VICÊNCIA': 275.00,
        'CHÃ DE ALEGRIA': 195.00,
        'CHÃ GRANDE': 260.00,
        'GLÓRIA DO GOITÁ': 210.00,
        'POMBOS': 215.00,
        'VITÓRIA DE SANTO ANTÃO': 200.00,
        'ÁGUA PRETA': 400.00,
        'AMARAJI': 325.00,
        'BARREIROS': 340.00,
        'BELÉM DE MARIA': 500.00,
        'CATENDE': 440.00,
        'CORTÊS': 340.00,
        'ESCADA': 200.00,
        'GAMELEIRA': 300.00,
        'JAQUEIRA': 465.00,
        'JOAQUIM NABUCO': 365.00,
        'MARAIAL': 490.00,
        'PALMARES': 385.00,
        'PRIMAVERA': 265.00,
        'QUIPAPÁ': 570.00,
        'RIBEIRÃO': 270.00,
        'RIO FORMOSO': 290.00,
        'SÃO BENEDITO DO SUL': 550.00,
        'SÃO JOSÉ DA COROA GRANDE': 370.00,
        'SIRINHAÉM': 260.00,
        'TAMANDARÉ': 330.00,
        'XEXÉU': 430.00,
        'ÁGUAS BELAS': 970.00,
        'BUÍQUE': 870.00,
        'ITAÍBA': 1030.00,
        'PEDRA': 800.00,
        'TUPANATINGA': 950.00,
        'VENTUROSA': 760.00,
        'ALAGOINHA': 710.00,
        'BELO JARDIM': 570.00,
        'BEZERROS': 325.00,
        'BREJO DA MADRE DE DEUS': 630.00,
        'CACHOEIRINHA': 540.00,
        'CAPOEIRAS': 740.00,
        'CARUARU': 425.00,
        'GRAVATÁ': 275.00,
        'JATAÚBA': 710.00,
        'PESQUEIRA': 670.00,
        'POÇÃO': 740.00,
        'RIACHO DAS ALMAS': 420.00,
        'SANHARÓ': 620.00,
        'SÃO BENTO DO UNA': 640.00,
        'SÃO CAITANO': 470.00,
        'TACAIMBÓ': 520.00,
        'CASINHAS': 400.00,
        'FREI MIGUELINHO': 460.00,
        'SANTA CRUZ DO CAPIBARIBE': 595.00,
        'SANTA MARIA DO CAMBUCÁ': 430.00,
        'SURUBIM': 380.00,
        'TAQUARITINGA DO NORTE': 610.00,
        'TORITAMA': 530.00,
        'VERTENTE DO LÉRIO': 430.00,
        'VERTENTES': 580.00,
        'BOM JARDIM': 310.00,
        'CUMARU': 380.00,
        'FEIRA NOVA': 250.00,
        'JOÃO ALFREDO': 330.00,
        'LIMOEIRO': 275.00,
        'MACHADOS': 360.00,
        'OROBÓ': 330.00,
        'PASSIRA': 345.00,
        'SALGADINHO': 360.00,
        'SÃO VICENTE FÉRRER': 360.00
    },
    'NAO_ENTREGA': 'Não Entregamos nesta região'
};

// 3. FUNÇÕES AUXILIARES

function limparResultados(){
    logradouro.textContent = '';
    bairro.textContent = '';
    cidadeUf.textContent = '';
    valorFrete.textContent = '';
    resultadoBox.classList.add('hidden');
    mensagemErro.textContent = '';
}

function calcularFrete(uf, cidade) {
    // Se o CEP for de outro estado, a ViaCEP retorna a UF. Bloqueamos imediatamente.
    if (uf.toUpperCase() !== 'PE') {
        return tabelaDeFrete['NAO_ENTREGA'];
    }

    // Padroniza a cidade para busca (sem acentos, maiúscula, sem espaços extras)
    const cidadeFormatada = cidade
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .trim().toUpperCase();

    const fretesPE = tabelaDeFrete['PE'];

    // Tenta encontrar o valor exato na lista.
    if (fretesPE[cidadeFormatada] !== undefined) {
        return fretesPE[cidadeFormatada];
    }
    
    // Se a cidade não foi encontrada na lista de PE
    return tabelaDeFrete['NAO_ENTREGA'];
}

function exibirResultado(data){
    logradouro.textContent = data.logradouro || 'N/A (Busca por Cidade)';
    bairro.textContent = data.bairro || 'N/A (Busca por Cidade)';
    cidadeUf.textContent = `${data.localidade} - ${data.uf}`;

    const frete = calcularFrete(data.uf, data.localidade); 

    if (typeof frete === 'number') {
        valorFrete.textContent = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        valorFrete.textContent = frete;
    }

    resultadoBox.classList.remove('hidden');
    mensagemErro.textContent = '';
}

// 4. FUNÇÕES DE BUSCA

// Função de busca por CEP (via API)
async function buscarPorCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro) {
            mensagemErro.textContent = `CEP ${cep} não encontrado.`;
            limparResultados();
        } else {
            exibirResultado(data);
        }
    } catch (error) {
        mensagemErro.textContent = 'Erro de rede. Verifique sua conexão ou a API ViaCEP.';
        console.error('Erro na requisição da API:', error);
        limparResultados();
    }
}

// Função de busca por Cidade 
function buscarPorCidade(termo) {
    const cidade = termo
        .split(/,\s*|\s*-\s*/) // Divide por vírgula ou hífen (se existir)
        .map(p => p.trim())[0]; // Pega apenas a primeira parte (a cidade)

    if (cidade.length < 3) {
        mensagemErro.textContent = 'Por favor, digite o nome completo da Cidade (Ex: Recife).';
        return;
    }

    // 2. Define o estado fixo para Pernambuco (PE)
    const uf = 'PE'; 

    // Simula o objeto de retorno da API
    const dadosSimulados = {
        localidade: cidade,
        uf: uf,
        logradouro: null, 
        bairro: null
    };
    
    // 3. Verifica se a cidade é PE, mas não está na nossa lista de fretes
    const frete = calcularFrete(uf, cidade);
    
    if (frete === tabelaDeFrete['NAO_ENTREGA']) {
        // Se a cidade não estiver na lista de PE, trata como não atendida
        mensagemErro.textContent = `A cidade "${cidade}" (PE) não está na nossa área de cobertura.`;
        limparResultados();
    } else {
        // Passamos os dados diretamente para o cálculo e exibição do frete
        exibirResultado(dadosSimulados);
    }
}

// 5. FUNÇÃO PRINCIPAL: Detecta o tipo de busca
function buscarUnificado() {
    limparResultados();
    const termoBruto = cepInput.value.trim();

    if (!termoBruto) {
        mensagemErro.textContent = 'O campo de busca não pode estar vazio.';
        return;
    }

    // Tenta limpar e validar como CEP: Remove tudo que não for dígito e espaços
    const cepLimpo = termoBruto.replace(/\D/g, ''); 
    
    // Verifica se o termo parece um CEP (exatamente 8 dígitos)
    if (cepLimpo.length === 8) {
        buscarPorCEP(cepLimpo);
    } 
    // Se não é um CEP válido, trata como busca por Cidade/Estado
    else {
        buscarPorCidade(termoBruto);
    }
}


// 6. EVENT LISTENERS
buscarBtn.addEventListener('click', buscarUnificado);
cepInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarUnificado();
    }
});