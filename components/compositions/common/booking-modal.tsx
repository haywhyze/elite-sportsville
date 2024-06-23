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
import CustomDatePicker from './date-picker';
import TimeSlot from './time-slot';
import Tabs from '@/components/tabs';
import SelectedTimeSlotsList from './selected-time-slots-list';
import BookingForm from './booking-form';

interface BookingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface Tab {
  name: string;
  id: string;
  current: boolean;
}

const tabs: Tab[] = [
  { name: 'Morning', id: 'morning', current: true },
  { name: 'Afternoon', id: 'afternoon', current: false },
  { name: 'Evening', id: 'evening', current: false },
  { name: 'Night', id: 'night', current: false },
];

const periodColors: { [key: string]: string } = {
  morning: 'bg-yellow-400',
  afternoon: 'bg-green-400',
  evening: 'bg-blue-400',
  night: 'bg-purple-400',
};

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const timeSlots = Array.from({ length: 15 }, (_, index) => {
    const hour = index + 7;
    const nextHour = hour + 1;
    return `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'} - ${
      nextHour % 12 || 12
    }${nextHour < 12 ? 'am' : 'pm'}`;
  });

  const timeSlotsIntoPeriods = {
    morning: timeSlots.slice(0, 5),
    afternoon: timeSlots.slice(5, 9),
    evening: timeSlots.slice(9, 12),
    night: timeSlots.slice(12),
  };

  const handleDateChange = (date: Date | null) => setSelectedDate(date);

  const handleTimeSlotSelect = (slot: string) => {
    if (selectedTimeSlots.includes(slot)) {
      setSelectedTimeSlots((prev) => prev.filter((time) => time !== slot));
    } else if (selectedTimeSlots.length < 5) {
      setSelectedTimeSlots((prev) => [...prev, slot]);
    } else {
      notifyErrorMessage('You can only book a maximum of 5 slots at a time');
    }
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
    });
  };

  return (
    <div>
      {isOpen && (
        <Dialog
          size='4xl'
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
                                      `${time}|||${selectedDate?.toDateString()}|||${period}`
                                    )
                                  }
                                  selected={selectedTimeSlots.includes(
                                    `${time}|||${selectedDate?.toDateString()}|||${period}`
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
              {selectedDate && (
                <SelectedTimeSlotsList
                  selectedTimeSlots={selectedTimeSlots}
                  setSelectedTimeSlots={setSelectedTimeSlots}
                  periodColors={periodColors}
                />
              )}
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
