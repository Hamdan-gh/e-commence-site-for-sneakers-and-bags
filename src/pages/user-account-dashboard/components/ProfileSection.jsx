import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Kwame',
    lastName: 'Asante',
    email: 'kwame.asante@gmail.com',
    phone: '+233 24 123 4567',
    dateOfBirth: '1995-03-15',
    gender: 'male'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
    } catch (error) {
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    setFormData({
      firstName: 'Kwame',
      lastName: 'Asante',
      email: 'kwame.asante@gmail.com',
      phone: '+233 24 123 4567',
      dateOfBirth: '1995-03-15',
      gender: 'male'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      {/* Profile Avatar */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {formData?.firstName?.charAt(0)}{formData?.lastName?.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {formData?.firstName} {formData?.lastName}
          </h3>
          <p className="text-sm text-gray-600">{formData?.email}</p>
          {isEditing && (
            <Button variant="link" size="sm" className="mt-1 p-0 h-auto">
              Change Photo
            </Button>
          )}
        </div>
      </div>
      {/* Profile Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            disabled={!isEditing}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            disabled={!isEditing}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          disabled={!isEditing}
          description="Include Ghana country code (+233)"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData?.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData?.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {isEditing && (
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      {/* Password Change Section */}
      {!isEditing && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Password</h3>
              <p className="text-sm text-gray-600 mt-1">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" iconName="Key" iconPosition="left">
              Change Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;