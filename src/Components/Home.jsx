import React, { useContext, useEffect, useState } from 'react'
import FeaturedProduct from './FeaturedProduct';
import Categories from './Categories';
import MainSlider from './MainSlider';
import { Helmet } from "react-helmet";


export default function Home() {
  
 return (<>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="استمتع بتجربة تسوق سهلة ومريحة مع تطبيقنا للتجارة الإلكترونية. اكتشف أحدث العروض والمنتجات المتوفرة لدينا الآن!" />

    </Helmet>
    <MainSlider></MainSlider>

    <Categories></Categories>

    <FeaturedProduct></FeaturedProduct>
  </>
  )
}
