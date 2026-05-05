import type { FlowmeConfig } from '../types.js';

export type FlowRendererKind = 'svg' | 'houdini';

export interface FlowRenderer {
  /** Mount the renderer into the given container and draw initial flows. */
  init(container: HTMLElement, config: FlowmeConfig): Promise<void>;
  /**
   * Replace config without rebuilding the mount (same flow ids). Used by the
   * HA editor preview to avoid a full SVG rebuild on every keystroke.
   */
  applyConfig?(config: FlowmeConfig): void;
  /** Push a new sensor value for the named flow. Safe to call frequently. */
  updateFlow(flowId: string, value: unknown): void;
  /**
   * GRADIENT-1: Set the resolved gradient colour for a flow.
   * Optional — renderers that don't support gradients can omit this method.
   */
  setGradientColor?(flowId: string, color: string | null): void;
  /**
   * Screen reader label for the flow’s animated visualization (SVG group or
   * Houdini layer). Optional — omit when not updating accessibility metadata.
   */
  setFlowAriaLabel?(flowId: string, label: string): void;
  /** Pause flow animations (tab hidden, optional). v2.1+ */
  pause?(): void;
  /** Resume after {@link pause}. v2.1+ */
  resume?(): void;
  /** Tear down DOM, observers, timers. */
  destroy(): void;
}
