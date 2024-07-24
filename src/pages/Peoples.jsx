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

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-customCursive">Characters</h2>
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
                                    placeholder="Search for a character..." />
                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                            </div>
                        </div><ul
                            role="list"
                            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                        >
                            {filteredCharacters.map((person) => (
                                <li key={person.id} className='flex flex-col items-center'>
                                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#4E706D] p-0.5">
                                        <img
                                            alt={person.name}
                                            src={getCharacterImage(person.name)}
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.jpg'; }}
                                            className="object-cover object-top w-full h-full rounded-full" />
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
                                                <ul className="list-disc list-inside">
                                                    {person.films.map((film) => (
                                                        <li key={film.id}>
                                                            <Link to={`/films/${film.id}`} className="text-[#9F5C31] hover:text-[#2e4b48]">
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
