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
