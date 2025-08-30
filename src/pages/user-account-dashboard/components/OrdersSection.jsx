import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrdersSection = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-15',
      status: 'delivered',
      total: 450.00,
      items: [
        {
          id: 1,
          name: 'Nike Air Max 270',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          size: 'UK 9',
          color: 'Black/White',
          quantity: 1,
          price: 320.00
        },
        {
          id: 2,
          name: 'Leather Crossbody Bag',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          color: 'Brown',
          quantity: 1,
          price: 130.00
        }
      ],
      timeline: [
        { status: 'Order Placed', date: '2025-01-15 10:30', completed: true },
        { status: 'Payment Confirmed', date: '2025-01-15 10:35', completed: true },
        { status: 'Processing', date: '2025-01-15 14:20', completed: true },
        { status: 'Shipped', date: '2025-01-16 09:15', completed: true },
        { status: 'Out for Delivery', date: '2025-01-17 08:00', completed: true },
        { status: 'Delivered', date: '2025-01-17 15:30', completed: true }
      ],
      shippingAddress: 'East Legon, Accra, Greater Accra Region',
      trackingNumber: 'GH2025001234'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-20',
      status: 'shipped',
      total: 280.00,
      items: [
        {
          id: 3,
          name: 'Adidas Ultraboost 22',
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
          size: 'UK 8.5',
          color: 'White/Blue',
          quantity: 1,
          price: 280.00
        }
      ],
      timeline: [
        { status: 'Order Placed', date: '2025-01-20 16:45', completed: true },
        { status: 'Payment Confirmed', date: '2025-01-20 16:50', completed: true },
        { status: 'Processing', date: '2025-01-21 09:00', completed: true },
        { status: 'Shipped', date: '2025-01-22 11:30', completed: true },
        { status: 'Out for Delivery', date: '', completed: false },
        { status: 'Delivered', date: '', completed: false }
      ],
      shippingAddress: 'Kumasi, Ashanti Region',
      trackingNumber: 'GH2025001235'
    },
    {
      id: 'ORD-2025-003',
      date: '2025-01-25',
      status: 'pending',
      total: 195.00,
      items: [
        {
          id: 4,
          name: 'Canvas Tote Bag',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          color: 'Navy Blue',
          quantity: 1,
          price: 85.00
        },
        {
          id: 5,
          name: 'Converse Chuck Taylor',
          image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400',
          size: 'UK 7',
          color: 'Red',
          quantity: 1,
          price: 110.00
        }
      ],
      timeline: [
        { status: 'Order Placed', date: '2025-01-25 14:20', completed: true },
        { status: 'Payment Confirmed', date: '', completed: false },
        { status: 'Processing', date: '', completed: false },
        { status: 'Shipped', date: '', completed: false },
        { status: 'Out for Delivery', date: '', completed: false },
        { status: 'Delivered', date: '', completed: false }
      ],
      shippingAddress: 'Tema, Greater Accra Region',
      trackingNumber: 'Pending'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'shipped':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'pending':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === filterStatus);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `GH₵ ${amount?.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Orders', count: orders?.length },
            { key: 'pending', label: 'Pending', count: orders?.filter(o => o?.status === 'pending')?.length },
            { key: 'shipped', label: 'Shipped', count: orders?.filter(o => o?.status === 'shipped')?.length },
            { key: 'delivered', label: 'Delivered', count: orders?.filter(o => o?.status === 'delivered')?.length }
          ]?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => setFilterStatus(filter?.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                filterStatus === filter?.key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {filter?.label} ({filter?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Icon name="Package" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' ? "You haven't placed any orders yet." 
                : `No ${filterStatus} orders found.`
              }
            </p>
            <Button variant="default" iconName="ShoppingBag" iconPosition="left">
              Start Shopping
            </Button>
          </div>
        ) : (
          filteredOrders?.map((order) => (
            <div key={order?.id} className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order?.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order?.date)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    <Icon name={getStatusIcon(order?.status)} size={12} className="inline mr-1" />
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(order?.total)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName={selectedOrder === order?.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    onClick={() => setSelectedOrder(selectedOrder === order?.id ? null : order?.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center space-x-3 mb-4">
                {order?.items?.slice(0, 3)?.map((item, index) => (
                  <div key={item?.id} className="relative">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index === 2 && order?.items?.length > 3 && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          +{order?.items?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    Shipping to {order?.shippingAddress}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order?.id && (
                <div className="border-t border-gray-200 pt-4 space-y-6">
                  {/* Items List */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order?.items?.map((item) => (
                        <div key={item?.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={item?.image}
                              alt={item?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{item?.name}</h5>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              {item?.size && <span>Size: {item?.size}</span>}
                              <span>Color: {item?.color}</span>
                              <span>Qty: {item?.quantity}</span>
                            </div>
                          </div>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(item?.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Order Timeline</h4>
                    <div className="space-y-3">
                      {order?.timeline?.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            step?.completed ? 'bg-success' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              step?.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step?.status}
                            </p>
                            {step?.date && (
                              <p className="text-xs text-gray-500">{step?.date}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Info */}
                  {order?.trackingNumber !== 'Pending' && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Tracking Number</p>
                          <p className="text-sm text-gray-600">{order?.trackingNumber}</p>
                        </div>
                        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                          Track Package
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                      Download Invoice
                    </Button>
                    <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                      Contact Support
                    </Button>
                    {order?.status === 'delivered' && (
                      <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
                        Return Items
                      </Button>
                    )}
                    {order?.status === 'pending' && (
                      <Button variant="destructive" size="sm" iconName="X" iconPosition="left">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersSection;