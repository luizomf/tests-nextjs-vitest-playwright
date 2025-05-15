// ⚠️ Esse é um teste de implementação consciente:
// Estamos testando se o botão tem as classes certas baseadas em props.
// A Testing Library recomenda evitar esse tipo de teste,
// mas nesse caso, o comportamento *é* visual.
// Logo, esse teste é necessário e justificado.

import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('<Button />', () => {
  describe('props padrão e JSX', () => {
    test('deve renderizar o botão com props padrão (apenas com children)', async () => {
      render(<Button>Enviar formulário</Button>);

      const button = screen.getByRole('button', {
        name: /enviar formulário/i,
      });

      expect(button).toHaveClass('bg-blue-600 hover:bg-blue-700 text-blue-100');
      expect(button).toHaveClass(
        'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2',
      );

      // expect(button).toMatchSnapshot();
    });

    // test('verifica se as propriedades padrão do JSX funcionam corretamente', async () => {});
  });

  // describe('variants (cores)', () => {
  //   test('checa se default aplica a cor correta', async () => {});

  //   test('checa se danger aplica a cor correta', async () => {});

  //   test('checa se ghost aplica a cor correta', async () => {});
  // });

  // describe('size (tamanhos)', () => {
  //   test('tamanho sm deve ser menor', async () => {});

  //   test('tamanho md deve ser médio', async () => {});

  //   test('tamanho lg deve ser grande', async () => {});
  // });

  // describe('disabled', () => {
  //   test('classes para estado desativado estão corretas', async () => {});
  // });
});
