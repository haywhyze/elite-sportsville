import classNames from "classnames";

const TimeSlot = ({
  time,
  price,
  isBooked,
  onSelect,
  selected,
  isUnavailable,
}: {
  time: string;
  price: number;
  isBooked: boolean;
  onSelect: () => void;
  selected: boolean;
  isUnavailable: boolean;
}) => {
  return (
    <button
      className={classNames(
        'px-1 py-2 text-xs lg:text-sm border rounded-md shadow-sm w-24',
        {
          'bg-gray-200 text-gray-600': isUnavailable,
          'outline outline-2 outline-offset-1 outline-dark-green bg-green-200 text-dark-purple':
            selected,
          'text-dark-purple bg-green-50': !selected && !isBooked,
          'cursor-not-allowed bg-gray-600 text-gray-100': isBooked,
          'cursor-pointer lg:hover:bg-green-100 lg:hover:text-dark-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-yellow':
            !isBooked,
        }
      )}
      disabled={isBooked}
      onClick={onSelect}
      type='button'
    >
      {time} <br />
      {isUnavailable ? (
        <span className='block text-xs'>Unavailable</span>
      ) : isBooked ? (
        <span className='block text-xs'>Booked</span>
      ) : (
        <span className='block text-xs'>₦{price.toLocaleString()}</span>
      )}
    </button>
  );
};

export default TimeSlot;

// w-full sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1rem)]
