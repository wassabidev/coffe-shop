import React, { useState } from 'react'
import { FolderOutlined } from '@ant-design/icons'

const SideBar = ({ data }) => {
  const [selected, setSelected] = useState(null)

  const handleSubcategoriaClick = (sub) => {
    setSelected(sub)
    console.log(sub)
  }

  return (
    <aside className="w-64 bg-white min-h-screen p-4">
      {data.map((item, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">

            {item.categoria}
          </h2>
          <ul className="space-y-1">
            {item.subcategorias.map((sub, i) => (
              <li
                key={i}
                onClick={() => handleSubcategoriaClick(sub)}
                className={`px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 
                ${selected === sub ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                {sub}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}

export default SideBar
