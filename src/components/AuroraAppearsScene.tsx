import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { StoryScene, SceneId } from '../engine/types';
import frame3 from '../frames/frame3.png';
import './AuroraAppearsScene.css';

interface AuroraAppearsSceneProps {
  scene: StoryScene;
  onTravel: (targetScene: SceneId) => void;
}

/**
 * The moment the aurora appears — a crescendo before the camera interaction.
 * Animated aurora ribbons grow from the horizon.
 */
export function AuroraAppearsScene({ scene, onTravel }: AuroraAppearsSceneProps) {
  const [stage, setStage] = useState(0);
  const reduceMotion = useReducedMotion();
  // 0: dark sky
  // 1: aurora fading in
  // 2: narration shown
  // 3: "Take the photograph" prompt

  useState(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  });

  const handleTakePhoto = () => {
    if (scene.primaryAction) {
      onTravel(scene.primaryAction.targetScene);
    }
  };

  return (
    <div className="aurora-scene" data-id={scene.id} style={{ background: scene.background }}>
      {/* Stage A (<3): the sky comes alive — frame3 sits softly, gathering */}
      {scene.backgroundImage && stage < 3 && (
        <img
          src={frame3}
          alt="The sky beginning to come alive"
          className="aurora-scene__bg-img aurora-scene__bg-img--calm"
        />
      )}

      {/* Stage B (>=3): "There it is!" — frame1 pans (camera framing) then settles */}
      {scene.backgroundImage && stage >= 3 && (
        <div className="aurora-scene__compose">
          <motion.img
            src={scene.backgroundImage}
            alt="The aurora over Tromsø"
            className="aurora-scene__bg-img"
            initial={{ objectPosition: '30% 50%', opacity: 0 }}
            animate={
              reduceMotion
                ? { objectPosition: '50% 50%', opacity: 1 }
                : {
                    objectPosition: ['30% 50%', '70% 50%', '45% 50%', '55% 50%', '50% 50%'],
                    opacity: 1,
                  }
            }
            transition={
              reduceMotion
                ? { duration: 1, ease: 'easeInOut' }
                : {
                    objectPosition: { duration: 5.4, times: [0, 0.3, 0.55, 0.8, 1], ease: 'easeInOut' },
                    opacity: { duration: 1.2 },
                  }
            }
          />
          <div className="aurora-scene__scanline" />
          <div className="aurora-scene__lightsweep" />
        </div>
      )}

      {/* CSS placeholder artistry — only when there's no real frame yet */}
      {!scene.backgroundImage && (
        <>
          {/* Starfield */}
          <div className="scene__stars" />

          {/* Aurora ribbons growing in */}
          <motion.div
            className="aurora-scene__ribbons"
            initial={{ opacity: 0, scaleY: 0.3 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              scaleY: stage >= 1 ? 1 : 0.3,
            }}
            transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Ground / landscape silhouette */}
          <div className="aurora-scene__ground" />
        </>
      )}

      {/* Narration */}
      <AnimatePresence>
        {stage >= 2 && stage < 3 && (
          <motion.div
            className="aurora-scene__narration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="aurora-scene__text aurora-scene__text--narrator">
              And then — the sky comes alive.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            className="aurora-scene__action-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="aurora-scene__text aurora-scene__text--lina">
              "There it is!"
            </p>
            <motion.button
              className="scene__primary-action"
              onClick={handleTakePhoto}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ position: 'relative', transform: 'none', left: 'auto', bottom: 'auto' }}
            >
              <span className="scene__primary-action-text">📷 Focus the camera</span>
              <span className="scene__primary-action-arrow">→</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder label */}
      <div className="opening__placeholder-label">
        PLACEHOLDER — Full aurora sky illustration needed
      </div>
    </div>
  );
}
