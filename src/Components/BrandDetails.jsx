import React from 'react';
import { useParams } from 'react-router-dom';
import useQueryCard from '../Hokes/useQueryCard';
import { getSpacificBrand } from '../APIS/Brands'; // استيراد الدالة اللازمة
import Loading from './Loading';

export default function BrandDetails() {
    let { id } = useParams(); // استخراج المعرف من الـ URL

    let { error, isError, data, isLoading, isFetched } = useQueryCard(['brandDetails', id], () => getSpacificBrand(id));

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className='text-red-600'>Error: {error.message}</div>;
    }

    if (isFetched) {
        return (<>
            <div className='container flex flex-col items-center justify-center'>
                <h2 className=' text-2xl'>{data?.data?.name}</h2>
                <img className='md:w-1/2 lg:w-1/4 w-full' src={data?.data?.image} alt={data.name} />
            </div></>


        );
    }

    return null;
}
