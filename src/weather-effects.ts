/**
 * CSS-only animated weather overlays for the FlowMe card background.
 * Elements are created once per effect; animation is CSS keyframes only.
 */

export const WEATHER_EFFECT_TYPES = [
  'sunny',
  'clear-night',
  'cloudy',
  'partlycloudy',
  'rainy',
  'pouring',
  'snowy',
  'snowy-rainy',
  'windy',
  'windy-variant',
  'fog',
  'hail',
  'lightning',
  'lightning-rainy',
  'exceptional',
] as const;

export type WeatherEffectType = (typeof WEATHER_EFFECT_TYPES)[number];

const TYPE_SET = new Set<string>(WEATHER_EFFECT_TYPES);

export function isWeatherEffectType(state: string): state is WeatherEffectType {
  return TYPE_SET.has(state);
}

export interface WeatherEffect {
  type: WeatherEffectType;
  element: HTMLElement;
  cleanup: () => void;
}

const STYLE_ID = 'flowme-weather-effects-css';

const WX_CSS = `
.flowme-weather-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

/* --- sunny --- */
.flowme-wx-sunny {
  position: relative;
}
.flowme-wx-sunny-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 130% 70% at 50% 0%, rgba(255, 220, 140, 0.45), transparent 60%);
  animation: flowme-wx-sunny-glow-pulse 4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes flowme-wx-sunny-glow-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}
.flowme-wx-sun-ray-arm {
  position: absolute;
  left: 50%;
  top: 0;
  transform-origin: top center;
  pointer-events: none;
}
.flowme-wx-sun-ray {
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(180deg, rgba(255, 220, 100, 0.42), rgba(255, 220, 100, 0.03));
  animation:
    flowme-wx-ray-pulse 4s ease-in-out infinite,
    flowme-wx-ray-sway 10s ease-in-out infinite;
}
@keyframes flowme-wx-ray-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}
@keyframes flowme-wx-ray-sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* --- clear-night stars --- */
.flowme-wx-star {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  animation: flowme-wx-twinkle 2.5s ease-in-out infinite;
}
@keyframes flowme-wx-twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.85; }
}

/* --- clouds --- */
.flowme-wx-cloud {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(8px);
}
.flowme-wx-cloudy .flowme-wx-cloud {
  animation: flowme-wx-cloud-drift 38s linear infinite;
}
.flowme-wx-partlycloudy .flowme-wx-cloud {
  animation: flowme-wx-cloud-drift-fast 23s linear infinite;
}
@keyframes flowme-wx-cloud-drift {
  from { transform: translateX(-35%); }
  to { transform: translateX(135%); }
}
@keyframes flowme-wx-cloud-drift-fast {
  from { transform: translateX(-40%); }
  to { transform: translateX(140%); }
}

/* --- rain --- */
.flowme-wx-rain-layer {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  overflow: hidden;
  pointer-events: none;
}
.flowme-wx-rain-streak {
  position: absolute;
  width: 2px;
  height: 18%;
  top: -5%;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.42));
  transform: rotate(15deg);
  transform-origin: center top;
  animation: flowme-wx-rain-fall 0.72s linear infinite;
}
@keyframes flowme-wx-rain-fall {
  from {
    transform: translateY(-15vh) rotate(15deg);
  }
  to {
    transform: translateY(135vh) rotate(15deg);
  }
}

.flowme-wx-pouring .flowme-wx-rain-streak {
  width: 3px;
  animation-duration: 0.36s;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.58));
}

/* --- snow --- */
.flowme-wx-snowflake {
  position: absolute;
  top: -5%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  animation: flowme-wx-snow-fall 4.2s ease-in-out infinite;
}
@keyframes flowme-wx-snow-fall {
  0% { transform: translate(0, 0); }
  25% { transform: translate(8px, 28vh); }
  50% { transform: translate(-6px, 56vh); }
  75% { transform: translate(10px, 84vh); }
  100% { transform: translate(-4px, 110vh); }
}

/* --- windy --- */
.flowme-wx-wind-line {
  position: absolute;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  animation: flowme-wx-wind-sweep 3.2s linear infinite;
}
.flowme-wx-windy-variant .flowme-wx-wind-line {
  background: rgba(255, 255, 255, 0.25);
  animation-duration: 2.1s;
}
@keyframes flowme-wx-wind-sweep {
  from { transform: translateX(-100%); opacity: 0.1; }
  30% { opacity: 0.2; }
  to { transform: translateX(120%); opacity: 0.1; }
}

/* --- fog --- */
.flowme-wx-fog-layer {
  position: absolute;
  inset: -10%;
  background: radial-gradient(ellipse at 30% 40%, rgba(255, 255, 255, 0.12), transparent 55%),
    radial-gradient(ellipse at 70% 60%, rgba(240, 240, 245, 0.14), transparent 50%);
  animation: flowme-wx-fog-drift 60s linear infinite;
}
@supports (backdrop-filter: blur(2px)) {
  .flowme-wx-fog-layer {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
}
@keyframes flowme-wx-fog-drift {
  from { transform: translateX(-4%); }
  to { transform: translateX(4%); }
}

/* --- hail --- */
.flowme-wx-hail-stone {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.78);
  top: -4%;
  animation: flowme-wx-hail-fall 0.52s linear infinite;
}
@keyframes flowme-wx-hail-fall {
  to { transform: translateY(110vh); }
}

/* --- lightning --- */
.flowme-wx-lightning-flash {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  animation: flowme-wx-lightning 7s ease-in-out infinite;
}
@keyframes flowme-wx-lightning {
  0%, 84%, 86%, 100% { opacity: 0; background: rgba(255, 255, 255, 0); }
  85% { opacity: 0.38; background: rgba(255, 255, 255, 0.35); }
  85.08% { opacity: 0; }
}

/* --- exceptional --- */
.flowme-wx-exceptional-glow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 28px rgba(255, 107, 0, 0.45);
  animation: flowme-wx-exc-pulse 2s ease-in-out infinite;
}
@keyframes flowme-wx-exc-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@media (prefers-reduced-motion: reduce) {
  .flowme-weather-effect,
  .flowme-weather-effect * {
    animation: none !important;
    transition: none !important;
  }
}
`;

