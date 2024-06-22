import { useState } from 'react';
import { Button } from '@/components/button';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTab, setSelectedTab] = useState(
    tabs.find((tab) => tab.current) || tabs[0]
  );

  const [isBlockBooking, setIsBlockBooking] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
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
          <DialogBody className='flex flex-col lg:flex-row lg:items-start'>
            <div className='w-full lg:w-1/3 p-4 flex justify-center items-center'>
              <CustomDatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
            <div className='w-full lg:w-2/3 my-3'>
              <Tabs
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              {Object.entries(timeSlotsIntoPeriods).map(([period, slots]) => {
                if (period === selectedTab.id)
                  return (
                    <div key={period} className='mb-6'>
                      {/* <h3 className='text-md font-medium mb-2 capitalize'>
                        {period}
                      </h3> */}
                      <div className='flex flex-wrap gap-2 mt-6 justify-center items-center lg:justify-start'>
                        {slots.map((time, index) => (
                          <TimeSlot
                            key={time}
                            time={time}
                            price={5000}
                            isBooked={time === '9am - 10am'}
                            onSelect={() => setSelectedTimeSlot(time)}
                            selected={selectedTimeSlot === time}
                          />
                        ))}
                      </div>
                    </div>
                  );
                return null;
              })}
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
