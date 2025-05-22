import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/api/api";

export default function ProductModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
  product,
}) {
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const formSchema = z.object({
    name: z.string().trim().nonempty({ message: "Esta campo es obligatorio" }),
    category: z.string().trim().nonempty({ message: "Elija una categoria" }),
    description: z.string().default(""),
    subcategory: z
      .string()
      .trim()
      .nonempty({ message: "Elija una subcategoria" }),
    price: z.coerce.string().min(3, { message: "Este campo es requerido" }),
    stock: z.enum(["true", "false"]),
    image: z
      .union([z.instanceof(File), z.string()])
      .refine(
        (file) =>
          typeof file === "string" ||
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        {
          message: "Tipo de archivo inválido",
        },
      ),
  });
  const {
    formState: { errors },
    clearErrors,
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      price: "",
      description: "",
      stock: true,
    },
    resolver: zodResolver(formSchema),
  });

  const handleOk = handleSubmit((data) => {
    onSubmit({
      ...data,
      stock: data.stock === "true",
      imagen: previewFile ?? product.image,
    });

    reset();
    setPreview(null);
    setPreviewFile(null);
  });

  useEffect(() => {
    if (!previewFile) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(previewFile);
  }, [previewFile]);

  const selectedCategory = watch("category");

  useEffect(() => {
    const selected = categories?.find((c) => c._id === selectedCategory);
    setSubCategories(selected?.subcategory || []);
  }, [selectedCategory, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/category?all=true`);
        const data = await res.json();
        setCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isUpdate && product) {
      reset({
        name: product.name,
        category: product.category?._id,
        subcategory: product.subcategory?._id,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock ? "true" : "false",
      });
      setValue("description", product.description ?? "", {
        shouldValidate: false,
      });

      if (product.image) {
        setPreview(`/uploads/${product.image}`);
      }
    }
  }, [isUpdate, product, reset, setValue]);
  useEffect(() => {
    if (isUpdate && product && !previewFile && product.image) {
      setValue("image", product.image, { shouldValidate: true });
    }
  }, [isUpdate, product, previewFile, setValue]);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => !val && onCancel()}
      aria-describedby="product-form-modal"
    >
      <DialogContent
        className="max-h-[90vh] overflow-auto"
        aria-describedby="product-form-description"
      >
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Editar Producto" : "Agregar nuevo producto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleOk} className="space-y-4">
          <div>
            <Label className="mb-2">Imagen</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreviewFile(file);
                  setValue("image", file, { shouldValidate: true });
                }
                clearErrors("image");
              }}
              className={`${
                errors.image
                  ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : ""
              } `}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-h-40 rounded border"
              />
            )}
          </div>

          <div>
            <Label className="mb-2">Nombre</Label>
            <Input
              {...register("name", { required: true })}
              onChange={() => clearErrors("name")}
              className={`${
                errors.name
                  ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } !mt-2 text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Categoría</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`${
                      errors.category
                        ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                        : " "
                    } w-full`}
                  >
                    {categories.find((c) => c._id == field.value)?.name ||
                      "Selecciona una categoria"}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Subcategorias asociados</Label>
            <Controller
              name="subcategory"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`${
                      errors.subcategory
                        ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                        : " "
                    } w-full`}
                  >
                    {subcategories.find((t) => t._id == field.value)?.name ||
                      "Selecciona una subcategory"}
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub._id} value={sub._id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subcategory && (
              <p className="text-red-500 text-sm">
                {errors.subcategory.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Precio</Label>
            <Input
              type="text"
              placeholder="0"
              {...register("price", { required: true })}
              onChange={() => clearErrors("price")}
              className={`${
                errors.price
                  ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } !mt-2 text-gray-900 text-sm rounded-lg  block w-full md:w-11/12 p-2.5`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Descripción</Label>
            <Textarea {...register("description")} rows={3} />
          </div>

          <div>
            <Label>Stock</Label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={field.value === "true"}
                      onChange={field.onChange}
                    />
                    <span className="ml-2">Si</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      checked={field.value === "false"}
                      onChange={field.onChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              )}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4 cursor-pointer">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
