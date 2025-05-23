import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import { test, expect, Page } from '@playwright/test';

const HOME_URL = '/';
const HEADING = 'Lista de tarefas';
const INPUT = 'Tarefa';
const BUTTON = 'Criar tarefa';
const BUTTON_BUSY = 'Criando tarefa...';
const NEW_TODO_TEXT = 'New Todo';

const getHeading = (p: Page) => p.getByRole('heading', { name: HEADING });
const getInput = (p: Page) => p.getByRole('textbox', { name: INPUT });
const getBtn = (p: Page) => p.getByRole('button', { name: BUTTON });
const getBtnBusy = (p: Page) => p.getByRole('button', { name: BUTTON_BUSY });

const getAll = (p: Page) => ({
  heading: getHeading(p),
  input: getInput(p),
  btn: getBtn(p),
  btnBusy: getBtnBusy(p),
});

test.beforeEach(async ({ page }) => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();

  await page.goto(HOME_URL);
});

test.afterAll(async () => {
  const { deleteTodoNoWhere } = await makeTestTodoRepository();
  await deleteTodoNoWhere();
});

test.describe('<Home /> (E2E)', () => {
  test.describe('Renderização', () => {
    test('deve ter o title html correto', async ({ page }) => {
      await expect(page).toHaveTitle('Testes com Vitest e Playwright');
    });

    test('deve renderizar o cabeçalho, o input e o botão para criar TODOs', async ({
      page,
    }) => {
      await expect(getHeading(page)).toBeVisible();
      await expect(getInput(page)).toBeVisible();
      await expect(getBtn(page)).toBeVisible();
    });
  });

  test.describe('Criação', () => {
    test('deve permitir criar um TODO', async ({ page }) => {
      const { btn, input } = getAll(page);

      await input.fill(NEW_TODO_TEXT);
      await btn.click();

      const createdTodo = page
        .getByRole('listitem')
        .filter({ hasText: NEW_TODO_TEXT });

      await expect(createdTodo).toBeVisible();
    });

    test('deve fazer o trim da descrição do input ao criar o TODO', async ({
      page,
    }) => {
      const { btn, input } = getAll(page);

      const textToBeTrimmed = '   no spaces here   ';
      const textTrimmed = textToBeTrimmed.trim();

      await input.fill(textToBeTrimmed);
      await btn.click();

      const createdTodo = page
        .getByRole('listitem')
        .filter({ hasText: textTrimmed });
      const createdTodoText = await createdTodo.textContent();

      // Removi o await porque o ts reclamou (até comentei isso na aula):
      // 'await' has no effect on the type of this expression. (ts 80007)
      expect(createdTodoText).toBe(textTrimmed);
    });

    test('deve permitir que eu crie mais de um TODO', async ({ page }) => {
      const { btn, input } = getAll(page);

      const todo1 = 'Todo 1';
      const todo2 = 'Todo 2';

      await input.fill(todo1);
      await btn.click();

      const todo1Item = page.getByRole('listitem').filter({ hasText: todo1 });
      await expect(todo1Item).toBeVisible();

      await input.fill(todo2);
      await btn.click();

      const todo2Item = page.getByRole('listitem').filter({ hasText: todo2 });
      await expect(todo2Item).toBeVisible();
    });
  });
  // Exclusão
  // Erros
});
