export const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];

export const saveToLocalStorage = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

export const removeFromLocalStorage = (key) => localStorage.removeItem(key);