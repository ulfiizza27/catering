import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoInstagram from '../../assets/img/instagram.png';
import LogoGithub from '../../assets/img/github.png';
import LogoLinkedin from '../../assets/img/linkedin.png';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

import Logo from '../../assets/img/logo.png';

export default function Footer() {
    return (
        <div className='mt-32' style={{ backgroundColor: '#FAEF9B', paddingTop: '2rem' }}>
            <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-4 py-8">
                <div className="col-span-3 flex items-center">
                    <div className="ml-4 flex flex-col">
                    <img src={Logo} alt="Logo" className="h-[60px] text-left" />
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#333333', width: '20px', height: '20px'  }}/>
                            <span className="ml-4 text-base font-inter">123 Catering Street, City</span>
                        </div>
                        <div className="flex items-center mt-3">
                            <FontAwesomeIcon icon={faPhone} style={{ color: '#333333', width: '20px', height: '20px' }}/>
                            <span className="ml-4 text-base font-inter">+1234567890</span>
                        </div>
                        <div className="flex items-center mt-3">
                            <FontAwesomeIcon icon={faEnvelope} style={{ color: '#333333', width: '20px', height: '20px' }}/>
                            <span className="ml-4 text-base font-inter">info@cateringindo.com</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium font-inter">Quick Links</h2>
                    <ScrollLink to="home" smooth={true} className="text-center mt-4 font-inter" style={{ cursor: 'pointer' }}>Home</ScrollLink>
                    <ScrollLink to="about" smooth={true} className="text-center mt-3 font-inter" style={{ cursor: 'pointer' }}>About</ScrollLink>
                    <ScrollLink to="contact" smooth={true} className="text-center mt-3 font-inter" style={{ cursor: 'pointer' }}>Contact Us</ScrollLink>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium">Support</h2>
                    <a href="#" className="text-center mt-4 font-inter">FAQ</a>
                    <a href="#" className="text-center mt-3 font-inter">Contact</a>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium font-inter">Follow Us</h2>
                    <div className="flex mt-4">
                        <a href="https://www.instagram.com/ulfiizza5" target="_blank" rel="noopener noreferrer">
                            <img src={LogoInstagram} alt="Instagram" className="h-[36px] mr-5" />
                        </a>
                        <a href="https://github.com/ulfiizza27" target="_blank" rel="noopener noreferrer">
                            <img src={LogoGithub} alt="Github" className="h-[32px] mr-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/ulfi-mustatiq-abidatul-izza-723047267/" target="_blank" rel="noopener noreferrer">
                            <img src={LogoLinkedin} alt="Linkedin" className="h-[32px]" />
                        </a>
                    </div>
                </div>
            </div>

            <hr style={{ backgroundColor: '#C6C6C6' }} />

            <p className="text-center text-base py-4 font-inter">@2024 Powered by CaterIndo</p>
        </div>
        </div>
        
    );
}
