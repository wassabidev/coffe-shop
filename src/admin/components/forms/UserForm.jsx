import { useForm, Controller } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { API_URL } from "@/api/api";

export default function UserModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
  user,
}) {
  const [roles, setRoles] = useState([]);
  const formSchema = z.object({
    name: z.string().trim().nonempty({ message: "Este campo es obligatorio" }),
    category: z
      .string()
      .trim()
      .nonempty({ message: "Este campo es obligatorio" }),
    description: z.string().default(""),
  });

  const {
    formState: { errors },
    trigger,
    handleSubmit,
    control,
    reset,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleOk = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  useEffect(() => {
    if (isUpdate && user) {
      reset({
        name: user.name,
        category: user.category?._id,
        description: user.description,
      });
    } else {
      reset({
        name: "",
        category: "",
        description: "",
      });
    }
  }, [isUpdate, reset, user]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API_URL}/category?all=true`);
        const data = await res.json();
        setRoles(data.data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          onCancel();
          reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Editar Sub Categoría" : "Agregar nueva Sub Categoría"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleOk} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              {...register("name", { required: "Campo requerido" })}
              onChange={(e) => {
                register("name").onChange(e);
                trigger("name");
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
                    {roles.find((c) => c._id == field.value)?.name ||
                      "Selecciona una categoria"}
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((category) => (
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
