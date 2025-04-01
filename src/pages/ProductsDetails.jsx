import React from 'react'

const ProductsDetails = ({products, id}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
        <h1 className='text-2xl font-bold'>Caffe Mocha</h1>

        <p className='rounded-md p-2 bg-green-100 text-green-400'>Salado</p>
        <p className='text-lg'>15000 G</p>
        <label htmlFor="cantidad">Cantidad</label>
        <input type="number" id='cantidad'/>
        <p className='text-lg'>Description: A delicious blend of espresso, steamed milk, and chocolate syrup, topped with whipped cream.</p>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-md'>Add to Cart</button>
      <img src="/assets/CaffeMocha.jpg" alt="" className='w-1/2 rounded-md'/>
    </div>
  )
}

export default ProductsDetails
