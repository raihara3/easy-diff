"use client";

import { useCallback, useMemo, useRef } from "react";
import type { DiffLine as DiffLineType } from "@/lib/diff/types";
import { DiffLine } from "./DiffLine";

interface SideBySideViewProps {
  lines: DiffLineType[];
}

interface AlignedPair {
  left: DiffLineType | null;
  right: DiffLineType | null;
}

function alignLines(lines: DiffLineType[]): AlignedPair[] {
  const pairs: AlignedPair[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.operation === "equal") {
      pairs.push({ left: line, right: line });
      i++;
      continue;
    }

    const deletedLines: DiffLineType[] = [];
    const insertedLines: DiffLineType[] = [];

    while (i < lines.length && lines[i].operation === "delete") {
      deletedLines.push(lines[i]);
      i++;
    }
    while (i < lines.length && lines[i].operation === "insert") {
      insertedLines.push(lines[i]);
      i++;
    }

    const maxLength = Math.max(deletedLines.length, insertedLines.length);
    for (let j = 0; j < maxLength; j++) {
      pairs.push({
        left: j < deletedLines.length ? deletedLines[j] : null,
        right: j < insertedLines.length ? insertedLines[j] : null,
      });
    }
  }

  return pairs;
}

const phantomLine: DiffLineType = {
  operation: "equal",
  content: "",
  oldLineNumber: null,
  newLineNumber: null,
  segments: [{ text: "", highlighted: false }],
};

export function SideBySideView({ lines }: SideBySideViewProps) {
  const leftReference = useRef<HTMLDivElement>(null);
  const rightReference = useRef<HTMLDivElement>(null);
  const scrollingReference = useRef<"left" | "right" | null>(null);

  const handleScroll = useCallback((source: "left" | "right") => {
    if (scrollingReference.current && scrollingReference.current !== source) {
      return;
    }

    scrollingReference.current = source;
    const sourceElement =
      source === "left" ? leftReference.current : rightReference.current;
    const targetElement =
      source === "left" ? rightReference.current : leftReference.current;

    if (sourceElement && targetElement) {
      targetElement.scrollTop = sourceElement.scrollTop;
      targetElement.scrollLeft = sourceElement.scrollLeft;
    }

    requestAnimationFrame(() => {
      scrollingReference.current = null;
    });
  }, []);

  const pairs = useMemo(() => alignLines(lines), [lines]);

  if (lines.length === 0) {
    return (
      <div className="overflow-auto rounded-lg border border-outline-variant bg-surface-container p-8 text-center text-on-surface-variant">
        Enter text in both panels to see the diff
      </div>
    );
  }

  return (
    <div className="flex gap-0.5">
      <div
        ref={leftReference}
        className="flex-1 overflow-auto rounded-lg border border-outline-variant bg-surface-container"
        onScroll={() => handleScroll("left")}
      >
        {pairs.map((pair, index) => (
          <DiffLine
            key={index}
            line={pair.left ?? phantomLine}
            showOldLineNumber
            showNewLineNumber={false}
          />
        ))}
      </div>
      <div
        ref={rightReference}
        className="flex-1 overflow-auto rounded-lg border border-outline-variant bg-surface-container"
        onScroll={() => handleScroll("right")}
      >
        {pairs.map((pair, index) => (
          <DiffLine
            key={index}
            line={pair.right ?? phantomLine}
            showOldLineNumber={false}
            showNewLineNumber
          />
        ))}
      </div>
    </div>
  );
}
