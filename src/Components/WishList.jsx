import React, { useEffect } from 'react';
import useQueryCard from '../Hokes/useQueryCard';
import { getWishList, removeProductfromWhishList } from '../APIS/wishList';
import { toast } from 'react-toastify';
import Loading from './Loading';
import wishlistimg from '../assets/finalProject assets/images/wishlist.webp';
import Item from './Item';
import useMutationCart from '../Hokes/useMutaionCart';
import { addToCartApi } from '../APIS/cartApis';
import { Helmet } from 'react-helmet';

export default function WishList() {
    const { isLoading, status: getWishStatus, data: getAllWishData, isError: isWishError, error: getWError } = useQueryCard(['wishList'], getWishList);

    useEffect(() => {
        if (getWishStatus) {
            isLoading == true
        }
        if (isWishError) {
            toast.error('Failed to load wish list');
            console.error(getWError);
        }
    }, [getWishStatus, isWishError, getWError]);

    if (isLoading) {
        return <Loading />;
    }
    console.log(getAllWishData?.data);

    return (
        <div className='row'>
            <Helmet>
                <title>Wish List </title>
                <meta name="description" content="استعرض مجموعة واسعة من الفئات في تطبيقنا للتجارة الإلكترونية. اكتشف المنتجات المتنوعة بترتيب مريح وسهل لسهولة التسوق والاختيار." />

            </Helmet>
            {getWishStatus === 'success' && getAllWishData?.data?.length > 0 ? (
                getAllWishData?.data?.map((item) => (
                    <Item key={item?._id} prod={item}></Item>
                ))
            ) : (
                <div className="container flex flex-col justify-center items-center space-y-4">
                    <div className='text-center my-3'>
                        <h2 className="text-xl text-gray-700">Your wish list is empty!</h2>
                        <p className="text-gray-500">Looks like you haven't added anything to your wish list yet.</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img className="rounded-xl lg:w-1/4 mb-6 mt-4 md:mt-0" src={wishlistimg} alt="Empty Wishlist" />
                    </div>
                </div>
            )}
        </div>
    );
}
