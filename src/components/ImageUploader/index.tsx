import './index.scss';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { ModelInspector } from '@/features/ModelInspector';
import { isPathOf3dModel } from '@/lib/utils';

type TImageUploaderProps = Readonly<{
  previewUrl: string | null;
  fileName: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}>;

export const ImageUploader: React.FC<TImageUploaderProps> = ({
  previewUrl,
  fileName,
  onFileSelect,
  onClear
}: TImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePickFile = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileSelect(file);
  };

  const handleClear = () => {
    onClear();
    if (inputRef.current) inputRef.current.value = '';
  };

  const shouldShow3dModel = fileName ? isPathOf3dModel(fileName) : false;

  return (
    <div className="image-uploader">
      <input ref={inputRef} type="file" hidden onChange={handleFileChange} />

      <div className="image-uploader__preview">
        {previewUrl ? (
          shouldShow3dModel ? (
            <ModelInspector src={previewUrl} />
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
