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
import { Textarea } from "@/components/ui/textarea";
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
  const baseSchema = {
    name: z.string().trim().nonempty({ message: "Campo obligatorio" }),
    email: z.string().email({ message: "Email inválido" }),
    role: z.string().nonempty({ message: "Campo obligatorio" }),
  };
  const formSchema = isUpdate
    ? z.object({
        ...baseSchema,
        password: z
          .string()
          .optional()
          .or(z.literal(""))
          .refine((val) => !val || val.length >= 6, {
            message: "Mínimo 6 caracteres si se completa",
          }),
      })
    : z.object({
        ...baseSchema,
        password: z
          .string()
          .min(6, { message: "Mínimo 6 caracteres" })
          .max(32, { message: "Máximo 32 caracteres" }),
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
      email: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleOk = handleSubmit((data) => {
    if (!data.password) {
      delete data.password;
    }
    onSubmit(data);
    reset();
  });

  useEffect(() => {
    if (isUpdate && user) {
      reset({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role?._id,
        description: user.description,
      });
    } else {
      reset({
        name: "",
        role: "",
        email: "",
        password: "",
        description: "",
      });
    }
  }, [isUpdate, reset, user]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API_URL}/role?all=true`);
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
            {isUpdate ? "Editar Usuario" : "Agregar nuevo usuario"}
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              className={`${errors.email ? "border-red-500" : ""} mt-2`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`${errors.password ? "border-red-500" : ""} mt-2`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label className="mb-2">Roles</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`${
                      errors.role
                        ? "bg-red-50 border focus:outline-red-500 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500"
                        : " "
                    } w-full`}
                  >
                    {roles.find((c) => c._id == field.value)?.name ||
                      "Selecciona un role"}
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
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
