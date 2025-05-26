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
import toast, { Toaster } from "react-hot-toast";
import { Eye, Edit, MoreVertical, Trash2 } from "lucide-react";
import SubcategoryModal from "../components/forms/SubcategoryForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import {
  createsubCategory,
  deletesubCategory,
  fetchsubCategories,
  updatesubCategory,
} from "../../hooks/subcategories";

export default function SubCategories() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.subcategory.lista);
  const totalPages = useSelector((state) => state.subcategory.pages);
  const loading = useSelector((state) => state.subcategory.loading);
  const fetchError = useSelector((state) => state.subcategory.fetchError);

  const deleteError = useSelector((state) => state.subcategory.deleteError);
  const updateError = useSelector((state) => state.subcategory.updateError);

  const handleAddCategory = async (newCategory) => {
    const result = await dispatch(createsubCategory(newCategory));
    if (createsubCategory.rejected.match(result)) {
      const message =
        result.payload?.message || result.error?.message || "Ocurrió un error";
      toast.error(`Error al crear subcategoría: ${message}`, {
        position: "top-center",
        duration: 3000,
      });
      return false;
    } else {
      await dispatch(fetchsubCategories({ page, limit }));
      setIsModalOpen(false);
      setCurrentSubCategory(null);
      setIsUpdate(false);
      return true;
    }
  };

  const handleUpdateCategory = async (updatedsubCategory) => {
    const result = await dispatch(
      updatesubCategory({ id: currentSubCategory._id, ...updatedsubCategory }),
    );
    if (updatesubCategory.rejected.match(result)) {
      const message =
        result.payload?.message || result.error?.message || "Ocurrió un error";
      toast.error(`Error al actualizar subcategoría: ${message}`, {
        position: "top-center",
        duration: 3000,
      });
    } else {
      await dispatch(fetchsubCategories({ page, limit }));
    }
    setIsModalOpen(false);
    setCurrentSubCategory(null);
    setIsUpdate(false);
  };

  const filteredData = Array.isArray(subcategories)
    ? subcategories.filter((product) =>
        product?.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const removeItemById = async (id) => {
    await dispatch(deletesubCategory(id));
    await dispatch(fetchsubCategories({ page, limit }));
  };

  useEffect(() => {
    dispatch(fetchsubCategories({ page, limit }));
  }, [dispatch, page]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (fetchError) {
    return (
      <div>
        <p>Opps!</p>
        <p className="mb-4 text-gray-500">Error al cargar las subcategorías</p>
        <Button onClick={() => dispatch(fetchsubCategories({ page, limit }))}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <PageHeader
        title="Sub Categorias List"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Sub Categoria"}
        onRefresh={() => dispatch(fetchsubCategories({ page, limit }))}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categorías</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Badge>{row.category?.name}</Badge>
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
                          setCurrentSubCategory(row);
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

      <SubcategoryModal
        open={isModalOpen}
        isUpdate={isUpdate}
        subcategory={currentSubCategory}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrentSubCategory(null);
          setIsUpdate(false);
        }}
        onSubmit={isUpdate ? handleUpdateCategory : handleAddCategory}
      />
    </>
  );
}
