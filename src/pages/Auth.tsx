import { Outlet } from "react-router-dom";
import AuthProvider from "../hooks/useContext/AuthProvider";

function Auth() {
  return <Outlet />;
}

export default Auth;
