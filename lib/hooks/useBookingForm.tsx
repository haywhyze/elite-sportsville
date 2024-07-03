import { useState, useRef } from 'react';
  import { usePaystackPayment } from 'react-paystack';
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from '@/lib/firebase';
  import { v4 as uuidv4 } from 'uuid';
  import { notify } from '../utils';

  interface FormData {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }

  interface Errors {
    name: string;
    email: string;
    phone: string;
    [key: string]: string;
  }

  export const useBookingForm = ({
    handleModalClose,
  }: {
    handleModalClose: () => void;
  }) => {
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
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
    const [errors, setErrors] = useState<Errors>({
      name: '',
      email: '',
      phone: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error message when user starts typing
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
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
      const newErrors = {} as Errors;
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

    // check if the form is valid before submitting
    const isFormValid = () => {
      const newErrors = validateForm();
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        if (newErrors.name && nameRef.current) nameRef.current.focus();
        else if (newErrors.email && emailRef.current) emailRef.current.focus();
        else if (newErrors.phone && phoneRef.current) phoneRef.current.focus();
        return;
      }
    };

    // Add booking data to Firestore
    const saveBookingData = async (paid: boolean, paymentResponse?: any) => {
      try {
        // Add booking data to Firestore
        const docRef = await addDoc(collection(db, 'bookings'), {
          ...formData,
          selectedTimeSlots: selectedTimeSlots.map((slot) => ({
            id: slot.id,
            time: slot.time,
            date: slot.date,
            period: slot.period,
            price: slot.price,
          })),
          paymentMethod,
          paid,
          createdAt: new Date().toISOString(),
          paymentResponse,
        });
        console.log('Document written with ID: ', docRef.id);
        return true; // Indicating success
      } catch (error: any) {
        console.log(
          'Error adding document: ',
          error.message,
          error.code,
          error.details
        );
        return false; // Indicating failure
      }
    };

    const resetForm = () => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
      });
      setSelectedDate(null);
      setSelectedTimeSlots([]);
      setBookingSteps(1);
      setPaymentMethod('online');
      setErrors({
        name: '',
        email: '',
        phone: '',
      });
    };

    const config = {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      email: formData.email,
      amount:
        selectedTimeSlots.reduce((acc, slot) => acc + slot.price!, 0) * 100,
      reference: `${uuidv4()}-${new Date().getTime()}-${formData.phone}`,
      metadata: {
        custom_fields: [
          {
            display_name: 'Name',
            variable_name: 'name',
            value: formData.name,
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone',
            value: formData.phone,
          },
          {
            display_name: 'Selected Time Slots',
            variable_name: 'selected_time_slots',
            value: selectedTimeSlots
              .map((slot) => `${slot.time} (${slot.date})`)
              .join(', '),
          },
        ],
      },
    };

    const onSuccess = async (response: any) => {
      console.log(
        'Payment successful. Reference: ',
        response.reference,
        'Transaction: ',
        response
      );
      // Save booking data to Firestore
      const success = await saveBookingData(true, response);
      if (success) {
        notify({
          message: 'Booking successful',
          type: 'success',
        });
        resetForm();
        setIsLoading(false);
        handleModalClose();
      } else {
        setIsLoading(false);
        notify({
          message: 'An error occurred. Please try again',
          type: 'error',
        });
      }
    };

    const onClose = () => {
      setIsLoading(false);
      notify({
        message: 'Payment cancelled',
        type: 'error',
      });
    };

    const initializePayment = usePaystackPayment(config);

    const handlePayment = () => {
      try {
        setIsLoading(true);
        initializePayment({
          onClose,
          onSuccess: (res) => onSuccess(res)
        });
      } catch (error) {
        console.log('Error initializing payment: ', error);
        setIsLoading(false);
        notify({
          message: 'An error occurred. Please try again',
          type: 'error',
        });
      }
    };

    const handleSubmit = async () => {
      isFormValid();
      setIsLoading(true);
      // if paymentMethod is manual, save booking data to Firestore
      if (paymentMethod === 'manual') {
        const success = await saveBookingData(false);
        if (success) {
          notify({
            message: 'Booking successful',
            type: 'success',
          });
          resetForm();
          setIsLoading(false);
          handleModalClose();
        } else {
          setIsLoading(false);
          notify({
            message: 'An error occurred. Please try again',
            type: 'error',
          });
        }
      } else {
        handlePayment();
      }
    };

    return {
      selectedDate,
      setSelectedDate,
      selectedTimeSlots,
      setSelectedTimeSlots,
      bookingSteps,
      setBookingSteps,
      paymentMethod,
      setPaymentMethod,
      formData,
      setFormData,
      errors,
      setErrors,
      isLoading,
      setIsLoading,
      nameRef,
      emailRef,
      phoneRef,
      handleInputChange,
      handleBlur,
      handleSubmit,
    };
  };
