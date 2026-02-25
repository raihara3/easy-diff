"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { InputSection } from "@/components/input/InputSection";
import { DiffViewer } from "@/components/diff/DiffViewer";
import { useDiff } from "@/hooks/useDiff";

export default function Home() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const result = useDiff(oldText, newText);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6">
        <InputSection
          oldText={oldText}
          newText={newText}
          onOldTextChange={setOldText}
          onNewTextChange={setNewText}
        />
        <DiffViewer result={result} />
      </main>
    </div>
  );
}
