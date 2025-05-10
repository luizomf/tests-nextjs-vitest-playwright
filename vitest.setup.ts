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
});
