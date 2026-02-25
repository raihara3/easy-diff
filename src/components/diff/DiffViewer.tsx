"use client";

import { useState } from "react";
import type { DiffResult } from "@/lib/diff/types";
import { DiffModeToggle, type DiffMode } from "./DiffModeToggle";
import { InlineView } from "./InlineView";
import { SideBySideView } from "./SideBySideView";

interface DiffViewerProps {
  result: DiffResult;
}

export function DiffViewer({ result }: DiffViewerProps) {
  const [mode, setMode] = useState<DiffMode>("split");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-on-surface-variant">
          {result.hasChanges
            ? `${result.lines.filter((l) => l.operation !== "equal").length} changes`
            : "No changes"}
        </span>
        <DiffModeToggle mode={mode} onChange={setMode} />
      </div>
      {mode === "split" ? (
        <SideBySideView lines={result.lines} />
      ) : (
        <InlineView lines={result.lines} />
      )}
    </div>
  );
}
