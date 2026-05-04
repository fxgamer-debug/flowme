import type {
  FlowmeConfig,
  FlowmeDefaults,
  OpacityConfig,
  VisibilityConfig,
  DomainColors,
  NodeConfig,
  NodeEffectConfig,
  FlowConfig,
  FlowAnimationConfig,
  AnimationConfig,
  NodePosition,
  OverlayConfig,
  SpeedCurveOverride,
  ValueGradientConfig,
} from './types.js';
import {
  FLOW_DOMAINS,
  LINE_STYLES,
  ANIMATION_STYLES,
  PARTICLE_SHAPES,
  FLOW_DIRECTIONS,
  PARTICLE_SPACINGS,
} from './types.js';
import { findUnsafeUrls } from './overlays/url-scan.js';
import { t } from './i18n.js';

export class FlowmeConfigError extends Error {
  override name = 'FlowmeConfigError';
}

const ALLOWED_URL_PREFIXES = ['/local/', '/api/', '/hacsfiles/', 'https://', 'http://', 'data:'];

function fail(path: string, reason: string): never {
  throw new FlowmeConfigError(`${path}: ${reason}`);
}

function validatePosition(pos: unknown, path: string): NodePosition {
  if (!pos || typeof pos !== 'object') fail(path, t('validation.mustBeObjectWithXY'));
  const p = pos as Record<string, unknown>;
  const x = p['x'];
  const y = p['y'];
  if (typeof x !== 'number' || !Number.isFinite(x)) fail(`${path}.x`, t('validation.mustBeFiniteNumber'));
  if (typeof y !== 'number' || !Number.isFinite(y)) fail(`${path}.y`, t('validation.mustBeFiniteNumber'));
  const xn = x as number;
  const yn = y as number;
  if (xn < 0 || xn > 100) fail(`${path}.x`, t('validation.percentRange', xn));
  if (yn < 0 || yn > 100) fail(`${path}.y`, t('validation.percentRange', yn));
  return { x: xn, y: yn };
}

function validateUrlScheme(url: unknown, path: string): string {
  if (typeof url !== 'string' || !url.length) fail(path, t('validation.mustBeNonEmptyString'));
  const s = url as string;
  const allowed = ALLOWED_URL_PREFIXES.some((prefix) => s.startsWith(prefix));
  if (!allowed) {
    fail(path, t('validation.urlMustStartWith', ALLOWED_URL_PREFIXES.join(', '), s.slice(0, 40)));
  }
  return s;
}

