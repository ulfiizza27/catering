import Banner from '../../assets/img/banner.png';
import Cart from '../../assets/img/shopping_cart.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export default function Home(){
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate();

    const handleOrderClick = () => {
        if (isLoggedIn) {
            navigate('/order'); 
        } else {
            alert('Silakan login terlebih dahulu untuk memesan.');
            navigate('/login'); 
        }
    };
    return(
        <div id="home" className="container mx-auto flex pt-32">
            <div className="flex-1 ">
                <img src={Banner} alt="Banner" className="h-[607px] w-[611px]" />
            </div>
            <div className="flex-1 pl-36 py-20">
                <h1 className="text-5xl font-bold" style={{ lineHeight: '1.3' }}>
                    Happy With <span className="text-[#E5AF10] font-inter">Delicious Food</span> And Get New Experiences With Nusantara Food
                </h1>
                <p className="mt-6  mr-20 text-base pt-4 font-inter">
                    Exploring new food with different transition form all country especially from Indonesian that you can try at this place and get a good price from us as well we will make a good impact to our customers
                </p>
                <div className="mt-8 flex items-center pt-4">
                    <button className="border border-[#E5AF10] text-base text-black px-6 py-4 rounded-lg mr-7 hover:bg-[#E5AF10] hover:text-black transition duration-300 flex items-center gap-2 font-inter" style={{ cursor: 'pointer' }} onClick={handleOrderClick}>
                        Order food <img src={Cart} alt="Banner" className="h-[24px]" />
                    </button>
                    <ScrollLink to="about" smooth={true} duration={700} className="border border-[#E5AF10] text-base text-black px-6 py-4 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300 font-inter" style={{ cursor: 'pointer' }}>Learn More</ScrollLink>
                </div>
            </div>
        </div>
    );
}