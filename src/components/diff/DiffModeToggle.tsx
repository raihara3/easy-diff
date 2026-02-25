export type DiffMode = "split" | "unified";

interface DiffModeToggleProps {
  mode: DiffMode;
  onChange: (mode: DiffMode) => void;
}

export function DiffModeToggle({ mode, onChange }: DiffModeToggleProps) {
  return (
    <div className="flex rounded-lg border border-outline-variant bg-surface-container p-0.5">
      <button
        type="button"
        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
          mode === "split"
            ? "bg-surface-variant text-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
        onClick={() => onChange("split")}
      >
        Split
      </button>
      <button
        type="button"
        className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
          mode === "unified"
            ? "bg-surface-variant text-on-surface"
            : "text-on-surface-variant hover:text-on-surface"
        }`}
        onClick={() => onChange("unified")}
      >
        Unified
      </button>
    </div>
  );
}
