import React from 'react';
import useQueryCard from '../Hokes/useQueryCard';
import useMutationCart from '../Hokes/useMutaionCart';
import { getCartApi, deleteCartApi, UpdateCartApi, clearCartApi } from '../APIS/cartApis';
import Loading from './Loading';
import { toast } from 'react-toastify';
import imgEmptyCart from '../assets/finalProject assets/images/imgEmptyCart.webp'
import BasicModal from './Basicmodal';
import { Helmet } from 'react-helmet';
export default function Cart() {
  const { isError, data, error, isLoading } = useQueryCard("getcart", getCartApi);
  const { mutate: removeCart, isPending: delCart, status, isError: isRemoveError, error: removeError } = useMutationCart(deleteCartApi);
  const { mutate: updateCart, isPending: updCart, status: update, isError: isUpdateError, error: updateError } = useMutationCart(UpdateCartApi);
  const { mutate: clearCart, isPending: clCart, status: clear, isError: isClearError, error: clearError } = useMutationCart(clearCartApi);

 
  //delete
  React.useEffect(() => {
    if (status === 'success') {
      toast.success('Item removed successfully');

    }
    if (isRemoveError) {
      toast.error('Failed to remove item');
      console.error(removeError);
    }
  }, [status, isRemoveError, removeError]);

  //update
  React.useEffect(() => {
    if (update === 'success') {
      console.log('done');

    }
    if (isUpdateError) {
      console.error(updateError);
    }
  }, [update, isUpdateError, updateError]);

  //clear Cart
  React.useEffect(() => {
    if (clear === 'success') {
      toast.success('Cart clear successfuly')
      console.log('clear');

    }
    if (isClearError) {
      toast.error('Faild to clear cart')

      console.error(clearError);
    }
  }, [clear, isClearError, clearError]);

  if (isLoading || delCart || clCart || updCart) {
    return <Loading />;
  }

 
  function increaseProduct(pId, pCount) {
    const product = data?.data?.products?.find(item => item.product.id === pId);

    if (product) {
      if (product.product.quantity > product.count) {
        updateCart({ id: pId, count: pCount + 1 });
      } else {
        toast('This product is not available more than this number');
      }
    } else {
      toast('Product not found in the cart');
    }
  }

  function decreaseProduct(pId, pCount) {
    updateCart({ id: pId, count: pCount - 1 })
  }
  return (
    <>
      <Helmet>
        <title>Cart </title>
        <meta name="description" content="استمتع بتجربة تسوق سهلة ومريحة مع تطبيقنا للتجارة الإلكترونية. اكتشف أحدث العروض والمنتجات المتوفرة لدينا الآن!" />

      </Helmet>


      {data?.numOfCartItems ? <>
        <h2 className='my-3 text-green-500 text-xl'>
          Cart Items: <span className='ml-2 font-bold'>{data?.numOfCartItems}</span>
        </h2>
        <h3 className='my-3 text-xl'>
          Total: <span className='text-green-500 ml-2 font-bold'>{data?.data?.totalCartPrice} EGP</span>
        </h3>
        <div className="flex justify-end">
          <button onClick={() => clearCart()} className="bg-red-600 text-white p-3">Clear all cart</button>
        </div>
        <div className="mb-5 relative overflow-x-auto shadow-md sm:rounded-lg mt-9">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action <i className='fas fa-trash text-red-700'></i></th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.products?.map((item) => (
                <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.product?.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => { decreaseProduct(item?.product?.id, item?.count) }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Decrease quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => {
                        increaseProduct(item?.product?.id, item?.count)
                      }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Increase quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price}<span className='pl-2 text-green-700'>EGP</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { removeCart(item?.product?.id); }} className="p-3 bg-gray-100 font-medium text-red-600 dark:text-red-500 hover:bg-red-800 hover:text-white">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
        <BasicModal cartId={data?.data?._id} />

      </>
        : <div className="container flex flex-col justify-center items-center space-y-4 ">
          <div className='text-center my-3'>
            <h2 className="text-xl text-gray-700">Your cart is empty!</h2>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <div className='flex justify-center items-center'>
            <img className=" rounded-xl lg:w-1/4 mb-6 mt-4 md:mt-0" src={imgEmptyCart} alt="Empty Cart" />
          </div>


        </div>

      }


    </>
  );
}
