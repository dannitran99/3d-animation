import { type ClassValue,clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ACCEPT_3D_FILES } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const threeDFileRegex = new RegExp(
  ACCEPT_3D_FILES.map((item) => `.${item.toLowerCase()}$`).join('|'),
  'i'
);

export const isPathOf3dModel = (path: string) => {
  if (!path) return false;

  return threeDFileRegex.test(path);
};
