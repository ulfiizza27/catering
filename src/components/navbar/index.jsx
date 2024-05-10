import React, { useState, useEffect } from 'react';
import Logo from '../../assets/img/logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { signOut } from "firebase/auth"; // Perhatikan perubahan ini
import { auth } from "../../firebase";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    async function handleSignOut() {
        try {
            await signOut(auth);
            localStorage.removeItem("token"); 
            setIsLoggedIn(false); 
            navigate('/'); 
        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <div className="shadow-lg fixed top-0 left-0 right-0 z-10 bg-white">
            <nav className="container mx-auto grid grid-cols-3 items-center justify-between py-4">
                <div className="flex items-center justify-start col-span-1">
                    <img src={Logo} alt="Logo" className="h-16" />
                </div>
                <div className="flex items-center justify-center col-span-1 text-base">
                    {isLoggedIn ? (
                        <>
                        <ul className="flex justify-center space-x-6">
                            <RouterLink to="/order" className="font-inter hover:text-yellow-500 font-bold text-base" style={{ cursor: 'pointer' }}>Order</RouterLink>
                            <RouterLink to="/report" className="font-inter hover:text-yellow-500 font-bold text-base" style={{ cursor: 'pointer' }}>Report</RouterLink>
                            <RouterLink to="/chatai" className="font-inter hover:text-yellow-500 font-bold text-base" style={{ cursor: 'pointer' }}>Chat</RouterLink>
                        </ul>
                        </>
                    ) : (
                        <ul className="flex justify-center space-x-6">
                            <li><ScrollLink to="home" smooth={true} duration={700} className="font-inter hover:text-yellow-500 font-bold" style={{ cursor: 'pointer' }}>Home</ScrollLink></li>
                            <li><ScrollLink to="about" smooth={true} duration={700} className="font-inter hover:text-yellow-500 font-bold" style={{ cursor: 'pointer' }}>About</ScrollLink></li>
                            <li><ScrollLink to="contact" smooth={true} duration={700} className="font-inter hover:text-yellow-500 font-bold" style={{ cursor: 'pointer' }}>Contact us</ScrollLink></li>
                        </ul>
                    )}
                </div>
                <div className="flex items-center justify-end col-span-1">
                    {isLoggedIn ? (
                        <div>
                            <button onClick={handleSignOut} className="font-inter border border-yellow-500 text-black px-4 py-1 rounded-lg mr-6 hover:bg-yellow-500 hover:text-white font-bold text-base" style={{ cursor: 'pointer' }}>Sign Out</button>
                        </div>
                    ) : (
                        <div>
                            <RouterLink to="/login" className="font-inter border border-yellow-500 text-black px-[10px] py-2 rounded-lg mr-6 hover:bg-yellow-500 hover:text-white font-bold text-base" style={{ cursor: 'pointer' }}>Login</RouterLink>
                            <RouterLink to="/register" className="font-inter border border-yellow-500 text-black px-[10px] py-2 rounded-lg hover:bg-yellow-500 hover:text-white font-bold text-base" style={{ cursor: 'pointer' }}>Register</RouterLink>
                        </div>
                    )}
                </div>
            </nav>
            <hr />
        </div>
    );
}