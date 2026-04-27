# Configuração

O Reversa guarda toda a sua configuração e estado da análise dentro da pasta `.reversa/` na raiz do projeto. Você pode abrir e editar os arquivos quando quiser.

---

## Estrutura da pasta `.reversa/`

```
.reversa/
├── state.json          ← estado da análise entre sessões
├── config.toml         ← configuração do projeto
├── config.user.toml    ← suas preferências pessoais (não commitar)
├── plan.md             ← plano de exploração (você pode editar)
├── version             ← versão instalada do Reversa
├── context/
│   ├── surface.json    ← dados gerados pelo Scout
│   └── modules.json    ← dados gerados pelo Arqueólogo
└── _config/
    ├── manifest.yaml           ← metadados da instalação
    └── files-manifest.json     ← hashes SHA-256 para updates seguros
```

---

## `config.toml`: configuração do projeto

Criado na instalação. Define as configurações compartilhadas com o time:

```toml
[project]
name = "meu-projeto"
language = "pt-br"

[agents]
installed = ["reversa", "scout", "arqueologo", "detetive", "arquiteto", "redator", "revisor"]

[output]
folder = "_reversa_sdd"

[engines]
active = ["claude-code"]
```

Você pode mudar o `folder` de saída se preferir um nome diferente de `_reversa_sdd`.

---

## `config.user.toml`: preferências pessoais

Para preferências que são suas e não devem ser commitadas:

```toml
[user]
name = "Sandeco"
answer_mode = "chat"  # "chat" ou "file"
```

!!! warning "Não commitar"
    Adicione `config.user.toml` ao `.gitignore`. Cada pessoa do time pode ter suas próprias preferências sem afetar os outros.

---

## `plan.md`: plano de exploração

O Reversa gera esse arquivo na primeira sessão, depois de conversar com você sobre o projeto. Ele lista as tarefas da análise em ordem.

Você pode editá-lo diretamente: reordenar tarefas, remover módulos que não quer analisar, adicionar notas. O Reversa vai respeitar o que estiver aqui quando retomar a análise.

---

## `state.json`: estado da análise

Mantido automaticamente pelo Reversa. Registra a fase atual, quais agentes já rodaram e o progresso do Redator.

Você pode abrir para ver como está, mas não precisa editar manualmente. Se algo der errado e você precisar resetar uma fase específica, é aqui que você procuraria.

---

## Modo de resposta (`answer_mode`)

Controla como o Revisor levanta perguntas de validação para você:

| Modo | Comportamento |
|------|---------------|
| `chat` (padrão) | As perguntas aparecem no chat, uma a uma. Você responde na conversa. |
| `file` | O Revisor gera um arquivo `_reversa_sdd/questions.md` com todas as perguntas. Você preenche e avisa quando terminar. |

O modo `file` é útil quando há muitas perguntas e você quer responder com calma, fora da sessão.
