import { DialogBody, DialogDescription } from '@/components/dialog';
import CustomDatePicker from './date-picker';
import TimeSlot from './time-slot';
import Tabs from '@/components/tabs';
import SelectedTimeSlotsList from './selected-time-slots-list';
import { Tab, tabs } from '@/lib/constants';
import { generateTimeSlotsForDate, notify } from '@/lib/utils';
import { useState } from 'react';

export default function BookingStepOne({
  selectedDate,
  setSelectedDate,
  selectedTimeSlots,
  setSelectedTimeSlots,
  loading,
  bookings,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTimeSlots: any;
  setSelectedTimeSlots: (time: any) => void;
  bookings: any;
  loading: boolean;
}) {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const handleDateChange = (date: Date | null) => setSelectedDate(date);

  const onSelectTimeSlot = (slot: any) => {
    if (
      selectedTimeSlots
        .map((t: { id: string | number | undefined }) => t.id)
        .includes(slot.id)
    ) {
      setSelectedTimeSlots((prev: any) =>
        prev.filter(
          (time: { id: string | number | undefined }) => time.id !== slot.id
        )
      );
    } else if (selectedTimeSlots.length < 5) {
      setSelectedTimeSlots((prev: any) => [...prev, slot]);
    } else {
      notify({
        message: 'You can only book a maximum of 5 slots at a time',
        type: 'error',
      });
    }
  };
  const timeSlots = generateTimeSlotsForDate(
    selectedDate || new Date(),
    bookings.flatMap((booking: any) => booking.selectedTimeSlots)
  );

  const timeSlotsIntoPeriods = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.period]) {
      acc[slot.period] = [];
    }
    acc[slot.period].push(slot);
    return acc;
  }, {} as Record<string, any>);
  return (
    <>
      <DialogDescription>
        Select a date and time slot to book the pitch
      </DialogDescription>
      <DialogBody className='flex flex-col lg:flex-row lg:items-start mt-0 lg:mt-3'>
        {loading ? (
          // loading state
          <div className='w-full lg:w-3/5 mt-3 flex justify-center items-center'>
            <p className='text-center'>
              Loading available time slots for{' '}
              {selectedDate?.toLocaleDateString()}...
            </p>
          </div>
        ) : (
          <div className='w-full lg:w-3/5 mt-3 flex justify-start items-center sm:items-start flex-col'>
            <CustomDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
            {selectedDate && (
              <div className='w-full flex flex-col mt-6'>
                <Tabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <div className='flex flex-wrap gap-2 my-6 justify-center sm:justify-start items-start'>
                  {timeSlotsIntoPeriods[selectedTab.id].map((time: any) => (
                    <TimeSlot
                      key={time.id} // Add a unique key for each time slot
                      time={time.time}
                      price={time.price}
                      isBooked={time.isBooked}
                      onSelect={() => {
                        onSelectTimeSlot(time);
                      }}
                      selected={selectedTimeSlots
                        .map((t: { id: string | number | undefined }) => t.id)
                        .includes(time.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div className='w-full lg:w-2/5 text-center sm:text-left flex justify-center flex-col'>
          {selectedDate && (
            <SelectedTimeSlotsList
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          )}
        </div>
      </DialogBody>
    </>
  );
}
