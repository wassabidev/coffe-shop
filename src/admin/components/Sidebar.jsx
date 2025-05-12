import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, Tags, LayoutGrid, User, PackageSearch } from "lucide-react";
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
    label: "Usuarios",
    path: "/admin/users",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Tipos",
    path: "/admin/types",
    icon: <PackageSearch className="w-4 h-4" />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const content = (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map(({ label, path, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-100 text-blue-600"
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
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            {content}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
