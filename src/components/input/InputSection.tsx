'use client';

import { useState } from 'react';
import { TextInputPanel } from "./TextInputPanel";
import ImageInputPanel from './ImageInputPanel';

type InputMode = 'text' | 'image';

interface InputSectionProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
  oldText: string;
  newText: string;
  onOldTextChange: (value: string) => void;
  onNewTextChange: (value: string) => void;
  onImage1Change: (file: File) => void;
  onImage2Change: (file: File) => void;
}

export function InputSection({
  mode,
  onModeChange,
  oldText,
  newText,
  onOldTextChange,
  onNewTextChange,
  onImage1Change,
  onImage2Change,
}: InputSectionProps) {

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <div className="flex rounded-md bg-gray-200 dark:bg-gray-800 p-1">
          <button
            onClick={() => onModeChange('text')}
            className={`px-4 py-1 text-sm font-medium rounded-md transition-colors ${
              mode === 'text'
                ? 'bg-white text-gray-800 shadow dark:bg-gray-600 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Text
          </button>
          <button
            onClick={() => onModeChange('image')}
            className={`px-4 py-1 text-sm font-medium rounded-md transition-colors ${
              mode === 'image'
                ? 'bg-white text-gray-800 shadow dark:bg-gray-600 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Image
          </button>
        </div>
      </div>

      {mode === 'text' ? (
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
      ) : (
        <ImageInputPanel
          onImage1Change={onImage1Change}
          onImage2Change={onImage2Change}
        />
      )}
    </div>
  );
}
