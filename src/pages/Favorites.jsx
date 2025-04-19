import React from 'react'

const Favorites = () => {
    return (
        <section>

            <h2 className='text-3xl font-bold text-left my-4'>
                Agrega tus favoritos
            </h2>
            <div className='max-w-80'>
                <img src="/assets/fav-tapes.png" alt="" className='w-full mb-3' />
                <h2 className='text-2xl font-bold text-left my-4'>
                    Guarda tus favoritos
                </h2>
                <p className='text-gray-500 font-medium text-left'>
                    Usa el corazon para guardar tus favoritos, y que aparezcan aqui.
                </p>
            </div>
        </section>
    )
}

export default Favorites
