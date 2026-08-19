import type { Metadata } from 'next';
import { Press_Start_2P, Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { SiteShell } from '@/components/layout/SiteShell';
import { Providers } from '@/components/Providers';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-head',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PIXLApe.COM — Independent Developer & Digital Asset Vault',
  description:
    'Free & Pro digital assets by an independent developer. Icon packs, design tools, APK builds, dev utilities — all virus-scanned and ready to download.',
  keywords:
    'digital assets, icon pack, free downloads, independent developer, design tools, APK, procreate brushes, coreldraw, Next.js, neo-brutalism, pixlape',
  icons: {
    icon: 'public/logo1.svg',
    shortcut: 'public/logo1.svg',
    apple: 'public/logo1.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${pressStart2P.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
