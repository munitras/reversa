# Revisor

**Comando:** `/reversa-revisor`
**Fase:** 5 - Revisão
**Analogia:** O revisor de specs

---

## O que faz

O Revisor pega os contratos gerados pelo Redator e tenta furar. Não para destruir, mas para garantir que o que sobrar seja sólido.

Ele procura: contradições internas dentro de uma mesma spec, conflitos entre specs diferentes, afirmações marcadas como 🟢 que na verdade são inferências, comportamentos óbvios que ninguém documentou. Se achar, ele aponta, corrige e reclassifica.

---

## Bônus: revisão cruzada via Codex

Se o plugin do Codex estiver ativo na sessão, o Revisor oferece uma opção especial: solicitar que o Codex faça uma revisão independente antes da sua própria análise.

A vantagem é ter uma segunda opinião de uma LLM diferente da que gerou as specs. Diferentes modelos cometem erros diferentes, e a revisão cruzada pega coisas que uma revisão única pode deixar passar.

Se o Codex não estiver disponível, o Revisor segue normalmente sem mencionar o assunto.

---

## O processo de revisão

### Revisão por spec

Para cada spec em `_reversa_sdd/sdd/`:

- As regras fazem sentido em conjunto? Há contradições internas?
- Há comportamentos óbvios não especificados?
- Afirmações marcadas como 🟢: o Revisor volta ao código original para checar. Reclassifica se necessário.

### Revisão cruzada entre specs

- Specs que conflitam entre si
- Dependências declaradas que não batem com as reais no código
- Specs que deveriam existir mas não foram geradas

### Validação das matrizes

- `code-spec-matrix.md`: está completa? Há arquivos sem spec?
- `spec-impact-matrix.md`: reflete as dependências reais?

### Perguntas para você

Para cada lacuna 🔴 que só um humano que conhece o negócio pode resolver, o Revisor cria uma pergunta formatada. Dependendo do `answer_mode` configurado:

**`chat` (padrão):** as perguntas aparecem direto no chat, uma a uma. Você responde na conversa e ele atualiza as specs em tempo real.

**`file`:** o Revisor cria `_reversa_sdd/questions.md` com todas as perguntas. Você preenche com calma e avisa quando terminar.

---

## O que ele produz

| Arquivo | Conteúdo |
|---------|----------|
| `_reversa_sdd/questions.md` | Perguntas para validação humana |
| `_reversa_sdd/confidence-report.md` | Contagem de 🟢/🟡/🔴 por spec e percentual geral |
| `_reversa_sdd/gaps.md` | Lacunas que ficaram sem resposta |
| `_reversa_sdd/cross-review-result.md` | Apontamentos do Codex (se revisão cruzada solicitada) |

Specs em `_reversa_sdd/sdd/` são atualizadas in-place com as reclassificações.
