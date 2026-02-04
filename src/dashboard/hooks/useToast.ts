// Toast hook - to be implemented
export const useToast = () => {
  return {
    showToast: (message: string) => console.log('Toast:', message),
    showSuccess: (message: string) => console.log('Success:', message),
    showError: (message: string) => console.log('Error:', message),
  };
};