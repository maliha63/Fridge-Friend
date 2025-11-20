
import React, { useState, useCallback, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  error: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, error }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-white">What's in your fridge?</h2>
        <p className="mt-2 text-lg text-gray-400">Snap a photo and let AI be your chef.</p>
      </div>

      {error && <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-6" role="alert">{error}</div>}
      
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-2xl h-80 border-4 border-dashed border-gray-600 rounded-2xl flex items-center justify-center text-gray-400 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 cursor-pointer bg-gray-800/50"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {preview ? (
          <img src={preview} alt="Fridge preview" className="object-cover w-full h-full rounded-xl" />
        ) : (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Click or drag an image here</p>
            <p className="text-sm">PNG, JPG, WEBP accepted</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
