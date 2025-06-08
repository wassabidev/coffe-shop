import { useState } from "react";

const SideBar = ({ data, setSearchTerm, resetInput }) => {
  const [selected, setSelected] = useState(null);

  const handleSubcategoriaClick = (sub) => {
    setSearchTerm(sub.toLowerCase());
    setSelected(sub);
    resetInput("");
  };

  return (
    <aside className="max-w-60 min-w-40 hidden md:block bg-white min-h-dvh p-4 md:ml-0 lg:ml-12 transition-all duration-500">
      {data ? (
        data.categories.map((item, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              {item.name}
            </h2>
            <ul className="space-y-1">
              {item.subcategory
                ? item.subcategory.map((sub, i) => (
                    <li
                      key={i}
                      onClick={() => handleSubcategoriaClick(sub.name)}
                      className={`px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 
                ${selected === sub.name ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100 text-gray-500"}`}
                    >
                      {sub.name}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        ))
      ) : (
        <p>Aun no existen categorias</p>
      )}
    </aside>
  );
};

export default SideBar;
