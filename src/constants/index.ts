import type { TGalleryModel, TWebGPUDemo } from '@/types';

export const ACCEPT_3D_FILES = [
  'FBX',
  'GLB',
  'OBJ',
  'DXF',
  'STL',
  'DAE',
  '3DS',
  'MAX',
  'ZPRJ',
  'ZTL',
  'SPP',
  'MA',
  'MB',
  'UASSET',
  'GLTF'
] as const;

export const GALLERY_MODELS: TGalleryModel[] = [
  {
    id: 'kindmita-animation',
    name: 'kindmita_animation.glb',
    url: new URL('../assets/3dModel/kindmita_animation.glb', import.meta.url).href
  },
  {
    id: 'star_sparrow_modular_spaceship',
    name: 'star_sparrow_modular_spaceship.glb',
    url: new URL('../assets/3dModel/star_sparrow_modular_spaceship.glb', import.meta.url).href
  }
];

export const WEBGPU_DEMOS: TWebGPUDemo[] = [
  {
    id: 'red-triangle',
    name: 'Red Triangle'
  }
];
