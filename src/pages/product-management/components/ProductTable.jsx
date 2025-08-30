import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEditProduct, 
  onDeleteProduct,
  onViewProduct 
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'price') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Inactive' },
      'out-of-stock': { bg: 'bg-error/10', text: 'text-error', label: 'Out of Stock' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const getStockIndicator = (stock) => {
    if (stock === 0) return { color: 'text-error', icon: 'AlertCircle' };
    if (stock <= 10) return { color: 'text-warning', icon: 'AlertTriangle' };
    return { color: 'text-success', icon: 'CheckCircle' };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length && products?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProducts?.map((product) => {
              const stockIndicator = getStockIndicator(product?.stock);
              return (
                <tr key={product?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(product?.id)}
                      onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {product?.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {product?.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    GH₵ {product?.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={stockIndicator?.icon} size={16} className={stockIndicator?.color} />
                      <span className={`text-sm font-medium ${stockIndicator?.color}`}>
                        {product?.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product?.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewProduct(product)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditProduct(product)}
                        className="text-gray-400 hover:text-accent"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteProduct(product?.id)}
                        className="text-gray-400 hover:text-error"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {sortedProducts?.map((product) => {
          const stockIndicator = getStockIndicator(product?.stock);
          return (
            <div key={product?.id} className="p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedProducts?.includes(product?.id)}
                  onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                  className="mt-1 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product?.brand}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {product?.category}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          GH₵ {product?.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Icon name={stockIndicator?.icon} size={14} className={stockIndicator?.color} />
                          <span className={`text-xs font-medium ${stockIndicator?.color}`}>
                            Stock: {product?.stock}
                          </span>
                        </div>
                        {getStatusBadge(product?.status)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewProduct(product)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditProduct(product)}
                        className="text-gray-400 hover:text-accent"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteProduct(product?.id)}
                        className="text-gray-400 hover:text-error"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Empty State */}
      {products?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first product to the inventory.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;