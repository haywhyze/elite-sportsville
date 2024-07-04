import { InformationCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

export default function PaymentInfo() {
  return (
    <div className='rounded-md bg-dark-purple p-4 mt-6'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon
            className='h-5 w-5 text-bright-yellow'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3 flex-1 n'>
          <h3 className='font-medium text-bright-yellow'>
            Payment Instructions:
          </h3>
          <p className='text-sm text-green-100 mt-1'>
            1. Transfer to:
            <br />
            <span className='pl-4'>Account Name: Yusuf Ayo Abdulkarim</span>
            <br />
            <span className='pl-4'>Account Number: 8031961496</span>
            <br />
            <span className='pl-4'>Bank: Opay</span>
            <br />
            2. Share receipt on WhatsApp:{' '}
            <a href='https://wa.me/2349034181221'>
              <strong>+234 903 418 1221</strong>
            </a>
            <br />
            <br />
            Once confirmed, you will receive a booking confirmation. Thank you
            for choosing Elite Sportsville!
            <br />
            For questions, contact us on
            <a href='https://wa.me/2349034181221'>
              <strong>WhatsApp</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
