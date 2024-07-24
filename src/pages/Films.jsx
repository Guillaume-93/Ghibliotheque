import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Marquee from "../components/magicui/Marquee.jsx";
import { fetchFilms } from '../store/slices/filmsSlice';

export default function Films() {
    const dispatch = useDispatch();
    const { films } = useSelector((state) => state.films);
    const [searchTerm, setSearchTerm] = useState('');
    const loading = useSelector((state) => state.films.status) === 'loading';

    useEffect(() => {
        dispatch(fetchFilms());
    }, [dispatch]);

    const filteredFilms = films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.title.localeCompare(b.title));

    const renderFilms = (filmsToRender) => {
        return filmsToRender.map((film) => (
            <div
                key={film.id}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-200 w-44 h-64 mx-10 transition-all duration-300 transform hover:scale-105 shadow-3xl hover:shadow-5xl"
            >
                <Link to={`/films/${film.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <div className="bg-gray-200 sm:aspect-none h-full">
                        <img
                            alt={film.title}
                            src={film.image}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </Link>
            </div>
        ));
    };

    return (
        <div className="flex flex-col">
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 text-left px-6 md:px-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-customCursive">Films</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Explore iconic Studio Ghibli films. Click on the image of a film to discover its story and details. Use the quick search bar to find a specific movie.
                        </p>
                    </div>
                    <main>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                <div className='bg-[#7d9c95] lg:rounded-lg ring-2 ring-[#4E706D]'>
                                    <Marquee className="h-68 w-full p-8 mt-20" repeat={1}>
                                        {renderFilms(films)}
                                    </Marquee>
                                    <Marquee className="h-68 w-full p-8" reverse repeat={1}>
                                        {renderFilms(films)}
                                    </Marquee>
                                </div>
                                <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-0">
                                    <div className="mt-12">
                                        <label htmlFor="search" className="block text-xl sm:text-2xl font-bold leading-6 text-gray-900 font-customCursive">
                                            Quick search
                                        </label>
                                        <div className="relative mt-2 flex items-center">
                                            <input
                                                id="search"
                                                name="search"
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Search for a film..."
                                            />
                                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <section aria-labelledby="films-heading" className="mt-12">
                                            <h2 id="films-heading" className="sr-only">
                                                Films in your library
                                            </h2>
                                            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mx-2">
                                                {filteredFilms.map((film) => (
                                                    <li key={film.id} className="flex flex-col items-center gap-y-4 py-6">
                                                        <div className="w-44 h-64">
                                                            <Link to={`/films/${film.id}`} className="block h-full">
                                                                <img
                                                                    alt={film.title}
                                                                    src={film.image}
                                                                    className="rounded-md object-cover object-top h-full w-full transition-all duration-300 transform hover:scale-105 hover:shadow-5xl shadow-3xl"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="mt-4 flex flex-col text-center">
                                                            <p className="text-lg font-medium text-gray-900">{film.title}</p>
                                                            <p className="mt-1 text-sm text-gray-500">Director: {film.director}</p>
                                                            <p className="mt-1 text-sm text-gray-500">Producer: {film.producer}</p>
                                                            <p className="mt-1 text-sm text-gray-900">{film.release_date}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
