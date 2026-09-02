import type { StoryScene } from '../engine/types';
import frame1 from '../frames/frame1.png';
import frame2 from '../frames/frame2.png';
import frame4 from '../frames/frame4.png';
import frame5 from '../frames/frame5.png';
import frame6 from '../frames/frame6.png';
import frame7 from '../frames/frame7.png';
import frame8 from '../frames/frame8.png';
import frame9 from '../frames/frame9.png';
import light1 from '../frames/light1.png';
import light2 from '../frames/light2.png';

/**
 * STORY DATA — Vertical Slice (Milestone 1)
 *
 * 7 scenes: Opening Photograph → Meet Lina → The Wait → Take the Photo →
 *           The Question → Aurora Zoom
 *
 * Backgrounds are CSS values (gradients/colors) until we have real artwork.
 * Each scene documents the visual assets it will eventually need.
 */

export const scenes: StoryScene[] = [
  /* ─── Scene 1: The Opening Photograph ─────────────────────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - aurora-photograph.jpg: Beautiful aurora over Tromsø fjord, warm
   *   photographic tones, slight grain. Mountains/snow in foreground.
   *   Aspect: 16:9 or wider. Min 1920×1080.
   * - Optional: photographic border/vignette overlay
   */
  {
    id: 'opening-photograph',
    background: 'radial-gradient(ellipse at 50% 30%, #0f3a2e 0%, #0a1628 40%, #04050f 100%)',
    overlay: 'linear-gradient(to bottom, transparent 60%, rgba(4, 5, 15, 0.8) 100%)',
    narration: [
      { speaker: 'narrator', text: 'Lina, 14' },
      { speaker: 'narrator', text: 'Tromsø, Norway' },
      { speaker: 'narrator', text: '2:17 AM' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Begin the story',
      targetScene: 'meet-lina',
    },
    transition: { type: 'fade', duration: 0.5 },
  },

  /* ─── Scene 2: Meet Lina / Campsite ───────────────────────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - campsite-bg.jpg: Wide Norwegian landscape at night. Dark mountains,
   *   snow-covered ground, starry sky, faint aurora glow on horizon.
   *   Aspect: 16:9. Min 1920×1080.
   * - lina.png: Lina standing, bundled in warm clothes, looking at sky.
   *   Transparent PNG, roughly 400×800px character.
   * - camera-tripod.png: Camera on tripod, separate layer. ~200×300px.
   * - backpack.png: Backpack on snow. ~150×200px.
   */
  {
    id: 'meet-lina',
    background: 'linear-gradient(to bottom, #070d1f 0%, #0a1628 40%, #111a30 70%, #1a2040 100%)',
    backgroundImage: frame2,
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(87, 232, 156, 0.05) 0%, transparent 60%)',
    narration: [
      { speaker: 'lina', text: 'I waited all night for this.' },
    ],
    hotspots: [
      {
        id: 'lina',
        x: 68.9,
        y: 26.7,
        type: 'discover',
        icon: '👧',
        label: 'Lina',
        dialogue: [
          { speaker: 'lina', text: "I'm Lina. I'm 14, and I love photographing the night sky." },
          { speaker: 'lina', text: 'One day, I want to be a real photographer.' },
        ],
      },
      {
        id: 'camera',
        x: 60.7,
        y: 39.3,
        type: 'discover',
        icon: '📷',
        label: 'Camera',
        dialogue: [
          { speaker: 'lina', text: 'This is my camera. Tonight, I set it up to capture the aurora.' },
          { speaker: 'lina', text: 'I have to use a long exposure — the aurora is beautiful, but faint.' },
        ],
      },
      {
        id: 'backpack',
        x: 76.9,
        y: 51.5,
        type: 'discover',
        icon: '🎒',
        label: 'Backpack',
        dialogue: [
          { speaker: 'lina', text: 'Extra batteries. Hand warmers. A thermos of hot chocolate.' },
          { speaker: 'lina', text: "It's almost -15°C out here. You have to be prepared." },
        ],
      },
      {
        id: 'location',
        x: 11.6,
        y: 59.3,
        type: 'discover',
        icon: '🏔️',
        label: 'Tromsø',
        dialogue: [
          { speaker: 'narrator', text: "Tromsø, Norway — 69° north. One of the best places on Earth to see the northern lights." },
          { speaker: 'narrator', text: "It's deep inside the Arctic Circle, where dark winter nights can last for hours." },
        ],
      },
      {
        id: 'phone',
        x: 72,
        y: 60,
        type: 'discover',
        icon: '📱',
        label: 'Forecast',
        dialogue: [
          { speaker: 'lina', text: 'This app shows space weather forecasts.' },
          { speaker: 'lina', text: "Tonight, the forecast looks promising — there's been activity on the Sun." },
        ],
      },
      {
        id: 'sky',
        x: 44,
        y: 24.6,
        type: 'travel',
        icon: '🌌',
        label: 'Sky',
        dialogue: [
          { speaker: 'narrator', text: 'The sky is calling — let\'s follow the light.' },
        ],
        targetScene: 'aurora-appears',
      },
    ],
    primaryAction: {
      label: 'Wait for the aurora',
      targetScene: 'the-wait',
    },
    transition: { type: 'dissolve', duration: 1.2 },
  },

  /* ─── Scene 3: The Wait ───────────────────────────────────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - Same campsite background, but with animated elements:
   *   - SVG clouds drifting across sky
   *   - Battery percentage indicator dropping
   *   - Faint aurora glow growing at horizon over time
   *   - Subtle star parallax
   * - lina-waiting.png: Lina sitting/huddled, checking sky
   */
  {
    id: 'the-wait',
    background: 'linear-gradient(to bottom, #060c1c 0%, #0a1628 50%, #111a30 100%)',
    narration: [
      { speaker: 'narrator', text: 'Time passes.' },
      { speaker: 'narrator', text: 'The sky is dark. The cold is deep.' },
      { speaker: 'lina', text: 'Maybe tonight isn\'t the night...' },
    ],
    hotspots: [
      {
        id: 'battery',
        x: 80,
        y: 20,
        type: 'discover',
        icon: '🔋',
        label: 'Battery',
        dialogue: [
          { speaker: 'lina', text: 'The cold drains batteries fast. I brought three extras.' },
        ],
      },
      {
        id: 'sky',
        x: 50,
        y: 15,
        type: 'discover',
        icon: '✨',
        label: 'Sky',
        dialogue: [
          { speaker: 'lina', text: 'Wait... is that...?' },
          { speaker: 'narrator', text: 'A faint green shimmer appears at the edge of the sky.' },
        ],
      },
    ],
    primaryAction: {
      label: 'Look up',
      targetScene: 'aurora-appears',
    },
    transition: { type: 'fade', duration: 1.5 },
  },

  /* ─── Scene 4: Aurora Appears / Take the Photograph ───────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - aurora-sky.jpg: Full aurora display — vivid greens and purples
   *   dancing across the sky. Norwegian landscape below.
   * - viewfinder-overlay.png: Camera viewfinder frame (black bars, grid)
   * - shutter-button.svg: Circular shutter button
   * - Audio: Camera shutter click SFX
   */
  {
    id: 'aurora-appears',
    background: 'radial-gradient(ellipse at 50% 25%, #0f4a35 0%, #0a2840 30%, #0a1628 60%, #04050f 100%)',
    backgroundImage: frame1,
    overlay: 'radial-gradient(ellipse at 50% 20%, rgba(87, 232, 156, 0.12) 0%, transparent 50%)',
    narration: [
      { speaker: 'narrator', text: 'And then — the sky comes alive.' },
      { speaker: 'lina', text: 'There it is!' },
      { speaker: 'narrator', text: 'The aurora sweeps across the sky in waves of green and purple.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Focus the camera',
      targetScene: 'camera-moment',
    },
    transition: { type: 'fade', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 5: Camera Moment (Interactive) ────────────────────────────── */
  /*
   * This scene uses a custom component (CameraInteraction).
   * The child frames, focuses, and clicks the shutter.
   */
  {
    id: 'camera-moment',
    background: '#04050f',
    narration: [],
    hotspots: [],
    primaryAction: {
      label: '',
      targetScene: 'the-question',
    },
    transition: { type: 'fade', duration: 0.8 },
    customComponent: true,
  },

  /* ─── Scene 6: The Question ───────────────────────────────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - The same aurora photograph from Scene 1, now full-screen
   * - Aurora region should subtly pulse/shimmer (CSS animation)
   */
  {
    id: 'the-question',
    background: 'radial-gradient(ellipse at 50% 30%, #0f3a2e 0%, #0a1628 40%, #04050f 100%)',
    overlay: 'linear-gradient(to bottom, transparent 60%, rgba(4, 5, 15, 0.8) 100%)',
    backgroundImage: frame1,
    polaroid: true,
    polaroidCaption: 'aurora over tromsø · 2:17 am',
    narration: [
      { speaker: 'narrator', text: 'The photograph is captured.' },
      { speaker: 'narrator', text: 'But what made the sky glow?' },
      { speaker: 'narrator', text: 'Let\'s go inside the light and find out...' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Explore the light',
      targetScene: 'aurora-zoom',
    },
    transition: { type: 'dissolve', duration: 1.0 },
  },

  /* ─── Scene 7: Aurora Zoom (Cliffhanger) ──────────────────────────────── */
  /*
   * ASSET REQUIREMENTS:
   * - Abstract aurora close-up: ribbons of light, ethereal, dream-like
   * - Particle effects (CSS/Canvas) showing energetic particles
   *
   * This is the end of the vertical slice — we zoom in and
   * the experience pauses, ready for the science journey.
   */
  {
    id: 'aurora-zoom',
    background: 'radial-gradient(ellipse at 50% 50%, #1a5c46 0%, #0f3a2e 30%, #0a1628 60%, #04050f 100%)',
    overlay: 'radial-gradient(ellipse at 50% 50%, rgba(87, 232, 156, 0.15) 0%, rgba(167, 139, 250, 0.08) 40%, transparent 70%)',
    galleryImages: [light1, light2],
    narration: [
      { speaker: 'narrator', text: 'These lights are called an aurora.' },
      { speaker: 'narrator', text: 'High above Earth, tiny particles from the Sun make the atmosphere glow.' },
      { speaker: 'narrator', text: 'But where did those particles come from?' },
      { speaker: 'narrator', text: 'Let\'s follow one tiny spark into the light.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Follow the light',
      targetScene: 'inside-aurora',
    },
    source: {
      label: 'NASA Science — Space Weather',
      url: 'https://science.nasa.gov/heliophysics/focus-areas/space-weather/',
    },
    transition: { type: 'zoom-in', duration: 1.5 },
  },

  /* ─── Scene 8: Inside the Aurora (Spark appears) ──────────────────────── */
  /*
   * Act 2 — Wonder becomes curiosity. The child enters the light and meets
   * Spark, the science guide. The word "particle" is delayed on purpose.
   */
  {
    id: 'inside-aurora',
    background: 'radial-gradient(ellipse at 50% 50%, #15452f 0%, #0a1e33 55%, #04050f 100%)',
    backgroundImage: frame4,
    narration: [
      { speaker: 'spark', text: 'See that tiny spark? That\'s me.' },
      { speaker: 'spark', text: 'Want to know where I came from?' },
      { speaker: 'spark', text: 'I\'m one of countless tiny particles — follow me.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Follow Spark',
      targetScene: 'the-atmosphere',
    },
    source: {
      label: 'NASA Science — Solar Storms & Flares',
      url: 'https://science.nasa.gov/sun/solar-storms-and-flares/',
    },
    transition: { type: 'zoom-in', duration: 1.2 },
    customComponent: true,
  },

  /* ─── Scene 9: The Atmosphere ─────────────────────────────────────────── */
  /*
   * Act 3, stage 1. Spark glows because the air high above Earth helps.
   */
  {
    id: 'the-atmosphere',
    background: 'radial-gradient(ellipse at 50% 20%, #0f4a3f 0%, #081a30 50%, #04050f 100%)',
    backgroundImage: frame5,
    narration: [
      { speaker: 'spark', text: 'I didn\'t make the light alone. When we bump into air high above Earth, the air glows like a giant neon sign!' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Keep going',
      targetScene: 'the-magnetic-field',
    },
    source: {
      label: 'NASA Space Weather',
      url: 'https://science.nasa.gov/heliophysics/focus-areas/space-weather/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 10: The Magnetic Field (hero beat) ────────────────────────── */
  {
    id: 'the-magnetic-field',
    background: 'radial-gradient(ellipse at 50% 50%, #10264a 0%, #0a1328 50%, #04050f 100%)',
    backgroundImage: frame6,
    narration: [
      { speaker: 'spark', text: 'I wasn\'t headed for the poles. Something invisible guided me.' },
      { speaker: 'spark', text: 'Earth has an invisible magnetic shield — it bent my path toward the poles.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Follow the field',
      targetScene: 'empty-space',
    },
    source: {
      label: 'NOAA SWPC',
      url: 'https://www.swpc.noaa.gov/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 11: Empty Space ───────────────────────────────────────────── */
  {
    id: 'empty-space',
    background: 'radial-gradient(ellipse at 50% 50%, #0a1030 0%, #060a1e 55%, #03040d 100%)',
    backgroundImage: frame7,
    narration: [
      { speaker: 'spark', text: 'For a very long time, there was nothing around me.' },
      { speaker: 'spark', text: 'I traveled through the darkness between Earth and the Sun.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Keep going',
      targetScene: 'the-solar-wind',
    },
    source: {
      label: 'NASA — Solar Storms from Sun to Earth',
      url: 'https://svs.gsfc.nasa.gov/10809/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 12: The Solar Wind (teaser — Sun only a glow) ────────────── */
  {
    id: 'the-solar-wind',
    background: 'radial-gradient(ellipse at 80% 20%, #3a240b 0%, #1a1626 45%, #05050f 100%)',
    backgroundImage: frame8,
    narration: [
      { speaker: 'spark', text: 'I wasn\'t alone out there. The Sun is always sending a stream of tiny invisible particles — the solar wind.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Follow the wind',
      targetScene: 'the-sun',
    },
    source: {
      label: 'NASA — Space Weather Vocabulary',
      url: 'https://svs.gsfc.nasa.gov/11179/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 13: The Sun (the reveal) ──────────────────────────────────── */
  {
    id: 'the-sun',
    background: 'radial-gradient(ellipse at 50% 50%, #7a4a12 0%, #3a240b 35%, #12090a 70%, #05030a 100%)',
    backgroundImage: frame9,
    narration: [
      { speaker: 'spark', text: 'This is where my journey began.' },
      { speaker: 'spark', text: 'I am light born from the Sun.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Ride the light home',
      targetScene: 'back-to-earth',
    },
    source: {
      label: 'NASA Science — Solar Storms & Flares',
      url: 'https://science.nasa.gov/sun/solar-storms-and-flares/',
    },
    transition: { type: 'zoom-in', duration: 1.4 },
    customComponent: true,
  },

  /* ─── Scene 14: The Return (Act 4) ────────────────────────────────────── */
  /*
   * Forward, fast. Hero image the-sun-return (Sun → Earth) plugs in here.
   */
  {
    id: 'back-to-earth',
    background: 'radial-gradient(ellipse at 50% 50%, #2a1a3f 0%, #0d1230 50%, #04050f 100%)',
    backgroundImage: frame9,
    narration: [
      { speaker: 'spark', text: 'Sometimes the Sun has a storm and sends a huge cloud our way.' },
      { speaker: 'spark', text: 'Then more of us arrive at once.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Race home',
      targetScene: 'from-the-ground',
    },
    source: {
      label: 'NASA — Space Weather Vocabulary',
      url: 'https://svs.gsfc.nasa.gov/11179/',
    },
    transition: { type: 'dissolve', duration: 1.1 },
    customComponent: true,
  },

  /* ─── Scene 15: From the Ground (wonder) ──────────────────────────────── */
  {
    id: 'from-the-ground',
    background: 'radial-gradient(ellipse at 50% 30%, #0f4a35 0%, #0a2840 35%, #04050f 100%)',
    backgroundImage: frame1,
    narration: [
      { speaker: 'spark', text: 'And when we dance, the auroras glow brighter — and can reach further south.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'What does that mean for us?',
      targetScene: 'why-it-matters',
    },
    source: {
      label: 'NASA — Solar Storms & Flares',
      url: 'https://science.nasa.gov/sun/solar-storms-and-flares/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 16: Why It Matters (probabilistic, human) ─────────────────── */
  {
    id: 'why-it-matters',
    background: 'radial-gradient(ellipse at 50% 50%, #0d1e45 0%, #0a1328 55%, #04050f 100%)',
    backgroundImage: frame6,
    narration: [
      { speaker: 'spark', text: 'Sometimes — not always — strong space weather can make it harder for people to use GPS, radio, or satellites.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'And it\'s always happening',
      targetScene: 'one-sentence',
    },
    source: {
      label: 'NASA — Space Weather Q&A',
      url: 'https://svs.gsfc.nasa.gov/10959/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 17: One Sentence (definition) ─────────────────────────────── */
  {
    id: 'one-sentence',
    background: 'radial-gradient(ellipse at 50% 50%, #1a5c46 0%, #0f3a2e 35%, #0a1628 70%, #04050f 100%)',
    backgroundImage: frame1,
    narration: [
      { speaker: 'spark', text: 'That\'s space weather — and it\'s always happening above Earth.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Back to Lina',
      targetScene: 'the-ending',
    },
    source: {
      label: 'NASA Space Weather',
      url: 'https://science.nasa.gov/heliophysics/focus-areas/space-weather/',
    },
    transition: { type: 'dissolve', duration: 1.0 },
    customComponent: true,
  },

  /* ─── Scene 18: The Ending (brain bookend) ─────────────────────────────── */
  /*
   * Act 5 — back to Lina, same night, same photograph. Emotion first.
   */
  {
    id: 'the-ending',
    background: 'radial-gradient(ellipse at 50% 50%, #0f3a2e 0%, #0a1628 45%, #04050f 100%)',
    backgroundImage: frame1,
    polaroid: true,
    polaroidCaption: 'aurora over tromsø · 2:17 am',
    narration: [
      { speaker: 'narrator', text: 'Same night. Same photograph. Lina smiled.' },
      { speaker: 'narrator', text: 'She saw a beautiful light.' },
      { speaker: 'narrator', text: 'And you discovered its journey.' },
      { speaker: 'narrator', text: 'Every aurora tells a story.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'You discovered the journey',
      targetScene: 'the-recap',
    },
    source: {
      label: 'NASA Space Weather',
      url: 'https://science.nasa.gov/heliophysics/focus-areas/space-weather/',
    },
    transition: { type: 'dissolve', duration: 1.2 },
  },

  /* ─── Scene 19: Tiny Recap Card (optional) ─────────────────────────────── */
  {
    id: 'the-recap',
    background: 'radial-gradient(ellipse at 50% 50%, #1a5c46 0%, #0f3a2e 30%, #0a1628 60%, #04050f 100%)',
    narration: [
      { speaker: 'narrator', text: 'Now you know the story behind the picture.' },
    ],
    hotspots: [],
    primaryAction: {
      label: 'Explore Again',
      targetScene: 'opening-photograph',
    },
    transition: { type: 'fade', duration: 1.0 },
  },
];

/** Find a scene by its ID */
export function getSceneById(id: string): StoryScene | undefined {
  return scenes.find(s => s.id === id);
}

/** Get the index of a scene in the story */
export function getSceneIndex(id: string): number {
  return scenes.findIndex(s => s.id === id);
}

/** Total number of scenes in the vertical slice */
export const TOTAL_SCENES = scenes.length;
