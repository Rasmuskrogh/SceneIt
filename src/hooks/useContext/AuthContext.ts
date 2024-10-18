import { createContext, useContext } from "react";
import { AuthContextType } from "../../interfaces";

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  isLoading: false,
  setUserData: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