function validateNode(raw: unknown, idx: number, seenIds: Set<string>): NodeConfig {
  const path = `nodes[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, t('validation.mustBeObject'));
  const n = raw as Record<string, unknown>;
  const id = n['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, t('validation.mustBeNonEmptyId'));
  const idStr = id as string;
  if (seenIds.has(idStr)) fail(`${path}.id`, t('validation.duplicateNodeId', idStr));
  seenIds.add(idStr);
  const position = validatePosition(n['position'], `${path}.position`);

  const node: NodeConfig = { id: idStr, position };
  if (typeof n['entity'] === 'string') node.entity = n['entity'] as string;
  if (typeof n['label'] === 'string') node.label = n['label'] as string;
  if (typeof n['color'] === 'string') node.color = n['color'] as string;
  if (typeof n['size'] === 'number') node.size = n['size'] as number;
  if (typeof n['show_label'] === 'boolean') node.show_label = n['show_label'] as boolean;
  if (typeof n['show_value'] === 'boolean') node.show_value = n['show_value'] as boolean;
  if (n['opacity'] !== undefined) node.opacity = validateOpacityFloat(n['opacity'], `${path}.opacity`);
  if (n['visible'] !== undefined) {
    if (typeof n['visible'] !== 'boolean') fail(`${path}.visible`, t('validation.mustBeBoolean'));
    node.visible = n['visible'] as boolean;
  }
  if (n['node_effect'] !== undefined) {
    const rawFx = n['node_effect'];
    if (rawFx && typeof rawFx === 'object' && (rawFx as Record<string, unknown>)['type'] === 'pulse') {
      console.warn(
        '[FlowMe]',
        `${path}.node_effect:`,
        'type "pulse" is no longer supported; removing node_effect',
      );
    } else {
      node.node_effect = validateNodeEffect(rawFx, `${path}.node_effect`);
    }
  }
  return node;
}

function validateNodeEffect(raw: unknown, path: string): NodeEffectConfig {
  if (!raw || typeof raw !== 'object') fail(path, t('validation.mustBeObject'));
  const o = raw as Record<string, unknown>;
  const typ = o['type'];
  if (typ === 'glow') {
    return {
      type: 'glow',
      ...(typeof o['glow_color'] === 'string' ? { glow_color: o['glow_color'] as string } : {}),
      ...(typeof o['glow_max_radius'] === 'number' ? { glow_max_radius: o['glow_max_radius'] as number } : {}),
      ...(typeof o['glow_min_intensity'] === 'number'
        ? { glow_min_intensity: o['glow_min_intensity'] as number }
        : {}),
      ...(typeof o['peak_value'] === 'number' ? { peak_value: o['peak_value'] as number } : {}),
    };
  }
  if (typ === 'badge') {
    return {
      type: 'badge',
      ...(typeof o['badge_color_on'] === 'string' ? { badge_color_on: o['badge_color_on'] as string } : {}),
      ...(typeof o['badge_color_off'] === 'string' ? { badge_color_off: o['badge_color_off'] as string } : {}),
      ...(o['threshold'] === null ? { threshold: null } : typeof o['threshold'] === 'number' ? { threshold: o['threshold'] as number } : {}),
    };
  }
  if (typ === 'ripple') {
    return {
      type: 'ripple',
      ...(typeof o['ripple_color'] === 'string' ? { ripple_color: o['ripple_color'] as string } : {}),
      ...(typeof o['ripple_duration'] === 'number' ? { ripple_duration: o['ripple_duration'] as number } : {}),
      ...(typeof o['ripple_threshold'] === 'number' ? { ripple_threshold: o['ripple_threshold'] as number } : {}),
    };
  }
  if (typ === 'alert') {
    const cond = o['alert_condition'];
    if (cond !== undefined && cond !== 'above' && cond !== 'below') {
      fail(`${path}.alert_condition`, t('validation.mustBeString'));
    }
    return {
      type: 'alert',
      ...(typeof o['alert_threshold'] === 'number' ? { alert_threshold: o['alert_threshold'] as number } : {}),
      ...(cond === 'above' || cond === 'below' ? { alert_condition: cond } : {}),
      ...(typeof o['alert_color'] === 'string' ? { alert_color: o['alert_color'] as string } : {}),
      ...(typeof o['alert_frequency'] === 'number' ? { alert_frequency: o['alert_frequency'] as number } : {}),
      ...(typeof o['alert_hysteresis'] === 'number' ? { alert_hysteresis: o['alert_hysteresis'] as number } : {}),
    };
  }
  fail(`${path}.type`, t('validation.invalidNodeEffectType'));
}

function validateFlow(
  raw: unknown,
  idx: number,
  seenIds: Set<string>,
  nodeIds: Set<string>,
): FlowConfig {
  const path = `flows[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, t('validation.mustBeObject'));
  const f = raw as Record<string, unknown>;
  const id = f['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, t('validation.mustBeNonEmptyId'));
  const idStr = id as string;
  if (seenIds.has(idStr)) fail(`${path}.id`, t('validation.duplicateFlowId', idStr));
  seenIds.add(idStr);

  const from = f['from_node'];
  if (typeof from !== 'string' || !nodeIds.has(from)) {
    fail(`${path}.from_node`, t('validation.unknownNodeRef', String(from)));
  }
  const to = f['to_node'];
  if (typeof to !== 'string' || !nodeIds.has(to)) {
    fail(`${path}.to_node`, t('validation.unknownNodeRef', String(to)));
  }

  const entity = f['entity'];
  if (typeof entity !== 'string' || !entity.length) {
    fail(`${path}.entity`, t('validation.mustBeNonEmptyEntityId'));
  }

  // waypoints is optional — omit → straight line. When present it must be an
  // array of valid positions.
  const wpRaw = f['waypoints'];
  let waypoints: NodePosition[] = [];
  if (wpRaw !== undefined) {
    if (!Array.isArray(wpRaw)) fail(`${path}.waypoints`, t('validation.waypointsMustBeArray'));
    waypoints = (wpRaw as unknown[]).map((wp, wi) =>
      validatePosition(wp, `${path}.waypoints[${wi}]`),
    );
  }

  const flow: FlowConfig = {
    id: idStr,
    from_node: from as string,
    to_node: to as string,
    entity: entity as string,
    waypoints,
  };

  if (typeof f['domain'] === 'string') {
    if (!FLOW_DOMAINS.includes(f['domain'] as never)) {
      fail(`${path}.domain`, t('validation.mustBeOneOf', FLOW_DOMAINS.join(', ')));
    }
    flow.domain = f['domain'] as FlowConfig['domain'];
  }
  if (typeof f['color'] === 'string') flow.color = f['color'] as string;
  if (typeof f['color_positive'] === 'string') flow.color_positive = f['color_positive'] as string;
  if (typeof f['color_negative'] === 'string') flow.color_negative = f['color_negative'] as string;
  if (typeof f['threshold'] === 'number') flow.threshold = f['threshold'] as number;
  if (typeof f['reverse'] === 'boolean') flow.reverse = f['reverse'] as boolean;
  if (typeof f['speed_multiplier'] === 'number') {
    const sm = f['speed_multiplier'] as number;
    if (sm < 0.1 || sm > 5.0) fail(`${path}.speed_multiplier`, t('validation.speedMultiplierRange'));
    flow.speed_multiplier = sm;
  }
  if (f['opacity'] !== undefined) flow.opacity = validateOpacityFloat(f['opacity'], `${path}.opacity`);
  if (f['visible'] !== undefined) {
    if (typeof f['visible'] !== 'boolean') fail(`${path}.visible`, t('validation.mustBeBoolean'));
    flow.visible = f['visible'] as boolean;
  }
  if (f['line_style'] !== undefined) {
    if (!LINE_STYLES.includes(f['line_style'] as never)) {
      fail(`${path}.line_style`, t('validation.mustBeOneOf', LINE_STYLES.join(', ')));
    }
    flow.line_style = f['line_style'] as FlowConfig['line_style'];
  }
  if (f['speed_curve_override'] !== undefined) {
    flow.speed_curve_override = validateSpeedCurveOverride(
      f['speed_curve_override'],
      `${path}.speed_curve_override`,
    );
  }
  if (f['animation'] !== undefined) {
    flow.animation = validateFlowAnimation(f['animation'], `${path}.animation`);
  }
  if (f['value_gradient'] !== undefined) {
    flow.value_gradient = validateValueGradient(f['value_gradient'], `${path}.value_gradient`);
  }
  return flow;
}

/**
 * Validate the per-flow `speed_curve_override` block (v1.0.6+). Every
 * field is independently optional so users can override only the bits
 * they care about and inherit the rest from the profile / universal
 * defaults. All numeric fields must be finite; `threshold`, `p50` and
 * `peak` must be > 0 (the sigmoid uses log10(v / p50) so zero collapses
 * the curve); `max_duration` and `min_duration` must be ≥ 50 ms; and
 * `min_duration` must be < `max_duration` when both are set.
 */
function validateSpeedCurveOverride(raw: unknown, path: string): SpeedCurveOverride {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail(path, t('validation.mustBeObject'));
  }
  const o = raw as Record<string, unknown>;
  const out: SpeedCurveOverride = {};

  function readPositive(key: keyof SpeedCurveOverride): number | undefined {
    const v = o[key as string];
    if (v === undefined) return undefined;
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) {
      fail(`${path}.${key as string}`, t('validation.positiveFinite'));
    }
    return v as number;
  }
  function readDuration(key: keyof SpeedCurveOverride): number | undefined {
    const v = o[key as string];
    if (v === undefined) return undefined;
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 50) {
      fail(`${path}.${key as string}`, t('validation.durationMin50'));
    }
    return v as number;
  }

  const thresholdVal = readPositive('threshold');
  if (thresholdVal !== undefined) out.threshold = thresholdVal;
  const p50 = readPositive('p50');
  if (p50 !== undefined) out.p50 = p50;
  const peak = readPositive('peak');
  if (peak !== undefined) out.peak = peak;
  const maxD = readDuration('max_duration');
  if (maxD !== undefined) out.max_duration = maxD;
  const minD = readDuration('min_duration');
  if (minD !== undefined) out.min_duration = minD;
  if (o['steepness'] !== undefined) {
    const s = o['steepness'];
    if (typeof s !== 'number' || !Number.isFinite(s) || s <= 0) {
      fail(`${path}.steepness`, t('validation.positiveFinite'));
    }
    out.steepness = s as number;
  }

  if (
    out.max_duration !== undefined &&
    out.min_duration !== undefined &&
    out.min_duration >= out.max_duration
  ) {
    fail(path, t('validation.minLtMaxDuration'));
  }

  // Allowed extra keys check — surface typos rather than silently dropping.
  const allowedKeys = new Set([
    'threshold',
    'p50',
    'peak',
    'max_duration',
    'min_duration',
    'steepness',
  ]);
  for (const key of Object.keys(o)) {
    if (!allowedKeys.has(key)) {
      fail(`${path}.${key}`, t('validation.unknownKey', [...allowedKeys].join(', ')));
    }
  }
  return out;
}

