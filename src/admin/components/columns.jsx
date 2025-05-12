export const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const value = row.getValue("category");
      return (
        <span
          className={`px-2 py-1 rounded text-sm ${value === "Bebida" ? "bg-pink-100 text-pink-600" : "bg-cyan-100 text-cyan-600"}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => Number(row.getValue("price")).toLocaleString(),
  },
];
