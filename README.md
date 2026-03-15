# Taskear

Taskear é um sistema de gerenciamento de tarefas técnicas desenvolvido como projeto acadêmico.
O objetivo da aplicação é organizar e registrar demandas técnicas dentro de equipes, permitindo que técnicos registrem tarefas realizadas e mantenham um histórico estruturado de atendimentos.

Diferente de sistemas tradicionais de chamados, o Taskear propõe um fluxo onde **o próprio técnico registra a tarefa após receber uma demanda**, garantindo documentação mesmo quando o usuário não abre um chamado formal.

## Motivação

Em muitos ambientes de suporte técnico, especialmente em setores internos de TI, é comum que usuários comuniquem problemas diretamente aos técnicos sem registrar chamados em sistemas oficiais. Isso gera dificuldades como:

* Falta de documentação dos atendimentos
* Dificuldade em medir volume de trabalho
* Ausência de histórico de soluções
* Falta de confirmação formal do atendimento

O Taskear surge como uma alternativa simples para registrar essas demandas de forma estruturada.

## Proposta do Sistema

O sistema funciona da seguinte forma:

1. Um técnico recebe uma demanda (verbalmente, e-mail, etc.).
2. O técnico registra essa atividade como uma **tarefa** no sistema.
3. A tarefa fica associada a:

   * um membro da equipe
   * uma equipe específica
4. Após a conclusão, o sistema pode enviar um e-mail ao usuário afetado solicitando confirmação da resolução.

Esse fluxo garante rastreabilidade das atividades e documentação dos atendimentos realizados.

## Diferencial do Sistema

Diferentemente de sistemas tradicionais de chamados, como ferramentas de service desk, o Taskear adota um fluxo em que:

* o técnico registra a tarefa após receber a demanda
* o sistema mantém histórico das atividades realizadas
* pode haver confirmação posterior do usuário afetado

Essa abordagem permite registrar atendimentos informais que normalmente não seriam documentados.

## Estrutura do Banco de Dados

Principais tabelas:

```
usuarios
equipes
equipes_usuarios
tarefas
```

Relacionamentos principais:

* Um usuário pode participar de várias equipes
* Uma equipe possui vários usuários
* A relação entre usuários e equipes possui um papel (líder ou técnico)
* Cada tarefa pertence a um membro específico de uma equipe

## Status do Projeto

Projeto em desenvolvimento como parte de trabalho acadêmico.

Funcionalidades em progresso:

* gerenciamento de usuários
* criação de equipes
* registro de tarefas
* fluxo de confirmação por e-mail
* interface web em React

## Autor

Lucas Messias Ribeiro
Estudante de Sistemas para Internet

