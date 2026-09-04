import type { Metadata } from 'next';
import { ppRightSerif, syne, homemadeApple } from './fonts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chloe Bond',
  description: 'Senior brand & marketing designer, ten years across brand, campaigns and web.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ppRightSerif.variable} ${syne.variable} ${homemadeApple.variable}`}>
      <body>
        <div style={{ containerType: 'inline-size' }}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
