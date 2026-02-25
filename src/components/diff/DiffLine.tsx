import type { DiffLine as DiffLineType } from "@/lib/diff/types";

interface DiffLineProps {
  line: DiffLineType;
  showOldLineNumber?: boolean;
  showNewLineNumber?: boolean;
}

const operationStyles = {
  equal: {
    background: "",
    text: "text-on-surface",
    gutter: "text-on-surface-variant/50",
    prefix: " ",
    highlight: "",
  },
  delete: {
    background: "bg-diff-removed-bg",
    text: "text-diff-removed-text",
    gutter: "text-diff-removed-text/60",
    prefix: "-",
    highlight: "bg-diff-removed-highlight",
  },
  insert: {
    background: "bg-diff-added-bg",
    text: "text-diff-added-text",
    gutter: "text-diff-added-text/60",
    prefix: "+",
    highlight: "bg-diff-added-highlight",
  },
} as const;

export function DiffLine({
  line,
  showOldLineNumber = true,
  showNewLineNumber = true,
}: DiffLineProps) {
  const style = operationStyles[line.operation];

  return (
    <div className={`flex font-mono text-sm ${style.background}`}>
      {showOldLineNumber && (
        <span
          className={`w-12 shrink-0 select-none px-2 text-right ${style.gutter}`}
        >
          {line.oldLineNumber ?? ""}
        </span>
      )}
      {showNewLineNumber && (
        <span
          className={`w-12 shrink-0 select-none px-2 text-right ${style.gutter}`}
        >
          {line.newLineNumber ?? ""}
        </span>
      )}
      <span className={`w-6 shrink-0 select-none text-center ${style.text}`}>
        {style.prefix}
      </span>
      <span className={`min-w-0 flex-1 whitespace-pre-wrap break-all px-2 ${style.text}`}>
        {line.segments.map((segment, index) => (
          <span
            key={index}
            className={segment.highlighted ? style.highlight : ""}
          >
            {segment.text}
          </span>
        ))}
        {line.content === "" && (
          <span className="text-on-surface-variant/30">{"\u00A0"}</span>
        )}
      </span>
    </div>
  );
}
