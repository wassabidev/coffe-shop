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

export default function ProductModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
}) {
  const [preview, setPreview] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const { control, handleSubmit, reset, setValue, register } = useForm({
    defaultValues: {
      name: "",
      category: "",
      types: [],
      price: 0,
      description: "",
      stock: "Si",
    },
  });

  const handleOk = handleSubmit((data) => {
    onSubmit({ ...data, imagen: previewFile });
    console.log("data", data);
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

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Editar Producto" : "Agregar nuevo producto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleOk} className="space-y-4">
          <div>
            <Label>Imagen</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreviewFile(file);
                  setValue("imagen", file);
                }
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-h-40 rounded border"
              />
            )}
          </div>

          <div>
            <Label>Nombre</Label>
            <Input {...register("name", { required: true })} />
          </div>

          <div>
            <Label>Categoría</Label>
            <Controller
              name="category"
              control={control}
              {...register("category", { required: true })}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" />
                  <SelectContent>
                    <SelectItem value="Bebida">Bebida</SelectItem>
                    <SelectItem value="Comida">Comida</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Tipos asociados</Label>
            <Controller
              name="tipo"
              control={control}
              {...register("types")}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" />
                  <SelectContent>
                    <SelectItem value="Bebida">Frio</SelectItem>
                    <SelectItem value="Comida">Caliente</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Precio</Label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true, required: true })}
            />
          </div>

          <div>
            <Label>Descripción</Label>
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
                      value="Si"
                      checked={field.value === "Si"}
                      onChange={field.onChange}
                    />
                    <span className="ml-2">Si</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={field.value === "No"}
                      onChange={field.onChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              )}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
