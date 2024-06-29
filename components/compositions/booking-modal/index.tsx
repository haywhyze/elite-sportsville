import { useState, useRef } from 'react';
import { Button } from '@/components/button';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import BookingForm from './booking-form';
import { X } from 'lucide-react';
import PaymentMothod from './payment-method';
import PaymentInfo from './payment-info';
import { notify } from '@/lib/utils';
import BookingStepOne from './step-one';

interface BookingModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    {
      id: number;
      time: string;
      date: string;
      period: string;
      price?: number;
    }[]
  >([]);
  const [bookingSteps, setBookingSteps] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('online');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: '',
    email: '',
    phone: '',
  } as { name: string; email: string; phone: string });

  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value) return { name: 'Name is required' };
        return { name: '' };
      case 'email':
        if (!value) return { email: 'Email is required' };
        if (!/\S+@\S+\.\S+/.test(value)) return { email: 'Email is invalid' };
        return { email: '' };
      case 'phone':
        if (!value) return { phone: 'Phone number is required' };
        if (!/^[0-9]{11}$/.test(value))
          return { phone: 'Phone number is invalid' };
        return { phone: '' };
      default:
        return {};
    }
  };

  const validateForm = () => {
    const newErrors = {} as { name: string; email: string; phone: string };
    const { name, email, phone } = formData;
    const nameError = validateField('name', name).name;
    const emailError = validateField('email', email).email;
    const phoneError = validateField('phone', phone).phone;
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;
    return newErrors;
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    const newErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name && nameRef.current) nameRef.current.focus();
      else if (newErrors.email && emailRef.current) emailRef.current.focus();
      else if (newErrors.phone && phoneRef.current) phoneRef.current.focus();
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your API call
      // await saveBooking(formData);
      console.log('Booking data:', {
        ...formData,
        selectedDate,
        selectedTimeSlots,
        paymentMethod,
      });
      setIsLoading(false);
      toast.success('Booking successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  const totalPrice = selectedTimeSlots.reduce(
    (acc, slot) => acc + (slot.price || 0),
    0
  );

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
            <BookingStepOne
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
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
                    <p className='text-lg font-bold text-bright-yellow'>
                      Total Price
                    </p>
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
          )}
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
                      // setBookingSteps(3);
                    }
                  }}
                  color='purple'
                  disabled={
                    paymentMethod === '' ||
                    isLoading ||
                    Object.values(errors).some((error) => error !== '')
                  }
                >
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
        </Dialog>
      )}
    </div>
  );
};

export default BookingModal;
