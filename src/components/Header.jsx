import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { user: userData, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  const navItems = [
    { label: "Prodouctos", path: "/" },
    { label: "Favoritos", path: "/favorites" },
    { label: "Nosotros", path: "/about-us" },
    { label: "Contactos", path: "/contacts" },
  ];

  const Avatar = () => {
    return (
      <div
        className={`${isAuthenticated ? "p-4" : "p-2"} flex justify-center items-center w-10 h-10 bg-slate-200 rounded-full`}
      >
        {isAuthenticated && userData ? (
          <p className="!m-0 !text-xl font-semmibold">
            {userData.name.charAt(0)}
          </p>
        ) : (
          <img src="/assets/user.svg" alt="" />
        )}
      </div>
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-100 border-b-[0.1rem] border-gray-400 p-2">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="z-10 absolute top-0 left-0 h-dvh w-dvw"
        ></div>
      )}

      <ul className="flex items-center justify-between !m-0">
        <button
          onClick={() => navigate("/")}
          className="hidden md:block w-10 h-10 cursor-pointer"
        >
          <img src="/assets/logocat.svg" alt="" />
        </button>

        <div
          className="space-y-2 block md:hidden cursor-pointer"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-8 bg-gray-600"></span>
          <span className="block h-0.5 w-8 bg-gray-600"></span>
          <span className="block h-0.5 w-8 bg-gray-600"></span>
        </div>

        <div>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 md:hidden cursor-pointer flex items-center justify-center )"
          >
            <img src="/assets/logocat.svg" alt="" />
          </button>
        </div>

        <div
          className={
            isNavOpen
              ? "flex justify-center items-center absolute h-dvh w-full top-0 left-0 bg-slate-50 z-20 "
              : "hidden"
          }
        >
          <div
            className="absolute top-0 right-0 px-8 py-8 cursor-pointer"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="flex flex-col items-center justify-between min-h-[250px]">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsNavOpen(false)}
                end
                className={({ isActive }) =>
                  `flex flex-col px-3 py-2 rounded ${
                    isActive
                      ? " after:bg-green-200 after:h-1 after:rounded-lg content-[''] after:w-full text-green-800"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                <span>{label}</span>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex gap-3">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex gap-2 px-3 py-2 rounded ${
                  isActive
                    ? "bg-gray-500 text-gray-100"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="relative flex gap-3 items-center">
          <li className="user-cart">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative z-10 cursor-pointer"
            >
              <Avatar />
            </button>
          </li>

          {isOpen && (
            <div
              className={` absolute right-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
            >
              <div className="py-1" aria-labelledby="dropdownDefaultButton">
                {userData && (
                  <>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 bg-slate-50">
                      <p className="!mb-0 py-1">{userData.email}</p>
                    </div>
                    <Link
                      to="/user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                      role="menuitem"
                    >
                      Account settings
                    </Link>
                  </>
                )}

                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer hover:bg-slate-100"
                    onClick={
                      isAuthenticated ? handleLogout : navigate("/login")
                    }
                  >
                    {isAuthenticated ? "Sign out" : "Sign in"}
                  </button>
                </form>
              </div>
            </div>
          )}
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
