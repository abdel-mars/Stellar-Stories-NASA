import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { DialogueLine } from '../engine/types';
import './Dialogue.css';

interface DialogueProps {
  lines: DialogueLine[];
  onDismiss: () => void;
}

export function Dialogue({ lines, onDismiss }: DialogueProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const line = lines[currentLine];
  const fullText = line?.text || '';

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const speed = 35; // ms per character

    const timer = setInterval(() => {
      charIndex++;
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex));
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [fullText, currentLine]);

  const handleClick = useCallback(() => {
    if (isTyping) {
      // Skip to full text
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (currentLine < lines.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      onDismiss();
    }
  }, [isTyping, currentLine, lines.length, onDismiss, fullText]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClick]);

  if (!line) return null;

  const isLina = line.speaker === 'lina';

  return (
    <div
      className="dialogue-container"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Advance dialogue"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLine}
          className={`dialogue ${isLina ? 'dialogue--lina' : 'dialogue--narrator'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Speaker name */}
          {isLina && (
            <span className="dialogue__speaker">Lina</span>
          )}

          {/* Text */}
          <p className="dialogue__text">
            {isLina ? '"' : ''}
            {displayedText}
            {isLina && !isTyping ? '"' : ''}
            {isTyping && <span className="dialogue__cursor">|</span>}
          </p>

          {/* Continue indicator */}
          {!isTyping && (
            <motion.span
              className="dialogue__continue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentLine < lines.length - 1 ? 'tap to continue' : 'tap to close'}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
