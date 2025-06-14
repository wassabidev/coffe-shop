import { useEffect, useState } from "react";
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
import { Eye, Edit, MoreVertical, Trash2 } from "lucide-react";
import ProductModal from "../components/forms/ProductForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../hooks/products";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.lista);
  const totalPages = useSelector((state) => state.product.pages);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const handleAddProduct = async (data) => {
    await dispatch(createProduct(data));

    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentProduct(null);
    toast(
      () => (
        <>
          <p>Producto creado con exito!</p>
        </>
      ),
      {
        icon: "✅",
        position: "top-center",
        duration: 1000,
      },
    );
    await dispatch(fetchProducts());
  };

  const handleUpdateProduct = async (updatedProduct) => {
    await dispatch(
      updateProduct({ id: currentProduct._id, ...updatedProduct }),
    );
    await dispatch(fetchProducts({ page, limit }));
    setIsModalOpen(false);
    setCurrentProduct(null);
    setIsUpdate(false);
  };

  const removeItemById = (id) => {
    dispatch(deleteProduct(id));
  };
  const filteredData = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
  }, [dispatch, page]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Opps! <br />
        Ocurrio un error al cargar los productos
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-100 rounded-lg">
      <PageHeader
        title="Lista de Productos"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Producto"}
        onRefresh={() => dispatch(fetchProducts({ page, limit }))}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Sub categorias</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.subcategory ? (
                      <Badge variant="outline">{row.subcategory.name}</Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.category ? (
                      <Badge variant="outline">{row.category.name}</Badge>
                    ) : null}
                  </div>
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
                          setCurrentProduct(row);
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
        <ProductModal
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false), setCurrentProduct(null);
            setIsUpdate(false);
          }}
          onSubmit={isUpdate ? handleUpdateProduct : handleAddProduct}
          isUpdate={isUpdate}
          product={currentProduct}
        />
      )}
    </div>
  );
}
