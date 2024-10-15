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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/register" element={<Register />} />
      <Route path="/filter" element={<Filter />} />
    </Route>
  )
);
