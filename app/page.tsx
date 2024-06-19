import Footer from '@/components/footer';
import Contact from '@/components/contact';
import Features from '@/components/features';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Pricing from '@/components/pricing';
import Testimonials from '@/components/testimonials';
import { useMedia } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
// import Link from 'next/link'
// import { Suspense } from 'react'
// import Table from '@/components/table'
// import TablePlaceholder from '@/components/table-placeholder'
// import ExpandingArrow from '@/components/expanding-arrow'

// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

export default function Home() {
  // check if on mobile
  // const isMobile = useMedia('(max-width: 640px)')
  // const isTablet = useMedia('(max-width: 768px)')
  // const isDesktop = useMedia('(min-width: 1024px)')
  return (
    <main className='relative flex min-h-screen flex-col'>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact /> 
      <Footer />
    </main>
  );
}
