import { useThreeDToolsContext } from '../../providers/ThreeDToolsProvider';

export function BackgroundModel() {
  const { backgroundColor } = useThreeDToolsContext();

  return <color attach="background" args={[backgroundColor.hexCode]} />;
}
