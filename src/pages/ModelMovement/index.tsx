import { RenderThree } from '@/features/RenderThree';
import { ROBOT_NODE_NAME } from '@/features/RenderThree/constants';

export const ModelMovement: React.FC = () => {
  return (
    <div>
      <RenderThree trackedNodeName={ROBOT_NODE_NAME} showPerformanceStats />
    </div>
  );
};
