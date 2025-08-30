import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';


const SalesChart = () => {
  const [timespan, setTimespan] = useState('weekly');

  const salesData = {
    daily: [
      { name: 'Mon', sales: 12500, orders: 45 },
      { name: 'Tue', sales: 15200, orders: 52 },
      { name: 'Wed', sales: 18900, orders: 67 },
      { name: 'Thu', sales: 22100, orders: 78 },
      { name: 'Fri', sales: 28500, orders: 95 },
      { name: 'Sat', sales: 35200, orders: 124 },
      { name: 'Sun', sales: 31800, orders: 112 }
    ],
    weekly: [
      { name: 'Week 1', sales: 125000, orders: 450 },
      { name: 'Week 2', sales: 152000, orders: 520 },
      { name: 'Week 3', sales: 189000, orders: 670 },
      { name: 'Week 4', sales: 221000, orders: 780 }
    ],
    monthly: [
      { name: 'Jan', sales: 450000, orders: 1800 },
      { name: 'Feb', sales: 520000, orders: 2100 },
      { name: 'Mar', sales: 670000, orders: 2650 },
      { name: 'Apr', sales: 780000, orders: 3100 },
      { name: 'May', sales: 890000, orders: 3550 },
      { name: 'Jun', sales: 920000, orders: 3680 }
    ]
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-success">
            Sales: GH₵ {payload?.[0]?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-accent">
            Orders: {payload?.[0]?.payload?.orders}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
          <p className="text-sm text-gray-600">Revenue trends and order volume</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={timespan === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimespan('daily')}
          >
            Daily
          </Button>
          <Button
            variant={timespan === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimespan('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={timespan === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimespan('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData?.[timespan]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `GH₵ ${(value / 1000)?.toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;