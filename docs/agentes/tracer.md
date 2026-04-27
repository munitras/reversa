# Tracer

**Comando:** `/reversa-tracer`
**Fase:** Qualquer
**Analogia:** O investigador de campo

---

## O que faz

A análise estática tem limites. Ela lê o código, mas não vê o sistema em execução. Certos comportamentos só existem quando há dados reais, usuários reais, logs reais.

O Tracer é o investigador que vai ao local quando o código não responde. Observa logs ao vivo, consulta o banco com `SELECT` somente leitura, pede para você executar fluxos específicos enquanto ele acompanha o que acontece.

**Regra absoluta:** o Tracer nunca modifica nada. Nenhum `INSERT`, `UPDATE`, `DELETE`. Só observa.

---

## Quando usar

Use o Tracer quando houver lacunas 🔴 no `_reversa_sdd/gaps.md` que só o sistema em execução pode resolver. Por exemplo:

- "Qual é o comportamento quando a gateway de pagamento retorna timeout?"
- "Esse endpoint é realmente chamado? Com que frequência?"
- "Qual a distribuição real de valores no campo `status`?"

---

## O que ele analisa

### Logs históricos

Se existirem arquivos de log:

- Padrões de uso real: endpoints mais chamados, fluxos mais executados
- Sequências de eventos que revelam fluxos de usuário não documentados
- Erros frequentes e seus contextos
- Confirmação ou refutação de regras que foram marcadas como 🟡 INFERIDO

### Dados reais (somente leitura)

Se você conceder acesso ao banco de dados:

- `SELECT` apenas
- Distribuição de valores em campos de status
- Registros com valores inesperados (edge cases que existem na produção)
- Confirmação de cardinalidades

### Tracing de execução

Se o sistema puder ser iniciado localmente:

- Ele pede para você executar fluxos específicos
- Acompanha os logs em tempo real
- Mapeia a sequência real de chamadas

---

## O que ele produz

| Arquivo | Conteúdo |
|---------|----------|
| `_reversa_sdd/dynamic.md` | Descobertas da análise dinâmica |
| `_reversa_sdd/sequences/[fluxo].md` | Diagramas de sequência em Mermaid |
| `_reversa_sdd/gaps-resolved.md` | Lacunas 🔴 resolvidas com evidência |

Specs em `_reversa_sdd/sdd/` são atualizadas: onde o Tracer encontrou evidência real, os 🔴 viram 🟢.
