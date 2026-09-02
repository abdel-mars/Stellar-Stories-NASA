import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useStoryState } from './useStoryState';
import { getSceneById, TOTAL_SCENES } from '../data/scenes';
import { Scene } from '../components/Scene';
import { Transition } from '../components/Transition';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { OpeningScene } from '../components/OpeningScene';
import { SparkScene } from '../components/SparkScene';
import { AuroraAppearsScene } from '../components/AuroraAppearsScene';
import { CameraInteraction } from '../components/CameraInteraction';
import type { SceneId } from './types';
import './StoryEngine.css';

export function StoryEngine() {
  const {
    currentSceneId,
    isTransitioning,
    storyProgress,
    goToScene,
    finishTransition,
    discoverHotspot,
    isHotspotDiscovered,
  } = useStoryState();

  const scene = getSceneById(currentSceneId);
  const [pendingScene, setPendingScene] = useState<SceneId | null>(null);

  const handleTravel = useCallback(
    (targetSceneId: SceneId) => {
      setPendingScene(targetSceneId);
    },
    []
  );

  // When a transition starts, wait for the exit animation, then switch
  useEffect(() => {
    if (pendingScene) {
      const timer = setTimeout(() => {
        goToScene(pendingScene);
        setPendingScene(null);
      }, (scene?.transition.duration ?? 0.8) * 1000);
      return () => clearTimeout(timer);
    }
  }, [pendingScene, goToScene, scene]);

  // Finish transition flag after entering new scene
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        finishTransition();
      }, (scene?.transition.duration ?? 0.8) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, finishTransition, scene, currentSceneId]);

  if (!scene) {
    return <div className="story-engine__error">Scene not found: {currentSceneId}</div>;
  }

  const isExiting = pendingScene !== null;

  const renderScene = () => {
    // Custom components for special scenes
    if (scene.id === 'opening-photograph') {
      return (
        <OpeningScene
          scene={scene}
          onTravel={handleTravel}
        />
      );
    }

    if (scene.id === 'aurora-appears') {
      return (
        <AuroraAppearsScene
          scene={scene}
          onTravel={handleTravel}
        />
      );
    }

    if (scene.id === 'camera-moment') {
      return (
        <CameraInteraction
          onComplete={() => handleTravel('the-question')}
        />
      );
    }

    // Spark — the science guide through the space-weather journey
    const SPARK_SCENES = new Set([
      'inside-aurora',
      'the-atmosphere',
      'the-magnetic-field',
      'empty-space',
      'the-solar-wind',
      'the-sun',
      'back-to-earth',
      'from-the-ground',
      'why-it-matters',
      'one-sentence',
    ]);
    if (SPARK_SCENES.has(scene.id)) {
      return (
        <SparkScene
          scene={scene}
          onTravel={handleTravel}
        />
      );
    }

    // Generic scene renderer
    return (
      <Scene
        scene={scene}
        onTravel={handleTravel}
        onDiscover={(hotspotId) => discoverHotspot(scene.id, hotspotId)}
        isHotspotDiscovered={(hotspotId) => isHotspotDiscovered(scene.id, hotspotId)}
      />
    );
  };

  return (
    <div className="story-engine">
      <AnimatePresence mode="wait">
        <Transition
          key={currentSceneId}
          type={scene.transition.type}
          duration={scene.transition.duration}
          isExiting={isExiting}
        >
          {renderScene()}
        </Transition>
      </AnimatePresence>

      <ProgressIndicator
        current={storyProgress}
        total={TOTAL_SCENES}
      />
    </div>
  );
}
