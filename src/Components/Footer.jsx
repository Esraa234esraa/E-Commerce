import React from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'

export default function Footer() {
    return (
        <div><footer className="bg-gray-200 text-gray-700 py-8">
            <div className="container mx-auto px-4">
                <div className="flex  flex-wrap justify-between">
                    <div className="w-full  md:w-1/3 mb-6">
                        <img src={logo} alt="" />
                    </div>

                    <div className="w-full md:w-1/3 mb-6 ">
                        <h2 className="text-lg font-bold mb-4">About Us</h2>
                        <p className="text-gray-600">
                            We are a leading E-Commerce store offering a wide range of products. Our mission is to provide the best quality and service to our customers.
                        </p>
                    </div>



                    <div className="w-full md:w-1/3 md:pl-3 lg:pl-20 mb-6">
                        <h2 className="text-lg font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-2">
                            <i className="fas fa-map-marker-alt mr-2"></i> 123 E-Commerce St, City, Country
                        </p>
                        <p className="text-gray-600 mb-2">
                            <i className="fas fa-phone mr-2"></i> +123 456 7890
                        </p>
                        <p className="text-gray-600 mb-2">
                            <i className="fas fa-envelope mr-2"></i> support@ecommerce.com
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                    &copy; 2024 E-Commerce. All rights reserved.
                </div>
            </div>
        </footer>
        </div>
    )
}
