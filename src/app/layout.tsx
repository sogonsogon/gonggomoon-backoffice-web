import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';
import QueryProvider from '@/shared/provider/QueryProvider';
import { Toaster } from '@/shared/components/ui/sonner';

const pretendard = localFont({
  src: '../shared/assets/fonts/PretendardVariable.woff2',
  display: 'block',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '공고문 관리 시스템',
  description: '공고문 관리 시스템입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${pretendard.className}`}>
      <QueryProvider>
        <body>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </QueryProvider>
    </html>
  );
}
