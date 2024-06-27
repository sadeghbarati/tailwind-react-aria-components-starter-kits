import React from 'react';
import { InputProps } from 'react-aria-components';
import { Input } from './Field';
import { EyeOffIcon, Eye } from 'lucide-react';
import { ToggleButton } from './Button';

export function PasswordInput(props: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        className="peer pe-8"
        type={isPasswordVisible ? 'text' : 'password'}
      />
      <ToggleButton
        unstyle
        isSelected={isPasswordVisible}
        onChange={setIsPasswordVisible}
        aria-label="Show password"
        className="absolute end-1.5 top-1/2 -translate-x-1/4 -translate-y-1/2 rounded p-0.5 text-muted opacity-75 hover:opacity-100 focus:opacity-100 peer-disabled:pointer-events-none"
      >
        {isPasswordVisible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </ToggleButton>
    </div>
  );
}
