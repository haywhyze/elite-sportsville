import { useState, useRef } from 'react';

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

export const useBookingForm = () => {
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
      console.log('Booking data:', {
        ...formData,
        selectedDate,
        selectedTimeSlots,
        paymentMethod,
      });
      setIsLoading(false);
      return true; // Indicating success
    } catch (error) {
      setIsLoading(false);
      return false; // Indicating failure
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
