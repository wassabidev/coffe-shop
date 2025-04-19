import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import SideBar from '../components/SideBar';
import Search from '../components/Search';
import StatusView from '../components/StatusView';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/products');
            const data = await response.json();
            setProducts(data)
            setLoading(false);
        } catch (error) {
            setError(error)
            console.error('Error al obtener los productos', error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const data = [
        { "categoria": "Bebidas", "subcategorias": ["Cafe caliente", "Cafe frio"] },
        { "categoria": "Comida", "subcategorias": ["Dulce", "Salado"] }
    ]

    return (
        < >
            <StatusView loading={loading} error={error} empty={products.length === 0} />
            {!loading && !error && (
                <main className='flex'>
                    <SideBar data={data} />
                    <div className='p-3 flex flex-col w-full'>
                        <Search className="flex justify-end mb-2" />
                        <ul className='flex gap-5 flex-wrap'>
                            {products.map((product) => (
                                <li key={product._id} className='cursor-pointer'>
                                    <ProductCard
                                        product={product}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            )}
        </>
    )
}

export default ListProducts
