import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line require-jsdoc
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export {};
