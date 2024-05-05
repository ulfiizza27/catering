import React from 'react';
import Image from '../../assets/img/Image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function About() {
    return (
        <div id="about" className="container mx-auto my-32">
            <div className="text-center mb-24">
                <h1 className="text-4xl font-semibold text-black mb-2">About</h1>
                <hr className="w-36 mx-auto border-t-4 border-yellow-500 mb-5" />
            </div>
            <div className="grid grid-cols-12 shadow-xl rounded-xl">
                <div className="col-span-4">
                    <div className="text-left p-10">
                        <h2 className="text-gray-700 font-bold text-4xl text-left mb-5">Experience the Best of <span className="text-yellow-500">CaterIndo</span></h2>
                        <p className="text-gray-600 mt-3 text-left pb-32 text-lg">At Caterindo Nusantara, we're dedicated to showcasing the tantalizing flavors and diverse culinary heritage of Indonesia.</p>
                        <button className="bg-yellow-500 text-white px-6 py-3 flex items-center justify-center w-full rounded-md shadow-lg font-bold text-lg">
                            EXPLORE MORE
                            <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                        </button>
                    </div>
                </div>
                <div className="col-span-8">
                    <img src={Image} alt="About" className="w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
