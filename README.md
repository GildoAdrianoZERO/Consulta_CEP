# 🔍 CEP Fácil: Consulta de Frete Rápida para Vendedores (Black Month)

> Uma ferramenta ágil e responsiva para vendedores da **Tradição Móveis** consultarem endereços via CEP ou Cidade e informarem o valor exato do frete, agilizando o atendimento durante a **Black Friday (Black Month)**.

---

## 🎯 Por Que Esta Ferramenta?

Este sistema foi desenvolvido para ser o principal auxílio dos vendedores em momentos de alto volume, como a Black Friday e outras campanhas promocionais. O objetivo é eliminar o tempo gasto com consulta manual de fretes, focando no cliente.

### Benefícios no Atendimento

* **Agilidade Máxima:** Calcule o frete na hora, com um único campo de busca, otimizando o processo de orçamentos.
* **Foco na Venda:** Reduza o tempo gasto com logística, permitindo que o vendedor dedique mais tempo à conversão e ao suporte ao cliente.
* **Experiência do Cliente:** Ofereça respostas imediatas e precisas, aumentando a confiança e a satisfação.

### 💡 Regra de Negócio Implementada

* **Busca Unificada:** Um único campo de entrada aceita tanto o **CEP** (com ou sem formatação) quanto o **Nome da Cidade**.
* **Cobertura Exclusiva:** A busca por Cidade assume o estado de **Pernambuco (PE)** automaticamente, e o sistema bloqueia e informa o vendedor sobre CEPs de outros estados.
* **Tabela Interna:** O valor do frete é calculado com base na tabela logística interna da Tradição Móveis.

---

## 🚀 Como Usar (Para Vendedores)

1.  Acesse o link da aplicação (ou abra o arquivo `index.html` no seu navegador).
2.  No campo de busca, digite:
    * **Um CEP de 8 dígitos** (Ex: `50000-000`).
    * **O nome da Cidade em PE** (Ex: `Olinda`).
3.  Pressione **"Buscar"** ou Enter.

**Resultado:** O sistema retornará o endereço completo (se buscado por CEP) e o **Valor do Frete** calculado.

---

## ⚙️ Detalhes Técnicos do Projeto

Este é um projeto **Front-end puro**, o que garante a máxima velocidade e portabilidade (pode ser executado diretamente em um navegador).

* **Tecnologias:** HTML5, CSS3 (Responsivo/Mobile First), JavaScript Vanilla.
* **API de Endereço:** **ViaCEP** (Para converter CEP em endereço).
* **Estilo:** Design moderno, limpo e minimalista (inspirado em aplicativos de utilidade).

---

## 📂 Estrutura de Arquivos

| Arquivo | Descrição |
| :--- | :--- |
| `index.html` | Estrutura, cabeçalho visual e o campo de busca unificado. |
| `style.css` | Estilos visuais (Design Moderno e Responsivo). |
| `script.js` | Contém a **Tabela de Fretes** e toda a lógica de detecção de busca (CEP vs. Cidade) e cálculo. |

---

## 🧑‍💻 Autor

Feito com 💙 por **[Gildo Norberto (ZERO)]**

