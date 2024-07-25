import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchPeoples } from '../store/slices/peopleSlice';

export default function Peoples() {
    const dispatch = useDispatch();
    const { peoples } = useSelector((state) => state.people);
    const [searchTerm, setSearchTerm] = useState('');
    const loading = useSelector((state) => state.people.status) === 'loading';

    useEffect(() => {
        dispatch(fetchPeoples());
    }, [dispatch]);

    const filteredCharacters = peoples.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));

    const getCharacterImage = (characterName) => {
        if (!characterName) {
            return null;
        }
        const formattedName = characterName.split(' ').join('-');
        return `/images/characters/${formattedName}.jpg`;
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
        setSearchTerm(sanitizedValue);
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-permanentMarker">Characters</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Discover beloved characters from Studio Ghibli films. Click on a movie title to learn about the stories and adventures that have captivated audiences around the world. Use the quick search bar to find a specific character.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="mt-12">
                            <label htmlFor="search" className="block text-xl sm:text-2xl font-bold leading-6 text-gray-900 font-permanentMarker">
                                Quick search
                            </label>
                            <div className="relative mt-2 flex items-center">
                                <input
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Search for a character..." />
                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {filteredCharacters.map((person) => (
                                <li key={person.id} className='flex flex-col items-center'>
                                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#4E706D] p-1">
                                        <img
                                            alt={person.name}
                                            src={getCharacterImage(person.name)}
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.jpg'; }}
                                            className="object-cover object-top w-full h-full rounded-full ring-2 ring-[#4E706D]" />
                                    </div>
                                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <ul className="text-sm leading-6 text-gray-600">
                                        {person.age && <li>Age: {person.age}</li>}
                                        {person.gender && <li>Gender: {person.gender}</li>}
                                        {person.eye_color && <li>Eye Color: {person.eye_color}</li>}
                                        {person.hair_color && <li>Hair Color: {person.hair_color}</li>}
                                        {person.species && <li>Species: {person.species}</li>}
                                        {person.films && person.films.length > 0 ? (
                                            <li>
                                                Films:
                                                <ul>
                                                    {person.films.map((film) => (
                                                        <li key={film.id}>
                                                            <Link to={`/films/${film.id}`} className="text-black inline-flex gap-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                                                </svg>

                                                                {film.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ) : (
                                            <li>No films available</li>
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
