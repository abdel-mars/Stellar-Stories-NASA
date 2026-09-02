import { useState, useCallback } from 'react';
import type { StoryScene, SceneId } from '../engine/types';
import { Hotspot } from './Hotspot';
import { Dialogue } from './Dialogue';
import type { DialogueLine } from '../engine/types';
import './Scene.css';

interface SceneProps {
  scene: StoryScene;
  onTravel: (targetScene: SceneId) => void;
  onDiscover: (hotspotId: string) => void;
  isHotspotDiscovered: (hotspotId: string) => boolean;
}

export function Scene({ scene, onTravel, onDiscover, isHotspotDiscovered }: SceneProps) {
  const [activeDialogue, setActiveDialogue] = useState<DialogueLine[] | null>(null);
  const [showNarration, setShowNarration] = useState(true);
  const [narrationIndex, setNarrationIndex] = useState(0);

  const handleHotspotClick = useCallback(
    (hotspotId: string) => {
      const hotspot = scene.hotspots.find(h => h.id === hotspotId);
      if (!hotspot) return;

      if (hotspot.type === 'travel' && hotspot.targetScene) {
        // Show travel dialogue first, then navigate
        if (hotspot.dialogue && hotspot.dialogue.length > 0) {
          setActiveDialogue(hotspot.dialogue);
          // After dialogue, navigate
          setTimeout(() => {
            onTravel(hotspot.targetScene!);
          }, hotspot.dialogue.length * 2500 + 500);
        } else {
          onTravel(hotspot.targetScene);
        }
      } else if (hotspot.type === 'discover') {
        onDiscover(hotspotId);
        if (hotspot.dialogue) {
          setActiveDialogue(hotspot.dialogue);
        }
      }
    },
    [scene.hotspots, onTravel, onDiscover]
  );

  const handleDialogueDismiss = useCallback(() => {
    setActiveDialogue(null);
  }, []);

  const handleNarrationAdvance = useCallback(() => {
    if (scene.narration && narrationIndex < scene.narration.length - 1) {
      setNarrationIndex(prev => prev + 1);
    } else {
      setShowNarration(false);
    }
  }, [scene.narration, narrationIndex]);

  const handlePrimaryAction = useCallback(() => {
    if (scene.primaryAction) {
      onTravel(scene.primaryAction.targetScene);
    }
  }, [scene.primaryAction, onTravel]);

  return (
    <div
      className="scene"
      data-id={scene.id}
      style={{ background: scene.background }}
    >
      {/* Full-bleed illustration */}
      {scene.backgroundImage && !scene.polaroid && (
        <img
          src={scene.backgroundImage}
          alt=""
          className="scene__bg-img"
        />
      )}

      {/* Polaroid presentation of the photograph */}
      {scene.polaroid && scene.backgroundImage && (
        <figure className="scene__polaroid">
          <img
            src={scene.backgroundImage}
            alt="The captured aurora photograph"
            className="scene__polaroid-img"
          />
          <figcaption className="scene__polaroid-caption">
            {scene.polaroidCaption}
          </figcaption>
        </figure>
      )}

      {/* Gallery of images (e.g. aurora close-ups) */}
      {scene.galleryImages && scene.galleryImages.length > 0 && (
        <div className="scene__gallery">
          {scene.galleryImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Aurora light ${i + 1}`}
              className="scene__gallery-img"
            />
          ))}
        </div>
      )}

      {/* Overlay layer */}
      {scene.overlay && (
        <div className="scene__overlay" style={{ background: scene.overlay }} />
      )}

      {/* Aurora shimmer for aurora-related scenes */}
      {(scene.id === 'the-question' || scene.id === 'aurora-zoom') && (
        <div className="scene__aurora-shimmer" />
      )}

      {/* Starfield for night scenes */}
      <div className="scene__stars" />

      {/* NASA source credit */}
      {scene.source && (
        <a
          className="scene__source"
          href={scene.source.url}
          target="_blank"
          rel="noreferrer"
        >
          {scene.source.label}
        </a>
      )}

      {/* Hotspots */}
      {!activeDialogue && !showNarration && scene.hotspots.map(hotspot => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          isDiscovered={isHotspotDiscovered(hotspot.id)}
          onClick={() => handleHotspotClick(hotspot.id)}
        />
      ))}

      {/* Narration */}
      {showNarration && scene.narration && scene.narration.length > 0 && (
        <Dialogue
          lines={[scene.narration[narrationIndex]]}
          onDismiss={handleNarrationAdvance}
          key={`narration-${narrationIndex}`}
        />
      )}

      {/* Active hotspot dialogue */}
      {activeDialogue && (
        <Dialogue
          lines={activeDialogue}
          onDismiss={handleDialogueDismiss}
        />
      )}

      {/* Primary action button */}
      {!activeDialogue && !showNarration && scene.primaryAction && (
        <button
          className="scene__primary-action"
          onClick={handlePrimaryAction}
          aria-label={scene.primaryAction.label}
        >
          <span className="scene__primary-action-text">
            {scene.primaryAction.label}
          </span>
          <span className="scene__primary-action-arrow">→</span>
        </button>
      )}
    </div>
  );
}
