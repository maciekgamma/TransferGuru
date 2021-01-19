import Image from 'next/image';
import { NavBar, Connector } from '@/components';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <div className="divide-y divide-gray-100">
      <Connector />
    </div>
  );
}

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
    </>
  );
}

Home.layoutProps = {
  meta: {
    title: 'Home',
  },
  Layout: HomeLayout,
};
