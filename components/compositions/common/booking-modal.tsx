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
import { generateTimeSlotsForDate } from '@/lib/utils';
import { Tab, tabs } from '@/lib/constants';

interface BookingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{
    id: number;
    time: string;
    date: string;
    period: string;
    price?: number;
  }[]>([]);
  const [bookingSteps, setBookingSteps] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const timeSlots = generateTimeSlotsForDate(selectedDate || new Date());

  const timeSlotsIntoPeriods = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.period]) {
      acc[slot.period] = [];
    }
    acc[slot.period].push(slot);
    return acc;
  }, {} as Record<string, any>);

  const handleDateChange = (date: Date | null) => setSelectedDate(date);

  const onSelectTimeSlot = (slot: any) => {
    if (selectedTimeSlots.map((t) => t.id).includes(slot.id)) {
      setSelectedTimeSlots((prev) =>
        prev.filter((time) => time.id !== slot.id)
      );
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
                <div className='w-full lg:w-2/3 mt-3 flex justify-start items-center sm:items-start flex-col'>
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
                      <div className='flex flex-wrap gap-2 my-6 justify-center sm:justify-start items-start'>
                        {timeSlotsIntoPeriods[selectedTab.id].map(
                          (time: any) => (
                            <TimeSlot
                              key={time.id} // Add a unique key for each time slot
                              time={time.time}
                              price={time.price}
                              isBooked={time.isBooked}
                              onSelect={() => {
                                onSelectTimeSlot(time);
                              }}
                              selected={selectedTimeSlots
                                .map((t) => t.id)
                                .includes(time.id)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className='w-full lg:w-1/3 text-center sm:text-left flex justify-center flex-col'>
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
                    setSelectedTimeSlots={setSelectedTimeSlots}
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
                color='purple'
                disabled={selectedTimeSlots.length === 0}
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
