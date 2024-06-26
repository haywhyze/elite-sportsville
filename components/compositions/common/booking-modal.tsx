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
import { X } from 'lucide-react';
import PaymentMothod from './payment-method';
import PaymentInfo from './payment-info';

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

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [bookingSteps, setBookingSteps] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

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

  const handleTimeSlotSelectObject = (
    time: string,
    date: string,
    period: string
  ) => {
    const slot = {
      id: `${time}|||${date}|||${period}`,
      time,
      date,
      period,
    };
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
          <div className='absolute top-0 right-0 p-4'>
            <X
              onClick={() => {
                setIsOpen(false);
                setSelectedDate(null);
                setSelectedTimeSlots([]);
              }}
              className='text-lg cursor-pointer'
            ></X>
          </div>
          <DialogTitle>Book the Pitch</DialogTitle>
          {bookingSteps === 1 ? (
            <>
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
                                      onSelect={() => {
                                        handleTimeSlotSelect(
                                          `${time}|||${selectedDate?.toLocaleDateString(
                                            'en-GB',
                                            {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              weekday: 'long',
                                            }
                                          )}|||${period}`
                                        );
                                      }}
                                      selected={selectedTimeSlots.includes(
                                        `${time}|||${selectedDate?.toLocaleDateString(
                                          'en-GB',
                                          {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'long',
                                          }
                                        )}|||${period}`
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
                <div className='w-full lg:w-1/3 text-center flex justify-center flex-col'>
                  {selectedDate && (
                    <SelectedTimeSlotsList
                      selectedTimeSlots={selectedTimeSlots}
                      setSelectedTimeSlots={setSelectedTimeSlots}
                    />
                  )}
                </div>
              </DialogBody>
            </>
          ) : (
            <>
              <DialogDescription>
                Enter your details to confirm your booking
              </DialogDescription>
              <DialogBody className='flex flex-col sm:flex-row gap-6'>
                <div className='sm:w-1/2'>
                  <BookingForm
                    selectedDate={selectedDate}
                    selectedTimeSlots={selectedTimeSlots}
                  />
                </div>
                <div className='sm:w-1/2'>
                  <PaymentMothod
                    selected={paymentMethod}
                    setSelected={setPaymentMethod}
                  />
                  {paymentMethod === 'manual' ? <PaymentInfo /> : null}
                </div>
              </DialogBody>
            </>
          )}
          <DialogActions>
            {/* three buttons, cancel, back and next */}
            <Button
              color='red'
              onClick={() => {
                setIsOpen(false);
                setSelectedDate(null);
                setSelectedTimeSlots([]);
              }}
            >
              Cancel
            </Button>
            {bookingSteps > 1 && (
              <>
                <Button
                  outline
                  onClick={() => {
                    if (bookingSteps === 1) {
                      setSelectedTimeSlots([]);
                      setBookingSteps(1);
                    } else {
                      setBookingSteps(1);
                    }
                  }}
                >
                  Back
                </Button>
                <Button color='purple'>
                  {paymentMethod === 'manual'
                    ? 'Reserve Booking'
                    : 'Confirm Booking'}
                </Button>
              </>
            )}
            {bookingSteps < 2 && (
              <Button
                outline
                onClick={() => {
                  if (bookingSteps === 1) {
                    if (selectedTimeSlots.length === 0) {
                      notifyErrorMessage('Please select a time slot');
                    } else {
                      setBookingSteps(2);
                    }
                  }
                }}
              >
                Next
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
