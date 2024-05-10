import Left from '../../assets/img/left.png';
import Right from '../../assets/img/right.png';

export default function Inbox() {
    return (
        <div className="container mt-56 mx-auto relative rounded-xl py-20" style={{ backgroundColor: '#FFFAD7'}}>
            <img src={Left} alt="Left" className="left-img absolute bottom-0 left-0 w-80" />
            <img src={Right} alt="Right" className="right-img absolute bottom-0 right-0 w-72 rounded-xl" />  
            <div className='px-80'>
                <h1 className="text-center text-5xl font-semibold pb-6 font-inter">Deliciousness to your inbox</h1>
                <p className="text-center text-gray-600 text-lg mb-11 font-inter">Experience the ease of managing your catering needs while exploring a diverse array of delectable cuisines. Join us and elevate your catering experience to new heights!</p>
                <form className="flex justify-center">
                <div className="form-group mb-0 flex relative">
                    <input type="text" className="form-control rounded-xl px-4 py-5 pr-40 placeholder-gray-500 focus:outline-none" placeholder="Your email address..." />
                    <button type="submit" className="absolute right-2 top-2 btn btn-primary btn-subscribe px-6 py-3 rounded-xl text-white font-inter font-semibold text-base" style={{ backgroundColor: '#E5AF10' }}>Subscribe</button>
                </div>
                </form>
            </div>
        </div>
    );
}
