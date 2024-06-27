import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { sortTimeSlots } from '@/lib/utils';
import { periodColors } from '@/lib/constants';
import { Sunrise, Sunset } from 'lucide-react';

interface SelectedTimeSlotsListProps {
  selectedTimeSlots: {
    id: number;
    time: string;
    date: string;
    period: string;
    price?: number;
  }[];
  setSelectedTimeSlots: (value: any) => void;
  viewOnly?: boolean;
}

const SelectedTimeSlotsList: React.FC<SelectedTimeSlotsListProps> = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  viewOnly,
}) => {
  const periodIcons: { [key: string]: JSX.Element } = {
    morning: <Sunrise />,
    afternoon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-6'
      >
        <path d='M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z' />
      </svg>
    ),
    evening: <Sunset />,
    night: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-6'
      >
        <path
          fillRule='evenodd'
          d='M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z'
          clipRule='evenodd'
        />
      </svg>
    ),
  };

  const mergeTimeSlots = (
    slots: {
      id: string | number;
      time: string;
      date: string;
      period: string;
      price?: number;
      startTime?: number;
      endTime?: number;
    }[]
  ) => {
    if (!slots.length) return [];
    const parsedSlots = slots.map((slot) => ({
      startTime: slot.time.split(' - ')[0],
      endTime: slot.time.split(' - ')[1],
      period: slot.period,
      date: slot.date,
      id: slot.id,
      ids: [slot.id],
      time: slot.time,
    }));

    const mergedSlots = [];
    let currentSlot = parsedSlots[0];

    for (let i = 1; i < parsedSlots.length; i++) {
      const nextSlot = parsedSlots[i];

      if (
        currentSlot.endTime === nextSlot.startTime &&
        currentSlot.date === nextSlot.date &&
        currentSlot.period === nextSlot.period
      ) {
        currentSlot.endTime = nextSlot.endTime;
        currentSlot.ids = [...currentSlot.ids, nextSlot.id];
        currentSlot.id = currentSlot.ids.join('-');
        currentSlot.time = `${currentSlot.startTime} - ${currentSlot.endTime}`;
      } else {
        mergedSlots.push(currentSlot);
        currentSlot = nextSlot;
      }
    }
    mergedSlots.push(currentSlot);
    return mergedSlots;
  };

  sortTimeSlots(selectedTimeSlots);

  return (
    <>
      {!viewOnly && (
        <h4>
          {selectedTimeSlots.length > 0
            ? 'Selected Time Slots'
            : 'No time slots selected'}
        </h4>
      )}
      {selectedTimeSlots.length > 0 && (
        <ul
          role='list'
          className='mt-3 flex flex-wrap gap-2 justify-center sm:justify-start'
        >
          {mergeTimeSlots(selectedTimeSlots).map((slot) => (
            <li
              key={slot.id}
              className='col-span-1 flex rounded-md shadow-sm text-left max-w-72'
            >
              {periodColors && (
                <div
                  className={classNames(
                    slot.period === 'morning' && 'bg-blue-200',
                    slot.period === 'afternoon' && 'bg-yellow-400',
                    slot.period === 'evening' && 'bg-orange-400',
                    slot.period === 'night' && 'bg-blue-900 text-white',
                    'flex flex-shrink-0 items-center justify-center rounded-l-md text-sm text-gray-900 font-semibold px-4'
                  )}
                >
                  {periodIcons[slot.period]}
                </div>
              )}
              <div className='flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white'>
                <div className='flex-1 truncate px-2 py-1 text-xs'>
                  <p className='font-medium text-gray-900 hover:text-gray-600'>
                    {slot.time}
                  </p>
                  <p className='text-gray-500'>
                    {new Date(slot.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                {!viewOnly && (
                  <div className='flex-shrink-0 pr-2'>
                    <button
                      type='button'
                      onClick={() => {
                        setSelectedTimeSlots(
                          selectedTimeSlots.filter(
                            (timeSlot) => !slot.ids.includes(timeSlot.id)
                          )
                        );
                      }}
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                    >
                      <span className='sr-only'>Remove</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SelectedTimeSlotsList;
