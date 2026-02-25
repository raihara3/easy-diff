"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import { InputSection } from "@/components/input/InputSection";
import { DiffViewer } from "@/components/diff/DiffViewer";
import { useDiff } from "@/hooks/useDiff";

type InputMode = 'text' | 'image';

const ImageDiffSection = dynamic(
  () => import('@/components/diff/ImageDiffSection').then(mod => mod.ImageDiffSection),
  { ssr: false, loading: () => <div className="w-full rounded-lg border bg-white p-4 dark:bg-gray-900 dark:border-gray-700"><div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500">Loading Image Diff...</div></div> }
);

export default function Home() {
  // State for text diff
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const textDiffResult = useDiff(oldText, newText);

  // State for image diff
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  // Shared state
  const [mode, setMode] = useState<InputMode>('text');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6">
        <InputSection
          mode={mode}
          onModeChange={setMode}
          oldText={oldText}
          newText={newText}
          onOldTextChange={setOldText}
          onNewTextChange={setNewText}
          onImage1Change={setImage1}
          onImage2Change={setImage2}
        />
        {mode === 'text' ? (
          <DiffViewer result={textDiffResult} />
        ) : (
          <ImageDiffSection image1={image1} image2={image2} />
        )}
      </main>
    </div>
  );
}
