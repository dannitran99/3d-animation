import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

type TAxesHelperProps = Readonly<{
  size: number;
}>;

export function AxesHelper({ size }: TAxesHelperProps) {
  const { isAxesHelperOn } = useThreeDToolsContext();
  return <>{isAxesHelperOn && <axesHelper args={[size]} />}</>;
}
