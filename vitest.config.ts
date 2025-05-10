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
