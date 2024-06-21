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

interface BookingModalProps {
  // Define the props for the booking modal here
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isBlockBooking, setIsBlockBooking] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      {/* Add your modal content here */}
      {isOpen && (
        <Dialog
          size='3xl'
          open={isOpen}
          onClose={setIsOpen}
          className='dark:bg-gray-900 dark:text-white'
        >
          <DialogTitle>Book the Pitch</DialogTitle>
          <DialogDescription>
            Select a date and time slot to book the pitch
          </DialogDescription>
          <DialogBody className='flex flex-col lg:flex-row items-center lg:items-start'>
            <CustomDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </DialogBody>
          <DialogActions>
            {/* <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button> */}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
