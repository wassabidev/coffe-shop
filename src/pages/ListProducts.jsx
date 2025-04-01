import React from 'react'
import ProductCard from '../components/ProductCard'
import { useNavigate  } from "react-router-dom";



const ListProducts = () => {
    const navigate = useNavigate();
    const products = [
        {name: "Cinnamon Dolce Latte",
            price: 20000,
            img: "/assets/CinnamonDolceLatte.jpg"
        },

        {name: "Caffe Mocha",
            price: 15000,
            img: "/assets/CaffeMocha.jpg"
        },
        {name: "White Chocolate Mocha",
            price: 30000,
            img: "/assets/WhiteChocolateMocha.jpg"
        }
    ]

    
  return (
    <section>
        <ul className='flex gap-5 flex-wrap'>
            {products.map((product)=>( 
                <li key={product.id} onClick={()=> navigate(`/products/${product.id}`)} className='cursor-pointer'>
                    <ProductCard
                    product={product}
                    />
                </li>
            ))}
        </ul>
    </section>
  )
}

export default ListProducts
