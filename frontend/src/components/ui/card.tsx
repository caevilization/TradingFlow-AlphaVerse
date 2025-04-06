import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-tf-base-bg2-lmode dark:border-tf-base-bg2 bg-white dark:bg-tf-base-bg2 text-tf-base-text-lmode dark:text-tf-base-text shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
