'use client';
import * as React from 'react';
import { motion, isMotionComponent, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnyProps = Record<string, unknown>;

export type WithAsChild<T = AnyProps> = T & { asChild?: boolean };

export const Slot = React.forwardRef<any, any>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childrenProps = children.props as AnyProps;

      const combinedProps = mergeProps(childrenProps, props as any);

      if (isMotionComponent(children.type)) {
        const MotionComponent = children.type as any;
        return <MotionComponent {...combinedProps} ref={ref} />;
      }

      // @ts-ignore - dynamic motion component creation
      const Component = motion.create(children.type as any);
      return <Component {...combinedProps} ref={ref} />;
    }

    return (
      <motion.div {...props} ref={ref}>
        {children}
      </motion.div>
    );
  }
);

Slot.displayName = 'Slot';

function mergeProps(
  childProps: AnyProps,
  slotProps: AnyProps,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}
