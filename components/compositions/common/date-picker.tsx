import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  handleDateChange,
}) => {
  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
    </div>
  );
};

export default CustomDatePicker;