import {
  OverlayArrow,
  Popover as RACPopover,
  PopoverProps as RACPopoverProps,
  composeRenderProps,
  useSlottedContext,
  PopoverContext,
} from 'react-aria-components';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
  showArrow?: boolean;
  children: React.ReactNode;
}

export function Popover({
  children,
  showArrow,
  className,
  ...props
}: PopoverProps) {
  const popoverContext = useSlottedContext(PopoverContext)!;
  const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger';
  let offset = showArrow ? 12 : 8;
  offset =
    props.offset !== undefined
      ? props.offset
      : isSubmenu
        ? offset - 14
        : offset;

  return (
    <RACPopover
      {...props}
      offset={offset}
      className={composeRenderProps(className, (className, renderProps) => {
        return twMerge(
          'max-w-[250px] rounded-lg bg-background bg-popover shadow-lg ring-1 ring-border/75 dark:ring-border',
          renderProps.isEntering &&
            'duration-50 ease-out animate-in fade-in placement-left:slide-in-from-end-1.5 placement-right:slide-in-from-start-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1',
          renderProps.isExiting &&
            'duration-50 ease-in animate-out fade-out placement-left:slide-out-to-end-1.5 placement-right:slide-out-to-start-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1',

          className,
        );
      })}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={16}
            height={16}
            viewBox="0 0 12 12"
            className="block fill-background stroke-zinc-950/10 stroke-1 group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 dark:stroke-white/10 "
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </RACPopover>
  );
}
