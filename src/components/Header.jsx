import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../features/users/userSlice";
import { resetFavorites } from "../features/favorites/favoriteSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loader2, Text, X, LogOut, LogIn } from "lucide-react";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { user: userData, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();

  const navItems = [
    { label: "Productos", path: "/" },
    { label: "Favoritos", path: "/favorites" },
    { label: "Nosotros", path: "/about-us" },
    { label: "Historial", path: "/history" },
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
    setLoading(true);
    dispatch(logout());
    dispatch(resetFavorites());
    dispatch(clearCart());
    setIsOpen(false);
    setTimeout(() => {
      setLoading(false);
    }, "800");
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}

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
            <Text />
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
            className={`${
              isNavOpen ? "translate-x-0" : "-translate-x-full"
            } flex justify-center items-center absolute h-dvh w-full top-0 left-0 bg-slate-50 z-20 transition-all duration-300 ease-in-out transform`}
          >
            <div
              className="absolute top-0 left-0 p-5 cursor-pointer"
              onClick={() => setIsNavOpen(false)}
            >
              <X />
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
                        ? " after:bg-green-900/60 after:h-1 after:rounded-lg content-[''] after:w-full text-green-800 transition-all duration-300 ease-in-out"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  <span>{label}</span>
                </NavLink>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex gap-3 ">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 flex-col px-3 py-2 rounded relative ${
                    isActive
                      ? "after:absolute after:bottom-0 after:bg-green-900/60 after:h-1 after:rounded-lg content-[''] after:w-full transition-all duration-500 ease-in-out"
                      : "text-gray-700 hover:bg-green-900/50 hover:text-white transition-all duration-300 ease-in-out"
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
                className={`absolute right-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
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
                        onClick={() => setIsOpen(false)}
                      >
                        Mi perfil
                      </Link>
                    </>
                  )}

                  <div>
                    <button
                      className="flex gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        isAuthenticated ? handleLogout() : navigate("/login");
                      }}
                    >
                      {isAuthenticated ? "Cerrar sesion" : "Iniciar sesion"}
                      {isAuthenticated ? <LogOut /> : <LogIn />}
                    </button>
                  </div>
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
    </>
  );
};

export default Header;
