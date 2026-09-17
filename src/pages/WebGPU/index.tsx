import './index.scss';

import { useState } from 'react';

import WebGPUCanvas from '@/components/WebGPUCanvas';
import { WEBGPU_DEMOS } from '@/constants';
import type { TWebGPUDemo } from '@/types';

export const WebGPU: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(
    WEBGPU_DEMOS[0]?.id ?? null
  );

  const handleSelectDemo = (demo: TWebGPUDemo) => {
    setSelectedDemoId(demo.id);
  };

  return (
    <div className="webgpu-page">
      <div className="webgpu-page__canvas">
        <WebGPUCanvas />
      </div>

      <div className="webgpu-page__gallery">
        <span className="webgpu-page__gallery-title">WebGPU Demos</span>
        <div className="webgpu-page__gallery-list">
          {WEBGPU_DEMOS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              className={
                'webgpu-page__gallery-item' +
                (selectedDemoId === demo.id ? ' webgpu-page__gallery-item--active' : '')
              }
              onClick={() => handleSelectDemo(demo)}
            >
              <span className="webgpu-page__gallery-item-name">{demo.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
