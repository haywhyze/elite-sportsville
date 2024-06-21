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
        <Dialog size='3xl' open={isOpen} onClose={setIsOpen}>
          <DialogTitle>Book the Pitch</DialogTitle>
          <DialogDescription>
            Please fill out the form below to book the pitch. Provide your
            details and preferred time slots. We will confirm your booking via
            email.
          </DialogDescription>
          <DialogBody>
            {/* <Field>
              <Label>Date</Label>
              <Description>
                Select the date you want to book the pitch.
              </Description>
              <Input type="time" name='booking_date' />
            </Field> */}
            <CustomDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </DialogBody>
          <DialogActions>
            {/* <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Refund</Button> */}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
