'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ModalHandler from '@/components/ModalHandler';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-[47px]">
        <Header />
        <main className="flex-1 bg-[#F5F6FA] overflow-auto mt-[47px]" style={{ height: 'calc(100vh - 47px)' }}>
          {children}
        </main>
        <Footer />
      </div>
      <ModalHandler />
    </div>
  );
}

