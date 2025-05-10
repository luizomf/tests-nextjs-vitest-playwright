// Executado uma única vez antes (setup) e depois (tearDown) da suíte
// inteira de testes

export async function setup() {
  // Roda antes de todos os testes
  // Isso é meio demais, mas às vezes o teste não roda por completo
  // e deixa lixo, como bases de dados antigas ou dados na tabela
}

export async function teardown() {
  // Roda depois de todos os testes
}
