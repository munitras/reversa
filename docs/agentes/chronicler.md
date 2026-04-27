# Chronicler

**Comando:** `/reversa-doc` (ou `/reversa-chronicler`)
**Fase:** Qualquer, durante o desenvolvimento
**Analogia:** O escriba

---

## O que faz

O Chronicler captura o conhecimento sobre uma alteração de código *logo depois que ela acontece*, antes que o contexto se perca no histórico da conversa ou seja esquecido até a próxima sessão.

Sabe aquele momento em que você faz uma mudança, sabe exatamente por que fez, qual o impacto, o que pode quebrar... e dois dias depois não lembra mais? O Chronicler documenta esse momento enquanto ele ainda está fresco.

**Regra absoluta:** o Chronicler só documenta. Nunca altera código, nunca sugere mudanças, nunca opina sobre a implementação.

---

## Como funciona

Quando você ativa o Chronicler logo após uma alteração, ele:

### 1. Descobre o que mudou

Executa `git diff HEAD` para identificar os arquivos alterados. Se não houver diff ainda, ele pergunta quais arquivos foram modificados.

### 2. Faz três perguntas rápidas

```
Encontrei alterações em: `src/payments/gateway.js`, `src/payments/retry.js`

Três perguntas rápidas para documentar:
1. Por quê essa alteração foi necessária?
2. Há alguma quebra de compatibilidade ou efeito colateral?
3. Tem algum contexto extra importante? (pode pular se não tiver)
```

### 3. Gera a entrada no changelog

Cria ou atualiza `_reversa_sdd/changelog/YYYY-MM-DD.md` com a entrada documentada.

### 4. Atualiza a spec correspondente

Se a alteração afeta um componente que já tem spec em `_reversa_sdd/sdd/`, o Chronicler adiciona uma nota de alteração no final da spec para manter a rastreabilidade.

---

## Formato do changelog

```markdown
## 14:32 — Adiciona retry com backoff exponencial na gateway de pagamento

**O quê:** Adicionadas funções `retryWithBackoff` e `calculateDelay` em gateway.js
**Por quê:** Gateway retornava timeout em picos de carga e a aplicação não tentava novamente
**Impacto:** Pode aumentar latência em cenários de falha (máximo 3 tentativas com 1s, 2s, 4s)
**Arquivos:** src/payments/gateway.js, src/payments/retry.js
```

---

## Quando usar

Use sempre que fizer uma alteração relevante durante o desenvolvimento: implementações novas, correções de bugs, refatorações com impacto. O custo é de dois minutos. O ganho é não perder o contexto que só existe agora.
