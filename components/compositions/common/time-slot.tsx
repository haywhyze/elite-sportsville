import classNames from "classnames";

const TimeSlot = ({
  time,
  price,
  isBooked,
  onSelect,
  selected,
}: {
  time: string;
  price: number;
  isBooked: boolean;
  onSelect: () => void;
  selected: boolean;
}) => {
  return (
    <button
      className={classNames(
        'px-1 py-2 w-[calc(35%-1rem)] lg:w-[calc(20%-1rem)] text-xs lg:text-sm border rounded-md shadow-sm',
        {
          'bg-dark-purple text-white': selected,
          'text-dark-purple bg-green-50': !selected && !isBooked,
          'cursor-not-allowed bg-gray-600 text-gray-100': isBooked,
          'cursor-pointer lg:hover:bg-dark-purple lg:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-yellow':
            !isBooked,
        }
      )}
      disabled={isBooked}
      onClick={onSelect}
      type='button'
    >
      {time} <br />
      {isBooked ? (
        <span className='block text-xs'>Booked</span>
      ) : (
        <span className='block text-xs'>₦{price.toLocaleString()}</span>
      )}
    </button>
  );
};

export default TimeSlot;

// w-full sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1rem)]