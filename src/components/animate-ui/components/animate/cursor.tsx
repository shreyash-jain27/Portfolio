import * as React from 'react';
import {
  CursorProvider as CursorProviderPrimitive,
  Cursor as CursorPrimitive,
  CursorFollow as CursorFollowPrimitive,
  type CursorFollowProps as CursorFollowPropsPrimitive,
} from '@/components/animate-ui/primitives/animate/cursor';
import { cn } from '@/lib/utils';

export function CursorProvider({ children, global }: { children: React.ReactNode; global?: boolean }) {
  return <CursorProviderPrimitive global={global}>{children}</CursorProviderPrimitive>;
}

export function Cursor({ className }: { className?: string }) {
  return (
    <CursorPrimitive>
      <div className={cn("size-5 rounded-full bg-white/40 backdrop-blur-md border border-white/20", className)} />
    </CursorPrimitive>
  );
}

export type CursorFollowProps = Omit<CursorFollowPropsPrimitive, 'asChild'> & {
  children?: React.ReactNode;
};

export function CursorFollow({
  className,
  children,
  sideOffset = 15,
  alignOffset = 5,
  ...props
}: CursorFollowProps) {
  return (
    <CursorFollowPrimitive
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
    >
      <div className={cn("rounded-md bg-white text-[10px] font-black uppercase text-black px-2 py-0.5 shadow-2xl tracking-tighter", className)}>
        {children as React.ReactNode}
      </div>
    </CursorFollowPrimitive>
  );
}
