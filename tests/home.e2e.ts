import { test, expect } from '@playwright/test';

test.describe('<Home /> (E2E)', () => {
  // Renderização
  test.describe('Renderização', () => {
    test('deve ter o title html correto', async ({ page }) => {
      await page.goto('/');

      await page.waitForTimeout(5000);
    });
  });

  // Criação
  // Exclusão
  // Erros
});
