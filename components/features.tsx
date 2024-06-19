import {
  ArrowPathIcon,
  BuildingOfficeIcon,
  LockClosedIcon,
  MoonIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import { soccerPitch } from '@lucide/lab';
import { BriefcaseMedical, Cross, Footprints, Icon } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    name: 'All Ages Welcome.',
    description:
      'Our facility caters to players of all ages and skill levels, ensuring fun and excitement for everyone',
    icon: UserGroupIcon,
  },
  {
    name: 'Comfortable Sitting Area.',
    description:
      'Enjoy our comfortable seating area where you can relax and watch the game.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Limited Soccer Boots for Rent.',
    description:
      "Forgot your boots? We've got you covered with limited rentals available.",
    icon: Footprints,
  },
  {
    name: 'First Aid Available.',
    description:
      'Your safety is our priority. First aid services are readily available.',
    icon: BriefcaseMedical,
  },
  {
    name: 'Safe and Comfortable Turf.',
    description:
      'Play on our safe and comfortable turf, designed to enhance your football experience.',
    icon: Icon,
    iconNode: soccerPitch,
  },
  {
    name: 'Night football.',
    description:
      'Play under the lights with our well-lit pitches, perfect for evening and night matches.',
    icon: MoonIcon,
  },
];

export default function Features() {
  return (
    <div className='bg-gray-900 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='text-base font-semibold leading-7 text-bright-yellow'>
            Play Better
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Experience the Best at Elite Sportsville
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Our state-of-the-art facilities and amenities ensure a fun, safe,
            and enjoyable football experience for all ages.
          </p>
        </div>
      </div>
      <div className='relative overflow-hidden pt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <Image
            src='/features.jpeg'
            alt='App screenshot'
            className='mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10'
            width={2432}
            height={1442}
          />
          <div className='relative' aria-hidden='true'>
            <div className='absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]' />
          </div>
        </div>
      </div>
      <div className='mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8'>
        <dl className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'>
          {features.map((feature: any) => (
            <div key={feature.name} className='relative pl-9'>
              <dt className='inline font-semibold text-white'>
                <feature.icon
                  className='absolute left-1 top-1 h-5 w-5 text-bright-yellow'
                  aria-hidden='true'
                  {...(feature.iconNode ? { iconNode: feature.iconNode } : {})}
                />
                {feature.name}
              </dt>{' '}
              <dd className='inline'>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
