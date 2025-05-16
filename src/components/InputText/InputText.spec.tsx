import { render, screen } from '@testing-library/react';
import { InputText, InputTextProps } from '.';
import userEvent from '@testing-library/user-event';

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole('textbox');
  return { input, renderResult };
};

const input = (p?: Props) => renderInput(p).input;

describe('<InputText />', () => {
  describe('comportamento padrão', () => {
    test('renderiza com label', async () => {
      const el = input({ labelText: 'novo label' });
      const label = screen.getByText('novo label');
      expect(el).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    test('renderiza com placeholder', async () => {
      const el = input({ placeholder: 'novo placeholder' });
      expect(el).toHaveAttribute('placeholder', 'novo placeholder');
    });

    test('renderiza sem placeholder', async () => {
      const el = input({ placeholder: undefined });
      expect(el).not.toHaveAttribute('placeholder');
    });

    test('renderiza sem label', async () => {
      input({ labelText: undefined });
      const label = screen.queryByRole('novo label');
      expect(label).not.toBeInTheDocument();
    });

    test('usa labelText como aria-label quando possível', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label');
    });

    test('usa placeholder como fallback de aria-label', async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        'aria-label',
        'placeholder',
      );
    });

    test('exibe o valor padrão corretamente', async () => {
      expect(input({ defaultValue: 'valor' })).toHaveValue('valor');
    });

    test('aceita outras props do JSX (name, maxLength)', async () => {
      const el = input({ name: 'name', maxLength: 10 });
      expect(el).toHaveAttribute('name', 'name');
      expect(el).toHaveAttribute('maxLength', '10');
    });
  });

  describe('acessibilidade', () => {
    test('não exibe mensagem de erro por padrão', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('não marca o input como inválido por padrão', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
    });

    test('renderiza mensagem de erro quando `errorMessage` é passada', async () => {
      const el = input({ errorMessage: 'Tem erro' });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');

      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });

  describe('comportamento interativo', () => {
    test('atualiza o valor conforme o usuário digita', async () => {
      const user = userEvent.setup();
      const el = input();
      await user.type(el, 'texto');
      expect(el).toHaveValue('texto');
    });
  });

  describe('estados visuais', () => {
    test('aplica classes visuais quando desabilitado', async () => {
      const el = input({ disabled: true });
      expect(el).toHaveClass('disabled:bg-slate-200 disabled:text-slate-400');
    });

    test('aplica classes visuais quando readonly', async () => {
      const el = input({ readOnly: true });
      expect(el).toHaveClass('read-only:bg-slate-100');
    });

    test('adiciona classe de erro (ring vermelha) quando inválido', async () => {
      const el = input({ errorMessage: 'Erro' });
      expect(el).toHaveClass('ring-red-500 focus:ring-red-700');
    });

    test('mantém classes personalizadas do desenvolvedor', async () => {
      const el = input({ className: 'custom' });
      expect(el).toHaveClass('custom');
    });
  });
});
