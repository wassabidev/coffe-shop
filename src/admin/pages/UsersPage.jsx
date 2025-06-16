import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

import { Eye, Edit, MoreVertical, Trash2 } from "lucide-react";
import UserModal from "../components/forms/UserForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../hooks/users";

export default function Users() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.lista);
  const totalPages = useSelector((state) => state.user.pages);
  const loading = useSelector((state) => state.user.loading);

  const handleAddUser = async (newUser) => {
    try {
      await dispatch(createUser(newUser)).unwrap();
      setIsModalOpen(false);
      await dispatch(fetchUsers({ page, limit }));
      return true;
    } catch (err) {
      console.error("Error creando user:", err);
      toast.error(err.message, { position: "top-center" });
      return false;
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await dispatch(updateUser({ id: currentUser._id, ...updatedUser }));
      setIsModalOpen(false);
      setCurrentUser(null);
      setIsUpdate(false);
      await dispatch(fetchUsers({ page, limit }));
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error(err.message, { position: "top-center" });
      return false;
    }
  };

  const filteredData = users.filter((user) =>
    user?.name.toLowerCase().includes(search.toLowerCase()),
  );

  const removeItemById = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(fetchUsers({ page, limit }));
  };

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page]);

  if (loading) {
    return (
      <div className="flex items-center w-full justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-100 rounded-lg">
      <Toaster />
      <PageHeader
        title="Lista de Usuarios"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Usuario"}
        onRefresh={() => dispatch(fetchUsers({ page, limit }))}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Badge className="m-1">{row.role?.name}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => console.log("Mostrar", row)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> Mostrar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsUpdate(true);
                          setIsModalOpen(true);
                          setCurrentUser(row);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => removeItemById(row._id)}>
                        <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-red-500">Eliminar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isModalOpen && (
        <UserModal
          open={isModalOpen}
          isUpdate={isUpdate}
          user={currentUser}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentUser(null);
            setIsUpdate(false);
          }}
          onSubmit={isUpdate ? handleUpdateUser : handleAddUser}
        />
      )}
    </div>
  );
}
