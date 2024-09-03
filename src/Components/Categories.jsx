import React, { useEffect, useState } from 'react';
import { getCategories } from '../APIS/getCategories';
import Loading from './Loading';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

export default function Categories() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 1550,
    responsive: [
      {
        breakpoint: 1024, // For tablets and larger screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 560, // For mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState(null);
  let [categoriesArr, setCategoriesArr] = useState([]);

  async function getCategoriesApi() {
    setLoading(true);
    let data = await getCategories();
    if (data?.data) {
      setCategoriesArr(data.data);
      setMsg('');
    } else {
      setMsg('Failed to fetch categories');
    }
    setLoading(false);
  }

  useEffect(() => {
    getCategoriesApi();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (msg) {
    return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>;
  }

  return (
    <div className='my-9 '>
     
      <Slider {...settings}>
        {categoriesArr.map(catg => (
          <img
            className='h-[150px]'
            style={{ objectFit: 'cover' }}
            key={catg?.id}
            src={catg?.image}
            alt={catg?.name} // Added alt attribute for accessibility
          />
        ))}
      </Slider>
    </div>
  );
}
