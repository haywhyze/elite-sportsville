import React from 'react';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Fieldset, Label } from '@/components/fieldset';
import SelectedTimeSlotsList from './selected-time-slots-list';

interface BookingFormProps {
  selectedTimeSlots: {
    id: number;
    time: string;
    date: string;
    period: string;
    price?: number;
  }[];
  selectedDate: Date | null;
  setSelectedTimeSlots: (value: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  selectedDate,
}) => {
  return (
    <>
      {selectedDate && (
        <SelectedTimeSlotsList
          selectedTimeSlots={selectedTimeSlots}
          setSelectedTimeSlots={setSelectedTimeSlots}
          viewOnly
        />
      )}
      <form className='mt-6 w-full'>
        {/* <div className='mt-6'>
        <h4 className='text-md font-medium'>Pricing:</h4>
        <p className='mt-2'>Total: ₦</p>
      </div> */}
        <Fieldset className='mb-4'>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' name='name' id='name' required />
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' name='email' id='email' required />
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='phone'>Phone</Label>
          <Input type='tel' name='phone' id='phone' required />
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='notes'>Additional Notes</Label>
          <Textarea name='notes' id='notes' rows={4} />
        </Fieldset>
      </form>
    </>
  );
};

export default BookingForm;
