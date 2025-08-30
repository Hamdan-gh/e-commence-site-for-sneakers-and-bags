import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RegionChart = () => {
  const regionData = [
    { region: 'Greater Accra', orders: 1250, revenue: 450000 },
    { region: 'Ashanti', orders: 890, revenue: 320000 },
    { region: 'Northern', orders: 450, revenue: 162000 },
    { region: 'Western', orders: 380, revenue: 137000 },
    { region: 'Eastern', orders: 320, revenue: 115000 },
    { region: 'Central', orders: 280, revenue: 101000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-accent">
            Orders: {payload?.[0]?.value}
          </p>
          <p className="text-sm text-success">
            Revenue: GH₵ {payload?.[0]?.payload?.revenue?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Regional Performance</h3>
        <p className="text-sm text-gray-600">Orders by Ghana regions</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="region" 
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="orders" 
              fill="#f59e0b" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionChart;