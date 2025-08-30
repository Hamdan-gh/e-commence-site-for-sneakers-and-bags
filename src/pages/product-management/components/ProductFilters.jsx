import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  selectedStatus,
  onStatusChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  onBulkAction,
  selectedCount
}) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'sneakers', label: 'Sneakers' },
    { value: 'bags', label: 'Bags' }
  ];

  const brands = [
    { value: '', label: 'All Brands' },
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'puma', label: 'Puma' },
    { value: 'jordan', label: 'Jordan' },
    { value: 'gucci', label: 'Gucci' },
    { value: 'louis-vuitton', label: 'Louis Vuitton' },
    { value: 'prada', label: 'Prada' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const bulkActions = [
    { value: 'activate', label: 'Activate Selected', icon: 'CheckCircle' },
    { value: 'deactivate', label: 'Deactivate Selected', icon: 'XCircle' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' }
  ];

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand || selectedStatus || 
    priceRange?.min !== '' || priceRange?.max !== '';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Search and Bulk Actions Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="search"
              placeholder="Search products by name, brand, or SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedCount} selected
            </span>
            <div className="flex items-center space-x-2">
              {bulkActions?.map((action) => (
                <Button
                  key={action?.value}
                  variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                  size="sm"
                  iconName={action?.icon}
                  iconPosition="left"
                  onClick={() => onBulkAction(action?.value)}
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-sm"
          >
            {categories?.map((category) => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-sm"
          >
            {brands?.map((brand) => (
              <option key={brand?.value} value={brand?.value}>
                {brand?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-sm"
          >
            {statusOptions?.map((status) => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price (GH₵)
          </label>
          <Input
            type="number"
            placeholder="0"
            value={priceRange?.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e?.target?.value })}
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price (GH₵)
          </label>
          <Input
            type="number"
            placeholder="10000"
            value={priceRange?.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e?.target?.value })}
            min="0"
          />
        </div>
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Icon name="Filter" size={16} />
            <span>Active filters applied</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;