import React from 'react'
import mainImg from '../assets/finalProject assets/images/slider-image-1.jpeg';
import img2 from '../assets/finalProject assets/images/slider-image-2.jpeg';
import img3 from '../assets/finalProject assets/images/slider-image-3.jpeg';
import grocy1 from '../assets/finalProject assets/images/slider-2.jpeg';
import grocy2 from '../assets/finalProject assets/images/grocery-banner-2.jpeg';
import Slider from 'react-slick';


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1550,
    arrows: false
}


export default function MainSlider() {
    return (
        <div className='row'>
            <div className="w-full lg:w-2/3">
                <Slider {...settings}>

                    <img src={mainImg} className='w-full h-[25rem]' alt="" />
                    <img src={img2} className='w-full h-[25rem]' alt="" />
                    <img src={img3} className='w-full h-[25rem]' alt="" />
                </Slider>
            </div>
            <div className="hidden lg:block lg:w-1/3 h-full">
                <img src={img2} className='w-full h-[12.5rem]' style={{ objectFit: 'cover' }} alt="" />
                <img src={img3} className=' w-full h-[12.5rem]' style={{ objectFit: 'cover' }} alt="" />
            </div>
        </div>
    )
}
