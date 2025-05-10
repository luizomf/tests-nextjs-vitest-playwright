# As anotações do Luiz Otávio 😅

Por [Luiz Otávio Miranda](https://github.com/luizomf) em junho de 2025.

**Material de Apoio Pessoal**

Essas anotações foram feitas enquanto eu montava os testes do projeto. Elas não
foram pensadas como conteúdo "formal", mas como um guia real de quem tá no meio
do código, quebrando a cabeça e testando tudo na prática. Resolvi compartilhar
com vocês porque sei que pode ajudar. Use como referência, consulta rápida ou
até pra adaptar nos seus próprios projetos.

Os arquivos estão extremamente verbosos (com muitos comentários).Isso é
proposital para explicação de cada linha de código. Fiz isso para evitar passar
coisas sem explicar o motivo.

---

## Configurações do git

```sh
# Configurar o nome do usuário
git config user.name "Luiz Otávio"

# Configurar o e-mail do usuário
git config user.email "luizomf@gmail.com"

# Muda o nome do branch para main
git branch -m main

# Garantir que o Git converta CRLF para LF apenas ao commitar (ótimo para projetos multiplataforma)
git config core.autocrlf input

# Forçar o Git a usar LF como fim de linha sempre
git config core.eol lf

# Verificar as configurações aplicadas
git config --list --local

# Adicionando o repositório
git add .
git commit -m "initial"
git remote add origin LINK-REPO
git push origin main -u
```

---

## Instalação do vitest

Comandos e detalhes sobre o que instalamos

```sh
npm i -D vitest @vitejs/plugin-react @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Abaixo são só coisas que vamos usar ao longo das aulas
npm i drizzle-orm better-sqlite3 clsx date-fns lucide-react
npm i -D dotenv dotenv-cli drizzle-kit @types/better-sqlite3 tsx
```

O que esses pacotes fazem?

| Pacote                        | Pra quê serve?                                                            |
| ----------------------------- | ------------------------------------------------------------------------- |
| `vitest`                      | Test runner moderno (substitui o Jest com sintaxe semelhante)             |
| `@vitejs/plugin-react`        | Suporte a JSX/TSX no Vite (essencial para projetos React)                 |
| `@vitest/coverage-v8`         | Gera relatório de cobertura usando o motor V8 (como no Node)              |
| `jsdom`                       | Emula o DOM no Node.js (necessário pra testar componentes React)          |
| `@testing-library/react`      | Renderiza e interage com componentes de forma semelhante ao usuário       |
| `@testing-library/jest-dom`   | Adiciona matchers úteis como `.toBeInTheDocument()` ao `expect`           |
| `@testing-library/user-event` | Simula eventos realistas como cliques e digitação (com foco, delay, etc.) |
| `drizzle-orm`                 | ORM moderno, simples e seguro para bancos SQL                             |
| `better-sqlite3`              | Banco de dados SQLite rápido e sincronizado (ideal pra testes e dev)      |
| `clsx`                        | Junta classes de forma condicional (ótimo com Tailwind)                   |
| `date-fns`                    | Biblioteca funcional para lidar com datas                                 |
| `lucide-react`                | Conjunto de ícones modernos para React                                    |
| `dotenv`                      | Carrega variáveis de ambiente de arquivos `.env`                          |
| `drizzle-kit`                 | CLI do Drizzle (usado para gerar e aplicar migrações no banco)            |
| `@types/better-sqlite3`       | Tipagens TypeScript para o `better-sqlite3`                               |
| `tsx`                         | Executa arquivos TypeScript direto no Node (sem precisar compilar antes)  |

---

## Configuração do vitest

Criar arquivo `./vitest.config.ts` (`code vitest.config.ts`):

```ts
/// <reference types="vitest" />
// Garante que o TypeScript reconheça os tipos do Vitest

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// Carrega variáveis de ambiente antes de tudo
// Estou usando a linha de comando para isso (mas deixei aqui caso queira)
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    // Define o ambiente de testes como jsdom
    // (simula o DOM no Node.js, ideal para testes de componentes React)
    environment: 'jsdom',

    // Permite usar funções como `describe`, `it`, `expect`
    // sem importar manualmente
    globals: true,

    // Rodar testes em paralelo (comportamento padrão do Vitest)
    // Mantido explícito caso algum teste com acesso ao SQLite
    // gere conflito em constraints únicas (ex: UNIQUE constraint)
    fileParallelism: false,

    // Arquivo executado antes de cada **arquivo de teste**
    // (ideal para configuração global como jest-dom e cleanup)
    setupFiles: ['vitest.setup.ts'],

    // Executado uma única vez antes (setup) e depois (tearDown) da suíte
    // inteira de testes
    globalSetup: ['vitest.global.setup.ts'],

    // Define quais arquivos serão considerados testes (unit e integration)
    // Testes de integração: .test.ts(x) | Testes Unitários: .spec.ts(x)
    include: ['src/**/*.{spec,test}.{ts,tsx}'],

    // Tempo máximo para cada teste (em milissegundos)
    // antes de ser considerado travado ou falho
    testTimeout: 10000,

    // Configuração de cobertura de testes
    coverage: {
      // Pasta onde os relatórios de cobertura serão gerados
      reportsDirectory: './coverage',

      // Usa o mecanismo de coverage nativo do Node.js
      provider: 'v8',

      // Quais arquivos serão analisados para cobertura de código
      include: ['src/**/*.{ts,tsx}'],

      // Arquivos e pastas que serão ignorados no relatório de cobertura
      exclude: [
        // Ignora arquivos de teste
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',

        // Ignora arquivos que TEM APENAS types ou interfaces
        '**/types/**',
        '**/*.d.ts',
        '**/*.type.{ts,tsx}',
        '**/*.types.{ts,tsx}',
        '**/*.contract.{ts,tsx}',
        '**/*.protocol.{ts,tsx}',
        '**/*.interface.{ts,tsx}',

        // Ignora layout.tsx (se for precisar testar o layout, remova)
        'src/app/**/layout.{ts,tsx}',

        // Ignora arquivos e pastas de mocks e utilitários de testes
        '**/*.mock.{ts,tsx}',
        '**/*.mocks.{ts,tsx}',
        '**/mocks/**',
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/__test-utils__/**',
        '**/*.test-util.ts',

        // Ignora arquivos e pastas do Storybook
        '**/*.story.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/stories/**',
        '**/__stories__/**',
      ],
    },
  },
  // Ativa o plugin do React (JSX transform, HMR, etc)
  plugins: [react()],
  resolve: {
    alias: {
      // Permite usar @/ como atalho para a pasta src
      // Exemplo: import Button from '@/components/Button'
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

Criar arquivo `./vitest.setup.ts` (`code vitest.setup.ts`):

```ts
// Esse arquivo é executado antes de cada ARQUIVO de teste.
// Ideal para configurar jest-dom, mocks globais, ou resetar estados entre arquivos.

// Importa funções do Vitest para usar depois dos testes
// `afterEach` = executa algo depois de cada teste
// `expect` = função principal para fazer asserções (testar resultados)
import { afterEach, expect } from 'vitest';

// Importa a função `cleanup` da Testing Library
// Ela "limpa" o DOM após cada teste pra garantir que um teste não afete outro
import { cleanup } from '@testing-library/react';

// Importa os matchers extras do jest-dom, adaptados pro Vitest
// Exemplo: `.toBeInTheDocument()`, `.toHaveAttribute()`, etc.
// Sem isso, o `expect(...).toBeInTheDocument()` daria erro
import '@testing-library/jest-dom/vitest';

// Importa todos os matchers do jest-dom adaptados para Vitest
// Isso evita warnings relacionados ao act(...) em atualizações do React
// e garante que matchers como `.toBeInTheDocument()` funcionem corretamente
import * as matchers from '@testing-library/jest-dom/matchers';
import { clearDrizzleTodoTable } from '@/core/todo/__tests__/utils/clear-drizzle-todo-table';

// Estende o expect global com os matchers do jest-dom
// Sem isso, pode aparecer warning do tipo "You might have forgotten to wrap an update in act(...)"
expect.extend(matchers);

// Essa função roda automaticamente depois de **cada** teste
// Serve pra limpar tudo e evitar que um teste interfira no outro
afterEach(async () => {
  // Limpa o DOM entre os testes (remove o que foi renderizado)
  cleanup();

  // Reseta todos os spies e mocks do Vitest (`vi.fn`, `vi.spyOn`, etc.)
  // Garante que os testes sejam independentes e não tenham "lixo" de execuções anteriores
  vi.resetAllMocks();

  // Limpa a tabela da base de dados caso tenha ficado lixo
  await clearDrizzleTodoTable();
});
```

Arquivo `vitest.global.setup.ts`:

```ts
import cleanupTestDatabase from '@/utils/__tests__/utils/cleanup-test-database';

// Executado uma única vez antes (setup) e depois (tearDown) da suíte
// inteira de testes

export async function setup() {
  // Roda antes de todos os testes
  // Isso é meio demais, mas às vezes o teste não roda por completo
  // e deixa lixo, como bases de dados antigas ou dados na tabela
  await cleanupTestDatabase();
}

export async function teardown() {
  // Roda depois de todos os testes
  await cleanupTestDatabase();
}
```

Arquivo `tsconfig.json`:

```json
{
  // outras configs
  "compilerOptions": {
    // outras configs
    "types": ["vitest/globals"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
  // outras configs
}
```

Arquivo `package.json`:

```json
{
  // outras configs
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "drizzle:generate": "drizzle-kit generate",
    "drizzle:migrate": "drizzle-kit migrate",
    "dev:test": "dotenv -e .env.e2e -- next dev",
    "start:test": "dotenv -e .env.e2e -- next start",
    "test": "dotenv -e .env.test -- vitest run --bail 1",
    "test:all": "npm run test && npm run test:e2e",
    "test:watch": "dotenv -e .env.test -- vitest --bail 1",
    "test:unit": "dotenv -e .env.test -- vitest run --exclude 'src/**/*.{test,e2e}.{ts,tsx}' --fileParallelism",
    "test:unit:watch": "dotenv -e .env.test -- vitest --exclude 'src/**/*.{test,e2e}.{ts,tsx}' --fileParallelism",
    "test:int": "dotenv -e .env.test -- vitest run --exclude 'src/**/*.{spec,e2e}.{ts,tsx}' --no-file-parallelism",
    "test:int:watch": "dotenv -e .env.test -- vitest --exclude 'src/**/*.{spec,e2e}.{ts,tsx}' --no-file-parallelism",
    "test:cov": "dotenv -e .env.test -- vitest run --coverage --no-file-parallelism",
    "test:e2e": "dotenv -e .env.e2e -- playwright test",
    "test:e2e:headed": "dotenv -e .env.e2e -- playwright test --headed",
    "test:e2e:debug": "dotenv -e .env.e2e -- playwright test --debug",
    "test:e2e:ui": "dotenv -e .env.e2e -- playwright test --ui",
    "test:e2e:report": "dotenv -e .env.e2e -- playwright show-report",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
  // outras configs
}
```

---

## Tipos de testes: unitários, integração e e2e

### 🧪 Testes unitários (`*.spec.ts(x)`)

Testam **um único elemento isolado** — como funções puras, classes ou até
componentes pequenos. Se esse elemento depende de outro (ex: uma função chama
outra, ou um componente usa outro), **a dependência deve ser mockada**. Esses
testes não envolvem DOM, rede, banco, nem efeitos colaterais reais.

📌 Exemplos:

- Testar uma função `sum(a, b)` retorna o valor correto.
- Testar que um componente `<Button>` renderiza o texto correto.
- Testar que uma função chama outra com os argumentos esperados (com `vi.fn`).

### 🔄 Testes de integração (`*.test.ts(x)`)

Validam a **integração entre dois ou mais elementos reais do sistema**, como um
componente que usa outros componentes, um hook que depende de contexto, ou uma
função que interage com a API interna. Não há efeitos colaterais externos reais
— **mockamos banco, rede, arquivos, e-mail**, etc.

📌 Exemplos:

- Testar que `<TodoForm />` renderiza os todos corretamente e chama a
  `createTodoAction`.
- Testar que um formulário envia os dados corretos para a função `handleSubmit`.
- Testar que uma API chama o repositório corretamente (com mock do banco).

### 🌐 Testes end-to-end (`*.e2e.ts`)

Simulam o **comportamento real do usuário** ou do sistema completo. Envolvem o
app rodando de verdade (via Playwright, Vitest com fetch real, etc.). Idealmente
usam um banco de dados separado e limpo, podendo ou não mockar serviços externos
como e-mail, storage, etc.

📌 Exemplos:

- O usuário preenche um formulário, envia, e vê o item novo na tela.
- Um teste de API acessa `/login`, envia credenciais, recebe JWT e acessa rota
  privada.
- Um e-mail de verificação é simulado via mock, mas todo o fluxo roda real.

---

## Alguns exemplos de frases para `test` e `it`

Como podemos ter dificuldades em escrever os nomes dos testes, aqui estão alguns
exemplos:

```
| Ação                 | Exemplo adaptável                           |
|----------------------|---------------------------------------------|
| `renders`            | `renders input with label`                  |
| `shows`              | `shows tooltip on hover`                    |
| `hides`              | `hides error when fixed`                    |
| `calls`              | `calls onChange when typed`                 |
| `submits`            | `submits form with valid data`              |
| `navigates`          | `navigates to dashboard on login`           |
| `displays`           | `displays success toast after submit`       |
| `updates`            | `updates value on user typing`              |
| `toggles`            | `toggles theme on switch click`             |
| `finds`              | `finds items using role`                    |
| `handles`            | `handles fetch failure with fallback UI`    |
| `validates`          | `validates required fields`                 |
| `matches`            | `matches snapshot for default state`        |
| `generates`          | `generates a random string`                 |
| `creates`            | `creates new user object`                   |
| `builds`             | `builds slug from text`                     |
| `constructs`         | `constructs query from filters`             |
| `fetches`            | `fetches post data from API`                |
| `receives`           | `receives response from mocked fetch`       |
| `sends`              | `sends correct payload to server`           |
| `formats`            | `formats ISO date to locale format`         |
| `parses`             | `parses API response to expected shape`     |
| `filters`            | `filters results based on user input`       |
| `maps`               | `maps API data to UI structure`             |
| `resolves`           | `resolves promise with expected data`       |
| `rejects`            | `rejects with error when API fails`         |
```

## Diferenças entre `mock`, `mocked` e `stubGlobal`

### ✅ `vi.mock`

Serve pra **mockar módulos inteiros** (ex: `fs/promises`, `axios`, `date-fns`).
Você pode retornar um objeto com `vi.fn()` em cada função que quer interceptar.
Se o módulo exporta `default`, precisa mockar isso também (como fez certinho com
o `default: { ... }`).

### ✅ `vi.mocked(...)`

Usado pra **dizer ao TypeScript que aquela função já foi mockada** e, por isso,
tem métodos como `.mockResolvedValue()` e afins.

> Ele **não cria** o mock. Só "tipa" corretamente algo **que já foi mockado
> antes** com `vi.mock`.

### ✅ `vi.stubGlobal`

Mocka **qualquer valor global** em tempo de teste. Serve tanto pra funções
(`fetch`, `setTimeout`, `crypto`) quanto pra valores (`Date`, `Math.random`,
etc). Muito útil quando você quer testar algo que depende diretamente de
globals.

> Dica: diferente de `vi.mock`, o `vi.stubGlobal` pode ser resetado com
> `vi.resetAllMocks()` no `afterEach`.

### 💡 Dica extra: `vi.spyOn(...)`

Serve pra **espionar** métodos em objetos já existentes (sem precisar mockar
tudo). Ideal pra _parcial mocks_, tipo `console.log`, `Date.now`, ou uma função
dentro de um serviço que não quer mockar inteiro.

Perfeito, cara. Essa estrutura tá ótima e super clara pra aula. Fiz só pequenos
ajustes de linguagem, padronização e deixei tudo mais afiado e direto, mantendo
tua essência:

---

## Regras da testing library para seguir boas práticas

### 1. Use seletores baseados no que o usuário vê

Evite testar classes, IDs ou estrutura interna. Foque no conteúdo acessível ao
usuário.

```tsx
screen.getByText('Bem-vindo');
screen.getByRole('button', { name: /salvar/i });
screen.getByLabelText('Senha');
```

### 2. Prefira `findBy*` para conteúdo assíncrono

Use `findBy` para esperar um elemento aparecer após interações.

```tsx
await screen.findByText('Dados carregados');
```

### 3. Use `userEvent` para simular interações

Simula interações reais com foco, delay, teclado e clique.

```tsx
await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
await userEvent.type(screen.getByLabelText('Nome'), 'Otávio');
```

### 4. Centralize renderizações comuns

Crie helpers como `renderWithProviders` se usar Context, Theme, Redux, etc.

```tsx
function renderWithTheme(ui) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}
```

### 5. Teste o que o usuário esperaria

Verifique mensagens, estados, botões desabilitados, e mudanças visuais.

```tsx
expect(screen.getByText('Erro ao salvar')).toBeInTheDocument();
expect(button).toBeDisabled();
```

---

## ❌ Más Práticas – O que evitar ao usar a testing library

### 1. Evite `getByTestId` como padrão

Só use se **não houver outra forma acessível** de selecionar.

```tsx
// Evite:
screen.getByTestId('botao-enviar');
```

### 2. Não teste classes, estilos ou estrutura interna

Fragiliza o teste. Mudanças no CSS quebram os testes sem necessidade.

```tsx
// Evite:
expect(button).toHaveClass('btn-primary');
```

### 3. Não use `waitFor` sem real necessidade

Use `waitFor` para condições genéricas, mas prefira `findBy` para elementos.

```tsx
// Menos ideal:
await waitFor(() => {
  expect(screen.getByText('Pronto')).toBeInTheDocument();
});

// Melhor:
await screen.findByText('Pronto');
```

### 4. Não teste implementação interna

Evite saber de `useState`, `ref`, `context`, etc. Teste comportamentos e efeitos
visuais.

```tsx
// Evite:
expect(setStateSpy).toHaveBeenCalled();

// Prefira:
expect(screen.getByText('Contador: 1')).toBeInTheDocument();
```

---

### 🧠 Extras

- **Usar `getByRole` ajuda na acessibilidade**
- **Mock apenas o necessário** (APIs externas, não comportamento interno)
- **Escreva o nome do teste como comportamento do usuário**

```tsx
// Bom:
test('mostra erro ao enviar formulário vazio', () => { ... })

// Ruim:
test('chama handleSubmit com dados vazios', () => { ... })
```

---

### 💡 Dica final

> "Teste como o usuário usaria. Não como o dev implementou." – Kent C. Dodds

---

## 🧪 Métodos da Testing Library – Resumo rápido

### 🟩 `getBy*`

- **Sincronamente** busca o elemento.
- Se **não encontrar → lança erro**.
- Ideal quando o elemento já **deveria estar visível.**

```ts
screen.getByText('Enviar');
```

### 🟦 `findBy*`

- **Assíncrono**, espera o elemento aparecer.
- Útil após cliques, fetchs, animações, etc.
- Internamente usa `waitFor`.

```ts
await screen.findByText('Carregando...');
```

### 🟥 `queryBy*`

- Retorna `null` se **não encontrar** (sem erro).
- Ideal para testar **que algo não está na tela**.

```ts
expect(screen.queryByText('Erro')).not.toBeInTheDocument();
```

### 🧭 Ordem de prioridade dos seletores

> Do mais recomendado ao menos recomendado (da perspectiva do usuário):

1. ✅ `getByRole`
2. ✅ `getByLabelText`
3. ✅ `getByPlaceholderText`
4. ✅ `getByText`
5. ✅ `getByDisplayValue`
6. ✅ `getByAltText`
7. ⚠️ `getByTitle`
8. 🚫 `getByTestId` (usar só como último recurso)

---

## Nomenclatura de arquivos

A organização dos arquivos segue o seguinte princípio:

| Sufixo do Arquivo  | Indica o quê?                                      | Quando usar                                                                          |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `.spec.ts(x)`      | **Teste unitário**                                 | Para testar funções puras, componentes isolados ou lógica sem dependências externas. |
| `.test.ts(x)`      | **Teste de integração**                            | Para testar a integração entre partes do sistema (ex: componente + lógica externa).  |
| `.e2e.ts(x)`       | **Teste end-to-end**                               | Para simular o fluxo completo da aplicação (normalmente usando Playwright).          |
| `.mock.ts(x)`      | **Mock manual**                                    | Quando precisa simular dados ou comportamentos em testes.                            |
| `.test-util.ts(x)` | **Utilitário de teste**                            | Funções auxiliares para setup, mock dinâmico ou criação de dados para testes.        |
| `.contract.ts`     | **Contrato de tipo**                               | Define contratos: interfaces, tipos ou classes abstratas sem lógica real.            |
| `.schema.ts`       | **Schema de validação ou banco**                   | Define validações com Zod, estruturas de tabela com Drizzle, etc.                    |
| `.repository.ts`   | **Repositório de dados**                           | Implementa as regras de acesso a dados conforme contrato.                            |
| `nome-funcao.ts`   | **Funções isoladas**                               | Arquivos com funções específicas (nome do arquivo = nome da função).                 |
| `Outros`           | **Ex: `.dto.ts`, `.service.ts`, `.controller.ts`** | Use quando quiser deixar clara a função do arquivo no domínio da aplicação.          |

---

## ⚠️ Uso controlado de `any`, `@ts-expect-error` e desativação de ESLint

Durante os testes e casos específicos, às vezes **precisamos forçar situações
inválidas** ou contornar regras que fazem sentido na maior parte do tempo, mas
não ali. Esses são os macetes pra lidar com isso **de forma segura e
consciente**:

---

### ✅ `@ts-expect-error`

Serve para **avisar o TypeScript que você espera um erro na linha abaixo**. Se o
erro existir, tudo certo. Se não existir mais, o TS vai te avisar que a diretiva
ficou sem propósito.

```ts
// @ts-expect-error passando número onde era string
await createTodoUseCase({ title: 123 });
```

📌 **Use apenas quando você QUER testar entradas inválidas.** 👉 Nunca use
`@ts-ignore` no lugar — ele ignora tudo sem avisar.

---

### ✅ Desativar ESLint em uma linha específica

O ESLint pode reclamar de coisas que o TS não reclama. Um exemplo clássico é o
uso de `any`, mesmo com `@ts-expect-error`. Para desativar **só uma regra e só
em uma linha**, faça:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valor: any = 'teste controlado';
```

Você pode combinar com `@ts-expect-error`:

```ts
// @ts-expect-error forçando entrada inválida
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valor: any = 'valor';
```

---

### ✅ Desativar uma regra do ESLint para um **bloco inteiro**

Se for um trecho maior (como dentro de uma função ou teste longo), dá pra abrir
e fechar o escopo com `eslint-disable` e `eslint-enable`:

```ts
/* eslint-disable @typescript-eslint/no-explicit-any */
function executaTesteEspecial(dado: any) {
  const resultado: any = dado + 1;
  return resultado;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
```

---

### 🚨 AVISO IMPORTANTE

> NÃO SAIA USANDO `any`, `@ts-expect-error` e `eslint-disable` EM TUDO QUANTO É
> LUGAR.

Esses recursos existem pra **momentos intencionais e controlados** — como testes
de entradas inválidas, mocks complexos ou integrações com libs que não têm tipos
bons.

Se você usa isso como padrão, está **matando os benefícios do TypeScript e do
ESLint**, e provavelmente escondendo bugs sem querer.

---

### 🧠 Regras de ouro

- ✅ Use `@ts-expect-error` **quando estiver testando ou forçando erro**.
- ✅ Use `eslint-disable` **só quando o ESLint estiver sendo mais chato que
  útil, e volte com `enable` depois**.
- ❌ Não use `@ts-ignore` — é o botão "foda-se", e você vai esquecer onde
  colocou.
- ❌ Não use `any` sem explicar o motivo (nem nos testes).
- ✅ Quando possível, **crie helpers tipados** ou **mocks próprios** em vez de
  recorrer ao `any`.

---

## Testes e2e com playwright

Link: [Site oficial](https://playwright.dev/)

```sh
# O resto ele vai perguntar tudo e configurar tudo pra você
npm init playwright@latest
```

Arquivo `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.e2e\.ts/,
  fullyParallel: false,
  workers: 1,
  globalTeardown: './src/utils/__tests__/utils/cleanup-test-database.ts',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        launchOptions: {
          headless: true,
          slowMo: 0,
        },
      },
    },
  ],
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
});
```

---

## ✅ Regras do Playwright para seguir boas práticas

### 1. Use seletores visíveis e acessíveis

Prefira `getByRole`, `getByText`, `getByLabel`, etc. — como o usuário vê e
interage.

```ts
await page.getByRole('button', { name: /enviar/i }).click();
await page.getByLabel('Senha').fill('123456');
await page.getByText('Bem-vindo').isVisible();
```

---

### 2. Use `await expect()` para validar comportamento

Sempre use `await` com `expect` e combine com `.toBeVisible()`, `.toHaveText()`,
etc.

```ts
await expect(page.getByText('Salvo com sucesso')).toBeVisible();
await expect(page.getByRole('button', { name: /salvar/i })).toBeDisabled();
```

---

### 3. Espere comportamentos, não timers

Evite `waitForTimeout`. Prefira esperar por elementos ou eventos reais.

```ts
// Ruim:
await page.waitForTimeout(1000);

// Bom:
await expect(page.getByText('Dados carregados')).toBeVisible();
```

---

### 4. Simule como o usuário usaria

Clique, digite, navegue — sem manipular DOM diretamente.

```ts
await page.getByRole('textbox', { name: /nome/i }).fill('Otávio');
await page.getByRole('button', { name: /enviar/i }).click();
```

---

### 5. Teste como um fluxo real

Teste cenários completos de uso: login, navegação, erro, confirmação, etc.

```ts
test('usuário faz login e vê painel', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('user@email.com');
  await page.getByLabel('Senha').fill('senhaSegura123');
  await page.getByRole('button', { name: /entrar/i }).click();
  await expect(page.getByText('Painel do usuário')).toBeVisible();
});
```

---

## ❌ Más práticas – O que evitar no Playwright

### 1. Evite seletores frágeis

Não use `page.locator('div:nth-child(3) > span')` — isso quebra fácil.

```ts
// Evite:
await page.locator('form button:nth-child(2)').click();
```

---

### 2. Não use `waitForTimeout` como padrão

Isso torna os testes lentos e instáveis.

```ts
// Evite:
await page.waitForTimeout(2000);
```

---

### 3. Não dependa de estrutura interna ou classes

O DOM pode mudar, mas o comportamento deve permanecer. Foque na **experiência do
usuário**.

```ts
// Evite:
await page.locator('.input-primary').fill('...');

// Prefira:
await page.getByRole('textbox', { name: /nome/i }).fill('...');
```

---

## 🧪 Resumo rápido dos métodos do Playwright

### 🔵 `page.getByRole()`

- Melhor opção, acessível e semântico
- Ajuda na acessibilidade

```ts
await page.getByRole('button', { name: /salvar/i });
```

---

### 🟢 `page.getByText()`

- Busca pelo texto visível
- Muito útil para mensagens, títulos, etc.

```ts
await page.getByText('Cadastro realizado com sucesso');
```

---

### 🟡 `page.getByLabel()`

- Ideal para inputs com rótulos

```ts
await page.getByLabel('Senha').fill('123456');
```

---

### 🧭 Ordem de prioridade dos seletores

> Da perspectiva do usuário:

1. ✅ `getByRole`
2. ✅ `getByLabel`
3. ✅ `getByText`
4. ✅ `getByPlaceholder`
5. ⚠️ `locator('css')` (evitar se possível)
6. 🚫 `nth-child`, `class`, `id` (último recurso)

---

### 💡 Dica final

> "Teste o fluxo real do usuário. Se o seu teste depende do DOM exato, ele tá
> errado."

---

## Despedida do Luiz Otávio

Fique bem 👋. \
Evite drogas (ou use com parcimônia, tipo `vi.mock`). \
Faça exercícios (mais que testes snapshot). \
Durma bem (pelo menos até o deploy). \
E, por favor, **não altere código em produção usando `nano`** (eu nem sei usar o
`vi` também, então faça local mesmo).

Nos vemos nos próximos testes. Beijos 😘.

Por [Luiz Otávio Miranda](https://github.com/luizomf)

---
