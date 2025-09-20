import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Filter, Calendar } from 'lucide-react';

export default function OptionsChain() {
  const [selectedExpiry, setSelectedExpiry] = useState('28-SEP-2023');
  const [selectedStrike, setSelectedStrike] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  const expiries = ['28-SEP-2023', '26-OCT-2023', '30-NOV-2023'];
  const strikePrices = [19600, 19700, 19800, 19900, 20000];
  const optionTypes = ['Call', 'Put'];
  
  const optionsData = [
    { strike: 19600, callOi: '1.2L', callPrice: 152.45, callChange: 12.35, putPrice: 24.30, putChange: -1.25, putOi: '85K' },
    { strike: 19700, callOi: '98K', callPrice: 128.75, callChange: 9.85, putPrice: 32.75, putChange: 2.45, putOi: '92K' },
    { strike: 19800, callOi: '1.5L', callPrice: 86.45, callChange: 12.35, putPrice: 45.60, putChange: 5.20, putOi: '1.1L' },
    { strike: 19900, callOi: '85K', callPrice: 54.20, callChange: -3.45, putPrice: 68.90, putChange: -4.35, putOi: '96K' },
    { strike: 20000, callOi: '72K', callPrice: 32.10, callChange: 2.15, putPrice: 86.45, putChange: 7.85, putOi: '1.3L' }
  ];

  // Parse OI values for sorting
  const parseOiValue = (oiString) => {
    if (oiString.includes('L')) {
      return parseFloat(oiString) * 100000;
    } else if (oiString.includes('K')) {
      return parseFloat(oiString) * 1000;
    }
    return parseFloat(oiString);
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...optionsData];
    
    // Apply filters
    if (selectedStrike) {
      filteredData = filteredData.filter(item => item.strike === parseInt(selectedStrike));
    }
    
    if (selectedType) {
      // For type filtering, we need to handle differently since each row contains both call and put
      // In a real app, you might structure your data differently
    }
    
    // Apply sorting
    if (sortConfig.key !== null) {
      filteredData.sort((a, b) => {
        let aValue, bValue;
        
        if (sortConfig.key.includes('Oi')) {
          aValue = parseOiValue(a[sortConfig.key]);
          bValue = parseOiValue(b[sortConfig.key]);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [optionsData, selectedStrike, selectedType, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="h-4 w-4 opacity-30" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="h-4 w-4" />;
    }
    return <ChevronDown className="h-4 w-4" />;
  };

  const clearFilters = () => {
    setSelectedStrike('');
    setSelectedType('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">NIFTY Options Chain</h2>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" /> Filters
          </h3>
          <button 
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Clear Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <div className="relative">
              <select 
                value={selectedExpiry} 
                onChange={e => setSelectedExpiry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-8"
              >
                {expiries.map(expiry => (
                  <option key={expiry} value={expiry}>{expiry}</option>
                ))}
              </select>
              <Calendar className="h-4 w-4 absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Strike Price</label>
            <select 
              value={selectedStrike} 
              onChange={e => setSelectedStrike(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Strikes</option>
              {strikePrices.map(strike => (
                <option key={strike} value={strike}>{strike}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Option Type</label>
            <select 
              value={selectedType} 
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              {optionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Options Chain Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('strike')}
              >
                <div className="flex items-center">
                  Strike
                  {getSortIcon('strike')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('callOi')}
              >
                <div className="flex items-center">
                  Call OI
                  {getSortIcon('callOi')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('callPrice')}
              >
                <div className="flex items-center">
                  Call Price
                  {getSortIcon('callPrice')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('callChange')}
              >
                <div className="flex items-center">
                  Call Change
                  {getSortIcon('callChange')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('putPrice')}
              >
                <div className="flex items-center">
                  Put Price
                  {getSortIcon('putPrice')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('putChange')}
              >
                <div className="flex items-center">
                  Put Change
                  {getSortIcon('putChange')}
                </div>
              </th>
              
              <th 
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('putOi')}
              >
                <div className="flex items-center">
                  Put OI
                  {getSortIcon('putOi')}
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.strike}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(parseOiValue(item.callOi) / 150000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{item.callOi}</span>
                  </div>
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  ₹{item.callPrice.toFixed(2)}
                </td>
                
                <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold ${item.callChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.callChange >= 0 ? '+' : ''}{item.callChange.toFixed(2)}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  ₹{item.putPrice.toFixed(2)}
                </td>
                
                <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold ${item.putChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.putChange >= 0 ? '+' : ''}{item.putChange.toFixed(2)}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(parseOiValue(item.putOi) / 130000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{item.putOi}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No options data found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}