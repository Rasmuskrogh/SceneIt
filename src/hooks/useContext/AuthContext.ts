import { createContext, useContext } from "react";
import { AuthContextType } from "../../interfaces";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
