# Como usar

## Ativar o Reversa

Após instalar, abra o projeto no seu agente de IA e ative o Reversa:

=== "Claude Code / Cursor / Gemini CLI"

    ```
    /reversa
    ```

=== "Codex e engines sem slash commands"

    ```
    reversa
    ```

É só isso. O Reversa assume o controle e coordena toda a análise a partir daí.

---

## O que acontece quando você ativa

O Reversa verifica se existe uma análise em andamento:

**Primeira vez:** ele cria um plano de exploração personalizado para o seu projeto, apresenta ao usuário para aprovação e começa a análise pela fase 1.

**Sessão retomada:** ele lê o checkpoint salvo em `.reversa/state.json` e continua exatamente de onde parou. Não importa se você fechou o editor, reiniciou a máquina ou deixou dormindo por três dias.

---

## Fluxo típico de uma análise completa

```
Você digita /reversa
        ↓
Reversa cria o plano de exploração
        ↓
Você revisa e aprova o plano
        ↓
Scout mapeia a superfície do projeto
        ↓
Arqueólogo analisa módulo por módulo
        ↓
Detetive e Arquiteto interpretam o que foi encontrado
        ↓
Redator gera as especificações (uma por vez, com sua aprovação)
        ↓
Revisor revisa tudo e levanta perguntas para validação
        ↓
Especificações prontas em _reversa_sdd/
```

O processo é incremental e conversacional. Você não precisa estar presente o tempo todo: o Reversa avisa quando precisa de você.

---

## Quanto tempo leva?

Depende do tamanho do projeto, mas uma regra geral:

| Tamanho do projeto | Estimativa |
|--------------------|------------|
| Pequeno (< 10 módulos) | 2 a 4 sessões |
| Médio (10 a 30 módulos) | 5 a 10 sessões |
| Grande (30+ módulos) | 10+ sessões |

O Arqueólogo analisa um módulo por sessão para economizar contexto. Para projetos grandes, você vai retomar várias vezes, mas cada retomada é automática e sem perda de progresso.

---

## Dica: estouro de contexto

Se a sessão ficar muito longa e o contexto começar a acabar, o Reversa salva o checkpoint automaticamente e avisa:

> "Vou pausar aqui. Tudo está salvo. Digite `/reversa` em uma nova sessão para continuar."

Sem drama. Sem perda. É só continuar depois.

---

## Ativar um agente específico manualmente

Se quiser rodar um agente avulso, sem passar pelo orquestrador:

```
/reversa-scout
/reversa-detetive
/reversa-data-master
```

Útil quando você já tem uma análise em andamento e quer executar um agente específico por algum motivo pontual.