const injected = new WeakSet<ShadowRoot>();

function injectStylesIntoShadow(container: HTMLElement): void {
  const host = container.getRootNode();
  if (!(host instanceof ShadowRoot)) return;
  if (injected.has(host)) return;
  injected.add(host);
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = WX_CSS;
  host.appendChild(style);
}

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function buildSunny(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-sunny';
  const glow = document.createElement('div');
  glow.className = 'flowme-wx-sunny-glow';
  wrap.appendChild(glow);

  const rayCount = Math.floor(rnd(4, 7));
  for (let i = 0; i < rayCount; i++) {
    const angle = rnd(-30, 30);
    const topW = rnd(20, 40);
    const botW = rnd(200, 400);
    const hPct = rnd(40, 60);

    const arm = document.createElement('div');
    arm.className = 'flowme-wx-sun-ray-arm';
    arm.style.height = `${hPct}%`;
    arm.style.width = `${botW}px`;
    arm.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    const ray = document.createElement('div');
    ray.className = 'flowme-wx-sun-ray';
    ray.style.width = '100%';
    ray.style.height = '100%';
    ray.style.clipPath = `polygon(calc(50% - ${topW / 2}px) 0, calc(50% + ${topW / 2}px) 0, calc(50% + ${botW / 2}px) 100%, calc(50% - ${botW / 2}px) 100%)`;

    const pulseDur = rnd(3, 5);
    const swayDur = rnd(8, 12);
    ray.style.animationDuration = `${pulseDur}s, ${swayDur}s`;
    ray.style.animationDelay = `${rnd(0, 1.5)}s, ${rnd(0, 2)}s`;

    arm.appendChild(ray);
    wrap.appendChild(arm);
  }
  return wrap;
}

