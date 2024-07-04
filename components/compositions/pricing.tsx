import { CheckIcon } from '@heroicons/react/20/solid';

const altTiers = [
  {
    name: 'Discounted Tier',
    id: 'tier-discounted',
    href: '#',
    priceHourly: '8,000 NGN',
    description:
      'Book your game at a time that suits you. Available at any other time outside the specified morning, evening, and night slots.',
    features: [
      'Flexible scheduling for your convenience',
      'Available at any other time',
      'Note: If the booking time falls within the specified morning or evening slots, the respective pricing takes precedence.',
    ],
  },
];

const tiers = [
  {
    name: 'Daytime Football',
    id: 'tier-daytime',
    href: '#',
    priceHourly: '₦10,000',
    description:
      'Enjoy football during the day with our affordable rates. ',
    features: [
      'Available from 7AM to 11AM and 4PM to 7PM',
      'Ideal for early risers and those looking to unwind',
      'Enjoy the cool morning or evening breeze',
      // '₦700 per player during specified times (minimum 15 players)',
    ],
  },
  {
    name: 'Night Football',
    id: 'tier-night',
    href: '#',
    priceHourly: '₦15,000',
    description:
      'Play under the stars with our well-lit pitches. Experience night football at its best.',
    features: [
      'Available from 7 PM to 10 PM',
      'Well-lit pitches for an exciting night game',
      'Perfect for night-time football enthusiasts',
      'Enjoy the cool night air',
    ],
  },
];

export default function Pricing({
  setBookingModalOpen,
}: {
  setBookingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='isolate overflow-hidden bg-gray-900'>
      <div className='mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-base font-semibold leading-7 text-bright-yellow'>
            Pricing
          </h2>
          <p className='mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            Great Value, <br className='hidden sm:inline lg:hidden' />
            Great Experience
          </p>
        </div>
        <div className='relative mt-6'>
          <p className='mx-auto max-w-2xl text-lg leading-8 text-white/80'>
            Whether you play during the day, night, or off-peak hours, we have a
            pricing plan that fits your lifestyle and budget.
          </p>
          <svg
            viewBox='0 0 1208 1024'
            className='absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0'
          >
            <ellipse
              cx={604}
              cy={512}
              fill='url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)'
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id='6d1bd035-0dd1-437e-93fa-59d316231eb0'>
                <stop stopColor='#e5b401' />
                <stop offset={1} stopColor='#770097' />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className='flow-root pb-24 sm:pb-32'>
        <div className='-mt-80'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2'>
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className='flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10'
                >
                  <div>
                    <h3
                      id={tier.id}
                      className='text-base font-semibold leading-7 text-bright-purple-dark'
                    >
                      {tier.name}
                    </h3>
                    <div className='mt-4 flex items-baseline gap-x-2'>
                      <span className='text-5xl font-bold tracking-tight text-gray-900'>
                        {tier.priceHourly}
                      </span>
                      <span className='text-base font-semibold leading-7 text-gray-800'>
                        /hour
                      </span>
                    </div>
                    <p className='mt-6 text-base leading-7 text-gray-800'>
                      {tier.description}
                    </p>
                    <ul
                      role='list'
                      className='mt-10 space-y-4 text-sm leading-6 text-gray-800'
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className='flex gap-x-3'>
                          <CheckIcon
                            className='h-6 w-5 flex-none text-bright-purple-dark'
                            aria-hidden='true'
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type='button'
                    onClick={() => setBookingModalOpen(true)}
                    aria-describedby={tier.id}
                    className='mt-8 block rounded-md bg-bright-purple-dark px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bright-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple-dark'
                  >
                    Get started today
                  </button>
                </div>
              ))}
              <div className='bg-white flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center'>
                <div className='lg:min-w-0 lg:flex-1'>
                  <h3 className='text-lg font-semibold leading-8 tracking-tight text-bright-purple-dark'>
                    Discounted
                  </h3>
                  <p className='mt-1 text-base leading-7 text-gray-800'>
                    Enjoy flexibility with our discounted rates for other
                    booking times. Perfect for those who prefer non-peak hours.
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => setBookingModalOpen(true)}
                  className='rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-bright-purple-dark ring-1 ring-inset ring-bright-purple-dark hover:ring-bright-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple-dark'
                >
                  Book Discounted Time Slot
                  <span aria-hidden='true'>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
