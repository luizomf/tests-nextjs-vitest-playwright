export function makeNewTodo(description: string) {
  return {
    id: crypto.randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
