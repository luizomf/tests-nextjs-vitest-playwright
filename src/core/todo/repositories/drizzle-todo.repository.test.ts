describe('DrizzleTodoRepository (integration)', () => {
  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {});

    test('deve retornar todos os todos em ordem decrescente', async () => {});
  });

  describe('create', () => {
    test('cria um todo se os dados estão válidos', async () => {});

    test('falha se houver uma descrição igual na tabela', async () => {});

    test('falha se houver um ID igual na tabela', async () => {});
  });

  describe('delete', () => {
    test('apaga um todo se ele existir', async () => {});

    test('falha ao apagar se o todo não existir', async () => {});
  });
});
