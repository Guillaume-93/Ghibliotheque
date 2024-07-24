import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="flex max-w-3xl flex-col items-center text-center">
                <h1 className="w-full font-bold tracking-tight text-white text-shadow-lg mt-5 mb-10">
                    <p className='text-[#758A7E] text-5xl sm:text-7xl md:text-[100px] text-stroke font-greatVibes'>Ghibliothèque</p>
                </h1>
                <NavLink
                    to="/films"
                    className="mt-14 mb-5 inline-block rounded-md border border-transparent bg-[#758A7E] px-8 py-3 font-medium text-white font-greatVibes transition-transform duration-300 transform hover:scale-110 shadow-3xl text-sm sm:text-lg md-text-xl ring-1 ring-white"
                >
                    Enter
                </NavLink>
            </div>

        </div>
    );
}
