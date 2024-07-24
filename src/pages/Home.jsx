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
            <div className="flex max-w-3xl flex-col items-center text-center mb-20">
                <h1 className="w-full font-bold tracking-tight text-shadow-lg mt-5 mb-40">
                    <p className='text-[#FECF79] text-5xl sm:text-7xl md:text-[100px] text-stroke font-permanentMarker'>Ghibliothèque</p>
                </h1>
                <NavLink
                    to="/films"
                    className="mt-14 mb-5 inline-block rounded-md border border-transparent bg-[#FECF79] px-8 py-3 font-medium text-black font-permanentMarker transition-transform duration-300 transform hover:scale-110 shadow-3xl text-sm sm:text-lg md-text-xl ring-1 ring-black"
                >
                    Enter
                </NavLink>
            </div>

        </div>
    );
}
