import { TextInputPanel } from "./TextInputPanel";

interface InputSectionProps {
  oldText: string;
  newText: string;
  onOldTextChange: (value: string) => void;
  onNewTextChange: (value: string) => void;
}

export function InputSection({
  oldText,
  newText,
  onOldTextChange,
  onNewTextChange,
}: InputSectionProps) {
  return (
    <div className="flex gap-4">
      <TextInputPanel
        label="Original"
        value={oldText}
        onChange={onOldTextChange}
        placeholder="Paste original text..."
      />
      <TextInputPanel
        label="Modified"
        value={newText}
        onChange={onNewTextChange}
        placeholder="Paste modified text..."
      />
    </div>
  );
}
