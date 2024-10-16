import { AUTH_TOKEN } from "./constant";

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
