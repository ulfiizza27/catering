import React from 'react';
import Image from '../../assets/img/contact.png';

export default function Contact() {
    return (
        <div id="contact" className="container mx-auto mt-[217px]">
            <div className="text-center mb-20">
                <h1 className="text-4xl font-semibold text-black mb-2 font-inter">Contact Us</h1>
                <hr className="w-36 mx-auto border-t-4 border-[#E5AF10] mb-5" />
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-4">
                    <img src={Image} alt="Contact" className="w-[435px] h-[383px]" />
                </div>
                <div className="col-span-8">
                    <form className="w-full">
                        <div className="flex mb-[46px]">
                            <div className="w-1/2 pr-10">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3 font-inter">NAME</label>
                                <input type="text" id="name" placeholder="Enter your name..." className="w-full border-2 border-gray-300 rounded-xl py-4 px-5 focus:outline-none focus:border-yellow-500" />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3 font-inter">EMAIL ADDRESS</label>
                                <input type="email" id="email" placeholder="Enter your email address..." className="w-full border-2 border-gray-300 rounded-xl py-4 px-5 focus:outline-none focus:border-yellow-500" />
                            </div>
                        </div>
                        <div className=" mb-12">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">MESSAGES</label>
                            <textarea id="message" placeholder="Enter your messages..." className="block w-full text-gray-700 border-2 border-gray-300 rounded-xl py-4 px-5 focus:outline-none" rows="6"></textarea>
                        </div>
                        <button type="submit" className="bg-[#E5AF10] text-white py-4 px-10 rounded-md text-xl font-semibold font-inter">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
