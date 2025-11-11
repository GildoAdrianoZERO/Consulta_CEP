// --------------------
// 1) DOM
// --------------------
const cepInput = document.getElementById('cepInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultadoBox = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidadeUf = document.getElementById('cidadeUf');
const valorFrete = document.getElementById('valorFrete');
const suggestionsEl = document.getElementById('suggestions');

// --------------------
// 2) DADOS (Frete PE)
// --------------------
const tabelaDeFrete = {
  PE: {
    RECIFE: 100.00, OLINDA: 100.00, "JABOATAO DOS GUARARAPES": 100.00, CAMARAGIBE: 100.00, "SAO LOURENCO DA MATA": 100.00,
    "CABO DE SANTO AGOSTINHO": 160.00, PAULISTA: 100.00, IPOJUCA: 200.00, "ABREU E LIMA": 100.00, MORENO: 145.00,
    IGARASSU: 160.00, ARACOIABA: 250.00, ITAPISSUMA: 175.00, "ILHA DE ITAMARACA": 200.00, ALIANCA: 300.00,
    "BUENOS AIRES": 250.00, CAMUTANGA: 360.00, CARPINA: 200.00, CONDADO: 300.00, FERREIROS: 350.00, GOIANA: 200.00,
    ITAMBE: 280.00, ITAQUITINGA: 270.00, "LAGOA DO ITAENGA": 210.00, "LAGOA DO CARRO": 210.00, MACAPARANA: 375.00,
    "NAZARE DA MATA": 215.00, PAUDALHO: 190.00, TIMBAUBA: 315.00, TRACUNHAEM: 210.00, VICENCIA: 275.00,
    "CHA DE ALEGRIA": 195.00, "CHA GRANDE": 260.00, "GLORIA DO GOITA": 210.00, POMBOS: 215.00, "VITORIA DE SANTO ANTAO": 200.00,
    "AGUA PRETA": 400.00, AMARAJI: 325.00, BARREIROS: 340.00, "BELEM DE MARIA": 500.00, CATENDE: 440.00, CORTES: 340.00,
    ESCADA: 200.00, GAMELEIRA: 300.00, JAQUEIRA: 465.00, "JOAQUIM NABUCO": 365.00, MARAIAL: 490.00, PALMARES: 385.00,
    PRIMAVERA: 265.00, QUIPAPA: 570.00, RIBEIRAO: 270.00, "RIO FORMOSO": 290.00, "SAO BENEDITO DO SUL": 550.00,
    "SAO JOSE DA COROA GRANDE": 370.00, SIRINHAEM: 260.00, TAMANDARE: 330.00, XEXEU: 430.00, "AGUAS BELAS": 970.00,
    BUIQUE: 870.00, ITAIBA: 1030.00, PEDRA: 800.00, TUPANATINGA: 950.00, VENTUROSA: 760.00, ALAGOINHA: 710.00,
    "BELO JARDIM": 570.00, BEZERROS: 325.00, "BREJO DA MADRE DE DEUS": 630.00, CACHOEIRINHA: 540.00, CAPOEIRAS: 740.00,
    CARUARU: 425.00, GRAVATA: 275.00, JATAUBA: 710.00, PESQUEIRA: 670.00, POCAO: 740.00, "RIACHO DAS ALMAS": 420.00,
    SANHARO: 620.00, "SAO BENTO DO UNA": 640.00, "SAO CAITANO": 470.00, TACAIMBO: 520.00, CASINHAS: 400.00,
    "FREI MIGUELINHO": 460.00, "SANTA CRUZ DO CAPIBARIBE": 595.00, "SANTA MARIA DO CAMBUCA": 430.00,
    SURUBIM: 380.00, "TAQUARITINGA DO NORTE": 610.00, TORITAMA: 530.00, "VERTENTE DO LERIO": 430.00, VERTENTES: 580.00,
    "BOM JARDIM": 310.00, CUMARU: 380.00, "FEIRA NOVA": 250.00, "JOAO ALFREDO": 330.00, LIMOEIRO: 275.00, MACHADOS: 360.00,
    OROBO: 330.00, PASSIRA: 345.00, SALGADINHO: 360.00, "SAO VICENTE FERRER": 360.00
  },
  NAO_ENTREGA: "Não entregamos nesta região"
};

// lista de cidades (chaves do objeto PE)
const cidadesPE = Object.keys(tabelaDeFrete.PE);

// --------------------
// 3) HELPERS
// --------------------
const setLoading = (loading) => {
  buscarBtn.disabled = loading;
  buscarBtn.textContent = loading ? 'BUSCANDO…' : 'BUSCAR';
};

function limparResultados({ manterErro = false } = {}) {
  logradouro.textContent = '';
  bairro.textContent = '';
  cidadeUf.textContent = '';
  valorFrete.textContent = '';
  valorFrete.classList.remove('sem-cobertura', 'com-cobertura');
  resultadoBox.classList.add('hidden');
  if (!manterErro) mensagemErro.textContent = '';
}

function normalizarCidade(cidade) {
  let c = (cidade || '').trim()
    .replace(/\s*[-,]\s*PE$/i, '') // remove "- PE" ou ", PE" no fim
    .replace(/\s+PE$/i, '');       // remove " PE" no fim
  return c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();
}

function calcularFrete(uf, cidade) {
  if ((uf || '').toUpperCase() !== 'PE') return tabelaDeFrete.NAO_ENTREGA;
  const key = normalizarCidade(cidade);
  return tabelaDeFrete.PE[key] ?? tabelaDeFrete.NAO_ENTREGA;
}

function exibirResultado(data) {
  logradouro.textContent = data.logradouro || 'N/A (Busca por Cidade)';
  bairro.textContent = data.bairro || 'N/A (Busca por Cidade)';
  cidadeUf.textContent = `${data.localidade} - ${data.uf}`;

  const frete = calcularFrete(data.uf, data.localidade);
  if (typeof frete === 'number') {
    valorFrete.textContent = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    valorFrete.classList.add('com-cobertura');
  } else {
    valorFrete.textContent = frete;
    valorFrete.classList.add('sem-cobertura');
  }
  resultadoBox.classList.remove('hidden');
  mensagemErro.textContent = '';
}

// CEP máscara
function formatarCEP(v) {
  const d = (v || '').replace(/\D/g, '').slice(0, 8);
  return d.length <= 5 ? d : `${d.slice(0, 5)}-${d.slice(5)}`;
}

// --------------------
// 4) BUSCAS
// --------------------
async function buscarPorCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    setLoading(true);
    limparResultados();
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (data.erro) {
      mensagemErro.textContent = `CEP ${formatarCEP(cep)} não encontrado.`;
      return;
    }
    exibirResultado(data);
  } catch (e) {
    mensagemErro.textContent = 'Erro de rede. Verifique sua conexão ou a API ViaCEP.';
    console.error(e);
  } finally {
    setLoading(false);
  }
}

