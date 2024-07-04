"use client"

import { useState, useEffect } from 'react';
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
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      const heroBottom =
        (heroElement?.offsetTop ?? 0) + (heroElement?.offsetHeight ?? 0);

      if (window.scrollY > heroBottom) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className='relative flex min-h-screen flex-col'>
      {/* <Header /> */}
      <button
        id='bookNowButton'
        onClick={() => setBookingModalOpen(true)}
        className={`${
          isFixed
            ? 'fixed bottom-20 right-5 scale-1'
            : 'absolute top-1/2 right-10 transform -translate-y-1/2 scale-0'
        } rounded-md bg-bright-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bright-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple transition-all duration-300 z-50`}
      >
        Book Now
      </button>
      <BookingModal isOpen={bookingModalOpen} setIsOpen={setBookingModalOpen} />
      <Hero setBookingModalOpen={setBookingModalOpen} />
      <Features />
      <Pricing setBookingModalOpen={setBookingModalOpen} />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
