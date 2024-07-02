import React from 'react';
import { DialogActions } from '@/components/dialog';
import { Button } from '@/components/button';
import { notify } from '@/lib/utils';

export default function BookingActions({
  bookingSteps,
  setIsOpen,
  setSelectedDate,
  selectedTimeSlots,
  setSelectedTimeSlots,
  setBookingSteps,
  paymentMethod,
  handleSubmit,
  handlePayment,
  isLoading,
  errors,
  formData,
}: {
  bookingSteps: number;
  setIsOpen: (value: boolean) => void;
  setSelectedDate: (date: Date | null) => void;
  selectedTimeSlots: any;
  setSelectedTimeSlots: (time: any) => void;
  setBookingSteps: (value: number) => void;
  paymentMethod: string;
  handleSubmit: () => void;
  handlePayment: () => void;
  isLoading: boolean;
  errors: any;
  formData: any;
}) {
  return (
    <DialogActions>
      {/* three buttons, cancel, back and next */}
      <Button
        color='red'
        onClick={() => {
          setIsOpen(false);
          setSelectedDate(null);
          setSelectedTimeSlots([]);
          setBookingSteps(1);
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
          <Button
            onClick={() => {
              if (paymentMethod === 'manual') {
                handleSubmit();
              } else {
                handlePayment();
              }
            }}
            color='purple'
            disabled={
              paymentMethod === '' ||
              isLoading ||
              Object.values(errors).some((error) => error !== '') ||
              formData.name === ''
            }
          >
            {paymentMethod === 'manual' ? 'Reserve Booking' : 'Confirm Booking'}
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
                notify({
                  message: 'Please select at least one time slot',
                  type: 'error',
                });
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
  );
}
