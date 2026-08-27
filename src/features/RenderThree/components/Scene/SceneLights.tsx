export const SceneLights = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <directionalLight position={[-5, 5, -5]} intensity={0.5} />
  </>
);
