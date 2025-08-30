import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import OrderDetailModal from './components/OrderDetailModal';
import OrderStats from './components/OrderStats';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    startDate: '',
    endDate: ''
  });

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD-001',
      orderNumber: 'SNB-2025-001',
      customer: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        phone: '+233 24 123 4567'
      },
      date: '2025-01-30T10:30:00Z',
      total: 450.00,
      subtotal: 400.00,
      shipping: 50.00,
      discount: 0,
      paymentMethod: 'mobile_money',
      paymentStatus: 'paid',
      transactionId: 'MTN-789456123',
      shippingRegion: 'Greater Accra',
      shippingAddress: {
        street: '123 Liberation Road',
        city: 'Accra',
        region: 'Greater Accra',
        landmark: 'Near Accra Mall'
      },
      status: 'processing',
      trackingNumber: 'GH-SNB-001-2025',
      items: [
        {
          name: 'Nike Air Force 1 White',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
          quantity: 1,
          price: 280.00,
          size: '42',
          color: 'White'
        },
        {
          name: 'Adidas Backpack Black',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          quantity: 1,
          price: 120.00,
          color: 'Black'
        }
      ],
      timeline: [
        {
          title: 'Order Placed',
          date: '2025-01-30T10:30:00Z',
          status: 'completed',
          description: 'Order placed successfully with mobile money payment'
        },
        {
          title: 'Payment Confirmed',
          date: '2025-01-30T10:35:00Z',
          status: 'completed',
          description: 'MTN Mobile Money payment confirmed'
        },
        {
          title: 'Processing',
          date: '2025-01-30T11:00:00Z',
          status: 'current',
          description: 'Order is being prepared for shipment'
        }
      ]
    },
    {
      id: 'ORD-002',
      orderNumber: 'SNB-2025-002',
      customer: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        phone: '+233 20 987 6543'
      },
      date: '2025-01-29T15:45:00Z',
      total: 320.00,
      subtotal: 280.00,
      shipping: 40.00,
      discount: 0,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      transactionId: 'CARD-456789123',
      shippingRegion: 'Ashanti',
      shippingAddress: {
        street: '45 Kumasi Road',
        city: 'Kumasi',
        region: 'Ashanti',
        landmark: 'Near Kejetia Market'
      },
      status: 'shipped',
      trackingNumber: 'GH-SNB-002-2025',
      items: [
        {
          name: 'Jordan 1 Retro High',
          image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
          quantity: 1,
          price: 280.00,
          size: '38',
          color: 'Red/Black'
        }
      ],
      timeline: [
        {
          title: 'Order Placed',
          date: '2025-01-29T15:45:00Z',
          status: 'completed',
          description: 'Order placed with credit card payment'
        },
        {
          title: 'Payment Confirmed',
          date: '2025-01-29T15:50:00Z',
          status: 'completed',
          description: 'Credit card payment processed successfully'
        },
        {
          title: 'Processing',
          date: '2025-01-29T16:30:00Z',
          status: 'completed',
          description: 'Order prepared and packaged'
        },
        {
          title: 'Shipped',
          date: '2025-01-30T09:00:00Z',
          status: 'current',
          description: 'Package shipped via DHL Ghana'
        }
      ]
    },
    {
      id: 'ORD-003',
      orderNumber: 'SNB-2025-003',
      customer: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        phone: '+233 26 555 7890'
      },
      date: '2025-01-28T12:20:00Z',
      total: 180.00,
      subtotal: 150.00,
      shipping: 30.00,
      discount: 0,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pending',
      transactionId: null,
      shippingRegion: 'Northern',
      shippingAddress: {
        street: '78 Tamale Street',
        city: 'Tamale',
        region: 'Northern',
        landmark: 'Near Central Mosque'
      },
      status: 'pending',
      trackingNumber: null,
      items: [
        {
          name: 'Canvas Messenger Bag',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          quantity: 1,
          price: 150.00,
          color: 'Brown'
        }
      ],
      timeline: [
        {
          title: 'Order Placed',
          date: '2025-01-28T12:20:00Z',
          status: 'completed',
          description: 'Order placed with cash on delivery option'
        },
        {
          title: 'Awaiting Processing',
          date: '2025-01-28T12:25:00Z',
          status: 'current',
          description: 'Order awaiting confirmation and processing'
        }
      ]
    }
  ];

  // Mock stats data
  const mockStats = {
    totalOrders: 1247,
    totalOrdersChange: 12.5,
    pendingOrders: 23,
    pendingOrdersChange: -8.2,
    revenueToday: 2450.00,
    revenueTodayChange: 15.3,
    avgOrderValue: 285.50,
    avgOrderValueChange: 5.7
  };

  // Mock order counts for filters
  const mockOrderCounts = {
    total: 1247,
    pending: 23,
    processing: 45,
    shipped: 67,
    delivered: 1089,
    cancelled: 23
  };

  const [orders, setOrders] = useState(mockOrders);
  const [stats, setStats] = useState(mockStats);
  const [orderCounts, setOrderCounts] = useState(mockOrderCounts);

  // Filter orders based on current filters
  const filteredOrders = orders?.filter(order => {
    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      const matchesSearch = 
        order?.orderNumber?.toLowerCase()?.includes(searchTerm) ||
        order?.customer?.name?.toLowerCase()?.includes(searchTerm) ||
        order?.customer?.email?.toLowerCase()?.includes(searchTerm);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters?.status !== 'all' && order?.status !== filters?.status) {
      return false;
    }

    // Date range filter
    if (filters?.dateRange !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          if (orderDate?.toDateString() !== today?.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (orderDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (orderDate < monthAgo) return false;
          break;
        case 'custom':
          if (filters?.startDate && orderDate < new Date(filters.startDate)) return false;
          if (filters?.endDate && orderDate > new Date(filters.endDate)) return false;
          break;
      }
    }

    return true;
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders?.map(order => 
        order?.id === orderId 
          ? { 
              ...order, 
              status: newStatus,
              timeline: [
                ...order?.timeline,
                {
                  title: `Status changed to ${newStatus}`,
                  date: new Date()?.toISOString(),
                  status: 'current',
                  description: `Order status updated to ${newStatus} by admin`
                }
              ]
            }
          : order
      )
    );
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        console.log('Exporting selected orders:', selectedOrders);
        break;
      case 'mark_shipped':
        setOrders(prevOrders => 
          prevOrders?.map(order => 
            selectedOrders?.includes(order?.id) 
              ? { ...order, status: 'shipped' }
              : order
          )
        );
        setSelectedOrders([]);
        break;
      default:
        break;
    }
  };

  const handleOrderSelection = (orderIds) => {
    setSelectedOrders(orderIds);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track all customer orders across Ghana
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export all orders')}
                >
                  Export Orders
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/product-management')}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <OrderStats stats={stats} />

          {/* Filters */}
          <OrderFilters 
            onFiltersChange={handleFiltersChange}
            orderCounts={orderCounts}
          />

          {/* Orders Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Orders ({filteredOrders?.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
                  More Filters
                </Button>
                <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
                  Refresh
                </Button>
              </div>
            </div>

            <OrderTable
              orders={filteredOrders}
              onOrderSelect={handleOrderSelect}
              onStatusUpdate={handleStatusUpdate}
              onBulkAction={handleBulkAction}
              selectedOrders={selectedOrders}
              onOrderSelection={handleOrderSelection}
            />
          </div>

          {/* Pagination */}
          {filteredOrders?.length > 10 && (
            <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg">
              <div className="flex items-center text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredOrders?.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderManagement;