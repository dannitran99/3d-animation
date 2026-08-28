import { type ThreeElements } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import {
  Box3,
  BufferGeometry,
  DoubleSide,
  Group,
  Line,
  type Material,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from 'three';

import { Primitive } from './Primitive';

function createLinearLine(
  p1: Vector3,
  p2: Vector3,
  material: Material
): Line<BufferGeometry, Material> {
  const points: Vector3[] = [];
  points.push(p1);
  points.push(p1);
  points.push(p2);
  const geometry = new BufferGeometry().setFromPoints(points);
  return new Line(geometry, material);
}

function createBoundingBox(mesh: Mesh): Group {
  const boundingBox = new Box3();
  boundingBox.copy(mesh.geometry.boundingBox as Box3);
  mesh.updateMatrixWorld(true);
  boundingBox.applyMatrix4(mesh.matrixWorld);

  const min = boundingBox.min;
  const max = boundingBox.max;
  const boundingBoxLengths = new Vector3(
    Math.abs(min.x - max.x),
    Math.abs(min.y - max.y),
    Math.abs(min.z - max.z)
  );
  const p0 = min;
  const p1 = new Vector3(min.x + boundingBoxLengths.x, min.y, min.z);
  const p2 = new Vector3(min.x, min.y + boundingBoxLengths.y, min.z);
  const p3 = new Vector3(min.x + boundingBoxLengths.x, min.y + boundingBoxLengths.y, min.z);
  const p4 = new Vector3(min.x, min.y, min.z + boundingBoxLengths.z);
  const p5 = new Vector3(min.x + boundingBoxLengths.x, min.y, min.z + boundingBoxLengths.z);
  const p6 = new Vector3(min.x, min.y + boundingBoxLengths.y, min.z + boundingBoxLengths.z);
  const p7 = max;

  const lineMaterial = new MeshBasicMaterial({ side: DoubleSide, color: 'green' });

  // Front Face

  const L0 = createLinearLine(p0, p1, lineMaterial);
  const L1 = createLinearLine(p0, p2, lineMaterial);
  const L2 = createLinearLine(p2, p3, lineMaterial);
  const L3 = createLinearLine(p1, p3, lineMaterial);

  // Connection between faces

  const L4 = createLinearLine(p0, p4, lineMaterial);
  const L5 = createLinearLine(p1, p5, lineMaterial);
  const L6 = createLinearLine(p2, p6, lineMaterial);
  const L7 = createLinearLine(p3, p7, lineMaterial);

  // Back face

  const L8 = createLinearLine(p4, p5, lineMaterial);
  const L9 = createLinearLine(p4, p6, lineMaterial);
  const L10 = createLinearLine(p6, p7, lineMaterial);
  const L11 = createLinearLine(p5, p7, lineMaterial);

  // Diagonal line

  const L12 = createLinearLine(min, max, lineMaterial);

  const lineGroup = new Group();

  lineGroup.add(L0, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12);

  return lineGroup;
}

type TModelBoundingBoxHelper = Readonly<
  {
    isOn: boolean;
    meshes: Array<Mesh>;
    scale?: Vector3;
    position?: Vector3;
  } & ThreeElements['group']
>;

export function ModelBoundingBoxHelper({ isOn, meshes, scale, position }: TModelBoundingBoxHelper) {
  const [boxGroup, setBoxGroup] = useState<Array<Group>>([]);

  useEffect(() => {
    meshes.forEach((mesh) => {
      setBoxGroup((prev) => [...prev, createBoundingBox(mesh)]);
    });
  }, [meshes]);

  return (
    <>
      {isOn &&
        boxGroup.map((box) => (
          <Primitive key={box.id} object={box} scale={scale} position={position} />
        ))}
    </>
  );
}
