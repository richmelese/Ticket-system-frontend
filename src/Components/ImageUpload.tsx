
import React, { useState } from 'react';


interface Props {
  label: string;
  image: string | null;
  onChange: (image: string) => void;
  onDelete: () => void;
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<Props> = ({ label, image, onChange, onDelete, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (limit to 300KB)
      if (file.size > 600 * 1024) {
        alert('File size exceeds 600KB limit');
        return;
      }

      // Create file preview (using FileReader)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Trigger the image upload
      onImageUpload(file);

      // Update the image name (could be used for backend data)
      onChange(file.name);
    }
  };

  const handleImageRemove = () => {
    // Remove the uploaded image
    onDelete();
    setPreview(null); // Clear the preview
  };

  return (
    <div className="flex flex-col w-[500px] mt-23">
      <label className="text-gray-600 text-sm mb-2 mt-4">{label}</label>
      <div className="border-dashed border-2 border-purple-500 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center text-center">
        {!image && !preview ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center cursor-pointer text-purple-600 hover:underline text-sm"
            >
              <img src="/images/upload icon.svg" width={52} height={52} alt="Upload Icon" />
              Drag & drop files or <span className="text-blue-500">Browse</span>
            </label>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </>
        ) : (
          <div className="relative">
            <img
              src={preview || image || ''}
              alt="Uploaded Preview"
              className="object-cover rounded-md"
            />
            <button
              onClick={handleImageRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Remove Image"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
