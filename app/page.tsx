"use client"

import { useState } from 'react';
import Footer from '@/compositions/footer';
import Contact from '@/compositions/contact';
import Features from '@/compositions/features';
// import Header from '@/compositions/header';
import Hero from '@/compositions/hero';
import Pricing from '@/compositions/pricing';
import Testimonials from '@/compositions/testimonials';


// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  return (
    <main className='relative flex min-h-screen flex-col'>
      {/* <Header /> */}
      <Hero setBookingModalOpen={setBookingModalOpen} />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
