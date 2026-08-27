import clsx from 'clsx';
import { Layers, Rotate3d } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const ActionsPreview: React.FC<{
  isHelperBarOn: boolean;
  toggleHelperBar: () => void;
  isEnableRotate: boolean;
  toggleEnableRotate: () => void;
}> = ({ isHelperBarOn, toggleHelperBar, isEnableRotate, toggleEnableRotate }) => {
  return (
    <div className="preview-actions">
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              className={clsx('preview-button', isHelperBarOn && 'preview-button-state-active')}
              onClick={toggleHelperBar}
            >
              <Layers className="preview-button__icon" />
            </button>
          }
        />
        <TooltipContent>
          <p>ToolBar: {isHelperBarOn ? 'On' : 'Off'}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              className={clsx('preview-button', isEnableRotate && 'preview-button-state-active')}
              onClick={toggleEnableRotate}
            >
              <Rotate3d className="preview-button__icon" />
            </button>
          }
        />
        <TooltipContent>
          <p>Rotate: {isEnableRotate ? 'On' : 'Off'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
