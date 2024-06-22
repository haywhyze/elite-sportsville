import { useState } from 'react';
import { Button } from '@/components/button';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Description, Field, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import CustomDatePicker from './date-picker';
import TimeSlot from './time-slot';
import { Switch } from '@/components/switch';
import Tabs from '@/components/tabs';
import { XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

interface BookingModalProps {
  // Define the props for the booking modal here
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const tabs = [
  { name: 'Morning', id: 'morning', current: true },
  { name: 'Afternoon', id: 'afternoon', current: false },
  { name: 'Evening', id: 'evening', current: false },
  { name: 'Night', id: 'night', current: false },
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState(
    tabs.find((tab) => tab.current) || tabs[0]
  );

  const [isBlockBooking, setIsBlockBooking] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  // create time slots from 7am - 10pm of 1 hr intervals in 12hr format
  const timeSlots = Array.from({ length: 15 }, (_, index) => {
    const hour = index + 7;
    return `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'} - ${
      (hour % 12) + 1 || 12
    }${hour + 1 < 12 ? 'am' : 'pm'}`;
  });

  const timeSlotsIntoPeriods = {
    morning: timeSlots.slice(0, 5),
    afternoon: timeSlots.slice(5, 9),
    evening: timeSlots.slice(9, 12),
    night: timeSlots.slice(12),
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot: string) => {
    // if already selected, remove from selected time slots
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots((prev) => prev.filter((time) => time !== slot));
      return;
    }
    // limit selection to 5 slots only
    if (selectedTimeSlots.length >= 5) {
      notifyErrorMessage('You can only book a maximum of 5 slots at a time');
      return;
    }
    setSelectedTimeSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((time) => time !== slot);
      }
      return [...prev, slot];
    });
  };

  const periodColors: { [key: string]: string } = {
    morning: 'bg-yellow-400',
    afternoon: 'bg-green-400',
    evening: 'bg-blue-400',
    night: 'bg-purple-400',
  };

  const notifyErrorMessage = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      toastId: 'booking-error-toast',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-gray-900 text-white',
    });
  };

  return (
    <div>
      {/* Add your modal content here */}
      {isOpen && (
        <Dialog
          size='5xl'
          open={isOpen}
          onClose={setIsOpen}
          className='dark:bg-gray-900 dark:text-white'
        >
          <DialogTitle>Book the Pitch</DialogTitle>
          <DialogDescription>
            Select a date and time slot to book the pitch
          </DialogDescription>
          <DialogBody className='flex flex-col lg:flex-row lg:items-start mt-0 lg:mt-3'>
            <div className='w-full lg:w-2/3 mt-3 flex justify-center items-center lg:items-start flex-col'>
              <CustomDatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
              {selectedDate && (
                <div className='w-full flex flex-col mt-6'>
                  <Tabs
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                  {Object.entries(timeSlotsIntoPeriods).map(
                    ([period, slots]) => {
                      if (period === selectedTab.id)
                        return (
                          <div key={period} className='mb-6 w-full'>
                            <div className='flex flex-wrap gap-2 mt-6 justify-center items-center lg:justify-start'>
                              {slots.map((time) => (
                                <TimeSlot
                                  key={time}
                                  time={time}
                                  price={5000}
                                  isBooked={time === '9am - 10am'}
                                  onSelect={() =>
                                    handleTimeSlotSelect(
                                      time +
                                        '|||' +
                                        selectedDate?.toDateString() +
                                        '|||' +
                                        period
                                    )
                                  }
                                  selected={selectedTimeSlots.includes(
                                    time +
                                      '|||' +
                                      selectedDate?.toDateString() +
                                      '|||' +
                                      period
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      return null;
                    }
                  )}
                </div>
              )}
            </div>
            <div className='w-full lg:w-1/3 text-center flex justify-center items-center flex-col'>
              {/* Display time selected as a message */}
              {selectedDate && <div>
                <div>
                  {selectedTimeSlots.length > 0
                    ? 'Selected Time Slots:'
                    : 'No time slot selected'}
                  {selectedTimeSlots.length > 0 && (
                    <ul role='list' className='mt-3 grid grid-cols-1 gap-5'>
                      {selectedTimeSlots.map((slot) => (
                        <li
                          key={slot}
                          className='col-span-1 flex rounded-md shadow-sm'
                        >
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
                              <p className='text-gray-500'>
                                {slot.split('|||')[1]}
                              </p>
                            </div>
                            <div className='flex-shrink-0 pr-2'>
                              <button
                                type='button'
                                onClick={() =>
                                  setSelectedTimeSlots((prev) =>
                                    prev.filter((time) => time !== slot)
                                  )
                                }
                                className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
                              >
                                <span className='sr-only'>Remove</span>
                                <XMarkIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>}
            </div>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
