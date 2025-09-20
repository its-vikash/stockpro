import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, BarChart2, LineChart as LineChartIcon } from 'lucide-react';
import CandleStickChart from './CandleStickChart';

const DerivativeChart = ({ derivative, onBack }) => {
  const [activeChart, setActiveChart] = useState('candle'); // 'candle', 'line', or 'bar'

  // Mock price history data
  const priceHistory = [
    { time: '09:00', price: 82.10 },
    { time: '10:00', price: 83.45 },
    { time: '11:00', price: 84.20 },
    { time: '12:00', price: 85.75 },
    { time: '13:00', price: 86.45 },
    { time: '14:00', price: 85.20 },
    { time: '15:00', price: 86.10 },
    { time: '15:30', price: 86.45 },
  ];

  // Mock volume data
  const volumeData = [
    { time: '09:00', volume: 12000 },
    { time: '10:00', volume: 18500 },
    { time: '11:00', volume: 22500 },
    { time: '12:00', volume: 19500 },
    { time: '13:00', volume: 25000 },
    { time: '14:00', volume: 21000 },
    { time: '15:00', volume: 18000 },
    { time: '15:30', volume: 15000 },
  ];

  // Mock candle stick data
  const candleData = [
    { time: '2023-09-01', open: 82.10, high: 84.50, low: 81.50, close: 83.45 },
    { time: '2023-09-02', open: 83.45, high: 85.20, low: 82.80, close: 84.20 },
    { time: '2023-09-03', open: 84.20, high: 86.00, low: 83.50, close: 85.75 },
    { time: '2023-09-04', open: 85.75, high: 87.20, low: 84.80, close: 86.45 },
    { time: '2023-09-05', open: 86.45, high: 87.50, low: 84.50, close: 85.20 },
    { time: '2023-09-06', open: 85.20, high: 87.00, low: 84.80, close: 86.10 },
    { time: '2023-09-07', open: 86.10, high: 87.80, low: 85.50, close: 86.45 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Price Chart for {derivative.symbol}</h3>
        <button
          onClick={onBack}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Table
        </button>
      </div>

      {/* Chart Type Selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              activeChart === 'candle'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setActiveChart('candle')}
          >
            <BarChart2 className="h-4 w-4 inline mr-1" />
            Candle
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border-t border-b ${
              activeChart === 'line'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setActiveChart('line')}
          >
            <LineChartIcon className="h-4 w-4 inline mr-1" />
            Line
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              activeChart === 'bar'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setActiveChart('bar')}
          >
            <BarChart2 className="h-4 w-4 inline mr-1" />
            Volume
          </button>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="mb-6" style={{ height: '400px' }}>
        {activeChart === 'candle' && <CandleStickChart data={candleData} />}
        {activeChart === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#239BA7" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {activeChart === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" fill="#E1AA36" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Contract Details</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Symbol:</span> {derivative.symbol}</p>
            <p><span className="font-medium">Name:</span> {derivative.name}</p>
            <p><span className="font-medium">Type:</span> <span className={derivative.type === 'Call' ? 'text-green-600' : 'text-red-600'}>{derivative.type}</span></p>
            <p><span className="font-medium">Strike:</span> {derivative.strike}</p>
            <p><span className="font-medium">Expiry:</span> {derivative.expiry}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Market Data</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Price:</span> ₹{derivative.price.toFixed(2)}</p>
            <p><span className="font-medium">Change:</span> <span className={derivative.change >= 0 ? 'text-green-600' : 'text-red-600'}>
              {derivative.change >= 0 ? '+' : ''}{derivative.change.toFixed(2)} ({derivative.changePercent >= 0 ? '+' : ''}{derivative.changePercent.toFixed(2)}%)
            </span></p>
            <p><span className="font-medium">Volume:</span> {derivative.volume}</p>
            <p><span className="font-medium">Open Interest:</span> {derivative.openInterest}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerivativeChart;