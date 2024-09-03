import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    const [isDarkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.body.classList.toggle('dark-mode', savedMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            document.body.classList.toggle('dark-mode', newMode);
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <div className='parent'>
            <Navbar />
            <button 
                onClick={toggleDarkMode} 
                style={{ display: 'flex', fontSize: '24px', margin: '10px', width: '30px' }} 
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {isDarkMode ? (
                    <i className='fa fa-sun' aria-hidden="true"></i>
                ) : (
                    <i className='fa fa-moon' aria-hidden="true"></i>
                )}
            </button>
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
