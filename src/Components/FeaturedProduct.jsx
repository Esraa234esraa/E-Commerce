import React, { useEffect, useState } from 'react';
import { getProducts } from '../APIS/getProducts';
import Loading from './Loading';
import Item from './Item';

export default function FeaturedProduct({ arr }) {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [productArr, setProductArr] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to track search input
    const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

    async function getProductsApi() {
        setLoading(true);
        let data = await getProducts();
        if (data?.data) {
            setProductArr(data.data);
            setFilteredProducts(data.data); // Initialize filtered products with all products
            setMsg('');
        } else {
            setMsg(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProductsApi();
    }, []);

    useEffect(() => {
        // Update filtered products based on search term
        if (searchTerm) {
            const filtered = productArr.filter(prod =>
                prod.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(productArr); // Show all products if search term is empty
        }
    }, [searchTerm, productArr]);

    if (loading) {
        return <Loading />;
    }

    if (msg) {
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>;
    }

    return (
        <>
            <div className='w-full md:w-[80%] text-center flex items-center justify-center my-[2rem] mx-auto'>
                <input
                    className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                    type="text"
                    placeholder='Search...'
                    value={searchTerm} // Controlled input
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                />
            </div>

            <div className='row'>
                {filteredProducts.map(prod => (
                    <Item key={prod?._id} prod={prod} />
                ))}
            </div>
        </>
    );
}