function validatePositiveNumber(val: unknown, path: string): number {
  if (typeof val !== 'number' || !Number.isFinite(val) || val <= 0) {
    fail(path, t('validation.positiveFinite'));
  }
  return val as number;
}

function validateDefaults(raw: unknown): FlowmeDefaults {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('defaults', t('validation.defaultsMustBeObject'));
  }
  const d = raw as Record<string, unknown>;
  const out: FlowmeDefaults = {};
  if (d['node_radius'] !== undefined) out.node_radius = validatePositiveNumber(d['node_radius'], 'defaults.node_radius');
  if (d['burst_trigger_ratio'] !== undefined) {
    const v = validatePositiveNumber(d['burst_trigger_ratio'], 'defaults.burst_trigger_ratio');
    if (v > 1) fail('defaults.burst_trigger_ratio', t('validation.burstTriggerMax1'));
    out.burst_trigger_ratio = v;
  }
  if (d['burst_sustain_ms'] !== undefined) out.burst_sustain_ms = validatePositiveNumber(d['burst_sustain_ms'], 'defaults.burst_sustain_ms');
  if (d['burst_max_particles'] !== undefined) out.burst_max_particles = validatePositiveNumber(d['burst_max_particles'], 'defaults.burst_max_particles');
  if (d['dot_radius'] !== undefined) out.dot_radius = validatePositiveNumber(d['dot_radius'], 'defaults.dot_radius');
  if (d['line_width'] !== undefined) out.line_width = validatePositiveNumber(d['line_width'], 'defaults.line_width');
  return out;
}

