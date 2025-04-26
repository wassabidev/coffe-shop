import { Modal, Form, Input, Select, InputNumber, Radio } from "antd";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const { Option } = Select;

export default function ProductModalForm({
  open,
  onCancel,
  onSubmit,
  isUpdate = false,
}) {
  const [preview, setPreview] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    default: {
      types: [],
    },
  });

  const handleOk = handleSubmit((data) => {
    console.log(data);
    onSubmit(data);
    reset();
    setPreview(null);
    setPreviewFile(null);
  });

  const optionsWithDisabled = [
    { label: "Si", value: "Si" },
    { label: "No", value: "No" },
  ];
  const categoryTypes = [
    "Caliente",
    "Frío",
    "Vegetariano",
    "Sin gluten",
    "Con cafeína",
    "Sin cafeína",
  ];

  useEffect(() => {
    if (!previewFile) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(previewFile);
  }, [previewFile]);

  return (
    <Modal
      open={open}
      title={isUpdate ? "Editar Producto" : "Agregar nuevo producto"}
      onCancel={() => {
        onCancel();
        reset();
        setPreview(null);
        setPreviewFile(null);
      }}
      onOk={handleOk}
      okText="Guardar"
    >
      <Form layout="vertical">
        <Form.Item label="Imagen" required>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                setPreviewFile(file);
                setValue("imagen", file, { shouldValidate: true }); // 🔥 RHF guarda el file
              }
            }}
            className="block w-full rounded-md border border-[#d9d9d9] px-[11px] py-1 text-[14px] text-[#000000d9] bg-white transition duration-300 focus:border-[#4096ff] hover:border-[#4096ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] focus:outline-none"
          />
        </Form.Item>

        {previewFile && preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 rounded border"
              onError={() => setPreview(null)}
            />
          </div>
        )}

        <Form.Item label="Nombre" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Categoría" required>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} placeholder="Seleccionar categoría">
                <Option value="Bebida">Bebida</Option>
                <Option value="Comida">Comida</Option>
              </Select>
            )}
          />
        </Form.Item>

        {/* <Form.Item label="Tipo" required>
                    <Controller
                        name="currency"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} placeholder="Seleccionar Tipo">
                                <Option value="Caliente">Caliente</Option>
                                <Option value="Frio">Frio</Option>
                            </Select>
                        )}
                    />
                </Form.Item> */}
        <Form.Item label="Tipos asociados" required>
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

        <Form.Item label="Precio" required>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputNumber
                {...field}
                className="w-full"
                min={0}
                formatter={(val) =>
                  `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(val) => val?.replace(/\./g, "")}
              />
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

        <Form.Item label="Stock">
          <Controller
            name="stock"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field }) => (
              <Radio.Group
                {...field}
                options={optionsWithDisabled}
                optionType="button"
                buttonStyle="solid"
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
