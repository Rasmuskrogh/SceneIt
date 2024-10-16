import { Outlet } from "react-router-dom";
import AuthProvider from "../hooks/useContext/AuthProvider";

function Auth() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default Auth;
