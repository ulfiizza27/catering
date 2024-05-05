import Banner from '../../assets/img/banner.png';
import Cart from '../../assets/img/shopping_cart.png';

export default function Home(){
    return(
        <div id="home" className="container mx-auto flex pt-32">
            <div className="flex-1 ">
                <img src={Banner} alt="Banner" className="h-[607px] w-[611px]" />
            </div>
            <div className="flex-1 pl-36 py-20">
                <h1 className="text-5xl font-bold" style={{ lineHeight: '1.3' }}>
                    Happy With <span className="text-yellow-500">Delicious Food</span> And Get New Experiences With Nusantara Food
                </h1>
                <p className="mt-6  mr-20 text-base pt-4">
                    Exploring new food with different transition form all country especially from Indonesian that you can try at this place and get a good price from us as well we will make a good impact to our customers
                </p>
                <div className="mt-8 flex items-center pt-4">
                    <button className="border border-yellow-500 text-black px-5 py-3 rounded-lg mr-7 hover:bg-yellow-500 hover:text-black transition duration-300 flex items-center gap-2">
                        Order food <img src={Cart} alt="Banner" className="h-[24px]" />
                    </button>
                    <button className="border border-yellow-500 text-black px-5 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300">Learn More</button>
                </div>
            </div>
        </div>
    );
}