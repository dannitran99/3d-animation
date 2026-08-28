import './index.scss';

import { useRef, useState } from 'react';

import { ImageUploader } from '@/components/ImageUploader';
import { GALLERY_MODELS } from '@/constants';
import type { TGalleryModel } from '@/types';

export const HomePage: React.FC = () => {
  const objectUrlRef = useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const revokeCurrentObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const handleFileSelect = (file: File) => {
    revokeCurrentObjectUrl();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreviewUrl(url);
    setFileName(file.name);
    setSelectedModelId(null);
  };

  const handleSelectGalleryModel = (model: TGalleryModel) => {
    revokeCurrentObjectUrl();
    setPreviewUrl(model.url);
    setFileName(model.name);
    setSelectedModelId(model.id);
  };

  const handleClear = () => {
    revokeCurrentObjectUrl();
    setPreviewUrl(null);
    setFileName(null);
    setSelectedModelId(null);
  };

  return (
    <div className="home-page">
      <ImageUploader
        previewUrl={previewUrl}
        fileName={fileName}
        onFileSelect={handleFileSelect}
        onClear={handleClear}
      />

      <div className="home-page__gallery">
        <span className="home-page__gallery-title">3D Models</span>
        <div className="home-page__gallery-list">
          {GALLERY_MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              className={
                'home-page__gallery-item' +
                (selectedModelId === model.id ? ' home-page__gallery-item--active' : '')
              }
              onClick={() => handleSelectGalleryModel(model)}
            >
              <span className="home-page__gallery-item-name">{model.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