function validateOpacityFloat(val: unknown, path: string): number {
  if (typeof val !== 'number' || !Number.isFinite(val) || val < 0 || val > 1) {
    fail(path, t('validation.opacity01'));
  }
  return val as number;
}

function validateOpacity(raw: unknown): OpacityConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('opacity', t('validation.mustBeObject'));
  }
  const o = raw as Record<string, unknown>;
  const out: OpacityConfig = {};
  for (const key of ['background', 'darken', 'nodes', 'flows', 'dots', 'glow', 'labels', 'values', 'overlays'] as const) {
    if (o[key] !== undefined) out[key] = validateOpacityFloat(o[key], `opacity.${key}`);
  }
  return out;
}

function validateFlowAnimation(raw: unknown, path: string): FlowAnimationConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail(path, t('validation.mustBeObject'));
  }
  const o = raw as Record<string, unknown>;
  const out: FlowAnimationConfig = {};

  if (o['animation_style'] !== undefined) {
    let st = o['animation_style'];
    if (st === 'pulse' || st === 'spark') {
      console.warn(
        `[flowme] ${path}.animation_style '${String(st)}' was removed in v1.23.6 — using 'dots'`,
      );
      st = 'dots';
    }
    if (!ANIMATION_STYLES.includes(st as never)) {
      fail(`${path}.animation_style`, t('validation.mustBeOneOf', ANIMATION_STYLES.join(', ')));
    }
    out.animation_style = st as FlowAnimationConfig['animation_style'];
  }
  if (o['particle_shape'] !== undefined) {
    if (!PARTICLE_SHAPES.includes(o['particle_shape'] as never)) {
      fail(`${path}.particle_shape`, t('validation.mustBeOneOf', PARTICLE_SHAPES.join(', ')));
    }
    out.particle_shape = o['particle_shape'] as FlowAnimationConfig['particle_shape'];
  }
  if (o['direction'] !== undefined) {
    if (!FLOW_DIRECTIONS.includes(o['direction'] as never)) {
      fail(`${path}.direction`, t('validation.mustBeOneOf', FLOW_DIRECTIONS.join(', ')));
    }
    out.direction = o['direction'] as FlowAnimationConfig['direction'];
  }
  if (o['particle_spacing'] !== undefined) {
    if (!PARTICLE_SPACINGS.includes(o['particle_spacing'] as never)) {
      fail(`${path}.particle_spacing`, t('validation.mustBeOneOf', PARTICLE_SPACINGS.join(', ')));
    }
    out.particle_spacing = o['particle_spacing'] as FlowAnimationConfig['particle_spacing'];
  }
  if (o['custom_svg_path'] !== undefined) {
    if (typeof o['custom_svg_path'] !== 'string') {
      fail(`${path}.custom_svg_path`, t('validation.mustBeSvgPathString'));
    }
    if ((o['custom_svg_path'] as string).length === 0) {
      console.warn(`[flowme] ${path}.custom_svg_path is empty — will fall back to circle`);
    }
    out.custom_svg_path = o['custom_svg_path'] as string;
  }
  const readPositiveFloat = (key: string, max?: number): number | undefined => {
    const v = o[key];
    if (v === undefined) return undefined;
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) {
      fail(`${path}.${key}`, t('validation.positiveFinite'));
    }
    if (max !== undefined && (v as number) > max) {
      fail(`${path}.${key}`, t('validation.mustBeAtMost', max));
    }
    return v as number;
  };
  const readBool = (key: string): boolean | undefined => {
    const v = o[key];
    if (v === undefined) return undefined;
    if (typeof v !== 'boolean') fail(`${path}.${key}`, t('validation.mustBeBoolean'));
    return v as boolean;
  };

  const ps = readPositiveFloat('particle_size');
  if (ps !== undefined) out.particle_size = ps;
  if (o['particle_count'] !== undefined) {
    const v = o['particle_count'];
    if (typeof v !== 'number' || !Number.isFinite(v) || (v as number) < 1 || !Number.isInteger(v)) {
      fail(`${path}.particle_count`, t('validation.particleCountInt'));
    }
    out.particle_count = v as number;
  }
  // glow_intensity allows 0 (to disable glow) as a special case
  if (o['glow_intensity'] !== undefined) {
    const v = o['glow_intensity'];
    if (typeof v !== 'number' || !Number.isFinite(v) || (v as number) < 0) {
      fail(`${path}.glow_intensity`, t('validation.glowNonNegative'));
    }
    out.glow_intensity = v as number;
  }
  const sh = readBool('shimmer');
  if (sh !== undefined) out.shimmer = sh;
  const fl = readBool('flicker');
  if (fl !== undefined) out.flicker = fl;
  const tl = readPositiveFloat('trail_length');
  if (tl !== undefined) out.trail_length = tl;
  if (o['dash_gap'] !== undefined) {
    const v = o['dash_gap'];
    if (typeof v !== 'number' || !Number.isFinite(v) || (v as number) < 0 || (v as number) > 10) {
      fail(`${path}.dash_gap`, t('validation.dashGapRange'));
    }
    out.dash_gap = v as number;
  }
  // spacing sub-config fields
  const cs = readPositiveFloat('cluster_size');
  if (cs !== undefined) out.cluster_size = Math.max(1, Math.round(cs));
  const cg = readPositiveFloat('cluster_gap');
  if (cg !== undefined) out.cluster_gap = cg;
  const pf = readPositiveFloat('pulse_frequency', 20);
  if (pf !== undefined) out.pulse_frequency = pf;
  if (o['pulse_ratio'] !== undefined) {
    const v = o['pulse_ratio'];
    if (typeof v !== 'number' || !Number.isFinite(v) || (v as number) <= 0 || (v as number) >= 1) {
      fail(`${path}.pulse_ratio`, t('validation.pulseRatioRange'));
    }
    out.pulse_ratio = v as number;
  }
  const wf = readPositiveFloat('wave_frequency', 20);
  if (wf !== undefined) out.wave_frequency = wf;
  const wa = readPositiveFloat('wave_amplitude');
  if (wa !== undefined) out.wave_amplitude = wa;
  return out;
}

