'use client';
import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
  type MotionValue,
} from 'framer-motion';
import { getStrictContext } from '@/lib/get-strict-context';
import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';

type CursorContextType = {
  cursorPos: { x: MotionValue<number>; y: MotionValue<number> };
  active: boolean;
  global: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const [LocalCursorProvider, useCursor] = getStrictContext<CursorContextType>('CursorContext');

type CursorProviderProps = {
  children: React.ReactNode;
  global?: boolean;
};

export const CursorProvider = ({ children, global = false }: CursorProviderProps) => {
  const [active, setActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const cursorRef = React.useRef<HTMLDivElement | null>(null);
  
  const cursorPos = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  React.useEffect(() => {
    const target = global ? window : containerRef.current;
    if (!target) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const y = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      if (global) {
        cursorPos.x.set(x);
        cursorPos.y.set(y);
      } else {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          cursorPos.x.set(x - rect.left);
          cursorPos.y.set(y - rect.top);
        }
      }
    };

    const handleMouseEnter = () => setActive(true);
    const handleMouseLeave = () => setActive(false);

    target.addEventListener('mousemove', handleMouseMove as any);
    if (!global) {
      target.addEventListener('mouseenter', handleMouseEnter);
      target.addEventListener('mouseleave', handleMouseLeave);
    } else {
      setActive(true);
    }

    return () => {
      target.removeEventListener('mousemove', handleMouseMove as any);
      if (!global) {
        target.removeEventListener('mouseenter', handleMouseEnter);
        target.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [global]);

  return (
    <LocalCursorProvider value={{ cursorPos, active, global, containerRef, cursorRef }}>
      {children}
    </LocalCursorProvider>
  );
};

export type CursorContainerProps = WithAsChild<HTMLMotionProps<'div'>>;

export const CursorContainer = React.forwardRef<HTMLDivElement, CursorContainerProps>(
  ({ asChild, ...props }, ref) => {
    const { containerRef } = useCursor();
    return (
      <Slot
        asChild={asChild}
        ref={(node: HTMLDivElement | null) => {
          if (containerRef) (containerRef as any).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as any).current = node;
        }}
        {...props}
      />
    );
  }
);

export type CursorProps = WithAsChild<HTMLMotionProps<'div'>> & {
  springOptions?: SpringOptions;
  attachToCursor?: boolean;
};

export const Cursor = React.forwardRef<HTMLDivElement, CursorProps>(
  ({ asChild, springOptions = { stiffness: 500, damping: 28, mass: 0.5 }, attachToCursor = true, ...props }, ref) => {
    const { cursorPos, active, cursorRef } = useCursor();
    
    const x = useSpring(cursorPos.x, springOptions);
    const y = useSpring(cursorPos.y, springOptions);

    return (
      <AnimatePresence>
        {active && (
          <Slot
            asChild={asChild}
            ref={(node: HTMLDivElement | null) => {
              if (cursorRef) (cursorRef as any).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as any).current = node;
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              x: attachToCursor ? x : 0,
              y: attachToCursor ? y : 0,
              zIndex: 9999,
              ...props.style,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            {...props}
          />
        )}
      </AnimatePresence>
    );
  }
);

export type CursorFollowProps = WithAsChild<HTMLMotionProps<'div'>> & {
  springOptions?: SpringOptions;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
};

export const CursorFollow = React.forwardRef<HTMLDivElement, CursorFollowProps>(
  ({ asChild, springOptions = { stiffness: 500, damping: 28, mass: 0.5 }, side = 'bottom', sideOffset = 10, align = 'center', alignOffset = 0, ...props }, ref) => {
    const { cursorPos, active } = useCursor();
    
    const x = useSpring(cursorPos.x, springOptions);
    const y = useSpring(cursorPos.y, springOptions);

    return (
      <AnimatePresence>
        {active && (
          <Slot
            asChild={asChild}
            ref={ref}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              x: x,
              y: y,
              zIndex: 9998,
              transform: `translate(${side === 'right' ? sideOffset : side === 'left' ? -sideOffset : alignOffset}px, ${side === 'bottom' ? sideOffset : side === 'top' ? -sideOffset : alignOffset}px)`,
              ...props.style,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            {...props}
          />
        )}
      </AnimatePresence>
    );
  }
);
