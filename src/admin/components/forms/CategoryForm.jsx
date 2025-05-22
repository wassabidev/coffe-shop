import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CategoryModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
  category,
}) {
  const formSchema = z.object({
    name: z.string().trim().nonempty({ message: "Este campo es obligatorio" }),
    description: z.string().default(""),
  });

  const {
    formState: { errors },
    clearErrors,
    handleSubmit,
    reset,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      subcategory: "",
    },
    resolver: zodResolver(formSchema),
  });
  const handleOk = handleSubmit(async (data) => {
    const success = await onSubmit(data);
    if (success) {
      reset();
    }
  });

  useEffect(() => {
    if (isUpdate && category) {
      reset({
        name: category.name,
        description: category.description,
      });
    }
  }, [isUpdate, reset, category]);
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && !errors.name) {
          onCancel();
          reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Editar Categoría" : "Agregar nueva Categoría"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleOk} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register("name", { required: "Campo requerido" })}
              onChange={(e) => {
                if (e.target.value.trim()) {
                  clearErrors("name");
                }
              }}
              className={`${
                errors.name
                  ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                  : "bg-gray-50 border-[0.1rem] border-gray-300 focus:border-blue-400"
              } mt-2 `}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              className="mt-2"
              id="description"
              rows={3}
              {...register("description")}
            />
          </div>

          <DialogFooter>
            <Button className="cursor-pointer" type="submit">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
