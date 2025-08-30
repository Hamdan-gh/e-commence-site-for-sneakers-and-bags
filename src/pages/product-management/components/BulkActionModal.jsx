import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionModal = ({ 
  isOpen = false, 
  onClose, 
  onConfirm, 
  action, 
  selectedCount = 0,
  isLoading = false 
}) => {
  const [confirmText, setConfirmText] = useState('');

  const actionConfig = {
    activate: {
      title: 'Activate Products',
      description: `Are you sure you want to activate ${selectedCount} selected product${selectedCount > 1 ? 's' : ''}?`,
      confirmText: 'This will make the products visible to customers.',
      buttonText: 'Activate Products',
      buttonVariant: 'success',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    },
    deactivate: {
      title: 'Deactivate Products',
      description: `Are you sure you want to deactivate ${selectedCount} selected product${selectedCount > 1 ? 's' : ''}?`,
      confirmText: 'This will hide the products from customers.',
      buttonText: 'Deactivate Products',
      buttonVariant: 'warning',
      icon: 'XCircle',
      iconColor: 'text-warning'
    },
    delete: {
      title: 'Delete Products',
      description: `Are you sure you want to permanently delete ${selectedCount} selected product${selectedCount > 1 ? 's' : ''}?`,
      confirmText: 'This action cannot be undone. All product data, images, and variants will be permanently removed.',
      buttonText: 'Delete Products',
      buttonVariant: 'destructive',
      icon: 'Trash2',
      iconColor: 'text-error',
      requiresConfirmation: true
    }
  };

  const config = actionConfig?.[action] || actionConfig?.activate;

  const handleConfirm = () => {
    if (config?.requiresConfirmation && confirmText !== 'DELETE') {
      return;
    }
    onConfirm();
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              action === 'delete' ? 'bg-error/10' : 
              action === 'deactivate' ? 'bg-warning/10' : 'bg-success/10'
            }`}>
              <Icon name={config?.icon} size={20} className={config?.iconColor} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {config?.title}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedCount} product{selectedCount > 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-900 mb-2">{config?.description}</p>
            <p className="text-sm text-gray-600">{config?.confirmText}</p>
          </div>

          {/* Confirmation Input for Delete */}
          {config?.requiresConfirmation && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="font-mono font-bold text-error">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e?.target?.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-error focus:border-error"
                placeholder="Type DELETE to confirm"
              />
            </div>
          )}

          {/* Product List Preview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Icon name="Package" size={16} />
              <span>Selected Products:</span>
            </div>
            <div className="text-sm text-gray-900">
              {selectedCount} product{selectedCount > 1 ? 's' : ''} will be affected by this action
            </div>
          </div>

          {/* Warning for Delete */}
          {action === 'delete' && (
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-error mb-1">
                    Permanent Action Warning
                  </h4>
                  <p className="text-sm text-error/80">
                    This action will permanently delete all selected products, including their images, variants, and order history. This cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={config?.buttonVariant}
            onClick={handleConfirm}
            loading={isLoading}
            disabled={config?.requiresConfirmation && confirmText !== 'DELETE'}
            iconName={config?.icon}
            iconPosition="left"
          >
            {config?.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionModal;