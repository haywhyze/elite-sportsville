import Footer from '@/components/footer';
import Contact from '@/components/contact';
import Features from '@/components/features';
// import Header from '@/components/header';
import Hero from '@/components/hero';
import Pricing from '@/components/pricing';
import Testimonials from '@/components/testimonials';


// export const runtime = 'edge';
// export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className='relative flex min-h-screen flex-col'>
      {/* <Header /> */}
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact /> 
      <Footer />
    </main>
  );
}
