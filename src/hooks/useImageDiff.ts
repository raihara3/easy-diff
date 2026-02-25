import { useState, useEffect } from 'react';
import resemble from 'resemblejs';

interface ImageDiffResult {
  diffImageUrl: string | null;
  analysisTime: number | null;
  mismatchPercentage: number | null;
}

export const useImageDiff = (image1: File | null, image2: File | null) => {
  const [image1Url, setImage1Url] = useState<string | null>(null);
  const [image2Url, setImage2Url] = useState<string | null>(null);
  const [diffResult, setDiffResult] = useState<ImageDiffResult>({
    diffImageUrl: null,
    analysisTime: null,
    mismatchPercentage: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ensure resemble is loaded
    if (typeof resemble === 'undefined') {
      console.error('resemble.js is not loaded');
      return;
    }
    
    if (!image1 || !image2) {
      // Reset states if files are cleared
      setImage1Url(null);
      setImage2Url(null);
      setDiffResult({ diffImageUrl: null, analysisTime: null, mismatchPercentage: null });
      return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();
    let url1: string, url2: string;

    const compareImages = () => {
      if (!url1 || !url2) return;

      setIsLoading(true);

      resemble.outputSettings({
        errorColor: {
          red: 255,
          green: 165,
          blue: 0,
        },
        errorType: 'flat',
        transparency: 0.4,
      });

      resemble(url1)
        .compareTo(url2)
        .onComplete(data => {
          // For some reason, the type definition is wrong.
          // @ts-ignore
          setDiffResult({
            // @ts-ignore
            diffImageUrl: data.getImageDataUrl(),
            analysisTime: data.analysisTime,
            mismatchPercentage: data.misMatchPercentage,
          });
          setIsLoading(false);
        });
    };

    reader1.onload = (e) => {
      url1 = e.target?.result as string;
      setImage1Url(url1);
      if (url2) compareImages();
    };

    reader2.onload = (e) => {
      url2 = e.target?.result as string;
      setImage2Url(url2);
      if (url1) compareImages();
    };

    reader1.readAsDataURL(image1);
    reader2.readAsDataURL(image2);

  }, [image1, image2]);

  return { image1Url, image2Url, diffResult, isLoading };
};
