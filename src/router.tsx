import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Filter from "./pages/Filter";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/filter" element={<Filter />} />
        </Route>
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
    </>
  )
);
