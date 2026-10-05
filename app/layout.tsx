import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Raj Sigdel | UX/UI Designer',
  description: 'Designing extraordinary digital experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
      <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,700;6..96,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}