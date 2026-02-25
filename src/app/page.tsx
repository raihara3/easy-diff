"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { InputSection } from "@/components/input/InputSection";
import { DiffViewer } from "@/components/diff/DiffViewer";
import ImageDiffViewer from "@/components/diff/ImageDiffViewer";
import { useDiff } from "@/hooks/useDiff";
import { useImageDiff } from "@/hooks/useImageDiff";

type InputMode = 'text' | 'image';

export default function Home() {
  // State for text diff
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const textDiffResult = useDiff(oldText, newText);

  // State for image diff
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const { image1Url, image2Url, diffResult: imageDiffResult } = useImageDiff(image1, image2);

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
          <ImageDiffViewer
            image1Url={image1Url}
            image2Url={image2Url}
            diffImageUrl={imageDiffResult.diffImageUrl}
            analysisTime={imageDiffResult.analysisTime}
            mismatchPercentage={imageDiffResult.mismatchPercentage}
          />
        )}
      </main>
    </div>
  );
}
