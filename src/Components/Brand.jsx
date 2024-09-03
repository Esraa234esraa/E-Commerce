import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import Loading from './Loading';
import { Helmet } from 'react-helmet';
import useQueryCard from '../Hokes/useQueryCard';
import { getAllBrands } from '../APIS/Brands';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Brand() {
  const { isFetched, data: allData, isLoading: allLoading, error: getAllError, isError: isgetAllError } = useQueryCard(['allBrands'], getAllBrands);

  useEffect(() => {
    if (isgetAllError) {
      toast.error('Failed to load brands');
      console.error(getAllError);
    }
  }, [isgetAllError, getAllError]);

  if (allLoading) {
    return <Loading />;
  }

  if (isgetAllError) {
    return <div className='text-2xl my-2 text-red-700'>Error: {getAllError.message}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Brand</title>
        <meta name="description" content="استمتع بتجربة تسوق سهلة ومريحة مع تطبيقنا للتجارة الإلكترونية. اكتشف أحدث العروض والمنتجات المتوفرة لدينا الآن!" />
      </Helmet>
      <div className='row'>
        {isFetched && allData?.data?.map((brand) => (
          <Link className='w-full md:w-1/3 lg:w-1/5 h-[40vh]' to={`/branddetails/${brand?._id}`} key={brand._id}>
            <div key={brand.id}>
              <div className="p-3" >
                <img className='w-full' src={brand.image} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
