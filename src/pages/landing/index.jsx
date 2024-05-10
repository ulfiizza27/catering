import Navbar from '../../components/navbar';
import Home from './landing-home';
import About from './landing-about';
import Contact from './landing-contact_us';
import Footer from '../../components/footer';
import Inbox from './landing-inbox';

export default function Landing() {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Contact />
            <Inbox />
            <Footer />
        </>
    );
}
