import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="w-full space-y-1.5 font-mono">
        {label && (
          <label htmlFor={id} className="block text-[16px] font-mono font-black text-black uppercase tracking-wider select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-3.5 py-2.5 bg-white/50 border-1 border-border-color rounded-lg text-[16px] font-mono font-bold text-black placeholder-text/50 focus:outline-none focus:border-neo-pink shadow-hard-sm transition-colors ${error ? 'border-neo-pink focus:border-neo-pink' : ''
            } ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs font-mono font-black text-cayenne" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
