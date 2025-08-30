import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ onFiltersChange, orderCounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orderCounts?.total },
    { value: 'pending', label: 'Pending', count: orderCounts?.pending },
    { value: 'processing', label: 'Processing', count: orderCounts?.processing },
    { value: 'shipped', label: 'Shipped', count: orderCounts?.shipped },
    { value: 'delivered', label: 'Delivered', count: orderCounts?.delivered },
    { value: 'cancelled', label: 'Cancelled', count: orderCounts?.cancelled }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFiltersChange({
      search: value,
      status: selectedStatus,
      dateRange,
      startDate,
      endDate
    });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFiltersChange({
      search: searchTerm,
      status,
      dateRange,
      startDate,
      endDate
    });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    if (range !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
    onFiltersChange({
      search: searchTerm,
      status: selectedStatus,
      dateRange: range,
      startDate: range === 'custom' ? startDate : '',
      endDate: range === 'custom' ? endDate : ''
    });
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    
    onFiltersChange({
      search: searchTerm,
      status: selectedStatus,
      dateRange,
      startDate: type === 'start' ? value : startDate,
      endDate: type === 'end' ? value : endDate
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setDateRange('all');
    setStartDate('');
    setEndDate('');
    onFiltersChange({
      search: '',
      status: 'all',
      dateRange: 'all',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter Orders</h2>
        <Button variant="outline" size="sm" onClick={clearFilters} iconName="X" iconPosition="left">
          Clear Filters
        </Button>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by order number, customer name, or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-md"
        />
      </div>
      {/* Status Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Order Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleStatusChange(option?.value)}
              className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                selectedStatus === option?.value
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option?.label}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                selectedStatus === option?.value
                  ? 'bg-accent-foreground/20 text-accent-foreground'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Date Range Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {dateRangeOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleDateRangeChange(option?.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                dateRange === option?.value
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option?.label}
            </button>
          ))}
        </div>

        {/* Custom Date Range */}
        {dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => handleDateChange('start', e?.target?.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => handleDateChange('end', e?.target?.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;