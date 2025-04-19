import { NavLink } from 'react-router-dom'
import { WhatsAppOutlined } from '@ant-design/icons'
import { InstagramOutlined } from '@ant-design/icons'


const Footer = () => {

    const navItems = [
        { label: 'Nosotros', path: '/aboutus' },
        { label: 'Contactos', path: 'contact' },
        { label: 'Ubicación', path: '/ubication' },
    ]
    return (
        <footer className='bg-gray-100 border-b-[0.1rem] border-gray-400 p-2 flex justify-start'>
            <div className='flex flex-col gap-2 items-center justify-center w-1/4'>
                <div className='flex items-center justify-center w-full'>
                    <img src="/assets/logocat.svg" alt="Logo" className='w-10' />
                </div>
                <div className='flex items-center gap-2 justify-center w-full'>
                    <WhatsAppOutlined className='text-2xl' />
                    <InstagramOutlined className='text-2xl' />
                </div>
            </div>
            <ul className='flex items-center flex-col'>
                {navItems.map(({ label, path, icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={`flex flex-col gap-2 px-3 py-2 `}
                    >
                        {icon}
                        <span>{label}</span>
                    </NavLink>
                ))}
            </ul>
        </footer>
    )
}

export default Footer
