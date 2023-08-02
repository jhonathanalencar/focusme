import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

function Input(
  { label, className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  const inputClasses = twMerge(
    'h-8 w-20 rounded bg-theme-gray-900 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800 border',
    error ? 'border-theme-beige-100' : 'border-transparent',
    className
  );

  return (
    <>
      <label className="mt-1 flex w-fit flex-col items-start">
        <span className="text-base font-medium tracking-wide text-theme-gray-300">
          {label}
        </span>
        <input ref={ref} className={inputClasses} {...props} />
      </label>
      {error && errorMessage ? (
        <p className="mt-1 text-sm font-medium text-theme-red-300">
          {errorMessage}
        </p>
      ) : null}
    </>
  );
}

export default forwardRef(Input);
