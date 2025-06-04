import Header from '@/components/Header';
import Navbar from '@/components/NavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 px-4 overflow-y-auto">{children}</div>
      <Navbar />
    </>
  );
}
