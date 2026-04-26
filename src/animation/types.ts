import type { FlowmeConfig } from '../types.js';

export type FlowRendererKind = 'svg' | 'houdini';

export interface FlowRenderer {
  /** Mount the renderer into the given container and draw initial flows. */
  init(container: HTMLElement, config: FlowmeConfig): Promise<void>;
  /** Push a new sensor value for the named flow. Safe to call frequently. */
  updateFlow(flowId: string, value: number): void;
  /** Tear down DOM, observers, timers. */
  destroy(): void;
}
