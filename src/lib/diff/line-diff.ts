import type { DiffLine, DiffResult } from "./types";
import { myers } from "./myers";
import { characterDiff } from "./character-diff";

const CHARACTER_DIFF_MAX_HUNK_LINES = 20;
const LINE_DIFF_MAX_TOTAL_LINES = 10_000;

export function computeDiff(oldText: string, newText: string): DiffResult {
  const oldLines = splitLines(oldText);
  const newLines = splitLines(newText);

  if (oldLines.length + newLines.length > LINE_DIFF_MAX_TOTAL_LINES) {
    return buildFallbackResult(oldLines, newLines);
  }

  const edits = myers(oldLines, newLines);

  const rawLines: { operation: "equal" | "insert" | "delete"; value: string }[] = edits;
  const diffLines = applyCharacterHighlighting(rawLines);

  return {
    lines: diffLines,
    hasChanges: diffLines.some((line) => line.operation !== "equal"),
  };
}

function splitLines(text: string): string[] {
  if (text === "") return [];
  return text.split("\n");
}

function buildFallbackResult(
  oldLines: string[],
  newLines: string[],
): DiffResult {
  const lines: DiffLine[] = [];
  for (let i = 0; i < oldLines.length; i++) {
    lines.push({
      operation: "delete",
      content: oldLines[i],
      oldLineNumber: i + 1,
      newLineNumber: null,
      segments: [{ text: oldLines[i], highlighted: false }],
    });
  }
  for (let i = 0; i < newLines.length; i++) {
    lines.push({
      operation: "insert",
      content: newLines[i],
      oldLineNumber: null,
      newLineNumber: i + 1,
      segments: [{ text: newLines[i], highlighted: false }],
    });
  }
  return { lines, hasChanges: true };
}

function applyCharacterHighlighting(
  edits: { operation: "equal" | "insert" | "delete"; value: string }[],
): DiffLine[] {
  const result: DiffLine[] = [];
  let oldLineNumber = 0;
  let newLineNumber = 0;
  let i = 0;

  while (i < edits.length) {
    const edit = edits[i];

    if (edit.operation === "equal") {
      oldLineNumber++;
      newLineNumber++;
      result.push({
        operation: "equal",
        content: edit.value,
        oldLineNumber,
        newLineNumber,
        segments: [{ text: edit.value, highlighted: false }],
      });
      i++;
      continue;
    }

    const deletedLines: string[] = [];
    const insertedLines: string[] = [];

    while (i < edits.length && edits[i].operation === "delete") {
      deletedLines.push(edits[i].value);
      i++;
    }
    while (i < edits.length && edits[i].operation === "insert") {
      insertedLines.push(edits[i].value);
      i++;
    }

    const shouldHighlightCharacters =
      deletedLines.length > 0 &&
      insertedLines.length > 0 &&
      deletedLines.length + insertedLines.length <= CHARACTER_DIFF_MAX_HUNK_LINES;

    if (shouldHighlightCharacters) {
      const pairCount = Math.min(deletedLines.length, insertedLines.length);

      for (let j = 0; j < pairCount; j++) {
        const { oldSegments, newSegments } = characterDiff(
          deletedLines[j],
          insertedLines[j],
        );
        oldLineNumber++;
        result.push({
          operation: "delete",
          content: deletedLines[j],
          oldLineNumber,
          newLineNumber: null,
          segments: oldSegments,
        });
        newLineNumber++;
        result.push({
          operation: "insert",
          content: insertedLines[j],
          oldLineNumber: null,
          newLineNumber,
          segments: newSegments,
        });
      }

      for (let j = pairCount; j < deletedLines.length; j++) {
        oldLineNumber++;
        result.push({
          operation: "delete",
          content: deletedLines[j],
          oldLineNumber,
          newLineNumber: null,
          segments: [{ text: deletedLines[j], highlighted: false }],
        });
      }

      for (let j = pairCount; j < insertedLines.length; j++) {
        newLineNumber++;
        result.push({
          operation: "insert",
          content: insertedLines[j],
          oldLineNumber: null,
          newLineNumber,
          segments: [{ text: insertedLines[j], highlighted: false }],
        });
      }
    } else {
      for (const line of deletedLines) {
        oldLineNumber++;
        result.push({
          operation: "delete",
          content: line,
          oldLineNumber,
          newLineNumber: null,
          segments: [{ text: line, highlighted: false }],
        });
      }
      for (const line of insertedLines) {
        newLineNumber++;
        result.push({
          operation: "insert",
          content: line,
          oldLineNumber: null,
          newLineNumber,
          segments: [{ text: line, highlighted: false }],
        });
      }
    }
  }

  return result;
}
