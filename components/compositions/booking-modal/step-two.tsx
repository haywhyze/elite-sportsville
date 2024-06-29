import { DialogBody, DialogDescription } from '@/components/dialog';
import BookingForm from './booking-form';
import PaymentMothod from './payment-method';
import PaymentInfo from './payment-info';

export default function BookingStepTwo({
  selectedDate,
  selectedTimeSlots,
  setSelectedTimeSlots,
  paymentMethod,
  setPaymentMethod,
  formData,
  errors,
  handleInputChange,
  handleBlur,
  nameRef,
  emailRef,
  phoneRef,
}: {
  selectedDate: Date | null;
  selectedTimeSlots: any;
  setSelectedTimeSlots: (time: any) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  formData: any;
  errors: any;
  handleInputChange: (e: any) => void;
  handleBlur: (e: any) => void;
  nameRef: any;
  emailRef: any;
  phoneRef: any;
}) {
  const totalPrice = selectedTimeSlots.reduce(
    (acc: any, slot: any) => acc + (slot.price || 0),
    0
  );
  return (
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
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            nameRef={nameRef}
            emailRef={emailRef}
            phoneRef={phoneRef}
          />
        </div>
        <div className='sm:w-1/2'>
          {/* Total Price */}
          <div className='flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-8 sm:my-6'>
            <p className='text-lg font-bold text-bright-yellow'>Total Price</p>
            <p className='text-lg font-bold text-bright-yellow'>{`₦${totalPrice.toLocaleString()}`}</p>
          </div>
          <PaymentMothod
            selected={paymentMethod}
            setSelected={setPaymentMethod}
          />
          {paymentMethod === 'manual' ? <PaymentInfo /> : null}
        </div>
      </DialogBody>
    </>
  );
}
