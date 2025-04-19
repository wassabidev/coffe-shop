import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartICon from "./ui/HeartICon";
import DefaulImage from "/assets/product-placeholder.png";

const ProductCard = ({ product }) => {
    const [color, setColor] = useState(false);
    const navigate = useNavigate();


    const formatsimbol = (price) => {
        const formattedPrice = new Intl.NumberFormat("es-PY", { style: "currency", currency: "PYG" }).format(
            price,
        )
        return `${formattedPrice}`
    }

    const handleFavorite = (event, productId) => {
        event.stopPropagation();
        setColor(!color)
        console.log(productId);
    }

    return (
        <button className='cursorr-pointer flex flex-col gap-2 p-3 rounded-md border-[0.1rem] border-gray-200'
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <div className='relative'>
                <button className={`absolute cursor-pointer top-2 right-2`}
                    onClick={(event) => handleFavorite(event, product._id)}>
                    <HeartICon color={color} />
                </button>
                <img src={!product.image ? DefaulImage : `/uploads/${product.image}`}
                    className='w-3xs rounded-lg'
                    alt="" />
            </div>
            <div className='flex items-start flex-col'>
                <h5>{product.name}</h5>
                <p className='font-semibold'>{formatsimbol(product.price)}</p>
            </div>
        </button>
    )
}

export default ProductCard
