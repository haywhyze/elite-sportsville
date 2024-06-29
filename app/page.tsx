"use client"

import { useState } from 'react';
import Footer from '@/components/compositions/footer';
import Contact from '@/components/compositions/contact';
import Features from '@/components/compositions/features';
// import Header from '@/compositions/header';
import Hero from '@/components/compositions/hero';
import Pricing from '@/components/compositions/pricing';
import Testimonials from '@/components/compositions/testimonials';
import BookingModal from '@/components/compositions/booking-modal';


// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  return (
    <main className='relative flex min-h-screen flex-col'>
      {/* <Header /> */}
      <BookingModal isOpen={bookingModalOpen} setIsOpen={setBookingModalOpen} />
      <Hero setBookingModalOpen={setBookingModalOpen} />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
