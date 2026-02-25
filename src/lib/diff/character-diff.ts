import type { CharacterSegment, DiffOperation } from "./types";
import { myers } from "./myers";

const CHARACTER_DIFF_MAX_LENGTH = 5000;

export function characterDiff(
  oldText: string,
  newText: string,
): { oldSegments: CharacterSegment[]; newSegments: CharacterSegment[] } {
  if (
    oldText.length + newText.length > CHARACTER_DIFF_MAX_LENGTH
  ) {
    return {
      oldSegments: [{ text: oldText, highlighted: false }],
      newSegments: [{ text: newText, highlighted: false }],
    };
  }

  const oldChars = Array.from(oldText);
  const newChars = Array.from(newText);
  const edits = myers(oldChars, newChars);

  const oldSegments = buildSegments(edits, "delete");
  const newSegments = buildSegments(edits, "insert");

  return { oldSegments, newSegments };
}

function buildSegments(
  edits: { operation: DiffOperation; value: string }[],
  targetOperation: "delete" | "insert",
): CharacterSegment[] {
  const segments: CharacterSegment[] = [];
  let currentText = "";
  let currentHighlighted = false;

  for (const edit of edits) {
    if (edit.operation === "equal") {
      appendToSegments(false);
      currentText += edit.value;
      currentHighlighted = false;
    } else if (edit.operation === targetOperation) {
      appendToSegments(true);
      currentText += edit.value;
      currentHighlighted = true;
    }
  }

  if (currentText) {
    segments.push({ text: currentText, highlighted: currentHighlighted });
  }

  return segments;

  function appendToSegments(nextHighlighted: boolean) {
    if (currentText && currentHighlighted !== nextHighlighted) {
      segments.push({ text: currentText, highlighted: currentHighlighted });
      currentText = "";
    }
  }
}
