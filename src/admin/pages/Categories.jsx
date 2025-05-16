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
  PaginationEllipsis,
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

  const categories = useSelector((state) => state.category.lista);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  const handleAddCategory = (newCategory) => {
    dispatch(createCategory(newCategory));
    setIsModalOpen(false);
  };

  const handleUpdateCategory = (updatedCategory) => {
    dispatch(updateCategory({ id: currentCategory._id, ...updatedCategory }));
    setIsModalOpen(false);
    setCurrentCategory(null);
    setIsUpdate(false);
  };
  const filteredData = categories.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  let hasNextPage = false;
  const results = "";
  const resultsPerPage = "";
  const getNextPage = "";
  if (results.length > resultsPerPage) {
    // if got an extra result
    hasNextPage = true; // has a next page of results
    results.pop(); // remove extra result
  }
  const removeItemById = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div>
        Opps! <br />
        Error al cargar los productos
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Categorias List"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Categoria"}
        onRefresh={() => dispatch(fetchCategories())}
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
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={getNextPage} disable={!hasNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {isModalOpen && isUpdate && (
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
