import { getFullEnv } from '@/env/configs';

/**
 * Aguarda um pequeno delay artificial, **somente em ambientes de desenvolvimento ou teste**.
 *
 * Útil para simular latência e visualizar estados de transição da UI (ex: botão "Carregando...").
 * Não afeta ambientes como `production` ou `preview`, evitando delays indesejados em produção.
 *
 * @param delay - Tempo de espera em milissegundos (default: 1000ms)
 *
 * @example
 * await devOnlyDelay(500); // só espera se estiver em 'e2e', 'test' ou 'development'
 */
export async function devOnlyDelay(delay: number = 1000): Promise<void> {
  const { currentEnv } = getFullEnv();

  const envsToDelay = ['e2e'];

  const shouldDelay = delay > 0 && envsToDelay.includes(currentEnv);

  if (shouldDelay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  return;
}