function buscarPorCidade(termo) {
  setLoading(true);
  limparResultados();
  const cidadeEntrada = (termo.split(/,\s*|\s*-\s*/)[0] || termo).trim();
  if (cidadeEntrada.length < 2) {
    mensagemErro.textContent = 'Digite o nome completo da Cidade (Ex: Recife).';
    setLoading(false);
    return;
  }
  const uf = 'PE';
  const dados = { localidade: cidadeEntrada, uf, logradouro: null, bairro: null };
  const frete = calcularFrete(uf, cidadeEntrada);

  exibirResultado(dados);

  if (frete === tabelaDeFrete.NAO_ENTREGA) {
    mensagemErro.textContent = `A cidade "${cidadeEntrada}" (PE) não está na nossa área de cobertura.`;
  }
  setLoading(false);
}

function buscarUnificado() {
  const v = cepInput.value.trim();
  if (!v) {
    limparResultados();
    mensagemErro.textContent = 'O campo de busca não pode estar vazio.';
    return;
  }
  const digits = v.replace(/\D/g, '');
  if (digits.length === 8) buscarPorCEP(digits);
  else buscarPorCidade(v);
}

// --------------------
// 5) AUTOCOMPLETE
// --------------------
let activeIndex = -1; // item focado via teclado

const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, m => m.toUpperCase());

