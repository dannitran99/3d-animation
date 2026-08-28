export type TGalleryModel = Readonly<{
  id: string;
  name: string;
  url: string;
}>;

export const GALLERY_MODELS: TGalleryModel[] = [
  {
    id: 'kindmita-animation',
    name: 'kindmita_animation.glb',
    url: new URL('../../assets/3dModel/kindmita_animation.glb', import.meta.url).href
  },
  {
    id: 'star_sparrow_modular_spaceship',
    name: 'star_sparrow_modular_spaceship.glb',
    url: new URL('../../assets/3dModel/star_sparrow_modular_spaceship.glb', import.meta.url).href
  }
];
