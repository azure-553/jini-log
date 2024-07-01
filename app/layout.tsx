import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import '@/config/globals.css';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { ThemeProvider } from '@/layouts/theme/Provider';

export const metadata: Metadata = {
  title: 'Jini-log ✨',
  description: '끊임없는 성장을 추구합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full scroll-my-20 scroll-smooth"
      suppressContentEditableWarning
    >
      <body className="font-pretendard flex min-h-screen flex-col">
        <ThemeProvider>
          <Header />
          <main className="mt-[64px] flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
