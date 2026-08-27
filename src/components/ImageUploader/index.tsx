import './index.scss';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ThreeDimension } from '@/features/ThreeDimension';
import { isPathOf3dModel } from '@/lib/utils';

export const ImageUploader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePickFile = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const shouldShow3dModel = fileName ? isPathOf3dModel(fileName) : false;

  return (
    <div className="image-uploader">
      <input ref={inputRef} type="file" hidden onChange={handleFileChange} />

      <div className="image-uploader__preview">
        {previewUrl ? (
          shouldShow3dModel ? (
            <ThreeDimension src={previewUrl} />
          ) : (
            <img src={previewUrl} alt={fileName ?? 'preview'} />
          )
        ) : (
          <span className="image-uploader__placeholder">No image selected</span>
        )}
      </div>

      <div className="image-uploader__actions">
        <Button type="button" variant="default" onClick={handlePickFile}>
          Upload Image
        </Button>
        {previewUrl && (
          <Button type="button" variant="outline" onClick={handleClear}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
