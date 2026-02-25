interface TextInputPanelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInputPanel({
  label,
  value,
  onChange,
  placeholder,
}: TextInputPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="text-sm font-medium text-on-surface-variant">
        {label}
      </label>
      <textarea
        className="h-48 resize-y rounded-lg border border-outline bg-surface-container p-3 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
}
