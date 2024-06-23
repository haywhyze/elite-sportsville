import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { sortTimeSlots } from '@/lib/utils';

interface SelectedTimeSlotsListProps {
  selectedTimeSlots: string[];
  // setSelectedTimeSlots: (slots: (prev: string[]) => string[]) => void;
  periodColors: { [key: string]: string };
}

const SelectedTimeSlotsList: React.FC<SelectedTimeSlotsListProps> = ({
  selectedTimeSlots,
  // setSelectedTimeSlots,
  periodColors,
}) => {

  interface TimeSlot {
    startTime: string;
    endTime: string;
    date: string;
    period: string;
  }

  const parseTimeSlot = (slot: string): TimeSlot => {
    const [time, date, period] = slot.split('|||');
    const [startTime, endTime] = time.split(' - ');
    return { startTime, endTime, date, period };
  };

  const formatTimeSlot = (slot: TimeSlot): string => {
    return `${slot.startTime} - ${slot.endTime}|||${slot.date}|||${slot.period}`;
  };

  const mergeTimeSlots = (slots: string[]): string[] => {
    if (slots.length === 0) return [];

    const parsedSlots = slots.map(parseTimeSlot);

    parsedSlots.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;

      const startTimeA = new Date(`1970/01/01 ${a.startTime}`).getTime();
      const startTimeB = new Date(`1970/01/01 ${b.startTime}`).getTime();
      return startTimeA - startTimeB;
    });

    const mergedSlots: TimeSlot[] = [];
    let currentSlot = parsedSlots[0];

    for (let i = 1; i < parsedSlots.length; i++) {
      const nextSlot = parsedSlots[i];

      if (
        currentSlot.endTime === nextSlot.startTime &&
        currentSlot.date === nextSlot.date &&
        currentSlot.period === nextSlot.period
      ) {
        currentSlot.endTime = nextSlot.endTime;
      } else {
        mergedSlots.push(currentSlot);
        currentSlot = nextSlot;
      }
    }

    mergedSlots.push(currentSlot);

    return mergedSlots.map(formatTimeSlot);
  };

  return (
    <div>
      <div>
        {selectedTimeSlots.length > 0
          ? 'Selected Time Slots:'
          : 'No time slot selected'}
        {selectedTimeSlots.length > 0 && (
          <ul role='list' className='mt-3 grid grid-cols-1 gap-5'>
            {mergeTimeSlots(sortTimeSlots(selectedTimeSlots)).map((slot) => (
              <li key={slot} className='col-span-1 flex rounded-md shadow-sm'>
                <div
                  className={classNames(
                    periodColors[slot.split('|||')[2]],
                    'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm text-gray-900 font-semibold'
                  )}
                >
                  {slot.split('|||')[2].charAt(0).toUpperCase() +
                    slot.split('|||')[2].charAt(1)}
                </div>
                <div className='flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white'>
                  <div className='flex-1 truncate px-2 py-1 text-xs'>
                    <p className='font-medium text-gray-900 hover:text-gray-600'>
                      {slot.split('|||')[0]}
                    </p>
                    <p className='text-gray-500'>{slot.split('|||')[1]}</p>
                  </div>
                  {/* <div className='flex-shrink-0 pr-2'>
                    <button
                      type='button'
                      onClick={() =>
                        setSelectedTimeSlots((prev: string[]) =>
                          prev.filter((time: string) => time !== slot)
                        )
                      }
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                    >
                      <span className='sr-only'>Remove</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectedTimeSlotsList;