function buildClearNight(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-clear-night';
  const n = Math.floor(rnd(80, 121));
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-star';
    s.style.left = `${rnd(2, 98)}%`;
    s.style.top = `${rnd(4, 88)}%`;
    s.style.animationDelay = `${rnd(0, 4)}s`;
    s.style.animationDuration = `${rnd(2, 6)}s`;
    wrap.appendChild(s);
  }
  return wrap;
}

function buildCloudy(partly: boolean): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = `flowme-weather-effect flowme-wx-cloudy${partly ? ' flowme-wx-partlycloudy' : ''}`;
  const count = partly ? 2 : 3;
  const sizeMul = partly ? 0.85 : 1;
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'flowme-wx-cloud';
    const w = rnd(28, 42) * sizeMul;
    const h = rnd(12, 18) * sizeMul;
    c.style.width = `${w}%`;
    c.style.height = `${h}%`;
    c.style.top = `${rnd(8, 35)}%`;
    c.style.left = `${rnd(-20, 40)}%`;
    c.style.animationDelay = `${rnd(0, 12)}s`;
    wrap.appendChild(c);
  }
  return wrap;
}

function buildRain(pouring: boolean): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = pouring ? 'flowme-weather-effect flowme-wx-pouring' : 'flowme-weather-effect flowme-wx-rainy';
  const layer = document.createElement('div');
  layer.className = 'flowme-wx-rain-layer';
  const count = pouring ? 88 : 56;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-rain-streak';
    s.style.left = `${rnd(0, 100)}%`;
    s.style.animationDelay = `${rnd(0, 1)}s`;
    if (!pouring) {
      s.style.opacity = String(rnd(0.3, 0.4));
    } else {
      s.style.opacity = String(rnd(0.5, 0.6));
    }
    layer.appendChild(s);
  }
  wrap.appendChild(layer);
  return wrap;
}

function buildSnowy(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-snowy';
  const count = Math.floor(rnd(80, 101));
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-snowflake';
    const large = Math.random() < 0.45;
    const r = large ? rnd(6, 8) : rnd(2, 4);
    s.style.width = `${r}px`;
    s.style.height = `${r}px`;
    s.style.left = `${rnd(0, 100)}%`;
    if (large) {
      s.style.opacity = String(rnd(0.5, 0.7));
      s.style.animationDuration = `${rnd(4, 6)}s`;
    } else {
      s.style.opacity = String(rnd(0.7, 0.9));
      s.style.animationDuration = `${rnd(2, 3)}s`;
    }
    s.style.animationDelay = `${rnd(0, 4)}s`;
    wrap.appendChild(s);
  }
  return wrap;
}

function buildSnowyRainy(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-snowy-rainy';
  const rainLayer = document.createElement('div');
  rainLayer.className = 'flowme-wx-rain-layer';
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-rain-streak';
    s.style.left = `${rnd(0, 100)}%`;
    s.style.animationDelay = `${rnd(0, 0.8)}s`;
    s.style.animationDuration = `${rnd(0.55, 0.75)}s`;
    s.style.opacity = '0.38';
    rainLayer.appendChild(s);
  }
  wrap.appendChild(rainLayer);

  const snowCount = Math.floor(rnd(40, 51));
  for (let i = 0; i < snowCount; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-snowflake';
    const large = Math.random() < 0.45;
    const r = large ? rnd(6, 8) : rnd(2, 4);
    s.style.width = `${r}px`;
    s.style.height = `${r}px`;
    s.style.left = `${rnd(0, 100)}%`;
    if (large) {
      s.style.opacity = String(rnd(0.5, 0.7));
      s.style.animationDuration = `${rnd(4, 6)}s`;
    } else {
      s.style.opacity = String(rnd(0.7, 0.9));
      s.style.animationDuration = `${rnd(2, 3)}s`;
    }
    s.style.animationDelay = `${rnd(0, 2)}s`;
    wrap.appendChild(s);
  }
  return wrap;
}

