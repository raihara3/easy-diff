"use client";

import { useImageDiff } from "@/hooks/useImageDiff";
import ImageDiffViewer from "@/components/diff/ImageDiffViewer";

interface ImageDiffSectionProps {
  image1: File | null;
  image2: File | null;
}

export const ImageDiffSection = ({ image1, image2 }: ImageDiffSectionProps) => {
  const { image1Url, image2Url, diffResult } = useImageDiff(image1, image2);

  return (
    <ImageDiffViewer
      image1Url={image1Url}
      image2Url={image2Url}
      diffImageUrl={diffResult.diffImageUrl}
      analysisTime={diffResult.analysisTime}
      mismatchPercentage={diffResult.mismatchPercentage}
    />
  );
};
