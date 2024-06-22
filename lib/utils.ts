import ms from 'ms'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

const parseDateTime = (slot: string) => {
  const [time, date] = slot.split('|||')
  // make sure to return a Date object with the time and date
  const startTime = time.split(' - ')[0];
  // get the hour from the start time and convert to 24hr format
  let startHour = parseInt(startTime);
  if (startTime.includes('pm')) {
    startHour = startHour === 12 ? startHour : startHour + 12;
  }
  return new Date(`${date} ${startHour}:00:00`);
};

export const sortTimeSlots = (slots: string[]) => {
  return slots.sort((a, b) => {
    return parseDateTime(a).getTime() - parseDateTime(b).getTime();
  });
};