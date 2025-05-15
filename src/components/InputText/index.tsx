import clsx from 'clsx';
import { useId } from 'react';

export type InputTextProps = {
  labelText?: string;
  errorMessage?: string;
} & React.ComponentProps<'input'>;

export function InputText({
  labelText = '',
  errorMessage = '',
  ...props
}: InputTextProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const isInvalid = !!errorMessage;
  const describedBy = isInvalid ? errorId : undefined;
  const ariaLabel = labelText || props.placeholder;

  const inputClasses = clsx(
    'bg-white outline-0 text-base/tight',
    'ring-2 rounded p-2 transition',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-300',
    'read-only:bg-slate-100',
    isInvalid && 'ring-red-500 focus:ring-red-700 placeholder-red-200',
    !isInvalid && 'ring-slate-400 focus:ring-blue-600 placeholder-slate-300',
    props.className,
  );

  return (
    <div className='flex flex-col flex-1 gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}

      <input
        {...props}
        id={id}
        aria-label={ariaLabel}
        aria-invalid={isInvalid}
        aria-describedby={describedBy}
        className={inputClasses}
      />

      {errorMessage && (
        <p id={errorId} role='alert' className='text-sm text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
