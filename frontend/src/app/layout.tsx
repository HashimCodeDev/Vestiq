import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/NavBar';
import Header from './components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Wearzy',
  description: 'AI Wardrobe Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="flex flex-col min-h-screen">
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
