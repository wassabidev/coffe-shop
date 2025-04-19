import { useState } from 'react'
import PageHeader from "../components/PageHeader"
import { Table, Button, Input, Tag, Space, Dropdown, Menu } from 'antd'
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductModal from "../components/forms/ProductForm"

const mockProducts = [
    {
        id: 1,
        name: 'Café Americano',
        category: 'Bebida',
        price: 15000,
        description: 'Café filtrado tradicional',
        ref: 'CAFE-001',
        currency: 'PYG',
    },
    {
        id: 2,
        name: 'Tostado de Jamón y Queso',
        category: 'Comida',
        price: 20000,
        description: 'Pan crocante con jamón y queso',
        ref: 'FOOD-002',
        currency: 'PYG',
    },
    {
        id: 3,
        name: 'Capuccino',
        category: 'Bebida',
        price: 18000,
        description: 'Espuma de leche y café',
        ref: 'CAFE-003',
        currency: 'PYG',
    }

]

export default function Products() {
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataSource, setDataSource] = useState(mockProducts)


    const handleAddProduct = (newProduct) => {
        const id = dataSource.length + 1
        setDataSource([...dataSource, { id, ...newProduct }])
        setIsModalOpen(false)
    }

    const filteredData = dataSource.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category',
            render: (cat) => (
                <Tag color={cat === 'Bebida' ? 'pink' : 'cyan'}>{cat}</Tag>
            ),
        },
        {
            title: 'Moneda',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            render: (value) => value.toLocaleString(),
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ref',
            dataIndex: 'ref',
            key: 'ref',
        },
        {
            title: '',
            key: 'actions',
            render: (_, record) => {
                const menuItems = [
                    {
                        key: 'show',
                        icon: <EyeOutlined />,
                        label: 'Mostrar',
                        onClick: () => console.log('Mostrar', record),
                    },
                    {
                        key: 'edit',
                        icon: <EditOutlined />,
                        label: 'Editar',
                        onClick: () => console.log('Editar', record),
                    },
                    {
                        key: 'delete',
                        icon: <DeleteOutlined />,
                        label: 'Eliminar',
                        danger: true,
                        onClick: () => console.log('Eliminar', record),
                    },
                ]

                return (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                )
            }
        }
    ]

    return (
        <>
            <PageHeader
                title="Product List"
                onBack={() => window.history.back()}
                searchValue={search}
                setSearchValue={setSearch}
                onRefresh={() => setSearch('')}
                onAdd={() => setIsModalOpen(true)}
            ></PageHeader>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
            <ProductModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleAddProduct}
            />
        </>
    )
}
