import { addMonths, format } from 'date-fns';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import { ChevronDownIcon } from 'lucide-react';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

setDefaultLocale('en-GB');

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  handleDateChange,
}) => {
  const CustomInput = forwardRef<HTMLButtonElement, any>(
    ({ value, onClick }, ref) => (
      <button
        onClick={() => onClick()}
        type='button'
        ref={ref}
        className='rounded-md bg-bright-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-bright-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-purple'
      >
        {value || 'Select a date'}
        <ChevronDownIcon
          className='w-5 h-5 ml-2 -mr-1 inline-block'
          aria-hidden='true'
        />
      </button>
    )
  ) as React.ForwardRefRenderFunction<HTMLButtonElement, any>;

  CustomInput.displayName = 'CustomInput';

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 3)}
      dateFormat='eeee, do MMMM, yyyy'
      placeholderText='Select a date between today and 3 months from now'
      customInput={<CustomInput />}
      className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bright-purple focus:border-bright-purple sm:text-sm'
      calendarClassName='custom-calendar'
    />
  );
};

export default CustomDatePicker;
