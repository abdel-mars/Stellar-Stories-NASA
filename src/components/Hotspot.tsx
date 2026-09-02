import { motion } from 'motion/react';
import type { Hotspot as HotspotType } from '../engine/types';
import './Hotspot.css';

interface HotspotProps {
  hotspot: HotspotType;
  isDiscovered: boolean;
  onClick: () => void;
}

export function Hotspot({ hotspot, isDiscovered, onClick }: HotspotProps) {
  return (
    <motion.button
      className={`hotspot hotspot--${hotspot.type} ${isDiscovered ? 'hotspot--discovered' : ''}`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label={hotspot.label || `Explore ${hotspot.id}`}
    >
      {/* Pulsing ring */}
      {!isDiscovered && (
        <span className="hotspot__ring" />
      )}

      {/* Icon */}
      <span className="hotspot__icon">
        {hotspot.icon || '●'}
      </span>

      {/* Label */}
      {hotspot.label && (
        <span className="hotspot__label">{hotspot.label}</span>
      )}
    </motion.button>
  );
}