/** Validate a CSS hex colour string e.g. "#FF4500" or "#f00". */
function validateHexColor(val: unknown, path: string): string {
  if (typeof val !== 'string' || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val)) {
    fail(path, t('validation.mustBeHexColor'));
  }
  return val as string;
}

function validateValueGradient(raw: unknown, path: string): ValueGradientConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail(path, t('validation.mustBeObject'));
  }
  const o = raw as Record<string, unknown>;
  if (typeof o['entity'] !== 'string') {
    fail(`${path}.entity`, t('validation.mustBeStringEntityId'));
  }
  if (typeof o['low_value'] !== 'number' || !Number.isFinite(o['low_value'])) {
    fail(`${path}.low_value`, t('validation.finiteNumber'));
  }
  if (typeof o['high_value'] !== 'number' || !Number.isFinite(o['high_value'])) {
    fail(`${path}.high_value`, t('validation.finiteNumber'));
  }
  if ((o['low_value'] as number) >= (o['high_value'] as number)) {
    // warn rather than error — still usable, colour will just be clamped to one end
    console.warn(`[flowme] ${path}: low_value should be less than high_value`);
  }
  const out: ValueGradientConfig = {
    entity: o['entity'] as string,
    low_value: o['low_value'] as number,
    high_value: o['high_value'] as number,
    low_color: validateHexColor(o['low_color'], `${path}.low_color`),
    high_color: validateHexColor(o['high_color'], `${path}.high_color`),
  };
  if (o['mode'] !== undefined) {
    if (!['flow', 'line', 'both'].includes(o['mode'] as string)) {
      fail(`${path}.mode`, t('validation.gradientMode'));
    }
    out.mode = o['mode'] as ValueGradientConfig['mode'];
  }
  return out;
}

