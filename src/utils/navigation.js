// Navigation utilities for full page refreshes
export const navigateTo = (url) => {
  window.location.href = url;
};

export const refreshPage = () => {
  window.location.reload();
};