import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { TransitionType } from '../engine/types';

interface TransitionProps {
  children: ReactNode;
  type: TransitionType;
  duration: number;
  isExiting: boolean;
}

const transitionVariants = {
  'fade': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'zoom-in': {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.5 },
  },
  'zoom-out': {
    initial: { opacity: 0, scale: 1.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
  },
  'dissolve': {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
  },
};

export function Transition({ children, type, duration }: TransitionProps) {
  const variants = transitionVariants[type] || transitionVariants.fade;

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  );
}
