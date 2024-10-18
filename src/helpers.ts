import { AUTH_TOKEN } from "./constant";

export const getToken = (): string | null => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return token;
};

export const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
