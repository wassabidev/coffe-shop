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

import { Eye, Edit, MoreVertical, Trash2 } from "lucide-react";
import CategoryModal from "../components/forms/CategoryForm";
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
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../hooks/categories";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.lista);
  const totalPages = useSelector((state) => state.category.pages);
  const loading = useSelector((state) => state.category.loading);

  const handleAddCategory = async (newCategory) => {
    try {
      await dispatch(createCategory(newCategory)).unwrap();
      setIsModalOpen(false);
      return true;
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-center",
      });
      return false;
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    await dispatch(
      updateCategory({ id: currentCategory._id, ...updatedCategory }),
    );
    setIsModalOpen(false);
    setCurrentCategory(null);
    setIsUpdate(false);
    await dispatch(fetchCategories({ page, limit }));
  };

  const filteredData = categories.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const removeItemById = async (id) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories({ page, limit }));
  };

  useEffect(() => {
    dispatch(fetchCategories({ page, limit }));
  }, [dispatch, page]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Toaster />
      <PageHeader
        title="Categorias List"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Categoria"}
        onRefresh={() => dispatch(fetchCategories({ page, limit }))}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categorías</TableHead>
              <TableHead>Subategorías</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.subcategory.map((sub, i) => (
                    <Badge key={i} className="m-1">
                      {sub.name}
                    </Badge>
                  ))}
                </TableCell>

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
                          setCurrentCategory(row);
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
        <CategoryModal
          open={isModalOpen}
          isUpdate={isUpdate}
          category={currentCategory}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentCategory(null);
            setIsUpdate(false);
          }}
          onSubmit={isUpdate ? handleUpdateCategory : handleAddCategory}
        />
      )}
    </>
  );
}
