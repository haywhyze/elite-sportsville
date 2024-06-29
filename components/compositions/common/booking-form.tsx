import React from 'react';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { ErrorMessage, Fieldset, Label } from '@/components/fieldset';
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
  formData: any;
  errors: any;
  handleInputChange: any;
  handleBlur: any;
  nameRef: any;
  emailRef: any;
  phoneRef: any;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  selectedDate,
  formData,
  errors,
  handleInputChange,
  handleBlur,
  nameRef,
  emailRef,
  phoneRef,
}) => {
  const { name, email, phone, notes } = formData;
  const { name: nameError, email: emailError, phone: phoneError } = errors;

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
        <Fieldset className='mb-4'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={nameRef}
            required
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={emailRef}
            required
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            type='tel'
            name='phone'
            id='phone'
            value={phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={phoneRef}
            required
          />
          {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
        </Fieldset>
        <Fieldset className='mb-4'>
          <Label htmlFor='notes'>Additional Notes</Label>
          <Textarea
            name='notes'
            id='notes'
            value={notes}
            onChange={handleInputChange}
            rows={4}
          />
        </Fieldset>
      </form>
    </>
  );
};

export default BookingForm;
