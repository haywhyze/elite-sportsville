import ms from 'ms'
import { toast } from 'react-toastify';

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

const parseDateTime = (slot: {
  id: number;
  time: string;
  date: string;
  period: string;
  price?: number;
  startTime?: number;
  endTime?: number;
}) => {
  const { time, date } = slot;
  // make sure to return a Date object with the time and date
  const startTime = time.split(' - ')[0];
  // get the hour from the start time and convert to 24hr format
  let startHour = parseInt(startTime);
  if (startTime.includes('pm')) {
    startHour = startHour === 12 ? startHour : startHour + 12;
  }
  return new Date(`${date.split('T')[0]} ${startHour}:00:00`);
};

export const sortTimeSlots = (slots: {
  id: number;
  time: string;
  date: string;
  period: string;
  price?: number;
  startTime?: number;
  endTime?: number;
}[]) => {
  return slots.sort((a, b) => {
    return parseDateTime(a).getTime() - parseDateTime(b).getTime();
  });
};

function formatTime(hour: number) {
  const period = hour < 12 ? "am" : "pm";
  const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${adjustedHour}${period}`;
}

function getPeriod(hour: number) {
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 16) return 'afternoon';
  if (hour >= 16 && hour < 19) return 'evening';
  return 'night';
}

export function generateTimeSlotsForDate(date: Date) {
  const startTime = 7; // Start time in hours (7 AM)
  const endTime = 22; // End time in hours (10 PM)
  const timeSlots = [];
  for (let hour = startTime; hour < endTime; hour++) {
    const startTimeString = formatTime(hour);
    const endTimeString = formatTime(hour + 1);
    const period = getPeriod(hour);

    timeSlots.push({
      id: `time-slot-${date.getTime()}|||${startTimeString}-${endTimeString}|||${period}`,
      time: `${startTimeString} - ${endTimeString}`,
      date: new Date(date).toISOString(),
      period: period,
      price: 5000
    });
  }

  return timeSlots;
}

import { ToastOptions, ToastPosition } from 'react-toastify';

export function notify({
  message,
  type = 'success',
  duration = 5000,
  toastId
}: {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  toastId?: string;
}) {
  const options: ToastOptions<unknown> = {
    position: 'top-right' as ToastPosition,
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastId
  }
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }
}
