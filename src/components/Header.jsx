import React from 'react'

const Header = () => {
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
                    <li>Prodouctos</li>
                    <li>Favoritos</li>
                    <li>Nosotros</li>
                    <li>Contactos</li>
                </div>

                <div className='flex gap-3 items-center'>
                    <li className='user-cart'>
                        <button className='rounded-full bg-gray-300 border-[0.1rem] border-gray-400 p-2'>
                            <img src="/assets/user.svg" alt="" />
                        </button>

                    </li>

                    <li>
                        <button>
                            <img
                            className=''
                            src="/assets/shopping-cart.svg" alt="" />
                        </button>
                    </li>
                </div>
            </ul>
        </header>
    )
}

export default Header
