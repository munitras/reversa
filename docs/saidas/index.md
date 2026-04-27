# Saídas geradas

Tudo que o Reversa produz vai para a pasta `_reversa_sdd/` (ou o nome que você configurar em `config.toml`). O projeto legado nunca é tocado.

---

## Estrutura completa

```
_reversa_sdd/
├── inventory.md              # Inventário do projeto (Scout)
├── dependencies.md           # Dependências com versões (Scout)
├── code-analysis.md          # Análise técnica por módulo (Arqueólogo)
├── data-dictionary.md        # Dicionário completo de dados (Arqueólogo)
├── domain.md                 # Glossário e regras de negócio (Detetive)
├── state-machines.md         # Máquinas de estado em Mermaid (Detetive)
├── permissions.md            # Matriz de permissões (Detetive)
├── architecture.md           # Visão arquitetural geral (Arquiteto)
├── c4-context.md             # Diagrama C4: Contexto (Arquiteto)
├── c4-containers.md          # Diagrama C4: Containers (Arquiteto)
├── c4-components.md          # Diagrama C4: Componentes (Arquiteto)
├── erd-complete.md           # ERD completo em Mermaid (Arquiteto)
├── confidence-report.md      # Relatório de confiança 🟢🟡🔴 (Revisor)
├── gaps.md                   # Lacunas sem resposta (Revisor)
├── questions.md              # Perguntas para validação humana (Revisor)
├── dynamic.md                # Descobertas da análise dinâmica (Tracer)
│
├── sdd/                      # Specs por componente (Redator)
│   └── [componente].md
│
├── openapi/                  # Specs de API (Redator)
│   └── [api].yaml
│
├── user-stories/             # User stories (Redator)
│   └── [fluxo].md
│
├── adrs/                     # Decisões arquiteturais retroativas (Detetive)
│   └── [numero]-[titulo].md
│
├── flowcharts/               # Fluxogramas em Mermaid (Arqueólogo)
│   └── [modulo].md
│
├── sequences/                # Diagramas de sequência (Tracer)
│   └── [fluxo].md
│
├── ui/                       # Specs de interface (Visor)
│   ├── inventory.md
│   ├── flow.md
│   └── screens/
│       └── [tela].md
│
├── database/                 # Specs de banco de dados (Data Master)
│   ├── erd.md
│   ├── data-dictionary.md
│   ├── relationships.md
│   ├── business-rules.md
│   └── procedures.md
│
├── design-system/            # Tokens de design (Design System)
│   ├── color-palette.md
│   ├── typography.md
│   ├── spacing.md
│   ├── tokens.md
│   └── design-system.md
│
├── changelog/                # Alterações documentadas (Chronicler)
│   └── YYYY-MM-DD.md
│
└── traceability/
    ├── spec-impact-matrix.md # Qual spec impacta qual (Arquiteto)
    └── code-spec-matrix.md   # Arquivo de código → spec correspondente (Redator)
```

---

## Rastreabilidade

Dois arquivos conectam tudo:

**`traceability/code-spec-matrix.md`:** mapeia cada arquivo de código para a spec correspondente, com o nível de cobertura. Você sabe o que está coberto e o que não está.

**`traceability/spec-impact-matrix.md`:** mapeia qual componente impacta qual. Antes de mexer em alguma coisa, você sabe o raio de blast da mudança.

---

## Não commitando o que não precisa

Sugestão de `.gitignore` para não versionar as saídas do Reversa junto com o código (a não ser que você queira):

```gitignore
# Saídas do Reversa (opcional: remova se quiser versionar as specs)
_reversa_sdd/

# Configuração pessoal do Reversa (nunca commitar)
.reversa/config.user.toml
```
