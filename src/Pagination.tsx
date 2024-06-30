import { ChevronLeft, ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from './Button';
import { Link } from './Link';
import { LinkProps } from 'react-aria-components';
import { Icon } from './Icon';

export function Pagination({
  className,
  'aria-label': arialLabel = 'Page navigation',
  ...props
}: JSX.IntrinsicElements['nav']) {
  return (
    <nav
      role="navigation"
      aria-label={arialLabel}
      className={twMerge(
        'mx-auto flex w-full justify-center gap-x-2',
        className,
      )}
      {...props}
    />
  );
}

export function PaginationList({
  className,
  ...props
}: JSX.IntrinsicElements['div']) {
  return (
    <div
      {...props}
      className={twMerge('flex hidden gap-x-1 sm:flex', className)}
    />
  );
}

export function PaginationPrevious({
  className,
  label = 'Previous',
  ...props
}: LinkProps & { className?: string; label?: string }) {
  return (
    <Button asChild plain>
      <Link
        {...props}
        className={twMerge(
          'px-3.5 outline-offset-0 hover:no-underline',
          className,
        )}
      >
        <Icon>
          <ChevronLeft />
        </Icon>
        {label}
      </Link>
    </Button>
  );
}

export function PaginationNext({
  className,
  label = 'Next',
  ...props
}: LinkProps & { className?: string; label?: string }) {
  return (
    <Button asChild plain>
      <Link
        {...props}
        className={twMerge(
          'px-3.5 outline-offset-1 hover:no-underline',
          className,
        )}
      >
        {label}
        <Icon>
          <ChevronRight />
        </Icon>
      </Link>
    </Button>
  );
}

export function PaginationPage({
  className,
  current,
  'aria-label': arialLabel,
  ...props
}: LinkProps & { className?: string; current?: boolean; children: string }) {
  return (
    <Button asChild {...(!current && { plain: true })}>
      <Link
        {...props}
        aria-label={arialLabel ?? `Page ${props.children}`}
        className={twMerge(
          'min-w-9 outline-offset-1 hover:no-underline',
          className,
        )}
      />
    </Button>
  );
}

export function PaginationGap({
  className,
  ...props
}: JSX.IntrinsicElements['span']) {
  return (
    <span {...props} aria-hidden className={twMerge('h-9 px-3.5', className)}>
      &hellip;
    </span>
  );
}
