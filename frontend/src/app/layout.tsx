import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
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

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
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
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        <Header />
        <div className="flex flex-col min-h-screen px-4">{children}</div>
        <Navbar />
        <div className="h-16" /> {/* Spacer for fixed navbar */}
      </body>
    </html>
  );
}
