import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Harvard University Art Museums',
  description:
    "This project is a web application for interacting with the Harvard Art Museums' collection, using the Harvard Art Museums API. Built with Next.js, Typescript, and React Query, its primary features include browsing the catalog, searching, applying filters, and viewing individual item details.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