function buildWindy(variant: boolean): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = variant
    ? 'flowme-weather-effect flowme-wx-windy-variant'
    : 'flowme-weather-effect flowme-wx-windy';
  const count = variant ? 23 : 12;
  for (let i = 0; i < count; i++) {
    const l = document.createElement('div');
    l.className = 'flowme-wx-wind-line';
    l.style.top = `${rnd(10, 90)}%`;
    l.style.width = `${rnd(14, 40)}%`;
    l.style.left = `${rnd(-30, 10)}%`;
    l.style.animationDelay = `${rnd(0, 3)}s`;
    l.style.animationDuration = `${rnd(2.4, 3.8)}s`;
    if (!variant) l.style.opacity = String(rnd(0.1, 0.2));
    wrap.appendChild(l);
  }
  return wrap;
}

function buildFog(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-fog';
  const layer = document.createElement('div');
  layer.className = 'flowme-wx-fog-layer';
  layer.style.opacity = String(rnd(0.15, 0.25));
  wrap.appendChild(layer);
  return wrap;
}

function buildHail(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-hail';
  const count = 46;
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'flowme-wx-hail-stone';
    h.style.left = `${rnd(0, 100)}%`;
    h.style.animationDelay = `${rnd(0, 0.5)}s`;
    h.style.animationDuration = `${rnd(0.42, 0.58)}s`;
    h.style.opacity = String(rnd(0.7, 0.8));
    wrap.appendChild(h);
  }
  return wrap;
}

function buildLightning(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-lightning';
  const flash = document.createElement('div');
  flash.className = 'flowme-wx-lightning-flash';
  wrap.appendChild(flash);
  return wrap;
}

function buildLightningRainy(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-lightning-rainy';
  const rainHost = document.createElement('div');
  rainHost.className = 'flowme-wx-rain-layer';
  for (let i = 0; i < 56; i++) {
    const s = document.createElement('div');
    s.className = 'flowme-wx-rain-streak';
    s.style.left = `${rnd(0, 100)}%`;
    s.style.animationDelay = `${rnd(0, 1)}s`;
    s.style.opacity = String(rnd(0.3, 0.4));
    rainHost.appendChild(s);
  }
  const flash = document.createElement('div');
  flash.className = 'flowme-wx-lightning-flash';
  flash.style.position = 'absolute';
  flash.style.inset = '0';
  wrap.appendChild(rainHost);
  wrap.appendChild(flash);
  return wrap;
}

function buildExceptional(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'flowme-weather-effect flowme-wx-exceptional';
  const g = document.createElement('div');
  g.className = 'flowme-wx-exceptional-glow';
  wrap.appendChild(g);
  return wrap;
}

function buildEffect(type: WeatherEffectType): HTMLElement {
  switch (type) {
    case 'sunny':
      return buildSunny();
    case 'clear-night':
      return buildClearNight();
    case 'cloudy':
      return buildCloudy(false);
    case 'partlycloudy':
      return buildCloudy(true);
    case 'rainy':
      return buildRain(false);
    case 'pouring':
      return buildRain(true);
    case 'snowy':
      return buildSnowy();
    case 'snowy-rainy':
      return buildSnowyRainy();
    case 'windy':
      return buildWindy(false);
    case 'windy-variant':
      return buildWindy(true);
    case 'fog':
      return buildFog();
    case 'hail':
      return buildHail();
    case 'lightning':
      return buildLightning();
    case 'lightning-rainy':
      return buildLightningRainy();
    case 'exceptional':
      return buildExceptional();
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

export function createWeatherEffect(type: WeatherEffectType, container: HTMLElement): WeatherEffect {
  injectStylesIntoShadow(container);
  container.replaceChildren();
  const element = buildEffect(type);
  container.appendChild(element);

  return {
    type,
    element,
    cleanup: () => {
      element.remove();
    },
  };
}

export function destroyWeatherEffect(effect: WeatherEffect | undefined): void {
  if (!effect) return;
  effect.cleanup();
}
