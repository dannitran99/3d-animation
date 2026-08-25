import type { ReactNode } from 'react';
import './ModelInspector.scss';

import { clsx } from 'clsx';
import { BackgroundSetting } from './BackgroundSetting';
import { ShadowSetting } from './ShadowSetting';

type TModelInspectorProps = Readonly<{
  isOpened: boolean;
}>;

type TInspectorMainSectionProps = Readonly<{
  title: string;
  flexColumn?: boolean;
  action: ReactNode;
}>;

function InspectorMainSection({ title, flexColumn = false, action }: TInspectorMainSectionProps) {
  return (
    <div
      className={clsx(
        'flex gap-2',
        flexColumn ? 'flex-col items-start' : 'items-center justify-between'
      )}
    >
      <span className="text-xs whitespace-nowrap text-muted-foreground">{title}:</span>
      {action}
    </div>
  );
}

export function ModelInspector({ isOpened }: TModelInspectorProps) {
  return (
    <div
      className={clsx(
        'helper-bar',
        isOpened ? 'helper-bar--state-opened' : 'helper-bar--state-closed'
      )}
    >
      <div className="bg-dark feature-menu custom-scrollbar vstack gap-3">
        <div className="feature">
          <span className="text-muted feature__title">Background</span>
          <InspectorMainSection
            title="Background color"
            flexColumn
            action={<BackgroundSetting />}
          />
        </div>
        <div className="mt-3 feature">
          <span className="text-muted feature__title">Shadow Helper</span>
          <ShadowSetting />
        </div>
        {/* <BoneHelper /> */}
        <div className="mt-3 feature">
          <span className="text-muted feature__title">Lights Helper</span>
          {/* <LightsHelper /> */}
        </div>
        <div className="feature">
          <span className="text-muted feature__title">Bounding Box Helper</span>
          {/* <BoundingBoxHelper /> */}
        </div>
        <div className="feature">
          <span className="text-muted feature__title">Wire Frame Helper</span>
          {/* <WireFrameHelper /> */}
        </div>
      </div>
    </div>
  );
}
