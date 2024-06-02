import React from 'react';
import {
  getDefaultInitials,
  getRandomToken,
} from './generateInitialAvatarDataUrl';
import { twMerge } from 'tailwind-merge';
import { Icon } from './Icon';

const AvatarContext = React.createContext<{
  badgeId: string;
} | null>(null);

function useAvatarContext() {
  const context = React.useContext(AvatarContext);

  if (!context) {
    throw Error('AvatarContext is required');
  }

  return context;
}

type AvatarProps = {
  src?: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  colorless?: boolean;
} & JSX.IntrinsicElements['div'];

const avatarStyle =
  'h-full w-full rounded-lg [.rounded-full_&]:rounded-full object-cover fill-current font-medium text-white';

export function Avatar({
  colorless = false,
  className,
  children,
  src,
  alt,
}: AvatarProps) {
  const badgeId = React.useId();
  const avatarId = React.useId();
  const ariaLabelledby = [avatarId, children ? badgeId : ''].join(' ');
  const status = useImageLoadingStatus(src);

  return (
    <AvatarContext.Provider value={{ badgeId }}>
      <div
        role="img"
        className={twMerge([
          'group relative flex size-12 items-center justify-center rounded-lg @container',
          className,
        ])}
        aria-labelledby={ariaLabelledby}
      >
        {status === 'loaded' ? (
          <img
            aria-hidden
            id={avatarId}
            className={avatarStyle}
            src={src}
            alt={alt}
          />
        ) : (
          <InitialAvatar alt={alt} id={avatarId} colorless={colorless} />
        )}
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

function InitialAvatar({
  alt,
  id,
  colorless,
}: {
  alt: string;
  id: string;
  colorless: boolean;
}) {
  const initials = getDefaultInitials(alt, { maxInitials: 2 });
  const token = getRandomToken(alt, colorless);

  return (
    <svg
      viewBox="0 0 24 24"
      className={avatarStyle}
      id={id}
      aria-hidden
      aria-label={alt}
      style={{
        background: `var(--${token})`,
      }}
    >
      <text
        x="50%"
        y="50%"
        alignmentBaseline="middle"
        dominantBaseline="middle"
        textAnchor="middle"
        dy=".125em"
        fontSize="65%"
      >
        {initials}
      </text>
    </svg>
  );
}

type AvatarBadgeProps = {
  className?: string;
  badge: React.ReactNode;
  fillBackground?: boolean;
  'aria-label': string;
};

export const AvatarBadge = ({
  badge,
  'aria-label': ariaLabel,
  ...props
}: AvatarBadgeProps) => {
  const context = useAvatarContext();

  return (
    <span
      aria-hidden
      id={context.badgeId}
      className={twMerge([
        '@[32px]:w-2/5 @[40px]:w-1/3 @[80px]:w-1/4 @[96px]:w-1/4',
        'z-1 absolute bottom-0 right-0 z-10 rounded-full border-2 border-background bg-background',
        'translate-x-[15%] translate-y-[20%]',
        '[.rounded-full_&]:translate-x-[35%] [.rounded-full_&]:translate-y-[5%]',
        '@[40px]:[.rounded-full_&]:translate-x-[15%]',
        '@[80px]:[.rounded-full_&]:-translate-x-[5%] @[80px]:[.rounded-full_&]:-translate-y-[10%]',
        '@[96px]:[.rounded-full_&]:translate-x-[-10%]',
        props.className,
      ])}
    >
      <Icon icon={badge} aria-label={ariaLabel} />
    </span>
  );
};

type AvatarGroupProps = {
  avatars: {
    items: Array<Pick<AvatarProps, 'src' | 'alt'>>;
    maxDisplays?: number;
  } & Pick<AvatarProps, 'colorless' | 'className'> &
    JSX.IntrinsicElements['div'];
};

export function AvatarGroup({ avatars, ...props }: AvatarGroupProps) {
  const { maxDisplays, items, className, ...avatarProps } = avatars;
  const displayItems = items.slice(0, Math.min(maxDisplays ?? 4, items.length));

  return (
    <div className="flex items-center rounded-lg py-0.5" {...props}>
      <div className="flex items-center -space-x-2 rtl:space-x-reverse">
        {displayItems.map((item, index) => {
          return (
            <Avatar
              {...avatarProps}
              {...item}
              key={index}
              className={twMerge(
                'ring ring-1 ring-offset-1 ring-border dark:ring-offset-background',
                className,
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

function useImageLoadingStatus(src?: string) {
  const [loadingStatus, setLoadingStatus] =
    React.useState<ImageLoadingStatus>('idle');

  React.useLayoutEffect(() => {
    if (!src) {
      setLoadingStatus('error');
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      setLoadingStatus(status);
    };

    setLoadingStatus('loading');
    image.onload = updateStatus('loaded');
    image.onerror = updateStatus('error');
    image.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return loadingStatus;
}
