import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { sortTimeSlots } from '@/lib/utils';

interface SelectedTimeSlotsListProps {
  selectedTimeSlots: string[];
  setSelectedTimeSlots: (slots: (prev: string[]) => string[]) => void;
  periodColors: { [key: string]: string };
}

const SelectedTimeSlotsList: React.FC<SelectedTimeSlotsListProps> = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  periodColors,
}) => {

  console.log(sortTimeSlots(selectedTimeSlots));

  return (
    <div>
      <div>
        {selectedTimeSlots.length > 0
          ? 'Selected Time Slots:'
          : 'No time slot selected'}
        {selectedTimeSlots.length > 0 && (
          <ul role='list' className='mt-3 grid grid-cols-1 gap-5'>
            {sortTimeSlots(selectedTimeSlots).map((slot) => (
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
                  <div className='flex-shrink-0 pr-2'>
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
                  </div>
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