function validateAnimationConfig(raw: unknown): AnimationConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('animation', t('validation.animationRootMustBeObject'));
  }
  const o = raw as Record<string, unknown>;
  const out: AnimationConfig = {};
  if (o['fps'] !== undefined) {
    const v = o['fps'];
    if (typeof v !== 'number' || !Number.isFinite(v) || (v as number) < 1 || (v as number) > 120) {
      fail('animation.fps', t('validation.fpsRange'));
    }
    out.fps = v as number;
  }
  if (o['smooth_speed'] !== undefined) {
    if (typeof o['smooth_speed'] !== 'boolean') fail('animation.smooth_speed', t('validation.mustBeBoolean'));
    out.smooth_speed = o['smooth_speed'] as boolean;
  }
  return out;
}

function validateVisibility(raw: unknown): VisibilityConfig {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('visibility', t('validation.visibilityRootMustBeObject'));
  }
  const v = raw as Record<string, unknown>;
  const out: VisibilityConfig = {};
  for (const key of ['nodes', 'lines', 'dots', 'labels', 'values', 'overlays'] as const) {
    if (v[key] !== undefined) {
      if (typeof v[key] !== 'boolean') fail(`visibility.${key}`, t('validation.mustBeBoolean'));
      out[key] = v[key] as boolean;
    }
  }
  return out;
}

function validateDomainColors(raw: unknown): DomainColors {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    fail('domain_colors', t('validation.domainColorsRootMustBeObject'));
  }
  const d = raw as Record<string, unknown>;
  const out: DomainColors = {};
  for (const key of ['solar', 'grid', 'battery', 'load'] as const) {
    if (d[key] !== undefined) {
      if (typeof d[key] !== 'string') fail(`domain_colors.${key}`, t('validation.stringColourValue'));
      out[key] = d[key] as string;
    }
  }
  return out;
}

