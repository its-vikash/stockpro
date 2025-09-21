import React from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = ({ selectedDate, onDateChange, minDate }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        min={minDate}
        className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default DateFilter;