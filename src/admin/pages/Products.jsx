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
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../hooks/products";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const products = useSelector((state) => state.product.lista);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = async (data) => {
    dispatch(createProduct(data));
    console.log(data);

    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentProduct(null);
    toast(
      () => (
        <>
          <p>producto creado con exito</p>
        </>
      ),
      {
        icon: "✅",
        position: "top-center",
        duration: 2000,
      },
    );
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct({ id: currentProduct._id, ...updatedProduct }));
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
    dispatch(fetchProducts());
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
        title="Lista de Productos"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Producto"}
        onRefresh={() => dispatch(fetchProducts())}
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
    </>
  );
}
