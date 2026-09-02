import { useState, useEffect } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { StoryScene, SceneId } from '../engine/types';
import frame1 from '../frames/frame1.png';
import './OpeningScene.css';

interface OpeningSceneProps {
  scene: StoryScene;
  onTravel: (targetScene: SceneId) => void;
}

/**
 * The Opening Scene — the emotional anchor of the entire experience.
 *
 * A beautiful aurora photograph fills the screen.
 * Text fades in sequentially:
 *   "Lina, 14" → "Tromsø, Norway" → "2:17 AM"
 * Then:
 *   "I waited all night for this."
 * Then:
 *   "But this photograph has a story."
 * Then a subtle "Begin" prompt appears.
 */
export function OpeningScene({ scene, onTravel }: OpeningSceneProps) {
  const [stage, setStage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  // 0: blank
  // 1: "Lina, 14"
  // 2: "Tromsø, Norway"
  // 3: "2:17 AM"
  // 4: "I waited all night for this."
  // 5: "But this photograph has a story."
  // 6: show "Begin" button

  useEffect(() => {
    const delays = [1200, 2000, 2800, 4200, 6200, 8200];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setStage(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Close the zoom lightbox with the Escape key
  useEffect(() => {
    if (!zoomed) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomed]);

  const handleBegin = () => {
    if (scene.primaryAction) {
      onTravel(scene.primaryAction.targetScene);
    }
  };

  return (
    <div className="opening" style={{ background: scene.background }}>
      {/* Aurora placeholder background */}
      <div className="opening__aurora-bg" />

      {/* Overlay gradient */}
      {scene.overlay && (
        <div className="opening__overlay" style={{ background: scene.overlay }} />
      )}

      {/* Starfield */}
      <div className="scene__stars" />

      {/* Photo vignette effect */}
      <div className="opening__vignette" />

      {/* Layout: centered studio — polaroid, then the story types beneath */}
      <div className="opening__layout">
        {/* The photograph + its film title, centered */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              key="photo-block"
              className="opening__photo-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0 }}
            >
              <motion.figure
                className="opening__polaroid"
                initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                whileHover={{ scale: 1.03, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setZoomed(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e: ReactKeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setZoomed(true);
                  }
                }}
                aria-label="Zoom in on Lina's photograph of the aurora"
              >
                <motion.img
                  src={frame1}
                  alt="Lina's photograph of the aurora over Tromsø"
                  className="opening__polaroid-img"
                  layoutId="opening-photo"
                />

                {/* Film title metadata — fixed on top of the photograph */}
                <div className="opening__meta-card">
                  <motion.p
                    key="name"
                    className="opening__meta opening__meta--name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                  >
                    Lina, 14
                  </motion.p>
                  <motion.p
                    key="location"
                    className="opening__meta opening__meta--location"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                  >
                    Tromsø, Norway
                  </motion.p>
                  <motion.p
                    key="time"
                    className="opening__meta opening__meta--time"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
                  >
                    2:17 AM
                  </motion.p>
                </div>

                <figcaption className="opening__polaroid-caption">
                  aurora over tromsø · 2:17 am
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Polaroid zoom lightbox */}
        <AnimatePresence>
          {zoomed && (
            <motion.div
              className="opening__lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setZoomed(false)}
              role="dialog"
              aria-label="Aurora photograph, zoomed in. Click to close."
            >
              <motion.img
                src={frame1}
                alt="Lina's photograph of the aurora over Tromsø, zoomed in"
                className="opening__lightbox-img"
                layoutId="opening-photo"
              />
              <span className="opening__lightbox-hint">
                tap anywhere to close ✕
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 4 && (
            <motion.p
              key="quote1"
              className="opening__quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Typewriter
                key={`quote1-${stage}`}
                text='"I waited all night for this."'
                duration={1.8}
              />
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 5 && (
            <motion.p
              key="quote2"
              className="opening__subquote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            >
              But this photograph has a story.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 6 && (
            <motion.button
              key="begin"
              className="opening__begin"
              onClick={handleBegin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Begin the story"
            >
              <span className="opening__begin-text">Begin the story</span>
              <span className="opening__begin-arrow" aria-hidden="true">→</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Frame label */}
      <div className="opening__placeholder-label">
        frame 1 · opening photograph
      </div>
    </div>
  );
}

/** Small typewriter — types `text` out one character at a time. */
function Typewriter({ text, duration }: { text: string; duration: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let raf = true;
    let frame: number;
    const t0 = performance.now();
    const total = text.length;
    const step = () => {
      if (!raf) return;
      const t = Math.min((performance.now() - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.floor(eased * total));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      raf = false;
      cancelAnimationFrame(frame);
    };
  }, [text, duration]);

  return (
    <>
      {text.slice(0, shown)}
      {shown < text.length && <span className="opening__type-cursor">|</span>}
    </>
  );
}
