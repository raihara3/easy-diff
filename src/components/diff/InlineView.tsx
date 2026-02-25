import type { DiffLine as DiffLineType } from "@/lib/diff/types";
import { DiffLine } from "./DiffLine";

interface InlineViewProps {
  lines: DiffLineType[];
}

export function InlineView({ lines }: InlineViewProps) {
  return (
    <div className="overflow-auto rounded-lg border border-outline-variant bg-surface-container">
      {lines.length === 0 ? (
        <div className="p-8 text-center text-on-surface-variant">
          Enter text in both panels to see the diff
        </div>
      ) : (
        lines.map((line, index) => (
          <DiffLine key={index} line={line} />
        ))
      )}
    </div>
  );
}
