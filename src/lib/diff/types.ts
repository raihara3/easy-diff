export type DiffOperation = "equal" | "insert" | "delete";

export interface DiffEdit<T> {
  operation: DiffOperation;
  value: T;
}

export interface CharacterSegment {
  text: string;
  highlighted: boolean;
}

export interface DiffLine {
  operation: DiffOperation;
  content: string;
  oldLineNumber: number | null;
  newLineNumber: number | null;
  segments: CharacterSegment[];
}

export interface DiffResult {
  lines: DiffLine[];
  hasChanges: boolean;
}
