# Finalização do projeto

Agora que estamos no final do projeto, algumas coisas são importantes, como:

- Conferir se não ficou nenhum “lixo” no código (`console.log`, comentários
  desnecessários, variáveis não utilizadas, etc)
- Usar o **ESLint** para garantir que o código esteja sem erros e siga boas
  práticas
- Usar o **Prettier** para manter consistência na formatação e estilo
- Executar todos os testes (**unitários**, **integração** e **e2e**)
- Rodar a **build do Next.js** e garantir que ela seja gerada com sucesso

---

## Configuração e integração do Prettier com ESLint

Como um bônus final para essa aula, vamos fazer a finalização da configuração do
Prettier e ESLint.

O ESLint já vem configurado pelo Next.js. O que vamos fazer é adicionar os
pacotes necessários para o Prettier e estender a configuração do ESLint para que
ele também exiba e trate as regras de formatação do Prettier.

### Instalação dos pacotes

```sh
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Esses pacotes trazem:

- O `prettier` em si
- A configuração `eslint-config-prettier`, que desativa possíveis regras do
  ESLint que conflitam com o Prettier
- O plugin `eslint-plugin-prettier`, que permite que o ESLint aplique as regras
  de formatação automaticamente

### Criando o arquivo `.prettierrc.json`

O conteúdo depende do estilo do time, mas aqui está um exemplo que eu uso nos
meus projetos:

```json
{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "bracketSameLine": false,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

### Integrando com o ESLint (`eslint.config.mjs`)

Altere o trecho:

```js
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
```

Para incluir o Prettier:

```js
const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended', // isso foi adicionado
  ),
];
```

> Esse `plugin:prettier/recommended` já ativa o `eslint-plugin-prettier` e
> carrega automaticamente a config do `eslint-config-prettier`.

Se quiser adicionar ou sobrescrever regras, você pode colocar isso dentro do
array:

```js
{
  rules: {
    'no-console': 'error', // impede o uso de console.log
    'no-alert': 'error', // impede o uso de alert (vamos ter que comentar isso)
  },
},
```

---

## Aplicando as regras do Prettier

Se você já tinha arquivos que não seguiam essas regras, pode corrigi-los
automaticamente com:

```sh
npx prettier . --write
```

> O `.` significa "da raiz do projeto pra baixo". O `--write` aplica as
> correções. Se quiser ver primeiro sem aplicar, use `--check`.

### Exemplo mais controlado:

```sh
npx prettier --check "src/**/*.{js,ts,jsx,tsx,json,css,md}"
# ou
npx prettier --write "src/**/*.{js,ts,jsx,tsx,json,css,md}"
```

### Criando scripts no `package.json`

```json
"scripts": {
  "format:fix": "prettier --write \"src/**/*.{js,ts,jsx,tsx,json,css,md}\"",
  "format:check": "prettier --check \"src/**/*.{js,ts,jsx,tsx,json,css,md}\""
}
```

Agora você pode rodar:

```sh
npm run format:check
# ou
npm run format:fix
```

---

## Próximos passos sugeridos

Se quiser continuar evoluindo esse projeto, você pode implementar:

### CI (Integração Contínua) com:

- `Husky` para rodar linting, testes e outras verificações antes do commit
  (`pre-commit`, `pre-push`, etc). O Husky permite que você use _hooks_ do Git
  para criar barreiras de entrada no seu código. Isso deixa o processo de
  adicionar coisas novas ao repositório levemente mais chato, porque, a cada
  alteração enviada, você roda lint, format, testes e outras verificações. A
  alteração **só será efetivada quando tudo isso passar** sem erros.

- `Lint-staged` para aplicar comandos (ex: `prettier`, `eslint`, `vitest`)
  **somente nos arquivos staged** (aqueles que você deu `git add`). Isso evita
  rodar lint ou testes no projeto todo a cada commit, deixando o processo mais
  rápido e inteligente.

- `commitlint` para padronizar mensagens de commit (ex: seguir Conventional
  Commits com feat, chore, fix, build, etc). Isso ajuda a manter um histórico
  limpo, sem mensagens inúteis como "update" ou "ajustes". Você adiciona regras
  para mensagens mais conscientes e agrupadas corretamente, porque sabe que
  qualquer erro vai travar o commit.

- `GitHub Actions` para automatizar os testes e validações **em cada push ou
  pull request**. Se algo falhar, o código **nem entra** no repositório. Isso
  garante que a branch principal (geralmente `main` ou `dev`) nunca seja
  quebrada, e você tem **integração contínua real**, não só no nome.

---

Pronto, assim finalizamos a seção completa de testes com um monte de dicas de
código, arquitetura e configurações ao longo de todo o projeto. Espero que tenha
aprendido e gostado do conteúdo.

**Luiz Otávio Miranda** [github.com/luizomf](https://github.com/luizomf)
