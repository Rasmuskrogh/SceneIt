import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { API, BEARER } from "../../constant";
import { getToken } from "../../helpers";
import { AuthProviderProps, UserData } from "../../interfaces";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authToken: string | null = getToken();

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: UserData = await response.json();

      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
      //message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData /* : userData */,
        setUserData /* : handleUser */,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
