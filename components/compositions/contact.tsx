import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { notify } from '@/lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  } as {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  } as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      message?: string;
    } = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone number is required';
    if (!/^[0-9]{11}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone number is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    console.log(
      'Submitting form data: ',
      JSON.stringify({
        ...formData,
        phoneNumber: `+234${formData.phoneNumber}`,
      })
    )

    try {
      await addDoc(collection(db, 'contacts'), formData);
      notify({
        message: 'Message sent successfully',
        type: 'success',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message: ', error);
      notify({
        message: 'Failed to send message. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className='relative isolate bg-gray-900'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        <div className='relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48'>
          <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>
              Get in touch
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-300'>
              We&apos;d love to hear from you! Contact us for any questions or
              to learn more about our services.
            </p>
            <dl className='mt-10 space-y-4 text-base leading-7 text-gray-300'>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Address</span>
                  <BuildingOffice2Icon
                    className='h-7 w-6 text-gray-100'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  Phase 1, Oloje Estate
                  <br />
                  Ilorin, Kwara State
                </dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Locate on Map</span>
                  <MapPinIcon
                    className='h-7 w-6 text-gray-100'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  <a
                    className='hover:text-gray-100'
                    href='https://maps.app.goo.gl/PqYXEaXmuVZS7qRFA'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Elite Sportsville on Google Maps
                  </a>
                </dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Telephone</span>
                  <PhoneIcon
                    className='h-7 w-6 text-gray-100'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  <a className='hover:text-gray-100' href='tel:+2349034181221'>
                    +234 903 418 1221
                  </a>
                </dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>WhatsApp</span>
                  <svg
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    className='h-7 w-6 text-gray-100'
                    aria-hidden='true'
                  >
                    <path d='M20.401 3.489A11.775 11.775 0 0 0 11.99 0C5.44 0 .102 5.338.096 11.889c0 2.098.549 4.14 1.586 5.947L0 24l6.306-1.653a11.85 11.85 0 0 0 5.685 1.448h.006c6.548 0 11.886-5.338 11.892-11.89a11.85 11.85 0 0 0-3.488-8.416zM11.99 21.781a9.9 9.9 0 0 1-5.034-1.38l-.36-.216-3.74.98.998-3.65-.234-.376a9.84 9.84 0 0 1-1.51-5.258c0-5.441 4.437-9.878 9.878-9.878a9.84 9.84 0 0 1 6.99 2.897 9.84 9.84 0 0 1 2.892 6.99c-.005 5.459-4.446 9.89-9.89 9.89m5.423-7.401c-.296-.149-1.755-.867-2.03-.969-.273-.097-.473-.148-.668.148-.2.296-.77.97-.941 1.162-.171.199-.35.222-.647.074-.297-.148-1.261-.457-2.388-1.478-.885-.788-1.477-1.763-1.652-2.057-.172-.297-.017-.456.132-.605.13-.132.297-.35.445-.522.15-.171.2-.297.296-.494.097-.199.051-.37-.022-.518-.073-.148-.667-1.615-.918-2.205-.24-.583-.485-.503-.668-.512-.171-.01-.37-.01-.57-.01a1.096 1.096 0 0 0-.793.37c-.273.296-1.036 1.016-1.036 2.481s1.064 2.873 1.215 3.075c.148-.2 2.09 3.198 5.073 4.488.705.307 1.26.488 1.694.628.712.228 1.356.193 1.868.12.57-.087 1.757-.72 2.007-1.414.246-.696.246-1.29.171-1.414-.074-.122-.273-.197-.57-.346' />
                  </svg>
                </dt>
                <dd>
                  <a
                    className='hover:text-gray-100'
                    href='https://wa.me/+2349034181221?text=Hello%20Elite%20Sportsville'
                  >
                    +234 903 418 1221
                  </a>
                </dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Email</span>
                  <EnvelopeIcon
                    className='h-7 w-6 text-gray-100'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  <a
                    className='hover:text-gray-100'
                    href='mailto:elitesportsville@gmail.com'
                  >
                    elitesportsville@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'
        >
          <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-semibold leading-6 text-white'
                >
                  First name
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    name='firstName'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-bright-purple-dark sm:text-sm sm:leading-6'
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-semibold leading-6 text-white'
                >
                  Last name
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    name='lastName'
                    id='last-name'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-bright-purple-dark sm:text-sm sm:leading-6'
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold leading-6 text-white'
                >
                  Email
                </label>
                <div className='mt-2.5'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-bright-purple-dark sm:text-sm sm:leading-6'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='phone-number'
                  className='block text-sm font-semibold leading-6 text-white'
                >
                  Phone number
                </label>
                <div className='mt-2.5'>
                  <input
                    type='tel'
                    name='phoneNumber'
                    id='phone-number'
                    autoComplete='tel'
                    className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-bright-purple-dark sm:text-sm sm:leading-6'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {errors.phoneNumber && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='message'
                  className='block text-sm font-semibold leading-6 text-white'
                >
                  Message
                </label>
                <div className='mt-2.5'>
                  <textarea
                    name='message'
                    id='message'
                    rows={4}
                    className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-bright-purple-dark sm:text-sm sm:leading-6'
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='mt-8 flex justify-end'>
              <button
                type='submit'
                className='rounded-md bg-bright-purple-dark px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-bright-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple-dark'
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
