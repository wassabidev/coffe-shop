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
import RoleModal from "../components/forms/RoleForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  createRole,
  deleteRole,
  fetchRoles,
  updateRole,
} from "../../hooks/roles";

export default function RolesPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.lista);
  const totalPages = useSelector((state) => state.role.pages);
  const loading = useSelector((state) => state.role.loading);

  const handleAddRole = async (newCategory) => {
    try {
      await dispatch(createRole(newCategory)).unwrap();
      setIsModalOpen(false);
      return true;
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-center",
      });
      return false;
    }
  };

  const handleUpdateRole = async (updatedRole) => {
    await dispatch(updateRole({ id: currentRole._id, ...updatedRole }));
    setIsModalOpen(false);
    setCurrentRole(null);
    setIsUpdate(false);
    await dispatch(fetchRoles({ page, limit }));
  };

  const filteredData = roles.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const removeItemById = async (id) => {
    await dispatch(deleteRole(id));
    await dispatch(fetchRoles({ page, limit }));
  };

  useEffect(() => {
    dispatch(fetchRoles({ page, limit }));
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
        title="Lista de Roles "
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar roles"}
        onRefresh={() => dispatch(fetchRoles({ page, limit }))}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>

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
                          setCurrentRole(row);
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
        <RoleModal
          open={isModalOpen}
          isUpdate={isUpdate}
          role={currentRole}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentRole(null);
            setIsUpdate(false);
          }}
          onSubmit={isUpdate ? handleUpdateRole : handleAddRole}
        />
      )}
    </div>
  );
}
