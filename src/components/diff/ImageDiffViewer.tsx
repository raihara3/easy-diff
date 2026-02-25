import React from 'react';

interface ImageDiffViewerProps {
  image1Url: string | null;
  image2Url: string | null;
  diffImageUrl: string | null;
  analysisTime: number | null;
  mismatchPercentage: number | null;
}

const ImageDiffViewer: React.FC<ImageDiffViewerProps> = ({
  image1Url,
  image2Url,
  diffImageUrl,
  analysisTime,
  mismatchPercentage,
}) => {
  const hasImages = image1Url && image2Url;

  return (
    <div className="w-full rounded-lg border bg-white p-4 dark:bg-gray-900 dark:border-gray-700">
      {hasImages && (
        <div className="mb-4 text-center">
          {analysisTime !== null && mismatchPercentage !== null && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Images compared in {analysisTime}ms. Mismatch: <span className="font-semibold">{mismatchPercentage}%</span>
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Original</h3>
          {image1Url ? (
            <img src={image1Url} alt="Original" className="max-w-full h-auto rounded-md shadow-md border dark:border-gray-700" />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              No image selected
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Diff</h3>
          {diffImageUrl ? (
            <img src={diffImageUrl} alt="Diff" className="max-w-full h-auto rounded-md shadow-md border dark:border-gray-700" />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              {hasImages ? 'Comparing...' : 'Awaiting images'}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">New</h3>
          {image2Url ? (
            <img src={image2Url} alt="New" className="max-w-full h-auto rounded-md shadow-md border dark:border-gray-700" />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              No image selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDiffViewer;
