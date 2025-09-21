import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, BookOpen, Download } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'View Options Chain',
      description: 'Analyze options data for different strikes',
      icon: <BarChart3 className="h-8 w-8" />,
      link: '/options-chain',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Market Analysis',
      description: 'Get detailed market insights and trends',
      icon: <TrendingUp className="h-8 w-8" />,
      link: '/derivatives',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Learning Resources',
      description: 'Learn about derivatives trading strategies',
      icon: <BookOpen className="h-8 w-8" />,
      link: '/news',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Export Data',
      description: 'Download market data for analysis',
      icon: <Download className="h-8 w-8" />,
      link: '#',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.link}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${action.color}`}>
              {action.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;