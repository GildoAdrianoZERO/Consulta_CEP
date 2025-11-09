# 🔍 CEP Fácil

> Uma aplicação web simples e rápida para consulta de endereços brasileiros utilizando o CEP.

---

## 🎯 Sobre o Projeto

O **CEP Fácil** é um projeto de demonstração focado em consumir uma **API externa (ViaCEP)** utilizando JavaScript assíncrono (`fetch` e `async/await`) e exibir os resultados de forma clara e organizada.

### Funcionalidades Principais

* **Consulta Rápida:** O usuário insere um CEP e recebe instantaneamente o Logradouro, Bairro, Cidade e Estado.
* **Validação:** Verifica se o CEP digitado possui 8 dígitos.
* **Tratamento de Erros:** Exibe mensagens claras para CEPs não encontrados ou falhas de conexão/rede.
* **(Opcional, se você implementou o mapa):** **Visualização no Mapa:** Exibe a localização do endereço encontrado em um mapa interativo.

---

## 🚀 Como Executar Localmente

Este projeto é totalmente baseado em HTML, CSS e JavaScript Vanilla e não requer um servidor *backend* para funcionar.

### Pré-requisitos

Você só precisa de um **navegador web** (Chrome, Firefox, Edge, etc.).

### Instalação

1.  **Clone o repositório** para sua máquina local:
    ```bash
    git clone [https://github.com/SEU_USUARIO/cep-facil.git](https://github.com/SEU_USUARIO/cep-facil.git)
    cd cep-facil
    ```
2.  **Abra o arquivo:**
    Simplesmente clique duas vezes no arquivo `index.html` ou arraste-o para a janela do seu navegador.

---

## ⚙️ Tecnologias Utilizadas

* **HTML5:** Estrutura da página.
* **CSS3:** Estilização e layout responsivo.
* **JavaScript (Vanilla JS):** Lógica de consumo da API e manipulação do DOM.
* **API ViaCEP:** Fonte de dados gratuita para consulta de endereços por CEP.

