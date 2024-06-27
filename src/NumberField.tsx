import { Minus, Plus } from 'lucide-react';
import {
  NumberField as RACNumberField,
  NumberFieldProps as RACNumberFieldProps,
  Button,
  ButtonProps,
  InputProps,
} from 'react-aria-components';
import { Input, InputFieldGroup } from './Field';
import { composeTailwindRenderProps } from './utils';
import { Icon } from './Icon';

export interface NumberFieldProps extends RACNumberFieldProps {}

export function NumberField(props: NumberFieldProps) {
  return (
    <RACNumberField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    />
  );
}

export function NumberInput(
  props: Omit<InputProps, keyof RACNumberFieldProps>,
) {
  return (
    <InputFieldGroup className="first:border-e">
      <StepperButton slot="increment">
        <Icon>
          <Plus className="h-4 w-4" />
        </Icon>
      </StepperButton>
      <Input {...props} />

      <StepperButton slot="decrement">
        <Icon>
          <Minus className="h-4 w-4" />
        </Icon>
      </StepperButton>
    </InputFieldGroup>
  );
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="h-9 cursor-default px-2 text-muted first:border-e last:border-s pressed:bg-hover"
    />
  );
}
