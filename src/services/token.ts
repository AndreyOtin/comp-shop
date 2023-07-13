const getToken = (item: string): string => localStorage.getItem(item) ?? '';

const setToken = (key: string, token: string): void => {
  localStorage.setItem(key, token);
};

const removeToken = (key: string): void => {
  localStorage.removeItem(key);
};

export { getToken, setToken, removeToken };
