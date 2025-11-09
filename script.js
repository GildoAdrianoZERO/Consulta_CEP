// ====================================
// === JAVASCRIPT COM LÓGICA DE BUSCA UNIFICADA E CORREÇÕES ===
// ====================================

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

// 2. TABELA DE DADOS ESPECÍFICA (Sua tabela de fretes para PE, sem acentos e em MAIÚSCULAS)
const tabelaDeFrete = {
    'PE': {
        'RECIFE': 100.00,
        'OLINDA': 100.00,
        'JABOATÃO DOS GUARARAPES': 100.00,
        'CAMARAGIBE': 100.00,
        'SAO LOURENCO DA MATA': 100.00,
        'CABO DE SANTO AGOSTINHO': 160.00,
        'PAULISTA': 100.00,
        'IPOJUCA': 200.00,
        'ABREU E LIMA': 100.00,
        'MORENO': 145.00,
        'IGARASSU': 160.00,
        'ARACOIABA': 250.00,
        'ITAPISSUMA': 175.00,
        'ILHA DE ITAMARACA': 200.00,
        'ALIANCA': 300.00,
        'BUENOS AIRES': 250.00,
        'CAMUTANGA': 360.00,
        'CARPINA': 200.00,
        'CONDADO': 300.00,
        'FERREIROS': 350.00,
        'GOIANA': 200.00,
        'ITAMBE': 280.00,
        'ITAQUITINGA': 270.00,
        'LAGOA DO ITAENGA': 210.00,
        'LAGOA DO CARRO': 210.00,
        'MACAPARANA': 375.00,
        'NAZARE DA MATA': 215.00,
        'PAUDALHO': 190.00,
        'TIMBAUBA': 315.00,
        'TRACUNHAEM': 210.00,
        'VICENCIA': 275.00,
        'CHA DE ALEGRIA': 195.00,
        'CHA GRANDE': 260.00,
        'GLORIA DO GOITA': 210.00,
        'POMBOS': 215.00,
        'VITORIA DE SANTO ANTAO': 200.00,
        'AGUA PRETA': 400.00,
        'AMARAJI': 325.00,
        'BARREIROS': 340.00,
        'BELEM DE MARIA': 500.00,
        'CATENDE': 440.00,
        'CORTES': 340.00,
        'ESCADA': 200.00,
        'GAMELEIRA': 300.00,
        'JAQUEIRA': 465.00,
        'JOAQUIM NABUCO': 365.00,
        'MARAIAL': 490.00,
        'PALMARES': 385.00,
        'PRIMAVERA': 265.00,
        'QUIPAPA': 570.00,
        'RIBEIRAO': 270.00,
        'RIO FORMOSO': 290.00,
        'SAO BENEDITO DO SUL': 550.00,
        'SAO JOSE DA COROA GRANDE': 370.00,
        'SIRINHAEM': 260.00,
        'TAMANDARE': 330.00,
        'XEXEU': 430.00,
        'AGUAS BELAS': 970.00,
        'BUIQUE': 870.00,
        'ITAIBA': 1030.00,
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
        'GRAVATA': 275.00,
        'JATAUBA': 710.00,
        'PESQUEIRA': 670.00,
        'POCAO': 740.00,
        'RIACHO DAS ALMAS': 420.00,
        'SANHARO': 620.00,
        'SAO BENTO DO UNA': 640.00,
        'SAO CAITANO': 470.00,
        'TACAIMBO': 520.00,
        'CASINHAS': 400.00,
        'FREI MIGUELINHO': 460.00,
        'SANTA CRUZ DO CAPIBARIBE': 595.00,
        'SANTA MARIA DO CAMBUCA': 430.00,
        'SURUBIM': 380.00,
        'TAQUARITINGA DO NORTE': 610.00,
        'TORITAMA': 530.00,
        'VERTENTE DO LERIO': 430.00,
        'VERTENTES': 580.00,
        'BOM JARDIM': 310.00,
        'CUMARU': 380.00,
        'FEIRA NOVA': 250.00,
        'JOAO ALFREDO': 330.00,
        'LIMOEIRO': 275.00,
        'MACHADOS': 360.00,
        'OROBO': 330.00,
        'PASSIRA': 345.00,
        'SALGADINHO': 360.00,
        'SAO VICENTE FERRER': 360.00
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
    // 1. Bloqueia imediatamente estados que não são PE
    if (uf.toUpperCase() !== 'PE') {
        return tabelaDeFrete['NAO_ENTREGA'];
    }

    // 2. Padroniza a cidade para a busca: remove acentos, espaços extras e coloca em MAIÚSCULAS
    const cidadeFormatada = cidade
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .trim().toUpperCase();

    const fretesPE = tabelaDeFrete['PE'];

    // 3. Tenta encontrar o valor exato na lista.
    if (fretesPE[cidadeFormatada] !== undefined) {
        return fretesPE[cidadeFormatada];
    }
    
    // 4. Se a cidade de PE não foi encontrada na lista (não atendida)
    return tabelaDeFrete['NAO_ENTREGA'];
}

function exibirResultado(data){
    // Se a busca foi por CEP, os campos de endereço são reais.
    // Se foi por cidade, usamos a mensagem 'N/A'.
    logradouro.textContent = data.logradouro || 'N/A (Busca por Cidade)';
    bairro.textContent = data.bairro || 'N/A (Busca por Cidade)';
    cidadeUf.textContent = `${data.localidade} - ${data.uf}`;

    const frete = calcularFrete(data.uf, data.localidade); 

    if (typeof frete === 'number') {
        // Formata o número como moeda brasileira (R$)
        valorFrete.textContent = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        // Exibe a mensagem de 'Não Entregamos...'
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
            // Se o CEP foi encontrado, o cálculo de frete é feito dentro do exibirResultado
            exibirResultado(data);
        }
    } catch (error) {
        mensagemErro.textContent = 'Erro de rede. Verifique sua conexão ou a API ViaCEP.';
        console.error('Erro na requisição da API:', error);
        limparResultados();
    }
}

// Função de busca por Cidade (direta)
function buscarPorCidade(termo) {
    // Foca apenas no nome da cidade, ignora qualquer UF que o usuário tenha digitado
    const cidade = termo
        .split(/,\s*|\s*-\s*/) 
        .map(p => p.trim())[0];

    if (cidade.length < 3) {
        mensagemErro.textContent = 'Por favor, digite o nome completo da Cidade (Ex: Recife).';
        return;
    }

    const uf = 'PE'; 

    const dadosSimulados = {
        localidade: cidade,
        uf: uf,
        logradouro: null, 
        bairro: null
    };
    
    // Tenta calcular o frete
    const frete = calcularFrete(uf, cidade);
    
    // 5. CORREÇÃO: Chamamos exibirResultado em qualquer caso para atualizar a tela
    exibirResultado(dadosSimulados);
    
    // Se o frete é a mensagem de "NÃO_ENTREGA", exibe a mensagem de erro no topo
    if (frete === tabelaDeFrete['NAO_ENTREGA']) {
        mensagemErro.textContent = `A cidade "${cidade}" (PE) não está na nossa área de cobertura.`;
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
    // Se não é um CEP válido, trata como busca por Cidade
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