import { makeTestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo.usecase";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";

describe("createTodoUseCase (integration)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test("deve retornar erro se a validação falhar", async () => {
    const result = (await createTodoUseCase("")) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  test("deve retornar o TODO se a validção passar", async () => {
    const description = "Isso deve funcionar";
    const result = (await createTodoUseCase(description)) as ValidTodo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      createdAt: expect.any(String),
      description,
      id: expect.any(String),
    });
  });

  test("deve retornar erro se o repositório falhar", async () => {
    // Cria o todo uma vez
    const description = "Isso só funciona uma vez";
    (await createTodoUseCase(description)) as ValidTodo;

    // Tenta recriar o todo e DEVE retornar error
    const result = (await createTodoUseCase(description)) as InvalidTodo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Já existe um todo com o ID ou descrição enviados",
    ]);
  });
});
