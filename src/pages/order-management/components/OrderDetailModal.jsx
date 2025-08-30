import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdatingStatus(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdatingStatus(false);
    // In real app, this would update the order status
    console.log(`Updating order ${order?.id} status to ${newStatus}`);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: 'Clock' },
    { value: 'processing', label: 'Processing', icon: 'Package' },
    { value: 'shipped', label: 'Shipped', icon: 'Truck' },
    { value: 'delivered', label: 'Delivered', icon: 'CheckCircle' },
    { value: 'cancelled', label: 'Cancelled', icon: 'XCircle' }
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order #{order?.orderNumber}</h2>
            <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order?.date)}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Order Status & Actions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </span>
                  {order?.trackingNumber && (
                    <div className="text-sm text-gray-600">
                      Tracking: <span className="font-mono font-medium">{order?.trackingNumber}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {statusOptions?.map((status) => (
                    <Button
                      key={status?.value}
                      variant={order?.status === status?.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusUpdate(status?.value)}
                      loading={isUpdatingStatus}
                      iconName={status?.icon}
                      iconPosition="left"
                      disabled={order?.status === status?.value}
                    >
                      {status?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Icon name="User" size={20} className="mr-2" />
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{order?.customer?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{order?.customer?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900">{order?.customer?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Shipping Address
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">{order?.shippingAddress?.street}</p>
                  <p className="text-sm text-gray-900">{order?.shippingAddress?.city}</p>
                  <p className="text-sm text-gray-900">{order?.shippingAddress?.region}</p>
                  <p className="text-sm text-gray-900">Ghana</p>
                  {order?.shippingAddress?.landmark && (
                    <p className="text-sm text-gray-500">Landmark: {order?.shippingAddress?.landmark}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name={getPaymentMethodIcon(order?.paymentMethod)} size={16} />
                    <span className="text-sm text-gray-900 capitalize">
                      {order?.paymentMethod?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Status</label>
                  <p className={`text-sm font-medium mt-1 ${
                    order?.paymentStatus === 'paid' ? 'text-green-600' : 
                    order?.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {order?.paymentStatus?.charAt(0)?.toUpperCase() + order?.paymentStatus?.slice(1)}
                  </p>
                </div>
                {order?.transactionId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                    <p className="text-sm text-gray-900 font-mono">{order?.transactionId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Icon name="Package" size={20} className="mr-2" />
                Order Items ({order?.items?.length})
              </h3>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item?.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        {item?.size && (
                          <span className="text-sm text-gray-500">Size: {item?.size}</span>
                        )}
                        {item?.color && (
                          <span className="text-sm text-gray-500">Color: {item?.color}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {item?.quantity} × {formatCurrency(item?.price)}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item?.quantity * item?.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(order?.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">{formatCurrency(order?.shipping)}</span>
                </div>
                {order?.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-green-600">-{formatCurrency(order?.discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{formatCurrency(order?.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Icon name="Clock" size={20} className="mr-2" />
                Order Timeline
              </h3>
              <div className="space-y-4">
                {order?.timeline?.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event?.status === 'completed' ? 'bg-green-500' : 
                      event?.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event?.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(event?.date)}</p>
                      {event?.description && (
                        <p className="text-sm text-gray-600 mt-1">{event?.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Printer" iconPosition="left">
              Print Order
            </Button>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Download PDF
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" iconName="MessageSquare" iconPosition="left">
              Contact Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;