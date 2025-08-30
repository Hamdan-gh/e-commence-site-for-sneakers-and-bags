import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home Address',
      fullName: 'Kwame Asante',
      phone: '+233 24 123 4567',
      addressLine1: 'House No. 15, Nii Okaiman Street',
      addressLine2: 'East Legon',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: 'GA-123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Office Address',
      fullName: 'Kwame Asante',
      phone: '+233 24 123 4567',
      addressLine1: 'Plot 15, Liberation Road',
      addressLine2: 'Ridge',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: 'GA-456-7890',
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    region: '',
    postalCode: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const ghanaRegions = [
    'Greater Accra',
    'Ashanti',
    'Western',
    'Central',
    'Eastern',
    'Northern',
    'Upper East',
    'Upper West',
    'Volta',
    'Brong-Ahafo',
    'Western North',
    'Ahafo',
    'Bono East',
    'North East',
    'Savannah',
    'Oti'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) newErrors.name = 'Address name is required';
    if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.addressLine1?.trim()) newErrors.addressLine1 = 'Address line 1 is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.region) newErrors.region = 'Region is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (editingAddress) {
        setAddresses(prev => prev?.map(addr => 
          addr?.id === editingAddress?.id 
            ? { ...formData, id: editingAddress?.id }
            : formData?.isDefault ? { ...addr, isDefault: false } : addr
        ));
      } else {
        const newAddress = {
          ...formData,
          id: Date.now()
        };
        setAddresses(prev => 
          formData?.isDefault 
            ? [...prev?.map(addr => ({ ...addr, isDefault: false })), newAddress]
            : [...prev, newAddress]
        );
      }
      
      resetForm();
    } catch (error) {
      setErrors({ submit: 'Failed to save address. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      postalCode: '',
      isDefault: false
    });
    setShowForm(false);
    setEditingAddress(null);
    setErrors({});
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
    }
  };

  const handleSetDefault = async (addressId) => {
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isDefault: addr?.id === addressId
    })));
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your shipping addresses</p>
        </div>
        {!showForm && (
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowForm(true)}
          >
            Add Address
          </Button>
        )}
      </div>
      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address Type</label>
                <select
                  name="type"
                  value={formData?.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Input
                label="Address Name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                error={errors?.name}
                placeholder="e.g., Home, Office"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData?.fullName}
                onChange={handleInputChange}
                error={errors?.fullName}
                placeholder="Recipient's full name"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                error={errors?.phone}
                placeholder="+233 XX XXX XXXX"
                required
              />
            </div>

            <Input
              label="Address Line 1"
              type="text"
              name="addressLine1"
              value={formData?.addressLine1}
              onChange={handleInputChange}
              error={errors?.addressLine1}
              placeholder="House number and street name"
              required
            />

            <Input
              label="Address Line 2"
              type="text"
              name="addressLine2"
              value={formData?.addressLine2}
              onChange={handleInputChange}
              placeholder="Apartment, suite, area (optional)"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                type="text"
                name="city"
                value={formData?.city}
                onChange={handleInputChange}
                error={errors?.city}
                placeholder="City"
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Region *</label>
                <select
                  name="region"
                  value={formData?.region}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent ${
                    errors?.region ? 'border-error' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select Region</option>
                  {ghanaRegions?.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors?.region && (
                  <p className="text-sm text-error">{errors?.region}</p>
                )}
              </div>
              <Input
                label="Postal Code"
                type="text"
                name="postalCode"
                value={formData?.postalCode}
                onChange={handleInputChange}
                placeholder="GA-123-4567"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData?.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{errors?.submit}</p>
              </div>
            )}

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                {editingAddress ? 'Update Address' : 'Save Address'}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Addresses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses?.map((address) => (
          <div key={address?.id} className="bg-white rounded-lg border border-gray-200 p-6 relative">
            {address?.isDefault && (
              <div className="absolute top-4 right-4">
                <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Default
                </span>
              </div>
            )}

            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name={getAddressTypeIcon(address?.type)} size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{address?.name}</h3>
                <p className="text-sm text-gray-600">{address?.fullName}</p>
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>{address?.addressLine1}</p>
              {address?.addressLine2 && <p>{address?.addressLine2}</p>}
              <p>{address?.city}, {address?.region}</p>
              {address?.postalCode && <p>{address?.postalCode}</p>}
              <p className="font-medium text-gray-900">{address?.phone}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {!address?.isDefault && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleSetDefault(address?.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleDelete(address?.id)}
                  className="text-error hover:text-error"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {addresses?.length === 0 && !showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Icon name="MapPin" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-4">Add your delivery addresses to make checkout faster</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowForm(true)}
          >
            Add Your First Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressesSection;