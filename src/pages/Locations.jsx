import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchLocations } from '../store/slices/locationsSlice';

export default function Locations() {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.locations);
    const loading = useSelector((state) => state.locations.status) === 'loading';

    useEffect(() => {
        dispatch(fetchLocations());
    }, [dispatch]);

    const getLocationImage = useMemo(() => (locationName) => {
        if (!locationName) return null;
        const formattedName = encodeURIComponent(locationName.split(' ').join('-'));
        return `/images/locations/${formattedName}.webp`;
    }, []);

    const getCharacterImage = useMemo(() => (characterName) => {
        if (!characterName) return null;
        const formattedName = characterName.split(' ').join('-');
        return `/images/characters/${formattedName}.jpg`;
    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-customCursive">Locations</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Discover the beautiful locations from Studio Ghibli films. Click on a location to learn more about its details and the characters who live there.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {locations.map((location) => (
                            <li key={location.id} className='flex flex-col items-center'>
                                <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 overflow-hidden ring-2 ring-[#4E706D] p-0.5 rounded-full">
                                    <img
                                        alt={location.name}
                                        src={getLocationImage(location.name)}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/locations/default.jpg'; }}
                                        className="object-cover object-top w-full h-full rounded-full" />
                                </div>
                                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{location.name}</h3>
                                <ul className="text-sm leading-6 text-gray-600 mt-2 text-center">
                                    <li>Climate: {location.climate !== 'TODO' ? location.climate : 'N/A'}</li>
                                    <li>Terrain: {location.terrain !== 'TODO' ? location.terrain : 'N/A'}</li>
                                    <li>Surface Water: {location.surface_water || 'N/A'}</li>
                                    <li>Residents:</li>
                                    <ul className="space-y-2">
                                        {location.residents.length > 0 ? (
                                            location.residents.map((resident) => (
                                                <li key={resident.id} className="flex items-center space-x-4">
                                                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                                                        <img
                                                            src={getCharacterImage(resident.name)}
                                                            alt={resident.name}
                                                            className="object-cover object-top w-full h-full"
                                                        />
                                                    </div>
                                                    <p>{resident.name}</p>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No residents available</li>
                                        )}
                                    </ul>
                                    <li className="mt-4">Films:</li>
                                    <ul className="list-disc list-inside">
                                        {location.films.length > 0 ? (
                                            location.films.map((film) => (
                                                <li key={film.id}>
                                                    <Link to={`/films/${film.id}`} className="text-[#9F5C31] hover:text-[#2e4b48]">
                                                        {film.title}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No films available</li>
                                        )}
                                    </ul>
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
