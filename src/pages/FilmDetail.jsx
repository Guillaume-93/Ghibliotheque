import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchFilmById } from '../store/slices/filmsSlice';

export default function FilmDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const film = useSelector((state) => state.films.selectedFilm);
    const loading = useSelector((state) => state.films.status) === 'loading';
    const characters = useSelector((state) => state.films.characters);
    const species = useSelector((state) => state.films.species);
    const vehicles = useSelector((state) => state.films.vehicles);

    useEffect(() => {
        dispatch(fetchFilmById(id));
    }, [dispatch, id]);

    const getCharacterImage = (characterName) => {
        if (!characterName) {
            return null;
        }
        const formattedName = characterName.split(' ').join('-');
        return `/images/characters/${formattedName}.jpg`;
    };

    const customBannerUrl = '/images/banner/castle-in-the-sky.webp';

    if (!film) {
        return <div className="text-center text-gray-700 text-lg mt-10">Film not found</div>;
    }

    return (
        <div className="bg-white py-32">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader />
                </div>
            ) : (
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto flex max-w-2xl flex-col justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
                    <div className="w-full lg:max-w-lg lg:flex-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-greatVibes">
                            {film.title}
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-gray-600">
                            {film.description}
                        </p>
                        <img
                            alt="Film Banner"
                            src={film.title === "Castle in the Sky" ? customBannerUrl : film.movie_banner}
                            className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                        />
                    </div>
                    <div className="w-full lg:max-w-xl lg:flex-auto">
                        <ul className="-my-8 divide-y divide-gray-100">
                            <dl className="mt-16 text-lg font-medium">
                                <dt className="text-gray-900 font-bold">Original Title</dt>
                                <dd className="mt-2 text-gray-500">{film.original_title}</dd>
                                <dt className="text-gray-900 font-bold mt-4">Original Title Romanised</dt>
                                <dd className="mt-2 text-gray-500">{film.original_title_romanised}</dd>
                                <dt className="text-gray-900 font-bold mt-4">Director</dt>
                                <dd className="mt-2 text-indigo-600">
                                    <a href={`https://fr.wikipedia.org/wiki/${film.director}`} target='_blank' className='flex gap-2'>
                                        {film.director}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                </dd>
                                <dt className="text-gray-900 font-bold mt-4">Producer</dt>
                                <dd className="mt-2 text-indigo-600">
                                    <a href={`https://fr.wikipedia.org/wiki/${film.producer}`} target='_blank' className='flex gap-2'>
                                        {film.producer}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                </dd>
                                <dt className="text-gray-900 font-bold mt-4">Release Date</dt>
                                <dd className="mt-2 text-gray-500">{film.release_date}</dd>
                                <dt className="text-gray-900 font-bold mt-4">Running Time</dt>
                                <dd className="mt-2 text-gray-500">{film.running_time} minutes</dd>
                                <dt className="text-gray-900 font-bold mt-4">Rating</dt>
                                <dd className="mt-2 text-gray-500">{film.rt_score}</dd>
                            </dl>
                        </ul>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
                            <ul className='col-span-2 mt-10'>
                                <h3 className="text-2xl font-bold mb-4 font-greatVibes">Characters</h3>
                                {characters.map((character, index) => (
                                    <li key={character.id || index} className="flex items-center space-x-4 mb-2 text-gray-500 font-medium">
                                        {getCharacterImage(character.name) ? (
                                            <>
                                                <Link to={`/people`} className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img src={getCharacterImage(character.name)} alt={character.name} className="object-cover object-top w-full h-full" />
                                                </Link>
                                                <p>{character.name}</p>
                                            </>
                                        ) : (
                                            <p>{"Data not available"}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <ul className='col-span-1 mt-10'>
                                <h3 className="text-2xl font-bold mb-4 font-greatVibes">Species</h3>
                                {species.map((specie, index) => (
                                    <li key={specie.id || index} className="mb-2 text-gray-500 font-medium">
                                        {specie.name ? (
                                            <Link to={`/species`} className="text-[#9F5C31] hover:text-[#2e4b48]">
                                                {specie.name}
                                            </Link>
                                        ) : (
                                            <p>{"Data not available"}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ul className='col-span-1 mt-10'>
                            <h3 className="text-2xl font-bold mb-4 font-greatVibes">Vehicles</h3>
                            {vehicles.map((vehicle, index) => (
                                <li key={vehicle.id || index} className="mb-2 text-gray-500 font-medium">
                                    {vehicle.name ? (
                                        <Link to={`/vehicles`} className="text-[#9F5C31] hover:text-[#2e4b48]">
                                            {vehicle.name}
                                        </Link>
                                    ) : (
                                        <p>{"Data not available"}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
