import React from 'react';

const DateTimePicker = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="font-medium mr-2">Sélectionner créneau : </label>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-1 shadow"
      />
    </div>
  );
};

export default DateTimePicker;
