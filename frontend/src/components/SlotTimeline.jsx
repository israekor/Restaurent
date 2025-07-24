import React from 'react';

const SlotTimeline = ({ slots }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-full text-sm font-medium shadow transition duration-200 ${
            slot.reserved
              ? 'bg-red-500 text-white'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {slot.reserved ? '🔴' : '🟢'} {slot.start_time.slice(0, 5)} →{' '}
          {slot.end_time.slice(0, 5)}
        </div>
      ))}
    </div>
  );
};

export default SlotTimeline;
