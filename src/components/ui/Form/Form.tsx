import React from 'react';
import Button from '../Button/Button';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isEditing?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  className?: string;
  actionsClassName?: string;
  showActions?: boolean;
}

/**
 * A reusable Form wrapper that provides consistent layout and action buttons.
 */
const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  onCancel,
  isEditing = true,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  className = '',
  actionsClassName = '',
  showActions = true,
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-8 ${className}`}>
      <div className="space-y-6">
        {children}
      </div>

      {showActions && (
        <div className={`flex items-center justify-end gap-3 pt-6 border-t border-gray-100 ${actionsClassName}`}>

          
          {isEditing && (
            <>
              {onCancel && (
                <Button
                  label={cancelLabel}
                  variant="secondary"
                  onClick={onCancel}
                  disabled={loading}
                  type="button"
                />
              )}
              <Button
                label={submitLabel}
                variant="primary"
                type="submit"
                loading={loading}
                disabled={loading}
                className="px-8"
              />
            </>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;
