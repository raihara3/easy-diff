import { useEffect, useRef, useState } from "react";
import type { DiffResult } from "@/lib/diff/types";
import { computeDiff } from "@/lib/diff/line-diff";

const DEBOUNCE_DELAY = 300;

export function useDiff(oldText: string, newText: string): DiffResult {
  const [result, setResult] = useState<DiffResult>(() =>
    computeDiff(oldText, newText),
  );
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current);
    }

    timeoutReference.current = setTimeout(() => {
      setResult(computeDiff(oldText, newText));
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
      }
    };
  }, [oldText, newText]);

  return result;
}
