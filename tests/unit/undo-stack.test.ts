import { describe, it, expect, vi } from 'vitest';

import { UndoStack, type Patch } from '../../src/editor/undo-stack.js';
import type { FlowmeConfig } from '../../src/types.js';

function makeConfig(tag: string): FlowmeConfig {
  return {
    type: 'custom:flowme-card',
    domain: 'energy',
    background: { default: `/local/${tag}.jpg` },
    nodes: [{ id: tag, position: { x: 0, y: 0 } }],
    flows: [],
  };
}

function makePatch(a: FlowmeConfig, b: FlowmeConfig, description: string): Patch {
  return { prev: a, next: b, description };
}

describe('UndoStack', () => {
  it('starts empty', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    expect(stack.canUndo()).toBe(false);
    expect(stack.canRedo()).toBe(false);
    expect(stack.topUndoDescription()).toBeUndefined();
    expect(stack.topRedoDescription()).toBeUndefined();
  });

  it('applies next and records undo on push', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const a = makeConfig('a');
    const b = makeConfig('b');
    stack.push(makePatch(a, b, 'move'));
    expect(apply).toHaveBeenCalledWith(b);
    expect(stack.canUndo()).toBe(true);
    expect(stack.canRedo()).toBe(false);
    expect(stack.topUndoDescription()).toBe('move');
  });

  it('no-ops push when prev === next', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const a = makeConfig('a');
    stack.push(makePatch(a, a, 'noop'));
    expect(apply).not.toHaveBeenCalled();
    expect(stack.canUndo()).toBe(false);
  });

  it('undo re-applies prev and populates redo', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const a = makeConfig('a');
    const b = makeConfig('b');
    stack.push(makePatch(a, b, 'move'));
    apply.mockClear();
    stack.undo();
    expect(apply).toHaveBeenCalledWith(a);
    expect(stack.canUndo()).toBe(false);
    expect(stack.canRedo()).toBe(true);
    expect(stack.topRedoDescription()).toBe('move');
  });

  it('redo re-applies next', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const a = makeConfig('a');
    const b = makeConfig('b');
    stack.push(makePatch(a, b, 'move'));
    stack.undo();
    apply.mockClear();
    stack.redo();
    expect(apply).toHaveBeenCalledWith(b);
    expect(stack.canRedo()).toBe(false);
    expect(stack.canUndo()).toBe(true);
  });

  it('a new push clears the redo stack', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const a = makeConfig('a');
    const b = makeConfig('b');
    const c = makeConfig('c');
    stack.push(makePatch(a, b, 'move1'));
    stack.undo();
    expect(stack.canRedo()).toBe(true);
    stack.push(makePatch(a, c, 'move2'));
    expect(stack.canRedo()).toBe(false);
  });

  it('caps the undo stack at 100 entries', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const configs = Array.from({ length: 120 }, (_, i) => makeConfig(`c${i}`));
    for (let i = 1; i < configs.length; i++) {
      stack.push(makePatch(configs[i - 1]!, configs[i]!, `m${i}`));
    }
    // Undo 100 times should exhaust; the 101st should be a no-op
    apply.mockClear();
    for (let i = 0; i < 100; i++) stack.undo();
    expect(apply).toHaveBeenCalledTimes(100);
    apply.mockClear();
    stack.undo();
    expect(apply).not.toHaveBeenCalled();
  });

  it('undo/redo no-op when nothing to revert', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    stack.undo();
    stack.redo();
    expect(apply).not.toHaveBeenCalled();
  });

  it('clear() drops both stacks and notifies', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const listener = vi.fn();
    stack.subscribe(listener);
    stack.push(makePatch(makeConfig('a'), makeConfig('b'), 'move'));
    listener.mockClear();
    stack.clear();
    expect(stack.canUndo()).toBe(false);
    expect(stack.canRedo()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('subscribe fans out to every listener and unsubscribe removes just one', () => {
    const apply = vi.fn();
    const stack = new UndoStack(apply);
    const l1 = vi.fn();
    const l2 = vi.fn();
    const unsub1 = stack.subscribe(l1);
    stack.subscribe(l2);
    stack.push(makePatch(makeConfig('a'), makeConfig('b'), 'move'));
    expect(l1).toHaveBeenCalledTimes(1);
    expect(l2).toHaveBeenCalledTimes(1);
    unsub1();
    stack.push(makePatch(makeConfig('b'), makeConfig('c'), 'move'));
    expect(l1).toHaveBeenCalledTimes(1);
    expect(l2).toHaveBeenCalledTimes(2);
  });
});
