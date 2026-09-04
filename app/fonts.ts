import localFont from 'next/font/local';
import { Syne, Homemade_Apple } from 'next/font/google';

export const ppRightSerif = localFont({
  src: [
    { path: './fonts/PPRightSerif-Light.otf', weight: '400', style: 'normal' },
    { path: './fonts/PPRightSerif-LightItalic.otf', weight: '400', style: 'italic' },
  ],
  variable: '--ppRightSerif',
  display: 'swap',
});

export const syne = Syne({
  subsets: ['latin'],
  weight: '500',
  variable: '--syne',
  display: 'swap',
});

export const homemadeApple = Homemade_Apple({
  subsets: ['latin'],
  weight: '400',
  variable: '--homemadeApple',
  display: 'swap',
});
