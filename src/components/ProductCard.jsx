import React from 'react'

const ProductCard = ({ product }) => {

    const formatsimbol = (price)=>{
        const formattedPrice = new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" }).format(
            price,
          )
    return `${formattedPrice}`
    }
    return (
        <div className=' flex flex-col gap-2 p-3 rounded-md border-[0.1rem] border-gray-200'>
            <div className='relative'>
                <img src={product.img}
                    className='w-3xs rounded-lg'
                    alt="" />
                <button className='absolute w-2 top-2 right-2 rounded-full p-2 bg-gray-200 border-[0.1rem] border-gray-400'>
                    <img src="/assets/heart.svg" 
                    alt=""
                     />
                </button>
            </div>
            <div className='flex items-start flex-col'>
                <h5>{product.name}</h5>
                <p className='font-semibold'>{formatsimbol(product.price)}</p>
            </div>
        </div>
    )
}

export default ProductCard
