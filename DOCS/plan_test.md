# Plano de Testes – Sistema de Estoque e Produtos

## 1 Introdução e Objetivos

Este plano cobre a API de **Estoque e Produtos**, incluindo endpoints para
listagem, cadastro, atualização e exclusão de produtos de diferentes categorias
(eletrônicos, móveis e hortifruti), além da integração com o front-end.

O objetivo principal é validar que a API e a UI atendem aos requisitos
funcionais (RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS) e a certos atributos de qualidade.

Nossos objetivos:

* **Verificar corretude funcional** – endpoints implementam o comportamento
  especificado (listagem, consulta, criação, atualização e remoção de produtos).
* **Avaliar robustez e validação de entrada** – entradas inválidas geram
  códigos HTTP e mensagens de erro apropriados.
* **Checar consistência e precisão** – operações de estoque respeitam regras de negócio
  e transações são consistentes.
* **Confirmar integração com a UI** – front-end reflete corretamente os dados da API.

---

## 2 Escopo

### 2.1 Escopo incluído

* Listagem de estoque (vazio e com múltiplos produtos).
* Consulta de produto por ID.
* Cadastro de produtos genéricos e específicos (eletrônicos, móveis, hortifruti).
* Atualização de dados de produto.
* Remoção de produto.
* Integração com o front-end (UI).
* Validações de entrada (campos obrigatórios, valores negativos, IDs inválidos).
* Teste básico de performance (listagem com >100 produtos).

### 2.2 Fora de escopo

* Autenticação ou autorização.
* Persistência avançada além do banco configurado.
* Testes de concorrência, carga e stress além do caso básico (CT-022).
* Testes de segurança (injeção, XSS etc.).

---

## 3 Estratégia de Testes

### 3.1 Níveis e tipos de teste

* **Unitário** – validações de dados, regras de negócio (opcional).
* **Integração de API** – Postman, Jest ou equivalente para exercitar endpoints.
* **Sistema/E2E** – verificar a integração com a UI.

**Tipos aplicáveis**:

* Funcionais
* Valores-limite (boundary)
* Negativos
* Regressão
* Performance (básico)

### 3.2 Técnicas de projeto de testes

* **Particionamento em classes de equivalência** – ex.: IDs válidos vs inválidos.
* **Análise de valores-limite** – ex.: quantidade = 0, valor negativo.
* **Transição de estados** – produto antes/depois de operações CRUD.

---

## 4 Papéis, Responsabilidades e Logística

| Papel          | Responsabilidade |
|----------------|------------------|
| **Tester/QA**  | Escrever plano, derivar casos, executar testes, registrar defeitos, sumarizar resultados. |
| **Dev**        | Implementar API, corrigir defeitos, apoiar entendimento do comportamento. |
| **Revisor**    | Revisar plano e casos quanto a completude e clareza. |

Execução local ou em ambiente de testes. A API deve estar rodando antes dos testes.

---

## 5 Casos de Teste

### CT-001 – Listar estoque (positivo)

**Pré-condições:** Existir ao menos um item no estoque.  
**Passos:**  
1. GET `/stock`.  
**Esperado:** HTTP 200; JSON array com `idPro`, `name`, `value`, `quantity`.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-002 – Listar estoque (vazio)

**Pré-condições:** Nenhum item cadastrado.  
**Passos:**  
1. GET `/stock`.  
**Esperado:** HTTP 200; JSON `[]`.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-003 – Adicionar produto (positivo)

**Pré-condições:** Acesso ao endpoint.  
**Passos:**  
1. POST `/stock` com JSON `name`, `value`, `quantity`.  
**Esperado:** HTTP 201; JSON com `idPro`, `name`, `value`, `quantity`.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-004 – Adicionar produto sem nome (negativo)

**Pré-condições:** Acesso ao endpoint.  
**Passos:**  
1. POST `/stock` sem campo `name`.  
**Esperado:** HTTP 400; mensagem de erro.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-005 – Atualizar produto existente (positivo)

**Pré-condições:** Produto existente no estoque.  
**Passos:**  
1. PUT `/stock/{idPro}` com novos valores.  
**Esperado:** HTTP 200; JSON atualizado.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-006 – Atualizar produto inexistente ou inválido (negativo)

**Pré-condições:** Nenhum produto correspondente ou dados inválidos.  
**Passos:**  
1. PUT `/stock/{idPro}` com ID inexistente/dados inválidos.  
**Esperado:** HTTP 400 ou 404; mensagem de erro.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-007 – Remover produto existente (positivo)

**Pré-condições:** Produto existente.  
**Passos:**  
1. DELETE `/stock/{idPro}`.  
**Esperado:** HTTP 200; confirmação de remoção.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-008 – Consultar produto por ID (positivo)

