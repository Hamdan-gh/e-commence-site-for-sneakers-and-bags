import React, { useState } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import RegionChart from './components/RegionChart';
import RecentOrdersTable from './components/RecentOrdersTable';
import TopProductsCard from './components/TopProductsCard';
import QuickActions from './components/QuickActions';
import LowStockAlert from './components/LowStockAlert';
import NotificationPanel from './components/NotificationPanel';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const kpiData = [
    {
      title: 'Total Sales',
      value: 'GH₵ 1,245,680',
      change: '+12.5%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Total Orders',
      value: '3,847',
      change: '+8.2%',
      trend: 'up',
      icon: 'ShoppingCart',
      color: 'accent'
    },
    {
      title: 'Active Users',
      value: '12,459',
      change: '+15.3%',
      trend: 'up',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Pending Orders',
      value: '24',
      change: '-5.1%',
      trend: 'down',
      icon: 'Clock',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back! Here's what's happening with SneaksNBags today.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date()?.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                trend={kpi?.trend}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <div className="xl:col-span-1">
              <RegionChart />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Recent Orders */}
            <div className="xl:col-span-2">
              <RecentOrdersTable />
            </div>

            {/* Right Column - Top Products */}
            <div className="xl:col-span-1">
              <TopProductsCard />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>

            {/* Low Stock Alerts */}
            <div className="lg:col-span-1">
              <LowStockAlert />
            </div>

            {/* Notifications */}
            <div className="lg:col-span-2 xl:col-span-1">
              <NotificationPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;