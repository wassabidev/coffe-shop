import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import AvatarCard from "@/components/AvatarCard";
import { logout } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@/api/api";
import { useDispatch } from "react-redux";
import {
  Menu,
  Tags,
  LayoutGrid,
  User,
  PackageSearch,
  Bolt,
  Loader2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Productos",
    path: "/admin/products",
    icon: <Tags className="w-4 h-4" />,
  },
  {
    label: "Categorías",
    path: "/admin/categories",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    label: "Subcategorias",
    path: "/admin/subcategories",
    icon: <PackageSearch className="w-4 h-4" />,
  },
  {
    label: "Usuarios",
    path: "/admin/users",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Roles",
    path: "/admin/roles",
    icon: <Bolt className="w-4 h-4" />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRole = async () => {
    try {
      const res = await axios.get(`${API_URL}/role/${userData.role}`);
      setRole(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.error("Error fetching role:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && userData.role) {
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [userData]);
  const navItemsFiltered = navItems.filter((item) => {
    if (item.label === "Roles" && role.name !== "admin") {
      return false;
    }
    if (item.label === "Usuarios" && role.name !== "admin") {
      return false;
    }
    return true;
  });
  if (loading) {
    return (
      <div className="flex items-center w-full justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  const content = (
    <nav className="flex flex-col gap-2 p-4">
      {navItemsFiltered.map(({ label, path, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-100 text-gray-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:block w-64 bg-white shadow min-h-screen">
        <div className="p-4 text-lg font-bold border-b">Admin Panel</div>
        {content}
      </aside>

      {/* Mobile: Toggle Button */}
      <div className="sm:hidden p-2 bg-white shadow-md">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Admin Panel</SheetTitle>
            </SheetHeader>
            {content}
            <AvatarCard
              user={userData}
              role={role}
              onLogout={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
