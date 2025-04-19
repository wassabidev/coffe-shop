import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

const Header = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const navigate = useNavigate();

    const navItems = [
        { label: 'Prodouctos', path: '/' },
        { label: 'Favoritos', path: '/favorites' },
        { label: 'Nosotros', path: '/aboutus' },
        { label: 'Contactos', path: '/contacts' },
    ]
    return (
        <header className='bg-gray-100 border-b-[0.1rem] border-gray-400 p-2'>
            <ul className='flex items-center justify-between'>
                <div>
                    <li>
                        <a href='/'>
                            <img src="/assets/logocat.svg" alt="" />
                        </a>
                    </li>
                </div>
                <div className='flex gap-3'>
                    {navItems.map(({ label, path, icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `flex gap-2 px-3 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-gray-200'
                                }`
                            }
                        >
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}

                </div>

                <div className='flex gap-3 items-center'>
                    <li className='user-cart'>
                        <button className='rounded-full bg-gray-300 border-[0.1rem] border-gray-400 p-2'>
                            <img src="/assets/user.svg" alt="" />
                        </button>

                    </li>

                    <li>
                        <button
                            onClick={() => navigate('/cart')}
                            className='w-10 h-10 bg-no-repeat bg-center bg-contain cursor-pointer flex items-center justify-center bg-[url("/assets/shopping-cart.svg")]'>
                            {cartItems.length > 0 && (
                                <span className=' text-white font-bold text-md rounded-full items-center justify-center'>
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </li>
                </div>
            </ul>
        </header>
    )
}

export default Header
