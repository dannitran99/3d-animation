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
    <div className={clsx('controller gap-2', flexColumn ? 'vstack' : 'hstack')}>
      <span className="controller-text text-secondary">{title}:</span>
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
        <div className="feature">
          <span className="text-muted feature__title">Shadow Helper</span>
          <InspectorMainSection title="Model Shadow" action={<ShadowSetting />} />
        </div>
        {/* <BoneHelper /> */}
        <div className="feature">
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
