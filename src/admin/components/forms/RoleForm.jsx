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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function RoleModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
  role,
}) {
  const formSchema = z.object({
    name: z.string().trim().nonempty({ message: "Este campo es obligatorio" }),
    description: z.string().default(""),
  });

  const {
    formState: { errors },
    trigger,
    handleSubmit,
    reset,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleOk = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  useEffect(() => {
    if (isUpdate && role) {
      reset({
        name: role.name,
        description: role.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [isUpdate, reset, role]);

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
            {isUpdate ? "Editar Rol" : "Agregar nuevo rol"}
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
