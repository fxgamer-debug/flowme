import type { FlowmeConfig } from '../types.js';

export interface Patch {
  prev: FlowmeConfig;
  next: FlowmeConfig;
  description: string;
}

const MAX_DEPTH = 100;

/**
 * Simple command pattern around whole-config swaps. Each action produces a
 * Patch (prev + next config snapshots) and push() applies next while
 * remembering prev. undo() reverts by swapping back. Per spec: on every
 * drag, push exactly ONE patch on pointer-up — not one per move event.
 */
export class UndoStack {
  private undoStack: Patch[] = [];
  private redoStack: Patch[] = [];
  private listeners = new Set<() => void>();

  constructor(private readonly apply: (config: FlowmeConfig) => void) {}

  push(patch: Patch): void {
    if (patch.prev === patch.next) return;
    this.apply(patch.next);
    this.undoStack.push(patch);
    while (this.undoStack.length > MAX_DEPTH) this.undoStack.shift();
    this.redoStack = [];
    this.notify();
  }

  undo(): void {
    const patch = this.undoStack.pop();
    if (!patch) return;
    this.apply(patch.prev);
    this.redoStack.push(patch);
    this.notify();
  }

  redo(): void {
    const patch = this.redoStack.pop();
    if (!patch) return;
    this.apply(patch.next);
    this.undoStack.push(patch);
    this.notify();
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  topUndoDescription(): string | undefined {
    return this.undoStack[this.undoStack.length - 1]?.description;
  }

  topRedoDescription(): string | undefined {
    return this.redoStack[this.redoStack.length - 1]?.description;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) listener();
  }
}
