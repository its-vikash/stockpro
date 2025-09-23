import React, { useState } from 'react';
import { Search, X, RefreshCw, Filter } from 'lucide-react';

const DerivativesFilter = ({ onSearch, indices, instrumentTypes }) => {
  const [filters, setFilters] = useState({
    symbol: '',
    instrumentType: '',
    date: '',
    expiryDate: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      symbol: '',
      instrumentType: '',
      date: '',
      expiryDate: ''
    });
    onSearch({
      symbol: '',
      instrumentType: '',
      date: '',
      expiryDate: ''
    });
  };

  const handleRefresh = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 mt-6">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h3 className="font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" /> Filters
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md bg-gray-100"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
            <select
              name="symbol"
              value={filters.symbol}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {indices.map(index => (
                <option key={index} value={index}>{index}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instrument Type</label>
            <select
              name="instrumentType"
              value={filters.instrumentType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {instrumentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={filters.expiryDate}
              onChange={handleChange}
              min={filters.date}
              className="cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={handleSearch}
              className="cursor-pointer flex-1 flex items-center justify-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Search size={18} className="mr-1" /> Search
            </button>
            <button
              onClick={handleClear}
              className="cursor-pointer flex-1 flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <X size={18} className="mr-1" /> Clear
            </button>
            <button
              onClick={handleRefresh}
              className="cursor-pointer flex-1 flex items-center justify-center bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <RefreshCw size={18} className="mr-1" /> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerivativesFilter;