import { useCallback, useMemo, useState } from 'react';
import type { SceneId, StoryState } from './types';

const INITIAL_SCENE: SceneId = 'opening-photograph';

function createInitialState(): StoryState {
  return {
    currentSceneId: INITIAL_SCENE,
    visitedScenes: new Set([INITIAL_SCENE]),
    discoveredHotspots: new Map(),
    isTransitioning: false,
  };
}

export function useStoryState() {
  const [state, setState] = useState<StoryState>(createInitialState);

  const goToScene = useCallback((sceneId: SceneId) => {
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      currentSceneId: sceneId,
      visitedScenes: new Set([...prev.visitedScenes, sceneId]),
    }));
  }, []);

  const finishTransition = useCallback(() => {
    setState(prev => ({ ...prev, isTransitioning: false }));
  }, []);

  const discoverHotspot = useCallback((sceneId: SceneId, hotspotId: string) => {
    setState(prev => {
      const newMap = new Map(prev.discoveredHotspots);
      const sceneSet = new Set(newMap.get(sceneId) || []);
      sceneSet.add(hotspotId);
      newMap.set(sceneId, sceneSet);
      return { ...prev, discoveredHotspots: newMap };
    });
  }, []);

  const isHotspotDiscovered = useCallback(
    (sceneId: SceneId, hotspotId: string) => {
      return state.discoveredHotspots.get(sceneId)?.has(hotspotId) ?? false;
    },
    [state.discoveredHotspots]
  );

  const discoveredCountForScene = useCallback(
    (sceneId: SceneId) => {
      return state.discoveredHotspots.get(sceneId)?.size ?? 0;
    },
    [state.discoveredHotspots]
  );

  const storyProgress = useMemo(() => {
    return state.visitedScenes.size;
  }, [state.visitedScenes]);

  return {
    currentSceneId: state.currentSceneId,
    isTransitioning: state.isTransitioning,
    visitedScenes: state.visitedScenes,
    storyProgress,
    goToScene,
    finishTransition,
    discoverHotspot,
    isHotspotDiscovered,
    discoveredCountForScene,
  };
}
