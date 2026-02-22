# BVB-DX CLI

Uma ferramenta de CLI para padronizar o contexto de IA e configurações de projetos.

## 🚀 Instalação e Uso

Você pode rodar a CLI diretamente via `npx` (sem precisar instalar globalmente) em qualquer projeto:

```bash
npx BernardoBroedel/bvb-dx
```

Isso inicializará a interface interativa, que te guiará através das configurações do ambiente.

### 🎨 Prévia da Interface

Quando você rodar o comando, a experiência visual no terminal será similar a esta:

```text
  ____ __     __ ____        ____ __  __ 
 | __ )\ \   / /| __ )      |  _ \\ \/ / 
 |  _ \ \ \ / / |  _ \ _____| | | |\  /  
 | |_) | \ V /  | |_) |_____| |_| |/  \  
 |____/   \_/   |____/      |____//_/\_\ 

             Configurando a Experiência de Desenvolvedor

│
◇  Initializing BVB-DX Workspace... 
│
◇  Qual contexto base você deseja aplicar neste projeto?
│  ✦ Configuração Completa (Recomendado)
│  ↳ Cursor Rules
│  ↳ Antigravity Skills
```

## ✨ Recursos

- **Interface Rica e Interativa:** Utiliza prompts modernos (via `@clack/prompts`) e ASCII Art para uma experiência visual impecável no terminal.
- **Separação por Contexto:** Você pode instalar apenas o que precisa, com total isolamento entre as regras do Cursor e as skills do Antigravity.
- **Merge Seguro:** O CLI detecta se os arquivos já existem e pergunta antes de sobrescrever, evitando perda de configurações locais.
- **Modo "Automático" (Headless):** Ideal para pipelines de CI/CD ou scripts locais, permitindo passar todas as opções via argumentos da linha de comando.

## 🎛️ Parâmetros de Linha de Comando (CLI Options)

Se você preferir pular os menus interativos, pode usar os argumentos diretamente no comando.

| Argumento            | Atalho | Descrição | Exemplo de Uso |
| :------------------- | :----- | :-------- | :------------- |
| `--env <type>`       | `-e`   | Define qual ambiente injetar (`all`, `cursor` ou `antigravity`). | `npx BernardoBroedel/bvb-dx --env cursor` |
| `--path <dir>`       | `-p`   | Define o diretório de destino onde os arquivos serão aplicados. O padrão é o diretório atual (`.`). | `npx BernardoBroedel/bvb-dx -p ./meu-projeto` |
| `--yes`              | `-y`   | Modo silencioso: aceita todas as opções e pula as perguntas. Requer `--env`. | `npx BernardoBroedel/bvb-dx -y -e antigravity -p .` |

### Exemplos Práticos

1. **Configuração completa em uma nova pasta `backend`:**
   ```bash
   npx BernardoBroedel/bvb-dx -p ./backend
   ```
2. **Injetar apenas as regras do Cursor, ignorando os prompts interativos:**
   ```bash
   npx BernardoBroedel/bvb-dx --env cursor --yes
   ```

## 📂 Estrutura de Templates Separados

A "mágica" acontece espelhando o conteúdo da pasta `templates/` da própria CLI.
Você pode customizar o "Ouro" editando estas subpastas dentro do repositório da CLI:

- **`templates/cursor/`**
  - **O que faz:** Injeta no repositório final o arquivo `.cursorrules`.
  - **Para que serve:** Define o comportamento global da IDE Cursor (como "sempre priorizar código limpo e Typescript Strict").
  
- **`templates/antigravity/`**
  - **O que faz:** Injeta a estrutura de pasta `.rules/` (ex: `ai-context-skill.md`).
  - **Para que serve:** Adiciona as **Skills Especializadas** da equipe, ditando as regras de arquitetura a serem lidas e respeitadas pelo agente de IA.

## 🚧 Roadmap (Próximos Passos)

Em breve, este pacote contará com suporte avançado a automações:
- **GitHub Actions (CI/CD):** Workflows visando a publicação automatizada sem a necessidade de build manual (packages).
- **GitHub Releases:** Changelog inteligente do versionamento atrelado de cada release do nosso CLI.
