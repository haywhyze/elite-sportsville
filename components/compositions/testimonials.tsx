const featuredTestimonial = {
  body: 'Elite Sportsville is truly the best place for football in Ilorin. The pitches are always well-maintained and the atmosphere is fantastic. I recommend it to all football lovers.',
  author: {
    name: 'Rasheed Alabi',
    handle: 'rasheedalabi',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
  },
};

const testimonials = [
  [
    [
      {
        body: 'Elite Sportsville has been our go-to place for weekend football. The staff are friendly and the facilities are top-notch.',
        author: {
          name: 'Kareem Adebayo',
          handle: 'kareemadebayo',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'The flexibility of booking times at Elite Sportsville is a big plus for us. We can always find a slot that fits our schedule.',
        author: {
          name: 'Yusuf Adeola',
          handle: 'yusufadeola',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'Playing football at night under the lights is an amazing experience at Elite Sportsville. The pitch quality is excellent.',
        author: {
          name: 'Sulaiman Oladipo',
          handle: 'sulaimanoladipo',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
  [
    [
      {
        body: 'The discounted rates for off-peak hours are fantastic. We often book these slots and enjoy the same great facilities at a lower price.',
        author: {
          name: 'Hakeem Abiola',
          handle: 'hakeemabiola',
          imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'My friends and I love spending our weekends at Elite Sportsville. The pitches are great and the booking process is smooth.',
        author: {
          name: 'Mubarak Balogun',
          handle: 'mubarakbalogun',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'The facilities at Elite Sportsville are second to none. From the comfortable seating areas to the first aid services, they have thought of everything.',
        author: {
          name: 'Tunde Afolabi',
          handle: 'tundeafolabi',
          imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
];

export { featuredTestimonial, testimonials };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Testimonials() {
  return (
    <div className='relative isolate bg-gray-900 pb-32 pt-24 sm:pt-32'>
      <div
        className='absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl'
        aria-hidden='true'
      >
        <div
          className='ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-dark-green to-bright-purple'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className='absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end'
        aria-hidden='true'
      >
        <div
          className='ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-xl text-center'>
          <h2 className='text-lg font-semibold leading-8 tracking-tight text-bright-yellow'>
            Testimonials
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Voices from Our Football Community
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4'>
          <figure className='rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1'>
            <blockquote className='p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8'>
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className='flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap'>
              <div className='flex-auto'>
                <div className='font-semibold'>
                  {featuredTestimonial.author.name}
                </div>
                <div className='text-gray-600'>{`@${featuredTestimonial.author.handle}`}</div>
              </div>
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className='space-y-8 xl:contents xl:space-y-0'
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8'
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5'
                    >
                      <blockquote className='text-gray-900'>
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className='mt-6 flex items-center gap-x-4'>
                        <div>
                          <div className='font-semibold'>
                            {testimonial.author.name}
                          </div>
                          <div className='text-gray-600'>{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
