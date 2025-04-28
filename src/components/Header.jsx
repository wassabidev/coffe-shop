import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const navItems = [
    { label: "Prodouctos", path: "/" },
    { label: "Favoritos", path: "/favorites" },
    { label: "Nosotros", path: "/about-us" },
    { label: "Contactos", path: "/contacts" },
  ];

  return (
    <header className="bg-gray-100 border-b-[0.1rem] border-gray-400 p-2">
      <div
        onClick={() => setIsOpen(false)}
        className="z-10 absolute top-0 left-0  h-dvh w-dvw"
      ></div>

      <ul className="flex items-center justify-between !m-0">
        <div>
          <li>
            <a href="/">
              <img src="/assets/logocat.svg" alt="" />
            </a>
          </li>
        </div>
        <div className="hidden md:flex gap-3">
          {navItems.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="relative flex gap-3 items-center">
          <li className="user-cart">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative z-10 rounded-full cursor-pointer bg-gray-300 border-[0.1rem] border-gray-400 p-2"
            >
              <img src="/assets/user.svg" alt="" />
            </button>
          </li>

          <div
            className={`${!isOpen ? "hidden" : ""} absolute right-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
          >
            <div className="py-1" aria-labelledby="dropdownDefaultButton">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                Account settings
              </a>

              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer"
                  onClick={() => {
                    setToken("");
                    setUser("");
                  }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          <li>
            <button
              onClick={() => navigate("/cart")}
              className='w-10 h-10 bg-no-repeat bg-center bg-contain cursor-pointer flex items-center justify-center bg-[url("/assets/shopping-cart.svg")]'
            >
              {cartItems.length > 0 && (
                <span className=" text-white font-bold text-md rounded-full items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
