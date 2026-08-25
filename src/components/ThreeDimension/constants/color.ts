import { Color } from 'three';

import type { TColorPicker } from '../type';

export const WIRE_FRAME_COLOR_PICKER: Array<TColorPicker> = [
  {
    value: 'black',
    hexCode: '#000000'
  },
  {
    value: 'yellow',
    hexCode: '#ffff00'
  },
  {
    value: 'red',
    hexCode: '#ff0000'
  },
  {
    value: 'blue',
    hexCode: '#0000ff'
  },
  {
    value: 'green',
    hexCode: '#008000'
  },
  { value: 'purple', hexCode: '#ff00ff' }
];

export const FRAME_BACKGROUND_COLOR_PICKER: Array<TColorPicker> = [
  // light
  {
    value: 'gray',
    hexCode: '#f2f2f2'
  },
  {
    value: 'yellow',
    hexCode: '#ffffe6'
  },
  {
    value: 'red',
    hexCode: '#ffe6e6'
  },
  {
    value: 'blue',
    hexCode: '#e6e6ff'
  },
  {
    value: 'green',
    hexCode: '#e6ffe6'
  },
  { value: 'purple', hexCode: '#ffe6ff' },
  // dark
  {
    value: 'dark gray',
    hexCode: '#262626'
  },
  {
    value: 'dark yellow',
    hexCode: '#4d4d00'
  },
  {
    value: 'dark red',
    hexCode: '#4d0000'
  },
  {
    value: 'dark blue',
    hexCode: '#00004d'
  },
  {
    value: 'dark green',
    hexCode: '#004d00'
  },
  { value: 'dark purple', hexCode: '#4d004d' }
];

export const DIRECTIONAL_LIGHT_COLOR: Color = new Color(0xffffff);
export const SPOT_LIGHT_COLOR: Color = new Color(0xffffe6);
export const GROUND_SHADOW_PLANE_COLOR: Color = new Color(0xffffff);
export const CONTACT_SHADOW_COLOR: Color = new Color(0x191919);
