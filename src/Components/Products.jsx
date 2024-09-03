import React, { useEffect, useState } from 'react';
import FeaturedProduct from './FeaturedProduct';
import Loading from './Loading';
import { getCategories } from '../APIS/getCategories';
import { getProducts, getProductsWithCat } from '../APIS/getProducts'; // Assume getProducts fetches all products
import { Helmet } from 'react-helmet';
import DisCat from './DisCat';

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // New state to track selected category

  // Fetch all categories
  async function getCategoriesApi() {
    setLoading(true);
    try {
      let data = await getCategories();
      console.log('Categories data:', data); // Check the categories data
      if (data?.data) {
        setCategoriesArr(data.data);
        setMsg('');
      } else {
        setMsg('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMsg('Error fetching categories');
    }
    setLoading(false);

    // Fetch all products initially
    getAllProducts();
  }

  // Fetch all products
  async function getAllProducts() {
    setLoading(true);
    setSelectedCategory(null); // Reset selected category
    try {
      let data = await getProducts(); // Fetch all products without filtering
      console.log('All products data:', data); // Check the products data
      if (data?.data) {
        setDataArr(data.data);
        setMsg('');
      } else {
        setMsg('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setMsg('Error fetching products');
    }
    setLoading(false);
  }

  // Fetch products with specific category
  async function getData(id) {
    setLoading(true);
    setSelectedCategory(id); // Set the selected category
    try {
      let data = await getProductsWithCat(id);
      console.log('Category products data:', data); // Check the products data for category
      if (data?.data) {
        setDataArr(data.data); // Update the same dataArr
        setMsg('');
      } else {
        setMsg('Failed to fetch products for selected category');
      }
    } catch (error) {
      console.error('Error fetching category products:', error);
      setMsg('Error fetching products for selected category');
    }
    setLoading(false);
  }

  useEffect(() => {
    getCategoriesApi();
  }, []);

  useEffect(() => {
    console.log('Displayed products:', dataArr); // For debugging purposes
  }, [dataArr]);

  if (loading) {
    return <Loading />;
  }

  if (msg) {
    return <h2 className='text-red-700 my-3 font-bold'>{msg}</h2>;
  }

  return (
    <div className='row flex-wrap'>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="استعرض مواصفات وأسعار المنتج، وقارن بين الخيارات المختلفة. احصل على أفضل العروض والتقييمات لتجد المنتج المثالي لك." />
      </Helmet>
      <div className="lg:w-1/6">
        <ul className='flex flex-wrap lg:block font-bold text-green-700'>
          <li
            onClick={getAllProducts}
            className='flex items-center cursor-pointer p-2 hover:text-green-700 hover:underline transition-all duration-1000'
          >
            <i className='fa fa-circle text-sm text-gray-200 mr-2'></i>
            All Products
          </li>
          {categoriesArr?.map((catg) => (
            <li
              onClick={() => getData(catg?._id)}
              key={catg?._id} // Use unique key
              className='flex items-center cursor-pointer p-2 hover:text-green-700 hover:underline transition-all duration-1000'
            >
              <i className='fa fa-circle text-sm text-gray-200 mr-2'></i>
              {catg.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-5/6">
        <DisCat arr={dataArr}></DisCat>
      </div>
    </div>
  );
}
