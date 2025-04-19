import Sidebar from '../admin/components/Sidebar';
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-100 min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
