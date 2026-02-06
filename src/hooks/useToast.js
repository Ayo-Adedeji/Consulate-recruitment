import { useState } from 'react';

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showSuccessToast = (message) => {
    setToastType('success');
    setToastMessage(message);
    setShowToast(true);
  };

  const showErrorToast = (message) => {
    setToastType('error');
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  return {
    showToast,
    toastMessage,
    toastType,
    showSuccessToast,
    showErrorToast,
    hideToast
  };
};
