# Agentes

O Reversa coordena um time de 14 especialistas. Cada agente faz uma coisa só e faz bem. Nenhum deles tenta fazer tudo.

O orquestrador central (o próprio Reversa) coordena quem entra quando, em que ordem e em que ritmo. Mas você também pode acionar qualquer agente diretamente quando precisar.

---

## Agentes obrigatórios

Esses fazem parte do pipeline principal. O orquestrador os executa na sequência certa.

| Agente | Fase | Analogia | Função |
|--------|------|----------|--------|
| [Reversa](reversa.md) | Orquestração | O regente de orquestra | Coordena todos os agentes, salva checkpoints e guia o usuário |
| [Scout](scout.md) | Reconhecimento | O corretor de imóveis | Mapeia a superfície: pastas, linguagens, frameworks, dependências, entry points |
| [Arqueólogo](arqueologo.md) | Escavação | O escavador | Análise profunda módulo a módulo: algoritmos, fluxos, estruturas de dados |
| [Detetive](detetive.md) | Interpretação | Sherlock Holmes | Extrai regras de negócio implícitas, ADRs, máquinas de estado, permissões |
| [Arquiteto](arquiteto.md) | Interpretação | O cartógrafo | Sintetiza tudo em diagramas C4, ERD e mapa de integrações |
| [Redator](redator.md) | Geração | O tabelião | Gera specs SDD, OpenAPI e user stories com rastreabilidade de código |

---

## Agentes opcionais

Instalados por padrão, mas podem ser acionados de forma independente em qualquer momento.

| Agente | Analogia | Quando usar |
|--------|----------|-------------|
| [Revisor](revisor.md) | O revisor de specs | Após o Redator: revisa criticamente as specs e valida lacunas |
| [Tracer](tracer.md) | O investigador de campo | Quando houver lacunas 🔴 que só o sistema em execução resolve |
| [Visor](visor.md) | O ilustrador forense | Quando tiver screenshots do sistema disponíveis |
| [Data Master](data-master.md) | O geólogo | Quando houver DDL, migrations ou modelos ORM para analisar |
| [Design System](design-system.md) | O estilista | Quando houver arquivos CSS, temas ou screenshots de interface |
| [Maestro](reversa.md) | O co-orquestrador | Suporte de orquestração em análises muito longas |
| [Chronicler](chronicler.md) | O escriba | Para documentar alterações de código durante o desenvolvimento |
| [Agents Help](agents-help.md) | O guia | Para entender o que cada agente faz e quando usar |

---

## Sequência recomendada

```
/reversa → orquestra tudo automaticamente

Ou manualmente, se preferir controlar cada passo:

Scout → Arqueólogo (N sessões) → Detetive → Arquiteto → Redator → Revisor

Opcionais em qualquer fase:
Visor · Data Master · Design System · Tracer
```

---

## Guia com analogias

Quer entender o papel de cada agente de um jeito mais visual e divertido? O [Guia com analogias](agents-help.md) explica cada um usando metáforas do mundo real.
