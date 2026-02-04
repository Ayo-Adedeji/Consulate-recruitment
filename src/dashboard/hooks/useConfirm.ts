// Confirm dialog hook - to be implemented
export const useConfirm = () => {
  return {
    confirm: (message: string) => Promise.resolve(window.confirm(message)),
  };
};