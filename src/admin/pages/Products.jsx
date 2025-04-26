import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Table, Button, Input, Tag, Space, Dropdown, Menu } from "antd";
import {
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ProductModal from "../components/forms/ProductForm";
import { createStyles } from "antd-style";

const mockProducts = [
  {
    id: 1,
    name: "Café Americano",
    category: "Bebida",
    price: 15000,
    description: "Café filtrado tradicional",
    ref: "CAFE-001",
    currency: "PYG",
  },
  {
    id: 2,
    name: "Tostado de Jamón y Queso",
    category: "Comida",
    price: 20000,
    description: "Pan crocante con jamón y queso",
    ref: "FOOD-002",
    currency: "PYG",
  },
  {
    id: 3,
    name: "Capuccino",
    category: "Bebida",
    price: 18000,
    description: "Espuma de leche y café",
    ref: "CAFE-003",
    currency: "PYG",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(mockProducts);

  const useStyle = createStyles(({ css }) => ({
    customTable: css`
      .ant-table-container {
        overflow-x: auto !important;
      }

      .ant-table-content {
        overflow-x: auto !important;
        overflow-y: hidden !important;
      }

      .ant-table-body {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        scrollbar-gutter: stable;
      }
    `,
  }));

  const handleAddProduct = (newProduct) => {
    const id = dataSource.length + 1;
    setDataSource([...dataSource, { id, ...newProduct }]);
    setIsModalOpen(false);
  };

  const filteredData = dataSource.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      render: (cat) => (
        <Tag color={cat === "Bebida" ? "pink" : "cyan"}>{cat}</Tag>
      ),
      width: 200,
    },
    {
      title: "Moneda",
      dataIndex: "currency",
      key: "currency",
      width: 200,
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (value) => value.toLocaleString(),
      width: 200,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "Ref",
      dataIndex: "ref",
      key: "ref",
      width: 200,
    },
    {
      title: "Acciones",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        const menuItems = [
          {
            key: "show",
            icon: <EyeOutlined />,
            label: "Mostrar",
            onClick: () => console.log("Mostrar", record),
          },
          {
            key: "edit",
            icon: <EditOutlined />,
            label: "Editar",
            onClick: () => {
              setIsModalOpen(true);
            },
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            label: "Eliminar",
            danger: true,
            onClick: () => console.log("Eliminar", record),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];
  const { styles } = useStyle();
  return (
    <>
      <PageHeader
        title="Product List"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        onRefresh={() => setSearch("")}
        onAdd={() => setIsModalOpen(true)}
        addTitle={"Agregar producto"}
      ></PageHeader>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        className={styles.customTable}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1100 }}
      />
      <ProductModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </>
  );
}
