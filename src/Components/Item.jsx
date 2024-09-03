import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMutationCart from '../Hokes/useMutaionCart';
import { addToCartApi } from '../APIS/cartApis';
import { toast } from 'react-toastify';
import { addProductToWhishList, removeProductfromWhishList } from '../APIS/wishList';
import useQueryCard from '../Hokes/useQueryCard';
import Loading from './Loading';
import { Helmet } from 'react-helmet';

export default function Item({ prod }) {
    const { mutate: addMutate, isPending: addPend, status, isError: isAddError, error: addError } = useMutationCart(addToCartApi);
    const { mutate: addWishMutate, isPending: addWishPend, status: whishStatus, isError: isWishError, error: whishError } = useMutationCart(addProductToWhishList);
    const { mutate: delWishMutate, isPending: delPend, status: delwhishStatus, isError: isdelWishError, error: delwhishError } = useMutationCart(removeProductfromWhishList);

    useEffect(() => {
        if (status === 'success') {
            toast.success('Item added successfully');
        }
        if (isAddError) {
            toast.error('Failed to add item');
            console.error(addError);
        }
    }, [status, isAddError, addError]);

    useEffect(() => {
        if (whishStatus === 'success') {
            toast.success('Item added to whish list successfully');
        }
        if (isWishError) {
            toast.error('Failed to add item to whish list');
            console.error(whishError);
        }
    }, [whishStatus, isWishError, whishError]);

    useEffect(() => {
        if (delwhishStatus === 'success') {
            toast.success('Item removed from whish list successfully');
        }
        if (isdelWishError) {
            toast.error('Failed to remove item from whish list');
            console.error(delwhishError);
        }
    }, [delwhishStatus, isdelWishError, delwhishError]);

    const [flag, setFlag] = useState(() => {
        const savedFlag = localStorage.getItem(`flag-${prod.id}`);
        return savedFlag === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`flag-${prod.id}`, flag);
    }, [flag, prod.id]);

    function toggleWish() {
        if (flag) {
            delWishMutate(prod._id);
        } else {
            addWishMutate(prod._id);
        }
        setFlag(!flag);
    }
    if (addPend || addWishPend || delPend) {
        <Loading />
    }
    return (
        <div className='flex-nowrap lg:w-1/5 gap-1 md:w-1/4 sm:w-1/2 mt-20'>
            <Helmet>
                <title>Products </title>
                <meta name="description" content="استمتع بتجربة تسوق سهلة ومريحة مع تطبيقنا للتجارة الإلكترونية. اكتشف أحدث العروض والمنتجات المتوفرة لدينا الآن!" />

            </Helmet> <div className="product p-2 cursor-pointer">
                {prod && (
                    <>
                        <Link to={`/productdetails/${prod.id}/${prod?.category?._id}`}>
                            <img src={prod?.imageCover || ''} className='w-full' alt={prod?.title || 'Product image'} />
                            <p className='text-green-700 '>{prod?.category?.name}</p>
                            <h2 className='font-bold line-clamp-1'>{prod?.title}</h2>
                            <div className='flex justify-between my-3'>
                                <span>{prod?.price} EGP</span>
                                <p><i className='fas fa-star pr-2 text-yellow-500'></i>{prod?.ratingsAverage}</p>
                            </div>
                        </Link>
                    </>
                )}
                <button
                    onClick={() => addMutate(prod._id)}
                    className='btn bg-green-700 text-white p-2 rounded-lg mx-auto'>
                    Add to cart
                </button>
                <span className='m-3'>
                    <i
                        onClick={toggleWish}
                        className={`fa fa-heart ${flag ? 'text-red-500' : 'text-gray-600'}`}
                    ></i>
                </span>
            </div>
        </div>
    );
}
