/* ─── Story Engine Types ─────────────────────────────────────────────────── */

export type SceneId = string;

export type HotspotType = 'discover' | 'action' | 'travel';

export type TransitionType = 'fade' | 'zoom-in' | 'zoom-out' | 'dissolve';

export type Speaker = 'lina' | 'narrator' | 'spark';

export interface DialogueLine {
  speaker: Speaker;
  text: string;
}

export interface Hotspot {
  id: string;
  /** X position as percentage of scene width (0–100) */
  x: number;
  /** Y position as percentage of scene height (0–100) */
  y: number;
  type: HotspotType;
  label?: string;
  /** Icon displayed on the hotspot — emoji or SVG id */
  icon?: string;
  /** Dialogue shown when the hotspot is activated */
  dialogue?: DialogueLine[];
  /** Scene to navigate to when this hotspot is activated (for "travel" type) */
  targetScene?: SceneId;
}

export interface TransitionConfig {
  type: TransitionType;
  /** Duration in seconds */
  duration: number;
}

/** A small NASA source credit shown in a phase (one idea per scene). */
export interface SceneSource {
  /** Short label, matched to the story's tone */
  label: string;
  /** Link to the NASA source page */
  url: string;
}

/** A "Spark" beat — Spark says one idea, the child taps Spark to continue. */
export interface SparkBeat {
  line: DialogueLine;
  /** Whether Spark's entrance is drawn by hand (CSS dot) vs. shown in art */
}

export interface StoryScene {
  id: SceneId;
  /** Background — CSS value (color, gradient, or url()) */
  background: string;
  /** Optional full-bleed illustration — an imported image that covers the scene */
  backgroundImage?: string;
  /** Optional gallery of images shown together (e.g. two aurora close-ups) */
  galleryImages?: string[];
  /** If true with a backgroundImage, render it as a centered polaroid card instead of full-bleed */
  polaroid?: boolean;
  /** Handwritten caption for the polaroid card */
  polaroidCaption?: string;
  /** Background overlay — optional CSS value layered on top */
  overlay?: string;
  /** Opening narration lines shown when the scene first appears */
  narration?: DialogueLine[];
  /** Interactive hotspots within this scene */
  hotspots: Hotspot[];
  /** The main action that advances the story */
  primaryAction?: {
    label: string;
    targetScene: SceneId;
    /** If true, this action only becomes available after all "discover" hotspots are found */
    requiresDiscovery?: boolean;
  };
  /** How this scene transitions IN from the previous scene */
  transition: TransitionConfig;
  /** If true, this scene uses a custom React component instead of the generic renderer */
  customComponent?: boolean;
  /** Small NASA source credit shown in a corner of the scene */
  source?: SceneSource;
}

export interface StoryState {
  currentSceneId: SceneId;
  /** Set of scene IDs the player has visited */
  visitedScenes: Set<SceneId>;
  /** Map of scene ID → set of discovered hotspot IDs */
  discoveredHotspots: Map<SceneId, Set<string>>;
  /** Whether a transition animation is currently playing */
  isTransitioning: boolean;
}
