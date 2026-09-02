import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { StoryScene, SceneId } from '../engine/types';
import './SparkScene.css';

interface SparkSceneProps {
  scene: StoryScene;
  onTravel: (targetScene: SceneId) => void;
}

/**
 * A single "Spark" beat in the journey.
 *
 * Spark is the science guide — a tiny glowing aurora particle the child can
 * follow. The scene shows the phase's background, Spark drifts in, says one
 * idea, and the child taps Spark to continue the journey.
 */
export function SparkScene({ scene, onTravel }: SparkSceneProps) {
  const [stage, setStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const lines = scene.narration && scene.narration.length > 0 ? scene.narration : [{ speaker: 'spark' as const, text: '' }];
  const [lineIdx, setLineIdx] = useState(0);
  // 0:  background settles
  // 1:  Spark drifts in + first line shows
  // 1+: subsequent lines per tap
  // 2:  travelling

  useState(() => {
    const timer = setTimeout(() => setStage(1), 700);
    return () => clearTimeout(timer);
  });

  const advance = () => {
    if (stage === 1) {
      if (lineIdx < lines.length - 1) {
        setLineIdx(i => i + 1);
        return;
      }
      setStage(2);
      if (scene.primaryAction) {
        setTimeout(() => onTravel(scene.primaryAction!.targetScene), 650);
      }
      return;
    }
    // reduced-motion / early
    if (stage === 0) {
      setStage(1);
      return;
    }
    if (stage === 2 && scene.primaryAction) {
      onTravel(scene.primaryAction!.targetScene);
    }
  };

  return (
    <div className="spark-scene" data-id={scene.id} style={{ background: scene.background }}>
      {/* Phase artwork */}
      {scene.backgroundImage && (
        <img
          src={scene.backgroundImage}
          alt=""
          className={`spark-scene__bg ${stage >= 1 ? 'spark-scene__bg--alive' : ''}`}
        />
      )}

      {/* Spark — the science guide */}
      <button
        className={`spark-scene__spark ${stage >= 1 ? 'spark-scene__spark--visible' : ''}`}
        onClick={advance}
        aria-label="Tap Spark to continue"
      >
        <motion.span
          className="spark-scene__spark-dot"
          animate={stage >= 2 && !reduceMotion ? { scale: [1, 2.2], opacity: [1, 0] } : reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stage >= 1 && <span className="spark-scene__spark-glow" />}
        </motion.span>
      </button>

      {/* Spark's one idea */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.p
            key={`line-${lineIdx}`}
            className="spark-scene__line"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            <span className="spark-scene__who">Spark · </span>
            {lines[lineIdx].text}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Tap hint */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.span
            className="spark-scene__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            tap Spark to keep going
          </motion.span>
        )}
      </AnimatePresence>

      {/* Travelling pulse */}
      <AnimatePresence>
        {stage === 2 && (
          <motion.div
            className="spark-scene__travel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* NASA source credit */}
      {scene.source && (
        <a
          className="spark-scene__source"
          href={scene.source.url}
          target="_blank"
          rel="noreferrer"
        >
          {scene.source.label}
        </a>
      )}
    </div>
  );
}