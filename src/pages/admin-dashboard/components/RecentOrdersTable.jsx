import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersTable = () => {
  const recentOrders = [
    {
      id: 'ORD-2025-001',
      customer: 'Kwame Asante',
      email: 'kwame.asante@gmail.com',
      amount: 450.00,
      status: 'pending',
      date: '2025-01-30',
      items: 2,
      region: 'Greater Accra'
    },
    {
      id: 'ORD-2025-002',
      customer: 'Ama Osei',
      email: 'ama.osei@yahoo.com',
      amount: 320.00,
      status: 'shipped',
      date: '2025-01-30',
      items: 1,
      region: 'Ashanti'
    },
    {
      id: 'ORD-2025-003',
      customer: 'Kofi Mensah',
      email: 'kofi.mensah@hotmail.com',
      amount: 680.00,
      status: 'delivered',
      date: '2025-01-29',
      items: 3,
      region: 'Greater Accra'
    },
    {
      id: 'ORD-2025-004',
      customer: 'Akosua Boateng',
      email: 'akosua.boateng@gmail.com',
      amount: 290.00,
      status: 'cancelled',
      date: '2025-01-29',
      items: 1,
      region: 'Western'
    },
    {
      id: 'ORD-2025-005',
      customer: 'Yaw Oppong',
      email: 'yaw.oppong@outlook.com',
      amount: 520.00,
      status: 'pending',
      date: '2025-01-28',
      items: 2,
      region: 'Eastern'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: 'Clock' },
      shipped: { color: 'bg-accent/10 text-accent border-accent/20', icon: 'Truck' },
      delivered: { color: 'bg-success/10 text-success border-success/20', icon: 'CheckCircle' },
      cancelled: { color: 'bg-error/10 text-error border-error/20', icon: 'XCircle' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-600">Latest customer transactions</p>
          </div>
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View All Orders
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders?.map((order) => (
              <tr key={order?.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order?.id}</p>
                    <p className="text-xs text-gray-500">{order?.date} • {order?.items} items</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order?.customer}</p>
                    <p className="text-xs text-gray-500">{order?.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-semibold text-gray-900">
                    GH₵ {order?.amount?.toFixed(2)}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">{order?.region}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" title="View Order">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit Order">
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;