export function validateConfig(raw: unknown): FlowmeConfig {
  if (!raw || typeof raw !== 'object') throw new FlowmeConfigError(t('validation.configMustBeObject'));
  const c = raw as Record<string, unknown>;

  if (c['type'] !== 'custom:flowme-card') {
    fail('type', t('validation.typeMustBeFlowme', String(c['type'])));
  }
  if (!FLOW_DOMAINS.includes(c['domain'] as never)) {
    fail('domain', t('validation.mustBeOneOf', FLOW_DOMAINS.join(', ')));
  }

  // background and background.default are both optional. An omitted default
  // renders a neutral placeholder so the card works out of the box without
  // requiring the user to copy any image into /config/www first.
  const bgRaw = c['background'];
  if (bgRaw !== undefined && (bgRaw === null || typeof bgRaw !== 'object')) {
    fail('background', t('validation.backgroundWhenProvided'));
  }
  const bg = (bgRaw ?? {}) as Record<string, unknown>;
  const defaultImg =
    bg['default'] === undefined || bg['default'] === ''
      ? ''
      : validateUrlScheme(bg['default'], 'background.default');

  const background: FlowmeConfig['background'] = { default: defaultImg };
  if (bg['weather_entity'] !== undefined) {
    if (typeof bg['weather_entity'] !== 'string') {
      fail('background.weather_entity', t('validation.mustBeStringEntityId'));
    }
    background.weather_entity = bg['weather_entity'] as string;
  }
  if (bg['weather_states'] !== undefined) {
    if (!bg['weather_states'] || typeof bg['weather_states'] !== 'object') {
      fail('background.weather_states', t('validation.weatherStatesMapping'));
    }
    const entries = Object.entries(bg['weather_states'] as Record<string, unknown>);
    const states: Record<string, string> = {};
    for (const [state, url] of entries) {
      states[state] = validateUrlScheme(url, `background.weather_states.${state}`);
    }
    background.weather_states = states;
  }
  if (bg['sun_entity'] !== undefined) {
    if (typeof bg['sun_entity'] !== 'string') {
      fail('background.sun_entity', t('validation.sunEntityExample'));
    }
    background.sun_entity = bg['sun_entity'] as string;
  }
  if (bg['transition_duration'] !== undefined) {
    if (typeof bg['transition_duration'] !== 'number') {
      fail('background.transition_duration', t('validation.transitionMustBeNumberMs'));
    }
    background.transition_duration = bg['transition_duration'] as number;
  }

  const nodesRaw = c['nodes'];
  if (!Array.isArray(nodesRaw)) fail('nodes', t('validation.nodesMustBeArray'));
  const seenNodeIds = new Set<string>();
  const nodes = (nodesRaw as unknown[]).map((n, i) => validateNode(n, i, seenNodeIds));
  if (nodes.length === 0) fail('nodes', t('validation.atLeastOneNode'));

  const flowsRaw = c['flows'];
  if (!Array.isArray(flowsRaw)) fail('flows', t('validation.flowsMustBeArray'));
  const seenFlowIds = new Set<string>();
  const flows = (flowsRaw as unknown[]).map((f, i) =>
    validateFlow(f, i, seenFlowIds, seenNodeIds),
  );

  const config: FlowmeConfig = {
    type: 'custom:flowme-card',
    domain: c['domain'] as FlowmeConfig['domain'],
    background,
    nodes,
    flows,
  };

  if (c['aspect_ratio'] !== undefined) {
    if (typeof c['aspect_ratio'] !== 'string' || !/^\d+:\d+$/.test(c['aspect_ratio'] as string)) {
      fail('aspect_ratio', t('validation.aspectRatioRegex'));
    }
    config.aspect_ratio = c['aspect_ratio'] as string;
  }
  if (c['fullscreen'] !== undefined) {
    if (typeof c['fullscreen'] !== 'boolean') fail('fullscreen', t('validation.mustBeBoolean'));
    config.fullscreen = c['fullscreen'] as boolean;
  }
  if (c['edit_mode_password'] !== undefined) {
    if (typeof c['edit_mode_password'] !== 'string') {
      fail('edit_mode_password', t('validation.editPasswordMustBeString'));
    }
    config.edit_mode_password = c['edit_mode_password'] as string;
  }

  if (c['pause_when_hidden'] !== undefined) {
    if (typeof c['pause_when_hidden'] !== 'boolean') {
      fail('pause_when_hidden', t('validation.mustBeBoolean'));
    }
    config.pause_when_hidden = c['pause_when_hidden'] as boolean;
  }

  if (c['overlays'] !== undefined) {
    if (!Array.isArray(c['overlays'])) fail('overlays', t('validation.overlaysMustBeArray'));
    const seenOverlayIds = new Set<string>();
    config.overlays = (c['overlays'] as unknown[]).map((o, i) =>
      validateOverlay(o, i, seenOverlayIds),
    );
  }

  if (c['defaults'] !== undefined) {
    config.defaults = validateDefaults(c['defaults']);
  }

  if (c['domain_colors'] !== undefined) {
    config.domain_colors = validateDomainColors(c['domain_colors']);
  }

  if (c['debug'] !== undefined) {
    if (typeof c['debug'] !== 'boolean') fail('debug', t('validation.mustBeBoolean'));
    config.debug = c['debug'] as boolean;
  }

  if (c['opacity'] !== undefined) {
    config.opacity = validateOpacity(c['opacity']);
  }

  if (c['visibility'] !== undefined) {
    config.visibility = validateVisibility(c['visibility']);
  }

  if (c['animation'] !== undefined) {
    config.animation = validateAnimationConfig(c['animation']);
  }

  return config;
}

function validateOverlay(raw: unknown, idx: number, seenIds: Set<string>): OverlayConfig {
  const path = `overlays[${idx}]`;
  if (!raw || typeof raw !== 'object') fail(path, t('validation.mustBeObject'));
  const o = raw as Record<string, unknown>;

  const type = o['type'];
  const REMOVED_TYPES = ['camera', 'switch', 'sensor', 'button'];
  const isRemovedType = typeof type === 'string' && REMOVED_TYPES.includes(type);

  if (!isRemovedType && type !== 'custom') {
    fail(`${path}.type`, t('validation.overlayTypeMustBeCustom'));
  }

  const id = o['id'];
  if (typeof id !== 'string' || !id.length) fail(`${path}.id`, t('validation.mustBeNonEmptyId'));
  if (seenIds.has(id as string)) fail(`${path}.id`, t('validation.duplicateOverlayId', id as string));
  seenIds.add(id as string);

  const position = validatePosition(o['position'], `${path}.position`);

  // For removed native types: produce a warning overlay instead of crashing
  if (isRemovedType) {
    const warningMsg = t('validation.migrationOverlayWarning', type as string);
    console.warn(`[flowme] ${path}: ${warningMsg}`);
    const overlay: OverlayConfig = {
      id: id as string,
      type: 'custom',
      position,
      card: { type: 'markdown', content: '' },
      _migration_warning: warningMsg,
    };
    if (o['size'] !== undefined) {
      const s = o['size'];
      if (s && typeof s === 'object') {
        const sr = s as Record<string, unknown>;
        const w = sr['width'];
        const h = sr['height'];
        if (typeof w === 'number' && typeof h === 'number') {
          overlay.size = { width: w, height: h };
        }
      }
    }
    return overlay;
  }

  // card: block is required — any valid HA card config object
  const cardRaw = o['card'];
  if (!cardRaw || typeof cardRaw !== 'object' || Array.isArray(cardRaw)) {
    fail(`${path}.card`, t('validation.overlayCardMustBeObject'));
  }
  const unsafe = findUnsafeUrls(cardRaw, `${path}.card`);
  if (unsafe.length) {
    const first = unsafe[0]!;
    fail(first.path, t('validation.unsafeSchemeInCard', first.scheme));
  }
  const card = cardRaw as Record<string, unknown>;

  const overlay: OverlayConfig = {
    id: id as string,
    type: 'custom',
    position,
    card,
  };

  if (o['size'] !== undefined) {
    const s = o['size'];
    if (!s || typeof s !== 'object') fail(`${path}.size`, t('validation.overlaySizeMustBeObject'));
    const sr = s as Record<string, unknown>;
    const w = sr['width'];
    const h = sr['height'];
    if (typeof w !== 'number' || !Number.isFinite(w) || w <= 0 || w > 100) {
      fail(`${path}.size.width`, t('validation.overlayWidthPercent'));
    }
    if (typeof h !== 'number' || !Number.isFinite(h) || h <= 0 || h > 100) {
      fail(`${path}.size.height`, t('validation.overlayHeightPercent'));
    }
    overlay.size = { width: w as number, height: h as number };
  }

  if (o['visible'] !== undefined) {
    if (typeof o['visible'] !== 'boolean') fail(`${path}.visible`, t('validation.mustBeBoolean'));
    overlay.visible = o['visible'] as boolean;
  }

  if (o['opacity'] !== undefined) {
    const op = o['opacity'];
    if (typeof op !== 'number' || !Number.isFinite(op as number) || (op as number) < 0 || (op as number) > 1) {
      fail(`${path}.opacity`, t('validation.overlayOpacity01'));
    }
    overlay.opacity = op as number;
  }

  return overlay;
}
