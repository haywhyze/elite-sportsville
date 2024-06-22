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
      className={`px-1 py-2 w-[calc(35%-1rem)] lg:w-[calc(20%-1rem)] text-xs lg:text-sm border ${
        isBooked ? 'bg-gray-300' : 'bg-green-100'
      } ${
        selected && !isBooked ? 'bg-dark-purple text-white' : 'text-dark-purple'
      } rounded-md shadow-sm ${
        isBooked
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:bg-dark-purple hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-yellow'
      }`}
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
