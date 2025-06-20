import Navbar from '@/components/common/NavBar';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">{children}</div>
      <Toaster richColors />
      <Navbar />
    </>
  );
}
