import React from 'react';
import { Link } from 'react-router-dom';
import { dummyData } from '../data/dummyData';

const TopDerivatives = () => {
  // Get top 5 derivatives by volume
  const topDerivatives = [...dummyData.derivatives]
    .sort((a, b) => parseInt(b.volume) - parseInt(a.volume))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Top Derivatives by Volume</h3>
        <Link to="/derivatives" className="text-primary hover:text-primary-dark text-sm font-medium">
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {topDerivatives.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-semibold">{item.symbol}</div>
              <div className="text-sm text-gray-500">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">₹{item.price.toFixed(2)}</div>
              <div className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDerivatives;