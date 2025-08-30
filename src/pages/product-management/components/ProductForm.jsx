import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductForm = ({ 
  isOpen = false, 
  onClose, 
  onSubmit, 
  product = null, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    category: 'sneakers',
    price: '',
    comparePrice: '',
    sku: '',
    barcode: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    seoTitle: '',
    seoDescription: '',
    tags: '',
    status: 'active'
  });

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');
  const [isDragOver, setIsDragOver] = useState(false);

  const sizes = {
    sneakers: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    bags: ['Small', 'Medium', 'Large', 'Extra Large']
  };

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Brown', value: '#A3A3A3' },
    { name: 'Gray', value: '#6B7280' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        brand: product?.brand || '',
        category: product?.category || 'sneakers',
        price: product?.price?.toString() || '',
        comparePrice: product?.comparePrice?.toString() || '',
        sku: product?.sku || '',
        barcode: product?.barcode || '',
        weight: product?.weight?.toString() || '',
        dimensions: product?.dimensions || { length: '', width: '', height: '' },
        seoTitle: product?.seoTitle || '',
        seoDescription: product?.seoDescription || '',
        tags: product?.tags?.join(', ') || '',
        status: product?.status || 'active'
      });
      setImages(product?.images || []);
      setVariants(product?.variants || []);
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        description: '',
        brand: '',
        category: 'sneakers',
        price: '',
        comparePrice: '',
        sku: '',
        barcode: '',
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        seoTitle: '',
        seoDescription: '',
        tags: '',
        status: 'active'
      });
      setImages([]);
      setVariants([]);
    }
    setErrors({});
    setActiveTab('basic');
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    if (name?.includes('.')) {
      const [parent, child] = name?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      alt: file?.name
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    handleImageUpload(files);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev?.filter(img => img?.id !== imageId));
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      size: sizes?.[formData?.category]?.[0],
      color: colors?.[0],
      stock: 0,
      price: formData?.price
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (variantId, field, value) => {
    setVariants(prev => prev?.map(variant => 
      variant?.id === variantId 
        ? { ...variant, [field]: value }
        : variant
    ));
  };

  const removeVariant = (variantId) => {
    setVariants(prev => prev?.filter(variant => variant?.id !== variantId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData?.brand?.trim()) newErrors.brand = 'Brand is required';
    if (!formData?.price || parseFloat(formData?.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData?.description?.trim()) newErrors.description = 'Description is required';
    if (images?.length === 0) newErrors.images = 'At least one product image is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      price: parseFloat(formData?.price),
      comparePrice: formData?.comparePrice ? parseFloat(formData?.comparePrice) : null,
      weight: formData?.weight ? parseFloat(formData?.weight) : null,
      tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(Boolean),
      images,
      variants
    };

    onSubmit(submitData);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'images', label: 'Images', icon: 'Image' },
    { id: 'variants', label: 'Variants', icon: 'Grid3X3' },
    { id: 'seo', label: 'SEO', icon: 'Search' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {product ? 'Update product information' : 'Create a new product for your inventory'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === tab?.id
                    ? 'border-accent text-accent' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Product Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    error={errors?.name}
                    placeholder="Enter product name"
                    required
                  />
                  <Input
                    label="Brand"
                    name="brand"
                    value={formData?.brand}
                    onChange={handleInputChange}
                    error={errors?.brand}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="sneakers">Sneakers</option>
                      <option value="bags">Bags</option>
                    </select>
                  </div>
                  <Input
                    label="Price (GH₵)"
                    type="number"
                    name="price"
                    value={formData?.price}
                    onChange={handleInputChange}
                    error={errors?.price}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                  <Input
                    label="Compare Price (GH₵)"
                    type="number"
                    name="comparePrice"
                    value={formData?.comparePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData?.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                    placeholder="Enter product description..."
                  />
                  {errors?.description && (
                    <p className="mt-1 text-sm text-error">{errors?.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="SKU"
                    name="sku"
                    value={formData?.sku}
                    onChange={handleInputChange}
                    placeholder="Enter SKU"
                  />
                  <Input
                    label="Barcode"
                    name="barcode"
                    value={formData?.barcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData?.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                {/* Image Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-150 ${
                    isDragOver
                      ? 'border-accent bg-accent/5' :'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Icon name="Upload" size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Product Images
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop images here, or click to select files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e?.target?.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Select Images
                  </Button>
                  {errors?.images && (
                    <p className="mt-2 text-sm text-error">{errors?.images}</p>
                  )}
                </div>

                {/* Image Preview Grid */}
                {images?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images?.map((image, index) => (
                      <div key={image?.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={image?.url}
                            alt={image?.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeImage(image?.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Variants Tab */}
            {activeTab === 'variants' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
                    <p className="text-sm text-gray-600">
                      Manage different sizes and colors for this product
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={addVariant}
                  >
                    Add Variant
                  </Button>
                </div>

                {variants?.length === 0 ? (
                  <div className="text-center py-8 border border-gray-200 rounded-lg">
                    <Icon name="Grid3X3" size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No variants added</h3>
                    <p className="text-gray-600 mb-4">
                      Add size and color variants to manage inventory more effectively
                    </p>
                    <Button
                      type="button"
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={addVariant}
                    >
                      Add First Variant
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants?.map((variant) => (
                      <div key={variant?.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Size
                            </label>
                            <select
                              value={variant?.size}
                              onChange={(e) => updateVariant(variant?.id, 'size', e?.target?.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                            >
                              {sizes?.[formData?.category]?.map((size) => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Color
                            </label>
                            <select
                              value={variant?.color?.name}
                              onChange={(e) => {
                                const selectedColor = colors?.find(c => c?.name === e?.target?.value);
                                updateVariant(variant?.id, 'color', selectedColor);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                            >
                              {colors?.map((color) => (
                                <option key={color?.name} value={color?.name}>{color?.name}</option>
                              ))}
                            </select>
                          </div>
                          <Input
                            label="Stock"
                            type="number"
                            value={variant?.stock}
                            onChange={(e) => updateVariant(variant?.id, 'stock', parseInt(e?.target?.value) || 0)}
                            min="0"
                          />
                          <Input
                            label="Price (GH₵)"
                            type="number"
                            value={variant?.price}
                            onChange={(e) => updateVariant(variant?.id, 'price', e?.target?.value)}
                            min="0"
                            step="0.01"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeVariant(variant?.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Search Engine Optimization
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Optimize your product for search engines and social media sharing
                  </p>
                </div>

                <Input
                  label="SEO Title"
                  name="seoTitle"
                  value={formData?.seoTitle}
                  onChange={handleInputChange}
                  placeholder="Enter SEO title"
                  description="Recommended length: 50-60 characters"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData?.seoDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                    placeholder="Enter SEO description..."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended length: 150-160 characters
                  </p>
                </div>

                <Input
                  label="Tags"
                  name="tags"
                  value={formData?.tags}
                  onChange={handleInputChange}
                  placeholder="sneakers, nike, running, sports"
                  description="Separate tags with commas"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                iconName="Check"
                iconPosition="left"
              >
                {product ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;