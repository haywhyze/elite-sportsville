import { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface Errors {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (!value) return { firstName: 'First name is required' };
        return { firstName: '' };
      case 'lastName':
        if (!value) return { lastName: 'Last name is required' };
        return { lastName: '' };
      case 'email':
        if (!value) return { email: 'Email is required' };
        if (!/\S+@\S+\.\S+/.test(value)) return { email: 'Email is invalid' };
        return { email: '' };
      case 'phoneNumber':
        if (!value) return { phoneNumber: 'Phone number is required' };
        if (!/^[0-9]{11}$/.test(value))
          return { phoneNumber: 'Phone number is invalid' };
        return { phoneNumber: '' };
      case 'message':
        if (!value) return { message: 'Message is required' };
        return { message: '' };
      default:
        return {};
    }
  };

  const validateForm = () => {
    const newErrors = {} as Errors;
    const { firstName, lastName, email, phoneNumber, message } = formData;
    const firstNameError = validateField('firstName', firstName).firstName;
    const lastNameError = validateField('lastName', lastName).lastName;
    const emailError = validateField('email', email).email;
    const phoneNumberError = validateField(
      'phoneNumber',
      phoneNumber
    ).phoneNumber;
    const messageError = validateField('message', message).message;
    if (firstNameError) newErrors.firstName = firstNameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (phoneNumberError) newErrors.phoneNumber = phoneNumberError;
    if (messageError) newErrors.message = messageError;
    return newErrors;
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    const newErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.firstName && firstNameRef.current)
        firstNameRef.current.focus();
      else if (newErrors.lastName && lastNameRef.current)
        lastNameRef.current.focus();
      else if (newErrors.email && emailRef.current) emailRef.current.focus();
      else if (newErrors.phoneNumber && phoneNumberRef.current)
        phoneNumberRef.current.focus();
      return false;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, 'contacts'), formData);
      setIsLoading(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
      return true; // Indicating success
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting contact form:', error);
      return false; // Indicating failure
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    firstNameRef,
    lastNameRef,
    emailRef,
    phoneNumberRef,
    handleInputChange,
    handleBlur,
    handleSubmit,
  };
};
