import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import frame1 from '../frames/frame1.png';
import './CameraInteraction.css';

interface CameraInteractionProps {
  onComplete: () => void;
}

type Stage = 'viewfinder' | 'focusing' | 'focused' | 'flash' | 'captured';

/**
 * Interactive Camera Moment — now starring the real aurora photograph.
 *
 * The child sees frame1 through the viewfinder:
 * 1. Tap to focus       → the frame goes BLURRY (camera is hunting for focus)
 * 2. Tap again to lock  → the frame snaps CLEAR (focus locked)
 * 3. Press the shutter  → flash, then the frame freezes — this photograph
 *                         becomes the opening frame of the story.
 */
export function CameraInteraction({ onComplete }: CameraInteractionProps) {
  const [stage, setStage] = useState<Stage>('viewfinder');

  const handleFocusTap = useCallback(() => {
    if (stage === 'viewfinder') {
      setStage('focusing');
    } else if (stage === 'focusing') {
      setStage('focused');
    }
  }, [stage]);

  const handleShutter = useCallback(() => {
    if (stage === 'focused') {
      setStage('flash');
      setTimeout(() => setStage('captured'), 300);
      setTimeout(() => onComplete(), 1500);
    }
  }, [stage, onComplete]);

  const photoClass = stage === 'focusing' ? 'camera__photo camera__photo--blur' : 'camera__photo';

  return (
    <div className="camera">
      {/* The aurora photograph through the viewfinder */}
      <div className="camera__aurora-view">
        <img
          src={frame1}
          alt="The aurora as seen through the viewfinder"
          className={photoClass}
        />
      </div>

      {/* Viewfinder frame */}
      <div className="camera__viewfinder">
        <div className="camera__bar camera__bar--top" />
        <div className="camera__bar camera__bar--bottom" />
        <div className="camera__bar camera__bar--left" />
        <div className="camera__bar camera__bar--right" />

        <div className="camera__grid" />

        {/* Focus ring — blinks while hunting, locks green when in focus */}
        <motion.div
          className={`camera__focus-ring ${
            stage === 'focused' ? 'camera__focus-ring--locked' : ''
          } ${stage === 'focusing' ? 'camera__focus-ring--hunting' : ''}`}
          animate={
            stage === 'focusing'
              ? { scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }
              : stage === 'focused'
              ? { scale: [1, 0.92, 1], borderColor: ['rgba(87, 232, 156, 0.5)', 'rgba(87, 232, 156, 1)', 'rgba(87, 232, 156, 0.8)'] }
              : {}
          }
          transition={{ duration: stage === 'focusing' ? 0.7 : 0.4, repeat: stage === 'focusing' ? Infinity : 0 }}
        />

        <div className="camera__info">
          <span className="camera__info-item">ISO 3200</span>
          <span className="camera__info-item">f/2.8</span>
          <span className="camera__info-item">15s</span>
        </div>
      </div>

      {/* Instruction text */}
      <AnimatePresence mode="wait">
        {stage === 'viewfinder' && (
          <motion.p
            key="focus"
            className="camera__instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Tap the aurora to focus
          </motion.p>
        )}

        {stage === 'focusing' && (
          <motion.p
            key="hunting"
            className="camera__instruction"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Focusing… tap again to lock
          </motion.p>
        )}

        {stage === 'focused' && (
          <motion.p
            key="shoot"
            className="camera__instruction camera__instruction--ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            In focus — press the shutter
          </motion.p>
        )}
      </AnimatePresence>

      {/* Focus tap target — aim at the aurora, then tap again to lock */}
      {(stage === 'viewfinder' || stage === 'focusing') && (
        <button
          className="camera__focus-target"
          onClick={handleFocusTap}
          aria-label="Focus on the aurora"
        />
      )}

      {/* Shutter button */}
      {stage === 'focused' && (
        <motion.button
          className="camera__shutter"
          onClick={handleShutter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Take the photograph"
        >
          <div className="camera__shutter-inner" />
        </motion.button>
      )}

      {/* Flash overlay */}
      <AnimatePresence>
        {stage === 'flash' && (
          <motion.div
            className="camera__flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Captured — a brief CLICK, then the story carries the photograph onward */}
      <AnimatePresence>
        {stage === 'captured' && (
          <motion.div
            className="camera__captured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <motion.p
              className="camera__captured-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              CLICK.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}