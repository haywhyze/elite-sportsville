import Image from 'next/image';
import React from 'react';

export default function Hero() {
  return (
    <div className='relative isolate bg-gray-900'>
      <div
        className='absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-bright-yellow to-dark-green opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8'>
        <div className='px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <Image
              className='h-11'
              src='/logo.png'
              alt='Elite Sportsville'
              width={78} // Replace with the actual width of your image
              height={44} // Replace with the actual height of your image
            />
            <h1 className='mt-24 text-4xl font-bold tracking-tight text-white sm:mt-10 sm:text-6xl'>
              Welcome to Elite Sportsville
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              Join us at Elite Sportsville for premier five-a-side football
              matches in Ilorin. Experience top-notch facilities and unmatched
              football excitement.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
              <a
                href='#'
                className='rounded-md bg-bright-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bright-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple'
              >
                Book Now
              </a>
              <a
                href='#features'
                className='text-sm font-semibold leading-6 text-white'
              >
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
        <div className='relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0'>
          <div className='relative w-full h-0 pb-[66.67%] lg:absolute lg:inset-0 lg:h-full lg:pb-0'>
            <Image
              className='object-cover'
              src='/hero.jpg' // Update the path to your image
              alt='Description of the image'
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