function highlight(text, query) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return text;
  return text.slice(0, i) + '<span class="highlight">' +
         text.slice(i, i + query.length) + '</span>' +
         text.slice(i + query.length);
}

function abrirSugestoes() {
  suggestionsEl.classList.remove('hidden');
  cepInput.setAttribute('aria-expanded', 'true');
}
function fecharSugestoes() {
  suggestionsEl.classList.add('hidden');
  cepInput.setAttribute('aria-expanded', 'false');
  activeIndex = -1;
}

function renderSugestoes(termo) {
  const raw = termo.trim();
  const normalized = normalizarCidade(raw);

  // não mostrar se for CEP, vazio ou muito curto
  const digits = raw.replace(/\D/g, '');
  if (!raw || digits.length === 8 || normalized.length < 2) { fecharSugestoes(); return; }

  const needle = normalized;
  const matches = cidadesPE
    .filter(c => c.includes(needle))
    .sort((a, b) => {
      const as = a.startsWith(needle) ? 0 : 1;
      const bs = b.startsWith(needle) ? 0 : 1;
      return as - bs || a.localeCompare(b);
    })
    .slice(0, 12);

  if (matches.length === 0) {
    suggestionsEl.innerHTML = `<div class="suggestion-empty">Nenhuma cidade encontrada</div>`;
    abrirSugestoes();
    return;
  }

  suggestionsEl.innerHTML = matches.map((c, i) => {
    const display = titleCase(c.replace(/\s+/g, ' '));
    const html = highlight(display, raw);
    return `<div class="suggestion-item" role="option" data-city="${display}" data-index="${i}">
              <i class="fas fa-location-dot"></i> <span>${html} - PE</span>
            </div>`;
  }).join('');
  abrirSugestoes();
}

function selecionarSugestao(idx) {
  const items = [...suggestionsEl.querySelectorAll('.suggestion-item')];
  if (idx < 0 || idx >= items.length) return;
  items.forEach(el => el.classList.remove('active'));
  items[idx].classList.add('active');
  activeIndex = idx;
}

function aplicarSugestao(idx) {
  const items = [...suggestionsEl.querySelectorAll('.suggestion-item')];
  if (idx < 0 || idx >= items.length) return;
  const city = items[idx].dataset.city;
  cepInput.value = city;
  fecharSugestoes();
  buscarPorCidade(city);
}

// clique no item
suggestionsEl.addEventListener('click', (e) => {
  const item = e.target.closest('.suggestion-item');
  if (!item) return;
  const idx = Number(item.dataset.index);
  aplicarSugestao(idx);
});

// fechar ao clicar fora
document.addEventListener('click', (e) => {
  if (!suggestionsEl.contains(e.target) && e.target !== cepInput) fecharSugestoes();
});

// --------------------
// 6) EVENTOS
// --------------------
buscarBtn.addEventListener('click', buscarUnificado);

cepInput.addEventListener('input', () => {
  // máscara quando começa com dígito; senão deixa livre
  if (/^\d/.test(cepInput.value)) cepInput.value = formatarCEP(cepInput.value);
  renderSugestoes(cepInput.value);
});

cepInput.addEventListener('keydown', (e) => {
  const isOpen = !suggestionsEl.classList.contains('hidden');
  const items = [...suggestionsEl.querySelectorAll('.suggestion-item')];

  switch (e.key) {
    case 'ArrowDown':
      if (isOpen && items.length) { e.preventDefault(); selecionarSugestao(Math.min(activeIndex + 1, items.length - 1)); }
      break;
    case 'ArrowUp':
      if (isOpen && items.length) { e.preventDefault(); selecionarSugestao(Math.max(activeIndex - 1, 0)); }
      break;
    case 'Enter':
      if (isOpen && activeIndex >= 0) { e.preventDefault(); aplicarSugestao(activeIndex); }
      else { buscarUnificado(); }
      break;
    case 'Escape':
      if (isOpen) { e.preventDefault(); fecharSugestoes(); }
      break;
    default: break;
  }
});
