import React from 'react';
import { Dialog, DialogTitle } from '@/components/dialog';
import { X } from 'lucide-react';
import BookingStepOne from './step-one';
import BookingStepTwo from './step-two';
import BookingActions from './booking-actions';
import { useBookingForm } from '@/lib/hooks/useBookingForm'; // Import the custom hook
import { useFetchBooking } from '@/lib/hooks/useFetchBooking';
import useFetchPricing from '@/lib/hooks/useFetchPricing';

interface BookingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setSelectedTimeSlots([]);
    setBookingSteps(1);
  };
  const {
    selectedDate,
    setSelectedDate,
    selectedTimeSlots,
    setSelectedTimeSlots,
    bookingSteps,
    setBookingSteps,
    paymentMethod,
    setPaymentMethod,
    formData,
    errors,
    isLoading,
    nameRef,
    emailRef,
    phoneRef,
    handleInputChange,
    handleBlur,
    handleSubmit,
  } = useBookingForm({ handleModalClose });

  const { bookings, isLoading: loading } = useFetchBooking();

  const { pricing, isLoading: loadingPrice } = useFetchPricing();

  const handleBookingSubmit = async () => {
    await handleSubmit();
  };

  return (
    <div>
      {isOpen && (
        <Dialog
          size='4xl'
          open={isOpen}
          onClose={setIsOpen}
          className='bg-gray-900 text-white'
        >
          <div className='absolute top-0 right-0 p-4'>
            <X onClick={handleModalClose} className='text-lg cursor-pointer' />
          </div>
          <DialogTitle>Book the Pitch</DialogTitle>
          {bookingSteps === 1 ? (
            <BookingStepOne
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
              loading={loading || loadingPrice}
              bookings={bookings}
              pricing={pricing}
            />
          ) : (
            <BookingStepTwo
              selectedDate={selectedDate}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              nameRef={nameRef}
              emailRef={emailRef}
              phoneRef={phoneRef}
            />
          )}
          <BookingActions
            bookingSteps={bookingSteps}
            setIsOpen={setIsOpen}
            setSelectedDate={setSelectedDate}
            setBookingSteps={setBookingSteps}
            paymentMethod={paymentMethod}
            handleSubmit={handleBookingSubmit}
            isLoading={isLoading}
            errors={errors}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
            formData={formData}
          />
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
