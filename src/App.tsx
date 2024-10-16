import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";
import NewMoviesProvider from "./hooks/useContext/NewMoviesProvider";

function App() {
  return (
    <>
      <Header />

      <NewMoviesProvider>
        <Outlet />
      </NewMoviesProvider>

      <FooterNav />
    </>
  );
}

export default App;
