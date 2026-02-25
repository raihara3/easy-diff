import React from 'react';

interface ImageInputPanelProps {
  onImage1Change: (file: File) => void;
  onImage2Change: (file: File) => void;
}

const ImageInputPanel: React.FC<ImageInputPanelProps> = ({ onImage1Change, onImage2Change }) => {
  const handleFileChange = (setter: (file: File) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setter(event.target.files[0]);
    }
  };

  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <label htmlFor="file1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Original Image
        </label>
        <input
          id="file1"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange(onImage1Change)}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 dark:hover:file:bg-blue-900/80"
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="file2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Image
        </label>
        <input
          id="file2"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange(onImage2Change)}
          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 dark:hover:file:bg-blue-900/80"
        />
      </div>
    </div>
  );
};

export default ImageInputPanel;
