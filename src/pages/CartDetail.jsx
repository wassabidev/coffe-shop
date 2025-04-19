import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Delete from '../components/ui/Delete'
import Edit from '../components/ui/Edit'
import { addItem, removeItem } from '../features/cart/cartSlice'


const CartDetail = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();

    const handleAdd = (item) => {
        dispatch(addItem(item));

    }

    const handleDelete = (item) => {
        dispatch(removeItem(item))
        console.log(item._id);
    }
    return (
        <div>
            <h1>Ver ordenes</h1>

            {cartItems.map((item) => (
                <div key={item._id} className='flex flex-col gap-2  rounded-lg shadow-md border-gray-400 p-5 my-5 lg:m-5'>
                    <div
                        className='flex gap-2 items-center'>
                        <img src={`/uploads/${item.image}`} alt={item.name} className='w-25 h-25 rounded-full' />
                        <div className='w-full'>
                            <div className='flex gap-2 items-center justify-between'>
                                <h2 className='text-lg font-bold'>{item.name}</h2>
                                <p className='text-lg font-bold'>{item.price}</p>
                            </div>
                            <p>
                                {item.description}
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button className='cursor-pointer'
                            onClick={() => handleAdd(item)}>
                            <Edit />
                        </button>
                        <p>
                            {item.quantity}
                        </p>

                        <button className='cursor-pointer'
                            onClick={() => handleDelete(item)}>
                            <Delete />
                        </button>
                    </div>
                </div>
            ))}
            <div className='sb-card sb-card-shadow card___tymku px3 pt3 pb5 sm-px5 md-py4 mb3 sb-animator-fade-appear-done sb-animator-fade-enter-done'>
                <div className='sb-card__content'>
                    <div className='color-textBlackSoft flex mt-1 items-end'>
                        <p>Subtotal</p>

                        {/* Línea punteada */}
                        <div
                            className='flex-grow m-0 h-3'
                            style={{
                                backgroundImage: '-webkit-repeating-radial-gradient(center center,currentColor,currentColor 1px,#0000 1px,#0000 100%)',
                                backgroundPosition: '0 75%',
                                backgroundRepeat: 'repeat-x',
                                backgroundSize: '5px 5px',
                                opacity: '0.3',
                                width: '100%',
                            }}></div>

                        <p>25</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartDetail
