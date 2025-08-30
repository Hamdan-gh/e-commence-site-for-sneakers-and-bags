import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import OrderManagement from './pages/order-management';
import ProductManagement from './pages/product-management';
import UserAccountDashboard from './pages/user-account-dashboard';
import UserAuthenticationPage from './pages/user-authentication-login-register';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
