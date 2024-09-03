import React, { useEffect, useState } from 'react';
import { getProductDetails } from '../APIS/getProductDetails';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { motion } from "framer-motion";
import { getProductsWithCat } from '../APIS/getProducts';
import Item from './Item';
import { toast } from 'react-toastify';
import { addToCartApi } from '../APIS/cartApis';
import useMutationCart from '../Hokes/useMutaionCart';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    let { id, categoryId } = useParams();
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState(null);
    let [product, setProduct] = useState({});
    let [relatedProd, setRelatedProd] = useState([]);
    let [imgSrc, setImgSrc] = useState('');
    let { mutate: addMutate, status, data, isError: isAddError, error: addError } = useMutationCart(addToCartApi);

    // Handling success
    React.useEffect(() => {
        if (status === 'success') {
            toast.success('Item added successfully');
        }
        if (isAddError) {
            toast.error('Failed to add item');
            console.error(addError);
        }
    }, [status, isAddError, addError]);

    async function getProductDetailsApi() {
        setLoading(true);
        let data = await getProductDetails(id);
        if (data?.data) {
            setProduct(data.data);
            setMsg('');
            setImgSrc(data.data.imageCover);  // Set default image
            getProductWithCategoryApi(data.data.category._id);  // Fetch related products
            setLoading(false);
        } else {
            setMsg(data);
            setLoading(false);
        }
    }

    async function getProductWithCategoryApi(categoryId) {
        setLoading(true);
        let data = await getProductsWithCat(categoryId);
        if (data?.data) {
            setRelatedProd(data.data);
            setMsg('');
            setLoading(false);
        } else {
            setMsg(data);
            setLoading(false);
        }
    }

    function getImgSrc(e) {
        setImgSrc(e.target.src);
    }
    useEffect(() => { getProductWithCategoryApi() }, [])
    useEffect(() => {
        getProductDetailsApi();
    }, [id]);

    if (loading) {
        return <Loading />;
    }
    if (msg) {
        return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>;
    }

    return (
        <> <Helmet>
            <title>Product Details</title>
            <meta name="description" content="استمتع بتجربة تسوق سهلة ومريحة مع تطبيقنا للتجارة الإلكترونية. اكتشف أحدث العروض والمنتجات المتوفرة لدينا الآن!" />

        </Helmet>
            <div className='row items-center py-5 gap-10 sm:gap-0'>
                <div className='sm:w-1/3'>
                    <img src={imgSrc || product.imageCover} className='w-full' alt="" />
                    <ul className='flex justify-center gap-2 my-4'>
                        {product?.images?.map(img => (
                            <li key={img}>
                                <motion.img
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={getImgSrc}
                                    src={img}
                                    className='cursor-pointer'
                                    alt=""
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='sm:w-2/3 pl-5'>
                    <p className='text-green-700'>{product?.category?.name}</p>
                    <h2 className='font-bold'>{product.title}</h2>
                    <p className='font-thin'>{product.description}</p>
                    <div className='flex gap-4 my-3'>
                        <span>{product?.price} EGP</span>
                        <p><i className='fas fa-star pr-2 text-yellow-500'></i>{product?.ratingsAverage}</p>
                    </div>
                    <button onClick={() => addMutate(product._id)} className='btn bg-green-700 text-white p-2 rounded-lg mx-auto'>Add to cart</button>
                </div>
            </div>

            <h3 className="text-2xl font-bold my-4 text-green-700">Items that may interest you:</h3>

            <div className="row">

                {relatedProd.map(prod => (
                    <Item key={prod.id} prod={prod} />
                ))}
            </div>
        </>
    );
}
