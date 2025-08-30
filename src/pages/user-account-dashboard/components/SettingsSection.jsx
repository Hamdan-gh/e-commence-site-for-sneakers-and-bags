import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SettingsSection = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailOrders: true,
      emailPromotions: false,
      emailNewsletter: true,
      smsOrders: true,
      smsPromotions: false,
      pushNotifications: true
    },
    privacy: {
      profileVisibility: 'private',
      showPurchaseHistory: false,
      allowDataCollection: true
    },
    preferences: {
      language: 'en',
      currency: 'GHS',
      theme: 'light'
    }
  });

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [key]: !prev?.notifications?.[key]
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev?.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev?.preferences,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Save settings logic here
    } catch (error) {
      console.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Delete account logic here
      alert('Account deletion request submitted. You will receive a confirmation email.');
      setShowDeleteAccount(false);
      setDeleteConfirmation('');
    } catch (error) {
      console.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tw', name: 'Twi' },
    { code: 'ga', name: 'Ga' },
    { code: 'ee', name: 'Ewe' }
  ];

  const currencies = [
    { code: 'GHS', name: 'Ghana Cedi (GH₵)', symbol: 'GH₵' },
    { code: 'USD', name: 'US Dollar ($)', symbol: '$' },
    { code: 'EUR', name: 'Euro (€)', symbol: '€' }
  ];

  return (
    <div className="space-y-8">
      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            <p className="text-sm text-gray-600">Choose how you want to be notified</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
            <div className="space-y-3">
              {[
                { key: 'emailOrders', label: 'Order updates and shipping notifications', description: 'Get notified about your order status' },
                { key: 'emailPromotions', label: 'Promotional offers and discounts', description: 'Receive exclusive deals and sales alerts' },
                { key: 'emailNewsletter', label: 'Newsletter and product updates', description: 'Stay updated with new arrivals and trends' }
              ]?.map((item) => (
                <div key={item?.key} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={item?.key}
                    checked={settings?.notifications?.[item?.key]}
                    onChange={() => handleNotificationChange(item?.key)}
                    className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor={item?.key} className="text-sm font-medium text-gray-900 cursor-pointer">
                      {item?.label}
                    </label>
                    <p className="text-xs text-gray-600">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">SMS Notifications</h4>
            <div className="space-y-3">
              {[
                { key: 'smsOrders', label: 'Order confirmations and delivery updates', description: 'SMS alerts for important order milestones' },
                { key: 'smsPromotions', label: 'Flash sales and time-sensitive offers', description: 'Get notified about limited-time deals' }
              ]?.map((item) => (
                <div key={item?.key} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={item?.key}
                    checked={settings?.notifications?.[item?.key]}
                    onChange={() => handleNotificationChange(item?.key)}
                    className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <div className="flex-1">
                    <label htmlFor={item?.key} className="text-sm font-medium text-gray-900 cursor-pointer">
                      {item?.label}
                    </label>
                    <p className="text-xs text-gray-600">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="pushNotifications"
                checked={settings?.notifications?.pushNotifications}
                onChange={() => handleNotificationChange('pushNotifications')}
                className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              />
              <div className="flex-1">
                <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Browser push notifications
                </label>
                <p className="text-xs text-gray-600">Receive instant notifications in your browser</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
            <p className="text-sm text-gray-600">Control your privacy and data sharing</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Profile Visibility</label>
            <select
              value={settings?.privacy?.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="private">Private - Only visible to you</option>
              <option value="friends">Friends - Visible to connected users</option>
              <option value="public">Public - Visible to everyone</option>
            </select>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="showPurchaseHistory"
              checked={settings?.privacy?.showPurchaseHistory}
              onChange={(e) => handlePrivacyChange('showPurchaseHistory', e?.target?.checked)}
              className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <div className="flex-1">
              <label htmlFor="showPurchaseHistory" className="text-sm font-medium text-gray-900 cursor-pointer">
                Show purchase history in profile
              </label>
              <p className="text-xs text-gray-600">Allow others to see your recent purchases</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="allowDataCollection"
              checked={settings?.privacy?.allowDataCollection}
              onChange={(e) => handlePrivacyChange('allowDataCollection', e?.target?.checked)}
              className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
            />
            <div className="flex-1">
              <label htmlFor="allowDataCollection" className="text-sm font-medium text-gray-900 cursor-pointer">
                Allow data collection for personalization
              </label>
              <p className="text-xs text-gray-600">Help us improve your shopping experience with personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
      {/* Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">General Preferences</h3>
            <p className="text-sm text-gray-600">Customize your shopping experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Language</label>
            <select
              value={settings?.preferences?.language}
              onChange={(e) => handlePreferenceChange('language', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            >
              {languages?.map((lang) => (
                <option key={lang?.code} value={lang?.code}>{lang?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
            <select
              value={settings?.preferences?.currency}
              onChange={(e) => handlePreferenceChange('currency', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            >
              {currencies?.map((currency) => (
                <option key={currency?.code} value={currency?.code}>
                  {currency?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save All Settings
        </Button>
      </div>
      {/* Danger Zone */}
      <div className="bg-white rounded-lg border border-error/20 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-error">Danger Zone</h3>
            <p className="text-sm text-gray-600">Irreversible and destructive actions</p>
          </div>
        </div>

        {!showDeleteAccount ? (
          <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteAccount(true)}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        ) : (
          <div className="space-y-4 p-4 bg-error/5 rounded-lg">
            <div>
              <h4 className="font-medium text-error mb-2">Confirm Account Deletion</h4>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <p className="text-sm text-gray-900 mb-2">
                Please type <strong>DELETE</strong> to confirm:
              </p>
              <Input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                placeholder="Type DELETE to confirm"
                className="mb-4"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteAccount(false);
                  setDeleteConfirmation('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                loading={isLoading}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSection;