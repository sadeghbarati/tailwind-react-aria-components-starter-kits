import React from 'react';
import { Button, BasicButtonProps, Variant } from './Button';
import { ButtonProps as RACButtonProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { composeTailwindRenderProps } from './utils';
import { ChevronDown } from 'lucide-react';
import { Icon } from './Icon';

export type SplitButtonGroupProps = JSX.IntrinsicElements['div'] & {
  color?: BasicButtonProps['color'];
} & Variant;

const SplitButtonContext = React.createContext<SplitButtonGroupProps | null>(
  null,
);

function useSplitButtonContext() {
  const context = React.useContext(SplitButtonContext);

  if (!context) {
    throw new Error('<SplitButtonContext.Provider> is required');
  }

  return context;
}

export function SplitButtonGroup({
  className,
  color,
  children,
  plain,
  unstyle,
  outline,
  ...props
}: SplitButtonGroupProps) {
  return (
    <SplitButtonContext.Provider
      value={{ ...({ plain, outline, unstyle } as Variant), color }}
    >
      <div {...props} className={twMerge('flex gap-0', className)}>
        <>{children}</>
      </div>
    </SplitButtonContext.Provider>
  );
}

export function SplitButton(props: RACButtonProps) {
  const context = useSplitButtonContext();
  return (
    <Button
      {...props}
      {...(context as RACButtonProps)}
      className={composeTailwindRenderProps(
        props.className,

        [
          'rounded-e-none',
          '-me-[0.5px] rounded-e-none',
          "after:absolute after:end-0 after:top-0 after:h-full after:border-s-[1.5px] after:border-s-border after:content-['']",
          'border-e-0',
          context.outline
            ? 'after:border-s'
            : 'after:border-s-2 after:border-s-white/20 dark:after:border-black/20',
        ],
      )}
    />
  );
}

export function SplitButtonMenuTrigger({
  'aria-label': ariaLabel,
  ...props
}: RACButtonProps) {
  const context = useSplitButtonContext();

  return (
    <Button
      {...props}
      {...(context as RACButtonProps)}
      color={context.color}
      className={composeTailwindRenderProps(
        props.className,
        'w-8 rounded-s-none border-s-0',
      )}
      isIconOnly
    >
      <Icon aria-label={ariaLabel}>
        <ChevronDown className="opacity-50" />
      </Icon>
    </Button>
  );
}
