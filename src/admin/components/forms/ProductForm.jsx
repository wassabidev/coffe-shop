import {
    Modal, Form, Input, Select, InputNumber,
} from 'antd'
import { useForm, Controller } from 'react-hook-form'

const { Option } = Select

export default function ProductModalForm({ open, onCancel, onSubmit, isUpdate = false }) {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm()

    const handleOk = handleSubmit((data) => {
        console.log(data)
        onSubmit(data)
        reset()
    })

    return (
        <Modal
            open={open}
            title="Agregar nuevo producto"
            onCancel={() => {
                onCancel()
                reset()
            }}
            onOk={handleOk}
            okText="Guardar"
        >
            <Form layout="vertical">
                <Form.Item label="Nombre" required>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Campo requerido' }}
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

                <Form.Item label="Moneda" required>
                    <Controller
                        name="currency"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select {...field} placeholder="Seleccionar moneda">
                                <Option value="PYG">PYG</Option>
                                <Option value="USD">USD</Option>
                                <Option value="EUR">EUR</Option>
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
                                    `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                }
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

                <Form.Item label="Referencia (ref)">
                    <Controller
                        name="ref"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
