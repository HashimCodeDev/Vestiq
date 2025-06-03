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
      <div className="flex flex-col h-[85vh] px-4">{children}</div>
      <Navbar />
    </>
  );
}
