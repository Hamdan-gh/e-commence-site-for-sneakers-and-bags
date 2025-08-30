import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderTable = ({ orders, onOrderSelect, onStatusUpdate, onBulkAction, selectedOrders, onOrderSelection }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      'mobile_money': 'Smartphone',
      'card': 'CreditCard',
      'cash_on_delivery': 'Banknote',
      'bank_transfer': 'Building2'
    };
    return icons?.[method] || 'DollarSign';
  };

  const formatCurrency = (amount) => {
    return `GH₵ ${amount?.toLocaleString('en-GH', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      onOrderSelection(orders?.map(order => order?.id));
    } else {
      onOrderSelection([]);
    }
  };

  const handleOrderSelection = (orderId, checked) => {
    if (checked) {
      onOrderSelection([...selectedOrders, orderId]);
    } else {
      onOrderSelection(selectedOrders?.filter(id => id !== orderId));
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Bulk Actions */}
      {selectedOrders?.length > 0 && (
        <div className="bg-accent/10 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {selectedOrders?.length} order{selectedOrders?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export')}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('mark_shipped')}
                iconName="Truck"
                iconPosition="left"
              >
                Mark as Shipped
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedOrders?.length === orders?.length && orders?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('orderNumber')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Order</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('customer')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Customer</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('total')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Total</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <React.Fragment key={order?.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => handleOrderSelection(order?.id, e?.target?.checked)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order?.orderNumber}</div>
                    <div className="text-sm text-gray-500">{order?.items?.length} item{order?.items?.length !== 1 ? 's' : ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order?.customer?.name}</div>
                    <div className="text-sm text-gray-500">{order?.customer?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(order?.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order?.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Icon name={getPaymentMethodIcon(order?.paymentMethod)} size={16} />
                      <span className="text-sm text-gray-900 capitalize">
                        {order?.paymentMethod?.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order?.shippingRegion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order?.status}
                      onChange={(e) => handleStatusChange(order?.id, e?.target?.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getStatusColor(order?.status)}`}
                    >
                      {statusOptions?.map((option) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleOrderExpansion(order?.id)}
                      >
                        <Icon name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOrderSelect(order)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedOrder === order?.id && (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Order Items</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order?.items?.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item?.name}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item?.quantity} × {formatCurrency(item?.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {orders?.map((order) => (
          <div key={order?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedOrders?.includes(order?.id)}
                  onChange={(e) => handleOrderSelection(order?.id, e?.target?.checked)}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                <div>
                  <p className="font-medium text-gray-900">#{order?.orderNumber}</p>
                  <p className="text-sm text-gray-500">{formatDate(order?.date)}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                {order?.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Customer:</span>
                <span className="text-sm font-medium text-gray-900">{order?.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total:</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(order?.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Payment:</span>
                <div className="flex items-center space-x-1">
                  <Icon name={getPaymentMethodIcon(order?.paymentMethod)} size={14} />
                  <span className="text-sm text-gray-900 capitalize">
                    {order?.paymentMethod?.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Region:</span>
                <span className="text-sm text-gray-900">{order?.shippingRegion}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleOrderExpansion(order?.id)}
                iconName={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"}
                iconPosition="left"
              >
                {expandedOrder === order?.id ? 'Hide' : 'Show'} Items
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOrderSelect(order)}
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
            </div>

            {expandedOrder === order?.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  {order?.items?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item?.name}</p>
                        <p className="text-sm text-gray-500">
                          {item?.quantity} × {formatCurrency(item?.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;