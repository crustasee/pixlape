import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: 'PIXLApe.COM — Independent Developer & Digital Asset Vault',
  description: 'Free & Pro digital assets by an independent developer. Icon packs, design tools, APK builds, dev utilities — all virus-scanned and ready to download.',
  keywords: 'digital assets, icon pack, free downloads, independent developer, design tools, APK, procreate brushes, coreldraw, Next.js, neo-brutalism, pixlape',
  icons: {
    icon: 'public/logopixl.png',
    shortcut: 'public/logopixl.png',
    apple: 'public/logopixl.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
