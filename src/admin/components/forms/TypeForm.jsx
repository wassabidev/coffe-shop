import { Modal, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";

const { Option } = Select;

const categoryTypes = [
  "Caliente",
  "Frío",
  "Vegetariano",
  "Sin gluten",
  "Con cafeína",
  "Sin cafeína",
];

export default function CategoryModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
}) {
  const { control, handleSubmit, reset } = useForm();

  const handleOk = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <Modal
      open={open}
      title={isUpdate ? "Editar Categoría" : "Agregar nueva Categoría"}
      onCancel={() => {
        onCancel();
        reset();
      }}
      onOk={handleOk}
      okText="Guardar"
    >
      <Form layout="vertical">
        <Form.Item label="Nombre" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Tipos asociados">
          <Controller
            name="types"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                allowClear
                placeholder="Seleccionar tipos relacionados"
              >
                {categoryTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Descripción">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={3} {...field} />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
