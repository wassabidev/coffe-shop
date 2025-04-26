import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Table, Button, Input, Tag, Space, Dropdown, Menu } from "antd";
import {
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CategorieModal from "../components/forms/CategorieForm";
import { createStyles } from "antd-style";

const categories = [
  {
    id: 1,
    name: "Bebidas",
    types: ["Caliente", "Frío", "Con cafeína", "Sin cafeína"],
    description: "Líquidos para consumir, con o sin cafeína",
  },
  {
    id: 2,
    name: "Comidas",
    types: ["Caliente", "Vegetariano", "Sin gluten"],
    description: "Snacks o platos simples",
  },
];

export default function Categories() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(categories);

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
      title: "Categoría",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tipos",
      dataIndex: "types",
      key: "types",
      render: (types) => types.map((t) => <Tag key={t}>{t}</Tag>),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
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
            onClick: () => console.log("Editar", record),
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
        title="Categorias List"
        onBack={() => window.history.back()}
        searchValue={search}
        setSearchValue={setSearch}
        addTitle={"Agregar Categoria"}
        onRefresh={() => setSearch("")}
        onAdd={() => setIsModalOpen(true)}
      ></PageHeader>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        className={styles.customTable}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1100 }}
      />
      <CategorieModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </>
  );
}
