import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ noPadding = false }) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className={`flex-grow flex ${noPadding ? "" : "p-3"} layout`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
