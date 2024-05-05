import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoInstagram from '../../assets/img/instagram.png';
import LogoGithub from '../../assets/img/github.png';
import LogoLinkedin from '../../assets/img/linkedin.png';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
                            <span className="ml-4">123 Catering Street, City</span>
                        </div>
                        <div className="flex items-center mt-3">
                            <FontAwesomeIcon icon={faPhone} style={{ color: '#333333', width: '20px', height: '20px' }}/>
                            <span className="ml-4">+1234567890</span>
                        </div>
                        <div className="flex items-center mt-3">
                            <FontAwesomeIcon icon={faEnvelope} style={{ color: '#333333', width: '20px', height: '20px' }}/>
                            <span className="ml-4">info@cateringindo.com</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium">Quick Links</h2>
                    <a href="#" className="text-center mt-3">Home</a>
                    <a href="#" className="text-center mt-3">About</a>
                    <a href="#" className="text-center mt-3">Contact Us</a>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium">Support</h2>
                    <a href="#" className="text-center mt-3">FAQ</a>
                    <a href="#" className="text-center mt-3">Contact</a>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                    <h2 className="text-3xl font-medium">Follow Us</h2>
                    <div className="flex mt-3">
                        <img src={LogoInstagram} alt="Instagram" className="h-[36px] mr-5" />
                        <img src={LogoGithub} alt="Github" className="h-[32px] mr-5" />
                        <img src={LogoLinkedin} alt="Linkedin" className="h-[32px]" />
                    </div>
                </div>
            </div>

            <hr style={{ backgroundColor: '#C6C6C6' }} />

            <p className="text-center text-base py-4">@2024 Powered by CaterIndo</p>
        </div>
        </div>
        
    );
}
