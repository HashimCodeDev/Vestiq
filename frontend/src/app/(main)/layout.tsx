import Header from '../components/Header';
import Navbar from '../components/NavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen px-4">{children}</div>
      <Navbar />
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
}
