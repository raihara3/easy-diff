import type { DiffEdit, DiffOperation } from "./types";

export function myers<T>(
  oldSequence: T[],
  newSequence: T[],
  equals: (a: T, b: T) => boolean = (a, b) => a === b,
): DiffEdit<T>[] {
  const n = oldSequence.length;
  const m = newSequence.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) {
    return newSequence.map((value) => ({ operation: "insert" as const, value }));
  }
  if (m === 0) {
    return oldSequence.map((value) => ({ operation: "delete" as const, value }));
  }

  const max = n + m;
  const size = 2 * max + 1;
  const v = new Array<number>(size);
  v[max + 1] = 0;

  const trace: number[][] = [];

  for (let d = 0; d <= max; d++) {
    const snapshot = v.slice();
    trace.push(snapshot);

    for (let k = -d; k <= d; k += 2) {
      const index = k + max;
      let x: number;

      if (k === -d || (k !== d && v[index - 1] < v[index + 1])) {
        x = v[index + 1];
      } else {
        x = v[index - 1] + 1;
      }

      let y = x - k;

      while (x < n && y < m && equals(oldSequence[x], newSequence[y])) {
        x++;
        y++;
      }

      v[index] = x;

      if (x >= n && y >= m) {
        return backtrack(trace, oldSequence, newSequence, max);
      }
    }
  }

  return backtrack(trace, oldSequence, newSequence, max);
}

function backtrack<T>(
  trace: number[][],
  oldSequence: T[],
  newSequence: T[],
): DiffEdit<T>[];
function backtrack<T>(
  trace: number[][],
  oldSequence: T[],
  newSequence: T[],
  offset: number,
): DiffEdit<T>[];
function backtrack<T>(
  trace: number[][],
  oldSequence: T[],
  newSequence: T[],
  offset?: number,
): DiffEdit<T>[] {
  const max = offset ?? oldSequence.length + newSequence.length;
  const edits: DiffEdit<T>[] = [];

  let x = oldSequence.length;
  let y = newSequence.length;

  for (let d = trace.length - 1; d > 0; d--) {
    const v = trace[d];
    const k = x - y;
    const index = k + max;

    let previousK: number;
    if (k === -d || (k !== d && v[index - 1] < v[index + 1])) {
      previousK = k + 1;
    } else {
      previousK = k - 1;
    }

    const previousIndex = previousK + max;
    let previousX = v[previousIndex];
    let previousY = previousX - previousK;

    while (x > previousX && y > previousY) {
      x--;
      y--;
      edits.push({ operation: "equal", value: oldSequence[x] });
    }

    if (d > 0) {
      if (x === previousX) {
        edits.push({ operation: "insert", value: newSequence[y - 1] });
        y--;
      } else {
        edits.push({ operation: "delete", value: oldSequence[x - 1] });
        x--;
      }
    }
  }

  while (x > 0 && y > 0) {
    x--;
    y--;
    edits.push({ operation: "equal", value: oldSequence[x] });
  }

  edits.reverse();
  return edits;
}
