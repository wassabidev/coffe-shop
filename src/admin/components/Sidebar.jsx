import { NavLink } from 'react-router-dom'
import {
    MenuOutlined, TagsOutlined,
    AppstoreOutlined,
    UserOutlined,
} from '@ant-design/icons'

import { useState } from 'react'
import { Drawer, Button } from 'antd'

const navItems = [
    { label: 'Productos', path: '/admin/products', icon: <TagsOutlined /> },
    { label: 'Categorías', path: '/admin/categories', icon: <AppstoreOutlined /> },
    { label: 'Usuarios', path: '/admin/users', icon: <UserOutlined /> },
]


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    const content = (
        <nav className="flex flex-col space-y-2 p-4">
            {navItems.map(({ label, path, icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `flex gap-2 px-3 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-gray-200'
                        }`
                    }
                    onClick={() => setIsOpen(false)}
                >
                    {icon}
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    )

    return (
        <>
            {/* Sidebar desktop */}
            <aside className="hidden sm:block w-64 bg-white shadow-md min-h-screen">
                <div className="p-4 text-lg font-bold border-b">Admin Panel</div>
                {content}
            </aside>

            {/* Botón hamburguesa */}
            <div className="sm:hidden p-2 bg-white shadow-md">
                <Button icon={<MenuOutlined />} onClick={() => setIsOpen(true)} />
            </div>

            {/* Drawer para mobile */}
            <Drawer
                title="Menú"
                placement="left"
                onClose={() => setIsOpen(false)}
                open={isOpen}
            >
                {content}
            </Drawer>
        </>
    )
}
