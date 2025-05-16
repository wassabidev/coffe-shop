import { useForm } from "react-hook-form";
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

export default function CategoryModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
}) {
  const { register, handleSubmit, reset } = useForm();

  const handleOk = handleSubmit((data) => {
    console.log("data", data);
    onSubmit(data);
    reset();
  });

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
            {isUpdate ? "Editar Categoría" : "Agregar nueva Categoría"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleOk} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              className="mt-2 "
              id="name"
              {...register("name", { required: "Campo requerido" })}
            />
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
