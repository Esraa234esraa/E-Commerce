import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // تغيير فئة CSS بناءً على الحالة الجديدة
    };

    return (
        <div className='parent'>
            <Navbar />
            <button onClick={toggleDarkMode} style={{ display: 'flex', fontSize: '24px', margin: '10px',width:'20%' }}>
                {isDarkMode ? (
                    <i className='fa fa-sun'></i>
                ) : (
                    <i className='fa fa-moon'></i>
                )}
            </button>
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
