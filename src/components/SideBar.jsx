import { useState } from "react";

const SideBar = ({ data, setSearchTerm, resetInput }) => {
  const [selected, setSelected] = useState(null);

  const handleSubcategoriaClick = (sub) => {
    setSearchTerm(sub.toLowerCase());
    setSelected(sub);
    resetInput("");
  };

  return (
    <aside className="w-64 hidden md:block bg-white min-h-dvh p-4 md:ml-8 lg:ml-12">
      {data
        ? data.map((item, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                {item.categoria}
              </h2>
              <ul className="space-y-1">
                {item.subcategorias
                  ? item.subcategorias.map((sub, i) => (
                      <li
                        key={i}
                        onClick={() => handleSubcategoriaClick(sub)}
                        className={`px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 
                ${selected === sub ? "bg-gray-100 text-gray-700" : "hover:bg-gray-100 text-gray-500"}`}
                      >
                        {sub}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          ))
        : null}
    </aside>
  );
};

export default SideBar;
