import React, { useState, useEffect, useMemo } from 'react';
import { dummyData } from '../data/dummyData';
import DerivativesFilter from './DerivativesFilter';
import Pagination from './Pagination';
import DerivativeChart from './DerivativeChart';

const DerivativesDataTable = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDerivative, setSelectedDerivative] = useState(null);
  
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Available indices
  const indices = useMemo(() => {
    return ['All', ...new Set(dummyData.derivatives.map(d => d.underlying))];
  }, []);
  
  // Available instrument types
  const instrumentTypes = useMemo(() => {
    return ['All', 'Index Options', 'Active Contracts', 'Index Futures', 'Stock Options'];
  }, []);
  
  // Filter data based on filters
  const filteredData = useMemo(() => {
    let result = dummyData.derivatives;
    
    // Apply filters only if search button was clicked (filters are set)
    if (Object.keys(filters).length === 0) {
      return result;
    }
    
    if (filters.symbol && filters.symbol !== 'All') {
      result = result.filter(d => d.underlying === filters.symbol);
    }
    
    if (filters.instrumentType && filters.instrumentType !== 'All') {
      // This is a simplified filter - in a real app, you'd have proper mapping
      result = result.filter(d => {
        if (filters.instrumentType === 'Index Options') {
          return d.underlying === 'NIFTY' || d.underlying === 'BANKNIFTY';
        } else if (filters.instrumentType === 'Stock Options') {
          return d.underlying !== 'NIFTY' && d.underlying !== 'BANKNIFTY';
        }
        return true;
      });
    }
    
    if (filters.date) {
      // Filter by date logic would go here
    }
    
    if (filters.expiryDate) {
      // Filter by expiry date logic would go here
    }
    
    return result;
  }, [filters]);
  
  // Get current page data
  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData, itemsPerPage]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleRowClick = (derivative) => {
    setSelectedDerivative(derivative);
  };
  
  const handleBack = () => {
    setSelectedDerivative(null);
  };
  
  // If a derivative is selected, show its chart
  if (selectedDerivative) {
    return <DerivativeChart derivative={selectedDerivative} onBack={handleBack} />;
  }
  
  return (
    <div>
      <DerivativesFilter 
        onSearch={handleSearch} 
        indices={indices} 
        instrumentTypes={instrumentTypes} 
      />
      
      <div className="overflow-auto bg-white rounded-xl shadow-lg p-4 border border-slate-100">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="px-4 py-3 font-semibold text-slate-700">Symbol</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Contract</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Price</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Change</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Volume</th>
              <th className="px-4 py-3 font-semibold text-slate-700">OI</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.map((s,i)=>(
              <tr 
                key={i} 
                className="hover:bg-slate-50 transition-colors duration-150 group cursor-pointer"
                onClick={() => handleRowClick(s)}
              >
                <td className="px-4 py-3 font-semibold group-hover:text-accent2 transition-colors duration-150">{s.symbol}</td>
                <td className="px-4 py-3 text-sm">{s.name}</td>
                <td className="px-4 py-3 font-medium">₹{s.price.toFixed(2)}</td>
                <td className={`px-4 py-3 font-semibold ${s.change>=0? 'text-green-500':'text-red-500'} flex items-center`}>
                  {s.change>=0? 
                    <i className="fas fa-caret-up mr-1"></i> : 
                    <i className="fas fa-caret-down mr-1"></i>
                  }
                  {s.change>=0?'+':''}{s.change.toFixed(2)} ({s.changePercent>=0?'+':''}{s.changePercent.toFixed(2)}%)
                </td>
                <td className="px-4 py-3">{s.volume}</td>
                <td className="px-4 py-3">{s.openInterest}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.type === 'Call' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{s.expiry}</td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr><td colSpan={8} className="text-center p-6 text-slate-500">No derivatives found matching your criteria</td></tr>
            )}
          </tbody>
        </table>
        
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DerivativesDataTable;