import React from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle } from '@/components/dialog';
import { X } from 'lucide-react';
import BookingStepOne from './step-one';
import BookingStepTwo from './step-two';
import BookingActions from './booking-actions';
import { useBookingForm } from '@/lib/hooks/useBookingForm'; // Import the custom hook

interface BookingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
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
  } = useBookingForm();

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setSelectedTimeSlots([]);
    setBookingSteps(1);
  };

  const handleBookingSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      toast.success('Booking successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleModalClose();
    } else {
      toast.error('An error occurred. Please try again.');
    }
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
            <X onClick={handleModalClose} className='text-lg cursor-pointer' />
          </div>
          <DialogTitle>Book the Pitch</DialogTitle>
          {bookingSteps === 1 ? (
            <BookingStepOne
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
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
          />
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