**Pré-condições:** Produto existente.  
**Passos:**  
1. GET `/stock/{id}`.  
**Esperado:** HTTP 200; objeto JSON com `idPro`, `name`, `value`, `quantity`.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-009 – Consultar produto inexistente (negativo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. GET `/stock/999999`.  
**Esperado:** HTTP 404; `"Produto não encontrado"`.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-010 – Cadastrar produto eletrônico (positivo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. POST `/products/electronics` com JSON `name`, `value`, `quantity`, `brand`, `manufacturer`, `model`, `releaseDate`.  
**Esperado:** HTTP 201; produto criado com ID.  
**Requisitos:** RF-PROD.  

---

### CT-011 – Cadastrar produto móvel (positivo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. POST `/products/furniture` com JSON `name`, `value`, `quantity`, `dimensions`, `material`.  
**Esperado:** HTTP 201; produto criado com ID.  
**Requisitos:** RF-PROD.  

---

### CT-012 – Cadastrar produto hortifruti (positivo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. POST `/products/hortifruti` com JSON `name`, `value`, `quantity`, `weight`.  
**Esperado:** HTTP 201; produto criado considerando peso.  
**Requisitos:** RF-PROD.  

---

### CT-013 – Atualizar produto (RF-PROD) (positivo)

**Pré-condições:** Produto cadastrado.  
**Passos:**  
1. PUT `/products/{id}` com novos dados.  
**Esperado:** HTTP 200; produto atualizado.  
**Requisitos:** RF-PROD.  

---

### CT-014 – Deletar produto do estoque (RF-PROD) (positivo)

**Pré-condições:** Produto cadastrado.  
**Passos:**  
1. DELETE `/products/{id}`.  
**Esperado:** HTTP 204; posterior GET retorna 404.  
**Requisitos:** RF-PROD.  

---

### CT-015 – Adicionar produto com valor negativo (negativo)

**Pré-condições:** Acesso ao endpoint.  
**Passos:**  
1. POST `/stock` com `value` < 0.  
**Esperado:** HTTP 400; mensagem de erro.  
**Requisitos:** RF-STOCK, RF-PROD, RF-FRONT, RF-TRANS.  

---

### CT-016 – Adicionar produto com quantidade zero (positivo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. POST `/stock` com `quantity: 0`.  
**Esperado:** HTTP 201; produto criado com quantidade 0.  
**Requisitos:** RF-STOCK, RF-PROD, RF-TRANS.  

---

### CT-017 – Atualizar apenas quantidade (positivo)

**Pré-condições:** Produto existente.  
**Passos:**  
1. PUT `/stock/{idPro}` alterando somente `quantity`.  
**Esperado:** HTTP 200; apenas quantidade alterada.  
**Requisitos:** RF-STOCK, RF-PROD, RF-TRANS.  

---

### CT-018 – Atualizar produto com nome duplicado (negativo)

**Pré-condições:** Dois produtos cadastrados.  
**Passos:**  
1. Atualizar nome de um para o nome do outro.  
**Esperado:** HTTP 409; erro de nome duplicado.  
**Requisitos:** RF-STOCK, RF-PROD, RF-TRANS.  

---

### CT-019 – Listar estoque com múltiplos produtos (positivo)

**Pré-condições:** Múltiplos produtos cadastrados.  
**Passos:**  
1. GET `/stock`.  
**Esperado:** HTTP 200; array com todos os produtos.  
**Requisitos:** RF-STOCK, RF-FRONT.  

---

### CT-020 – Consultar produto por ID inválido (negativo)

**Pré-condições:** Nenhum.  
**Passos:**  
1. GET `/stock/abc`.  
**Esperado:** HTTP 400; erro de ID inválido.  
**Requisitos:** RF-STOCK, RF-FRONT.  

---

### CT-021 – Remover produto já deletado (negativo)

**Pré-condições:** Produto removido.  
**Passos:**  
1. DELETE `/stock/{idPro}` novamente.  
**Esperado:** HTTP 404; "Produto não encontrado".  
**Requisitos:** RF-STOCK, RF-PROD, RF-TRANS.  

---

### CT-022 – Performance na listagem (positivo)

**Pré-condições:** >100 produtos cadastrados.  
**Passos:**  
1. GET `/stock`.  
**Esperado:** HTTP 200; resposta em < 2s com array completo.  
**Requisitos:** RF-STOCK, RF-FRONT, RF-TRANS.  

---



## 6 Matriz de Rastreabilidade

| Caso | Descrição | RF-STOCK | RF-PROD | RF-FRONT | RF-TRANS |
|------|-----------|----------|---------|----------|----------|
| CT-001 | Listar estoque (positivo) | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-002 | Listar estoque vazio | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-003 | Adicionar produto (positivo) | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-004 | Adicionar produto sem nome | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-005 | Atualizar produto existente | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-006 | Atualizar produto inexistente/inválido | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-007 | Remover produto existente | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-008 | Consultar produto por ID | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-009 | Consultar produto inexistente | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-010 | Cadastrar eletrônico | – | ✔️ | ✔️ | ✔️ |
| CT-011 | Cadastrar móvel | – | ✔️ | ✔️ | ✔️ |
| CT-012 | Cadastrar hortifruti | – | ✔️ | ✔️ | ✔️ |
| CT-013 | Atualizar produto (RF-PROD) | – | ✔️ | ✔️ | ✔️ |
| CT-014 | Deletar produto (RF-PROD) | – | ✔️ | ✔️ | ✔️ |
| CT-015 | Adicionar valor negativo | ✔️ | ✔️ | ✔️ | ✔️ |
| CT-016 | Adicionar quantidade zero | ✔️ | ✔️ | – | ✔️ |
| CT-017 | Atualizar apenas quantidade | ✔️ | ✔️ | – | ✔️ |
| CT-018 | Atualizar nome duplicado | ✔️ | ✔️ | – | ✔️ |
| CT-019 | Listar múltiplos produtos | ✔️ | ✔️ | ✔️ | – |
| CT-020 | Consultar ID inválido | ✔️ | – | ✔️ | – |
| CT-021 | Remover já deletado | ✔️ | ✔️ | – | ✔️ |
| CT-022 | Performance listagem | ✔️ | – | ✔️ | ✔️ |

---


## 7 Entregáveis

* **Plano de Testes** – este documento, descrevendo estratégia, escopo, casos, critérios e cronograma.  
* **Casos de Teste** – detalhamento (Seção 5).  
* **Suíte de Testes** – coleção Postman/Newman ou Jest com os casos automatizados.  
* **Log de Execução** – resultados de cada execução (pass/fail, tempo de resposta).  
* **Relatórios de Defeitos** – documentando bugs, severidade, prioridade e passos de reprodução.  
* **Relatório Sumário** – síntese final com métricas de aprovação, falhas, riscos abertos.  

---

## 8 Critérios de Entrada e Saída

**Entrada:**
* API compila e executa sem erros.
* Front-end acessível (HTML/JS) e conectado à API.
* Ambiente de testes configurado (Postman, Jest, banco populado com dados básicos).
* Massa de dados inicial pronta (ao menos 1 produto cadastrado).

**Saída:**
* Todos os casos de teste executados.
* Nenhum defeito de **alta severidade** em aberto.
* ≥ 85% dos casos críticos aprovados.
* Relatório final documentado e aceito pelas partes interessadas.

---

## 9 Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Requisitos incompletos ou ambíguos | Reuniões de alinhamento, documentação complementar. |
| Ambiente instável (banco/API indisponível) | Criar script de reset automático, containers para isolamento. |
| Restrições de tempo | Priorização dos casos críticos, automação parcial. |
| Dados inconsistentes após testes | Preparar massa controlada e resetar banco entre execuções. |
| Integração com front-end falhar | Validar API isoladamente antes de validar UI. |

---

## 10 Ambiente e Dados de Teste

* **Hardware** – qualquer máquina moderna (mín. 4GB RAM, dual-core).  
* **Software** – Node v20.10+, Express, MySQL 12+, Postman, Jest, navegadores Chrome/Firefox.  
* **Rede** – ambiente local ou servidor de testes acessível na rede.  
* **Dados de teste** –  
  - Estoque inicial vazio.  
  - Produto de exemplo para CTs positivos.  
  - IDs inválidos e valores negativos para CTs negativos.  
  - Massa de 100+ produtos para CT-022 (performance).  
* **Reset** – scripts SQL ou endpoints utilitários para limpar/repopular base.  

---

## 11 Cronograma

| Etapa | Descrição | Ferramentas/Ambiente | Duração Estimada |
|-------|-----------|----------------------|------------------|
| 1. Levantamento de Requisitos | Analisar RFs e critérios de aceitação | Documentos, reuniões | 1 dia |
| 2. Planejamento de Testes | Elaborar plano de testes e estratégias | Node, Jest, Express, MySQL | 1 dia |
| 3. Projeto dos Casos de Teste | Criar casos detalhados e dados de teste | Postman, Jest | 1 dia |
| 4. Preparação do Ambiente | Configurar ambiente, massa de dados | Windows/Linux, MySQL, Postman | 1 dia |
| 5. Execução dos Testes | Executar casos, registrar resultados | Postman, Jest, Browsers | 2–3 dias |
| 6. Análise de Resultados | Avaliar resultados, priorizar correções | Relatórios, reuniões | 1 dia |
| 7. Reteste e Validação Final | Retestes após correções, validar RFs | Node, Postman | 1 dia |
| 8. Teste de Usabilidade | Validar integração com UI | Usuários, reuniões | 1 dia |
| 9. Teste de Performance | Medir tempo de resposta, carga leve | Postman, scripts benchmark | 1 dia |
| 10. Documentação e Apresentação | Consolidar resultados, relatório final | Documentos, slides | 1 dia |

*Observações:*  
- Cronograma pode ser ajustado conforme complexidade do sistema e disponibilidade da equipe.  
- Retestes são críticos antes da entrega final.    
---

## Bibliografia 
 * site oficial do framework de testes - [JEST](https://jestjs.io/)
 * artigo web - [plano de teste - um mapa essencial para o teste de software](https://www.devmedia.com.br/plano-de-teste-um-mapa-essencial-para-teste-de-software/13824)
 * artigo web - [Como Criar um Plano de Testes Eficiente: Guia para QA’s e Desenvolvedores](https://daviteixeiradev.com/como-criar-um-plano-de-testes-eficiente-guia-para-qa-e-desenvolvedores/)
